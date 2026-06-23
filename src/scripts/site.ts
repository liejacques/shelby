/**
 * Comportements partagés du site (vanilla, zéro dépendance) — chargé une fois
 * via BaseLayout, donc présent sur toutes les pages :
 *   1. Menu plein écran (burger) : ouverture/fermeture, focus-trap, Esc,
 *      verrouillage du scroll, retour de focus → accessible.
 *   2. Parallaxe des fonds `.bg-parallax` (transform only, off si reduced-motion).
 *   3. Smooth-scroll des ancres internes `a[data-scroll]`.
 * Le coverflow reste page-local (carte/index.astro).
 */

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================== MENU PLEIN ÉCRAN ============================ */
function initMenu(): void {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('site-menu');
  if (!toggle || !menu) return;
  const closeBtn = document.getElementById('menu-close');

  const focusableSel =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocused: HTMLElement | null = null;

  // arrière-plan à neutraliser quand le menu est ouvert : `inert` retire ces
  // zones de l'ordre de tabulation ET de l'arbre d'accessibilité → vrai modal,
  // même si le piège à focus JS est contourné (lecteur d'écran, etc.).
  const background = [
    document.querySelector<HTMLElement>('.site-header'),
    document.getElementById('main'),
    document.querySelector<HTMLElement>('.footer'),
  ].filter((el): el is HTMLElement => !!el);

  const setOpen = (open: boolean) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.classList.toggle('menu-open', open);
    // neutralise/réactive l'arrière-plan (retirer `inert` AVANT de rendre le focus)
    for (const el of background) {
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    }

    if (open) {
      lastFocused = document.activeElement as HTMLElement;
      // focus le bouton fermer (ou le 1er focusable) une fois la transition lancée
      const first =
        closeBtn ?? menu.querySelector<HTMLElement>(focusableSel);
      window.setTimeout(() => first?.focus(), reduced ? 0 : 60);
    } else {
      lastFocused?.focus?.();
    }
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  closeBtn?.addEventListener('click', () => setOpen(false));

  // fermer en cliquant un lien du menu
  menu.querySelectorAll('a[href]').forEach((a) =>
    a.addEventListener('click', () => setOpen(false))
  );

  // clavier : Esc ferme, Tab piégé dans le menu
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === 'Tab') {
      const items = Array.from(
        menu.querySelectorAll<HTMLElement>(focusableSel)
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement;
      // si le focus a quitté le dialogue (race à l'ouverture, focus programmatique)
      // on le ramène à l'intérieur
      if (!menu.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ================================= PARALLAXE =============================== */
function initParallax(): void {
  if (reduced) return;
  const layers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-parallax]')
  );
  if (!layers.length) return;

  let ticking = false;
  const apply = () => {
    const y = window.scrollY || 0;
    for (const el of layers) {
      const mode = el.dataset.parallax;
      const speed = parseFloat(el.dataset.speed || '0');
      const scale = parseFloat(el.dataset.scale || '1');
      let offset: number;
      if (mode === 'scroll') {
        offset = y * speed;
      } else {
        const parent = el.parentElement;
        const top = parent ? parent.getBoundingClientRect().top : 0;
        offset = top * speed;
      }
      el.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
    }
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  apply();
}

/* ============================ SMOOTH-SCROLL ANCRES ========================= */
function initSmoothScroll(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a[data-scroll]')
  );
  for (const link of links) {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || !id.startsWith('#')) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    });
  }
}

initMenu();
initParallax();
initSmoothScroll();
