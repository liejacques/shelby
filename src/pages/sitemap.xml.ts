/**
 * Sitemap généré au build (statique) — toujours synchrone avec les routes et les
 * cocktails (aucune dépendance externe). Utilise `site` d'astro.config.mjs ;
 * pensez à y mettre le vrai domaine avant déploiement.
 */
import type { APIRoute } from 'astro';
import { cocktails } from '../data/cocktails';

const staticPaths = [
  '/',
  '/carte/',
  '/reservation/',
  '/contact/',
  '/le-bar/',
  '/galerie/',
  '/evenements/',
  '/dress-code/',
  '/mentions-legales/',
  '/confidentialite/',
];

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://leshelby-colmar.fr')).href.replace(/\/$/, '');
  const urls = [...staticPaths, ...cocktails.map((c) => `/carte/${c.slug}/`)];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
