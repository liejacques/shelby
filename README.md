# Le Shelby — site vitrine (Astro)

Site **multi-pages** du bar à cocktails caché **Le Shelby** (Colmar), en **Astro
statique**, **mobile-first**. Univers Prohibition / Peaky Blinders : noir profond,
rampe d'or unique, silhouettes en contre-jour. **HTML/CSS/JS vanilla, zéro
dépendance runtime, zéro CDN** — polices auto-hébergées, aucune requête tierce au
chargement (RGPD). Hero **fixe** (l'ancienne intro cinématique a été abandonnée).

## Prérequis
- **Node.js ≥ 18.20** (testé avec Node 22)
- npm

## Démarrer

```bash
npm install      # installe Astro
npm run dev      # serveur de dev → http://localhost:4321
npm run build    # build statique → ./dist
npm run preview  # sert le build de ./dist localement
```

`npm run build` produit un dossier `dist/` 100 % statique (17 pages), déployable tel quel.

## Pages

| Route                   | Contenu |
|-------------------------|---------|
| `/`                     | Accueil — hero fixe + teasers (carte, histoire, infos) |
| `/carte/`               | Nos cocktails — coverflow interactif + liste filtrable (Tous/Classiques/Signatures) |
| `/carte/<slug>/`        | Fiche cocktail (6 pages, une par cocktail) |
| `/reservation/`         | Réservation **par téléphone uniquement** (aucun formulaire) |
| `/contact/`             | Contact + accès — coordonnées + plan stylisé + itinéraire |
| `/le-bar/`              | Le bar / Notre histoire |
| `/galerie/`             | Galerie d'ambiance (visuels = placeholders à remplacer) |
| `/evenements/`          | Événements — **exemples illustratifs**, aucune date réelle |
| `/dress-code/`          | Dress code |
| `/mentions-legales/`    | Mentions légales |
| `/confidentialite/`     | Politique de confidentialité |
| `/404`                  | Page introuvable (thématisée) |
| `/sitemap.xml`          | Sitemap généré au build · `/robots.txt` |

## Structure

```
public/                  assets servis tels quels
  assets/                décors (decor-*.png) + cocktails (cocktail-*.png)
  fonts/                 Silkscreen + VT323 en woff2 (self-hosted)
  favicon.svg · og-image.png · robots.txt
src/
  styles/global.css      variables (palette/or), reset, @font-face, keyframes, utilitaires chrome
  data/
    site.ts              SOURCE UNIQUE des infos (adresse, tél, horaires, itinéraire…)
    nav.ts               liens de navigation (Header / Menu / Footer)
    cocktails.ts         les 6 cocktails (slug, catégorie, ingrédients, prix, description)
  lib/coverflow.ts       maths du coverflow (partagées serveur + client)
  scripts/site.ts        menu plein écran (focus-trap/Esc), parallaxe, smooth-scroll
  layouts/BaseLayout.astro  <head> SEO/OG par page + chrome partagé + JSON-LD
  components/            Header, MenuOverlay, Footer, Hero, Coverflow, CocktailList,
                         CocktailVisual + GlassArt (verres SVG), InfosPanels, MapBlock,
                         PageHeader, AmbianceBand, Logo
  pages/                 une route .astro par page (+ carte/[slug].astro, sitemap.xml.ts)
astro.config.mjs         site + base optionnel, output static
```

## À compléter avant mise en ligne
- **Domaine** : `site` dans `astro.config.mjs` (sert Open Graph, URL canonique, sitemap, robots.txt).
- **Email** : non fourni. Renseigner `email` dans `src/data/site.ts` → les liens `mailto:`
  s'activent automatiquement (footer, contact). Tant qu'il vaut `null`, seul le téléphone est affiché.
- **Mentions légales** : remplir les champs marqués `[à compléter]` dans
  `src/pages/mentions-legales.astro` (forme juridique, SIRET, directeur de publication, hébergeur retenu).
- **Photos réelles** : remplacer les *placeholders* de `/galerie/` et `/dress-code/`
  (emplacements nommés) par les vraies photos du bar.
- **Verres des cocktails** : par défaut, des verres **SVG « collection »** (composant
  `GlassArt`, nets à toute taille). Pour utiliser de vrais visuels, déposer un PNG transparent
  nommé `public/assets/cocktail-<slug>.png` (ex. `cocktail-old-fashioned.png`) : `CocktailVisual`
  le détecte au build et l'affiche automatiquement à la place du SVG (rendu pixel net).
- **Événements** : remplacer les exemples par la vraie programmation (actuellement marqués « Exemple »).

## Personnalisation rapide
- **Infos pratiques** : tout est centralisé dans `src/data/site.ts` (adresse, téléphone,
  horaires, lien itinéraire…). Un seul endroit à éditer.
- **Cocktails** : `src/data/cocktails.ts` (nom, ingrédients, prix, catégorie, description, image).
- **Vrai logo** : déposer un fichier dans `public/` (ex. `public/logo.svg`) puis passer
  `src="/logo.svg"` au composant `Logo`. Sinon le SVG chapeau melon est utilisé par défaut.
- **Image de partage** : remplacer `public/og-image.png` (idéal 1200×630).

## Accessibilité & RGPD
- **Mobile-first**, responsive (vérifié à 360 / 768 / 1280).
- `prefers-reduced-motion` : hero figé, menu sans animation, parallaxe/animations désactivées.
- **Menu plein écran accessible** : dialog, focus-trap, fermeture Esc, retour de focus, scroll-lock.
- Skip-link, focus-visible, cibles tactiles ≥ 44 px, `alt` sur les images de contenu.
- **Aucune requête tierce au chargement** : polices locales, pas de Google Fonts/Analytics,
  **pas d'embed Google Maps** (plan stylisé maison ; l'itinéraire n'ouvre Maps qu'au clic).

## Déploiement

### GitLab Pages
Le fichier [`.gitlab-ci.yml`](.gitlab-ci.yml) build et publie `dist/` dans `public/`.

> **Site de projet** sous sous-chemin (`https://user.gitlab.io/le-shelby/`) ? Décommente et adapte
> `base` dans `astro.config.mjs` (`base: '/le-shelby'`) avant de builder. Domaine racine → laisse `base` commenté.

### Vercel
Aucune config : Vercel détecte Astro. Build `npm run build`, output `dist`.

Tout autre hébergeur statique (Netlify, Cloudflare Pages, S3, nginx…) : publie le contenu de `dist/`.

## Crédits
Direction artistique : planche « Le Shelby » (esprit Prohibition / Peaky Blinders).
Polices : [Silkscreen](https://fonts.google.com/specimen/Silkscreen) et
[VT323](https://fonts.google.com/specimen/VT323) (SIL OFL), embarquées localement.
À consommer avec modération.
