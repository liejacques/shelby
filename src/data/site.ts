/**
 * Constantes du site — SOURCE UNIQUE des infos pratiques.
 * Toutes EXACTES (mission). Consommées par Header, Footer, InfosPanels,
 * pages Contact / Réservation et le JSON-LD. Ne rien dupliquer ailleurs.
 */
export const site = {
  name: 'Le Shelby',
  tagline: 'BAR · COCKTAILS · COLMAR',
  baseline: 'Un bar caché. Une époque révolue. Une expérience unique.',

  /** Adresse exacte */
  address: { street: '3a rue Berthe Molly', zip: '68000', city: 'Colmar' },
  addressLine: '3a rue Berthe Molly, 68000 Colmar',

  /** Téléphone — affichage + lien `tel:` (tous les boutons réserver/appeler) */
  phoneDisplay: '03 68 25 20 25',
  phoneHref: 'tel:+33368252025',

  /** Horaires */
  hours: 'Mardi — Dimanche · 17h00 → 01h30',
  hoursShort: 'Mar–Dim · 17h00–01h30',
  closed: 'Fermé le lundi',

  /**
   * Email NON confirmé (mission) → on n'invente rien. Laisser `null`.
   * Mettre une vraie adresse ici activera automatiquement les liens mailto.
   */
  email: null as string | null,

  /** Réputation / signes distinctifs (mission) */
  rating: '4,6 / 5',
  founders: 'Fondé par trois amis, anciens militaires',
  accessibility: 'Établissement non accessible PMR',
  reservationNote: 'Réservation par téléphone, du mardi au dimanche à partir de 17h.',

  /**
   * Itinéraire : on N'EMBARQUE PAS de carte Google (RGPD). Ce lien n'est ouvert
   * qu'au clic explicite de l'utilisateur, depuis le bouton « ITINÉRAIRE ».
   */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Le+Shelby%2C+3a+rue+Berthe+Molly%2C+68000+Colmar',

  /** Réseaux (placeholders — à confirmer) */
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  },
} as const;
