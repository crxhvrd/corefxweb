#!/usr/bin/env node
// Polls a Discord announcement channel via the REST API and writes the
// last N messages to data/devblog-posts.json in a normalized shape that
// app/devblog/page.tsx can render. Runs from .github/workflows/sync-devblog.yml.

import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '..', 'data', 'devblog-posts.json');

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const LIMIT = Number(process.env.POST_LIMIT ?? 30);

if (!TOKEN) {
  console.error('Missing DISCORD_BOT_TOKEN');
  process.exit(1);
}
if (!CHANNEL_ID) {
  console.error('Missing DISCORD_ANNOUNCEMENT_CHANNEL_ID');
  process.exit(1);
}

function avatarUrl(user) {
  if (!user) return '';
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
  }
  // Discord default avatars: (id >> 22) % 6 for new system, fall back to discriminator % 5 otherwise
  let index = 0;
  try {
    index = Number((BigInt(user.id) >> 22n) % 6n);
  } catch {
    index = 0;
  }
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

function authorDisplayName(user) {
  if (!user) return 'Unknown';
  return user.global_name || user.username || 'Unknown';
}

function normalizeContent(content, message, roleMap) {
  if (!content) return '';
  let out = content;
  // Replace user mentions <@id> and <@!id> with @displayName from message.mentions
  if (Array.isArray(message.mentions)) {
    for (const u of message.mentions) {
      const name = authorDisplayName(u);
      out = out.replaceAll(`<@${u.id}>`, `@${name}`);
      out = out.replaceAll(`<@!${u.id}>`, `@${name}`);
    }
  }
  // Replace role mentions <@&id> with @RoleName from the cached guild roles
  out = out.replace(/<@&(\d+)>/g, (_, id) => {
    const name = roleMap?.get(id);
    return name ? `@${name}` : '@role';
  });
  // Replace channel mentions <#id> with #channel (no name resolution)
  out = out.replace(/<#(\d+)>/g, '#channel');
  // Discord custom emoji <:name:id> and <a:name:id> -> :name:
  out = out.replace(/<a?:([a-zA-Z0-9_]+):\d+>/g, ':$1:');
  return out;
}

function normalizeAttachments(message) {
  if (!Array.isArray(message.attachments)) return [];
  return message.attachments.map((a) => ({
    url: a.url,
    contentType: a.content_type || guessContentType(a.filename || a.url),
    width: a.width || undefined,
    height: a.height || undefined,
  }));
}

function guessContentType(name) {
  const ext = (name || '').toLowerCase().split('.').pop() || '';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif'].includes(ext)) return `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  if (['mp4', 'webm', 'mov'].includes(ext)) return `video/${ext}`;
  return 'application/octet-stream';
}

function normalizeEmbeds(message) {
  if (!Array.isArray(message.embeds)) return [];
  return message.embeds
    .filter((e) => e.title || e.description || e.image || e.url)
    .map((e) => ({
      type: e.type || undefined,
      url: e.url || undefined,
      providerName: e.provider?.name || undefined,
      title: e.title || undefined,
      description: e.description || undefined,
      imageUrl: e.image?.url || e.thumbnail?.url || undefined,
      color: typeof e.color === 'number' ? e.color : undefined,
    }));
}

function normalizeMessage(m, roleMap) {
  return {
    id: m.id,
    authorName: authorDisplayName(m.author),
    authorAvatarUrl: avatarUrl(m.author),
    timestamp: m.timestamp,
    editedAt: m.edited_timestamp || undefined,
    content: normalizeContent(m.content, m, roleMap),
    attachments: normalizeAttachments(m),
    embeds: normalizeEmbeds(m),
  };
}

async function discordGet(path) {
  const res = await fetch(`https://discord.com/api/v10${path}`, {
    headers: {
      Authorization: `Bot ${TOKEN}`,
      'User-Agent': 'CoreFX-DevblogSync (https://github.com/crxhvrd/corefxweb, 1.0.0)',
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Discord API ${res.status} ${res.statusText}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function fetchMessages() {
  return discordGet(`/channels/${CHANNEL_ID}/messages?limit=${Math.min(LIMIT, 100)}`);
}

async function fetchRoles(guildId) {
  if (!guildId) return new Map();
  try {
    const roles = await discordGet(`/guilds/${guildId}/roles`);
    const map = new Map();
    for (const r of roles) {
      if (r?.id && r?.name) map.set(r.id, r.name);
    }
    return map;
  } catch (err) {
    console.warn(
      `Could not fetch guild roles: ${err.message}. Role mentions will fall back to "@role".`
    );
    return new Map();
  }
}

async function main() {
  const roleMap = await fetchRoles(GUILD_ID);
  console.log(`Fetched ${roleMap.size} guild roles.`);
  const raw = await fetchMessages();
  console.log(`Discord returned ${raw.length} messages from channel ${CHANNEL_ID}.`);
  if (raw.length > 0) {
    const newest = raw[0];
    console.log(
      `Newest message: id=${newest.id} type=${newest.type} ts=${newest.timestamp} ` +
        `author=${newest.author?.username} contentLen=${(newest.content || '').length} ` +
        `attachments=${newest.attachments?.length || 0} embeds=${newest.embeds?.length || 0}`
    );
  }
  const typeCounts = {};
  for (const m of raw) typeCounts[m.type] = (typeCounts[m.type] || 0) + 1;
  console.log(`Message types breakdown: ${JSON.stringify(typeCounts)}`);

  // Skip non-default message types (joins, pins, etc.). Type 0 = DEFAULT, 19 = REPLY.
  const posts = raw
    .filter((m) => m.type === 0 || m.type === 19)
    .map((m) => normalizeMessage(m, roleMap));
  console.log(`After type filter: ${posts.length} posts.`);

  const json = JSON.stringify(posts, null, 2) + '\n';
  let prev = '';
  try {
    prev = await readFile(OUT_PATH, 'utf8');
  } catch {
    // first run
  }
  if (prev === json) {
    console.log(`No changes. ${posts.length} posts.`);
    return;
  }
  await writeFile(OUT_PATH, json, 'utf8');
  console.log(`Wrote ${posts.length} posts to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
