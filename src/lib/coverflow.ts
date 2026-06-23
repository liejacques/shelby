/**
 * Maths du coverflow « verres posés sur le comptoir » : ancrage PAR LA BASE sur
 * une même ligne de zinc (transform-origin bottom → la mise à l'échelle se fait
 * vers la base, donc les verres reposent vraiment sur le bar). Active centré net,
 * latérales inclinées (rotateY) et assombries — jamais floutées.
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
 * - a=1 : glisse de ±52 %, 78 %, inclinée ∓16°, assombrie
 * - a=2 : ±94 %, 60 %, inclinée ∓24°, estompée
 * - a>2 : hors-champ (invisible, non cliquable)
 * Aucun flou : seules `opacity` et `brightness` distinguent les latérales.
 * NB : pas de translate Y — l'ancrage bas (CSS) maintient la base sur le zinc.
 */
export function coverState(i: number, cover: number): CoverState {
  const off = i - cover;
  const a = Math.abs(off);
  let tx: number, sc: number, ry: number, op: number, z: number, br: number;
  if (a === 0) {
    tx = 0; sc = 1; ry = 0; op = 1; z = 30; br = 1;
  } else if (a === 1) {
    tx = off * 52; sc = 0.78; ry = off > 0 ? -16 : 16; op = 0.8; z = 20; br = 0.56;
  } else if (a === 2) {
    tx = off * 94; sc = 0.6; ry = off > 0 ? -24 : 24; op = 0.34; z = 10; br = 0.4;
  } else {
    tx = off * 134; sc = 0.54; ry = 0; op = 0; z = 1; br = 0.3;
  }
  return {
    transform: `translateX(-50%) translateX(${tx}%) scale(${sc}) rotateY(${ry}deg)`,
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
