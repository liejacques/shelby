/**
 * Navigation centrale — source unique des liens, partagée par
 * Header, MenuOverlay et Footer. Chemins avec slash final (build statique
 * en mode « directory » → /carte/ sert /carte/index.html).
 */
export interface NavLink {
  label: string;
  href: string;
  /** petit pictogramme ASCII discret pour le menu plein écran */
  glyph?: string;
}

/** Liens principaux (ordre de la maquette MENU) */
export const mainNav: NavLink[] = [
  { label: 'Accueil', href: '/', glyph: '⌂' },
  { label: 'Nos cocktails', href: '/carte/', glyph: '♦' },
  { label: 'Réservation', href: '/reservation/', glyph: '☎' },
  { label: 'Événements', href: '/evenements/', glyph: '♪' },
  { label: 'Galerie', href: '/galerie/', glyph: '◈' },
  { label: 'Le bar', href: '/le-bar/', glyph: '⌖' },
  { label: 'Dress code', href: '/dress-code/', glyph: '✦' },
  { label: 'Contact', href: '/contact/', glyph: '✉' },
];

/** Liens légaux (footer + menu) */
export const legalNav: NavLink[] = [
  { label: 'Mentions légales', href: '/mentions-legales/' },
  { label: 'Politique de confidentialité', href: '/confidentialite/' },
];

/**
 * Normalise un chemin pour comparer l'état actif (tolère le slash final).
 * '/carte' et '/carte/' → '/carte'. La racine reste '/'.
 */
export function normalizePath(p: string): string {
  if (!p) return '/';
  const stripped = p.replace(/\/+$/, '');
  return stripped === '' ? '/' : stripped;
}

/** Vrai si `current` correspond au lien `href` (page courante). */
export function isActive(href: string, current: string): boolean {
  return normalizePath(href) === normalizePath(current);
}
