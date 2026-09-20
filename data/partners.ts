// The authorised partner list the CoreFX licence promises in section 3.2:
// "The current list of authorised partners and their products is published at
// https://corefx.me." A partner licensed to publish CoreFX technology under
// their own name belongs here — and nobody who is not here has that permission,
// so keep this list exact and remove an entry the moment an agreement ends.

export type Partner = {
  name: string;
  href: string;
  /** Shown as the link text, so no scheme and no trailing slash. */
  site: string;
  /** What they publish, in our own words. */
  what: string;
};

export const partners: Partner[] = [
  {
    name: 'ModsHub',
    href: 'https://modshub.io/',
    site: 'modshub.io',
    what: 'A mod manager for Grand Theft Auto V and FiveM, published by OpenCore OÜ, with its own in-house library of graphics mods.',
  },
  {
    name: 'Network Graphics',
    href: 'https://ntw.graphics/',
    site: 'ntw.graphics',
    what: 'A mod manager for Grand Theft Auto V in the same mould as ModsHub, built mainly for a Russian-speaking audience, with its own library of graphics overhauls for roleplay servers.',
  },
];
