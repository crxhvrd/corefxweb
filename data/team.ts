// The βeta members listed in the About section. Roles are keys into about.team.roles in
// content/<lang>/ui.json, so they read in the visitor's language; names and links don't change.

import type { Country } from '@/components/Flag';

export type Role = 'graphics' | 'research' | 'movies';

export type Member = {
    name: string;
    aka?: string;
    country: Country;
    roles: Role[];
    links: { label: string; href: string }[];
};

export const TEAM: Member[] = [
    {
        name: 'CRXHVRD',
        country: 'UA',
        aka: 'Core',
        roles: ['graphics', 'research', 'movies'],
        links: [
            { label: 'patreon', href: 'https://www.patreon.com/c/crxhvrd' },
            { label: 'youtube', href: 'https://www.youtube.com/@CRXHVRD' },
        ],
    },
    {
        name: 'Dreamt',
        country: 'US',
        roles: ['graphics', 'research'],
        links: [{ label: 'github', href: 'https://github.com/ImDreamt' }],
    },
    {
        name: 'Valkill',
        country: 'FR',
        roles: ['graphics'],
        links: [{ label: 'ko-fi', href: 'https://ko-fi.com/valkill' }],
    },
    {
        name: 'Fir',
        country: 'FI',
        roles: ['movies'],
        links: [{ label: 'youtube', href: 'https://www.youtube.com/channel/UCbirMcX2ijUTZYSIXyB_6sA' }],
    },
    {
        name: 'rTangle',
        country: 'US',
        roles: ['movies'],
        links: [{ label: 'youtube', href: 'https://www.youtube.com/@rTangle' }],
    },
    {
        name: 'Kronos',
        country: 'ID',
        roles: ['movies'],
        links: [{ label: 'youtube', href: 'https://www.youtube.com/channel/UCFkL9gVUol0aUcgefya89nQ' }],
    },
];
