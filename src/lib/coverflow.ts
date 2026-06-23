/**
 * Maths du coverflow cocktails (carte active centrée nette, latérales inclinées
 * en rotateY et ASSOMBRIES — jamais floutées). Verre détouré dans un cadre
 * hairline or, sur le fond comptoir.
 *
 * Partagé entre le rendu serveur (Coverflow.astro, état initial cover=0,
 * fonctionne même sans JS) et le script client. Source unique = pas de divergence.
 */
export interface CoverState {
  transform: string;
  opacity: string;
  zIndex: string;
  filter: string;
  pointerEvents: string;
  cursor: string;
}

/**
 * Style d'une carte d'indice `i` quand la carte active est `cover`.
 * - a=0 : centre, net, plein format (brightness 1 → aucun filtre)
 * - a=1 : ±54 %, 80 %, inclinée ∓20°, assombrie
 * - a=2 : ±98 %, 62 %, inclinée ∓30°, estompée
 * - a>2 : hors-champ (invisible, non cliquable)
 * Aucun flou : seules `opacity` et `brightness` distinguent les latérales.
 */
export function coverState(i: number, cover: number): CoverState {
  const off = i - cover;
  const a = Math.abs(off);
  let tx: number, sc: number, ry: number, op: number, z: number, br: number;
  if (a === 0) {
    tx = 0; sc = 1; ry = 0; op = 1; z = 30; br = 1;
  } else if (a === 1) {
    tx = off * 54; sc = 0.8; ry = off > 0 ? -20 : 20; op = 0.82; z = 20; br = 0.55;
  } else if (a === 2) {
    tx = off * 98; sc = 0.62; ry = off > 0 ? -30 : 30; op = 0.36; z = 10; br = 0.4;
  } else {
    tx = off * 140; sc = 0.55; ry = 0; op = 0; z = 1; br = 0.3;
  }
  return {
    transform: `translate(-50%,-50%) translateX(${tx}%) scale(${sc}) rotateY(${ry}deg)`,
    opacity: String(op),
    zIndex: String(z),
    // brightness(1) sur l'active = identité (net) ; <1 assombrit les latérales
    filter: `brightness(${br})`,
    pointerEvents: a > 2 ? 'none' : 'auto',
    cursor: 'pointer',
  };
}

/** Sérialise un CoverState en chaîne `style` (pour le rendu serveur). */
export function coverStyleString(i: number, cover: number): string {
  const s = coverState(i, cover);
  return [
    `transform:${s.transform}`,
    `opacity:${s.opacity}`,
    `z-index:${s.zIndex}`,
    `filter:${s.filter}`,
    `pointer-events:${s.pointerEvents}`,
    `cursor:${s.cursor}`,
  ].join(';') + ';';
}
