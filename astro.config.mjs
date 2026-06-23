// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // ⚠️ À PERSONNALISER avant déploiement :
  // `site` = URL absolue finale du site. Sert aux balises Open Graph (image absolue)
  // et au sitemap. Remplace-la par le vrai domaine du Shelby.
  site: 'https://leshelby-colmar.fr',

  // Si tu déploies sur GitLab Pages dans un *projet* (URL en sous-chemin du type
  // https://user.gitlab.io/le-shelby/), décommente et adapte `base`.
  // Sur Vercel ou un domaine racine, laisse `base` commenté.
  // base: '/le-shelby',

  // Build 100 % statique (aucune dépendance runtime, déployable n'importe où).
  output: 'static',

  // Pas d'inlining auto : on garde un fichier JS/CSS propre et cacheable.
  build: {
    inlineStylesheets: 'auto',
  },

  // On gère nous-mêmes la compression d'images en amont ; pas de service d'image.
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
});
