/**
 * Carte des cocktails — données EXACTES (mission). Ne rien inventer côté
 * noms / ingrédients / prix. Enrichi pour le multi-pages :
 *  - `slug`        → route de la fiche /carte/[slug]
 *  - `category`    → filtre LISTE (Classiques / Signatures)
 *  - `description` → courte accroche de la fiche (voix Prohibition)
 * Les chemins d'images pointent vers /public/assets.
 */
export type CocktailCategory = 'Classiques' | 'Signatures';

export interface Cocktail {
  /** identifiant d'URL de la fiche */
  slug: string;
  /** chemin de l'image (servie depuis /public) */
  img: string;
  /** nom affiché (Silkscreen, majuscules) */
  name: string;
  /** ingrédients (VT323) */
  ingredients: string;
  /** prix affiché */
  price: string;
  /** catégorie pour les filtres */
  category: CocktailCategory;
  /** courte description (fiche) */
  description: string;
}

export const cocktails: Cocktail[] = [
  {
    slug: 'old-fashioned',
    img: '/assets/cocktail-old-fashioned.png',
    name: 'THE SHELBY OLD FASHIONED',
    ingredients: 'Bourbon, sucre brun, bitters, orange fumée',
    price: '12€',
    category: 'Classiques',
    description:
      'Un classique intemporel — sucre brun et orange fumée, une profondeur qui se sirote lentement.',
  },
  {
    slug: 'peaky-sour',
    img: '/assets/cocktail-peaky-sour.png',
    name: 'PEAKY SOUR',
    ingredients: 'Whisky, citron, sucre, blanc d’œuf',
    price: '11€',
    category: 'Classiques',
    description:
      'Acidulé et soyeux ; le blanc d’œuf habille le whisky d’une mousse délicate. Un faux air d’innocence.',
  },
  {
    slug: 'prohibition-gin',
    img: '/assets/cocktail-prohibition-gin.png',
    name: 'PROHIBITION GIN',
    ingredients: 'Gin, concombre, basilic, citron vert',
    price: '11€',
    category: 'Signatures',
    description:
      'Concombre, basilic, citron vert — la fraîcheur clandestine d’un jardin caché derrière la porte.',
  },
  {
    slug: 'colmar-negroni',
    img: '/assets/cocktail-colmar-negroni.png',
    name: 'COLMAR NEGRONI',
    ingredients: 'Gin, vermouth rouge, Campari, zeste d’orange',
    price: '12€',
    category: 'Classiques',
    description:
      'L’amertume noble du Campari mariée au vermouth. Un hommage alsacien au rituel italien.',
  },
  {
    slug: 'shelby-smoke',
    img: '/assets/cocktail-shelby-smoke.png',
    name: 'SHELBY SMOKE',
    ingredients: 'Whisky, sirop d’érable, fumée au bois de cerisier, angostura',
    price: '13€',
    category: 'Signatures',
    description:
      'Fumé au bois de cerisier sous cloche de verre. On le découvre comme un secret qu’on libère.',
  },
  {
    slug: 'lady-shelby',
    img: '/assets/cocktail-lady-shelby.png',
    name: 'LADY SHELBY',
    ingredients: 'Rhum, framboise, vanille, citron',
    price: '11€',
    category: 'Signatures',
    description:
      'Rhum, framboise, vanille — une douceur trompeuse, élégante et redoutable comme son nom.',
  },
];

/** Filtres disponibles pour la vue LISTE (ordre d'affichage). */
export const cocktailFilters: Array<'Tous' | CocktailCategory> = [
  'Tous',
  'Classiques',
  'Signatures',
];

/** Récupère un cocktail par slug (fiches + liens). */
export function getCocktail(slug: string): Cocktail | undefined {
  return cocktails.find((c) => c.slug === slug);
}

/* ===========================================================================
   ART DU VERRE — paramètres pour le visuel SVG « verre de collection » (placeholder
   élégant en attendant les vrais PNG). Type de verre + couleur du liquide + garniture.
   =========================================================================== */
export type GlassType = 'rocks' | 'coupe' | 'highball';
export interface CocktailArt {
  glass: GlassType;
  /** liquide (bas, plus dense) */
  liquid: string;
  /** liquide (haut, ménisque clair) */
  liquidLight: string;
  garnish?: 'orange' | 'cherry' | 'cucumber' | 'lime' | 'none';
  ice?: boolean;
  smoke?: boolean;
  foam?: boolean;
  bubbles?: boolean;
}

export const cocktailArt: Record<string, CocktailArt> = {
  'old-fashioned': { glass: 'rocks', liquid: '#9c5414', liquidLight: '#d68a36', ice: true, garnish: 'orange' },
  'peaky-sour': { glass: 'coupe', liquid: '#cdab5e', liquidLight: '#eaddb0', foam: true, garnish: 'cherry' },
  'prohibition-gin': { glass: 'highball', liquid: '#8fb083', liquidLight: '#c7ddbd', bubbles: true, garnish: 'cucumber' },
  'colmar-negroni': { glass: 'rocks', liquid: '#9c1f1c', liquidLight: '#cc4a36', ice: true, garnish: 'orange' },
  'shelby-smoke': { glass: 'rocks', liquid: '#94531c', liquidLight: '#c9883a', ice: true, smoke: true },
  'lady-shelby': { glass: 'coupe', liquid: '#b12848', liquidLight: '#d76a8a', foam: false, garnish: 'cherry' },
};

export function getArt(slug: string): CocktailArt {
  return cocktailArt[slug] ?? { glass: 'rocks', liquid: '#9c5414', liquidLight: '#d68a36' };
}
