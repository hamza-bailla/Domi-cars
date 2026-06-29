/* ============================================================
   MEDNASS CAR — Accueil (parc + filtres)
   ============================================================ */
(() => {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const WA = '212661731841';
  const waUrl = (txt) => `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;

  const ICON = {
    seats: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="7" r="3"/><path d="M3 21a6 6 0 0 1 12 0M16 11a3 3 0 0 0 0-6M21 21a6 6 0 0 0-5-5.9"/></svg>',
    fuel:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="10" height="18" rx="1.5"/><path d="M13 8h3a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8l-3-3"/></svg>',
    trans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="6" r="1.8"/><circle cx="6" cy="18" r="1.8"/><circle cx="18" cy="6" r="1.8"/><path d="M6 8v8M18 8v4a3 3 0 0 1-3 3H6"/></svg>'
  };

  const catBadge = (c) => ({eco:'Berline',citadine:'Citadine',berline:'Berline',suv:'SUV',luxe:'Premium'}[c.cat] || 'Voiture');
  const transShort = (t) => t === 'Automatique' ? 'Auto.' : 'Manu.';
  const fmt = (n) => n.toLocaleString('fr-FR');

  /* ---------- render fleet ---------- */
  const fleetEl = $('#fleet');

  function cardHTML(c){
    const t = tiers(c.day);
    return `
    <article class="vcard reveal" data-cat="${c.cat}">
      <div class="vcard-media">
        ${c.featured ? '<span class="badge badge-pop"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.8.6-5.1 4.5 1.5 6.7L12 17l-6 3.6 1.5-6.7L2.3 8.9l6.8-.6z"/></svg>Populaire</span>' : ''}
        <span class="badge badge-cat">${catBadge(c)}</span>
        <span class="badge badge-model">Modèle ${c.year}${c.year >= 2025 ? ' et +' : ''}</span>
        <img src="${img(c.img[0])}" alt="${c.name}" loading="lazy" />
      </div>
      <div class="vcard-body">
        <h3>${c.name}</h3>
        <div class="vcard-sub">${c.catLabel}</div>
        <div class="vcard-specs">
          <span>${ICON.seats}${c.seats} places</span>
          <span>${ICON.fuel}${c.fuel}</span>
          <span>${ICON.trans}${transShort(c.trans)}</span>
        </div>
        <div class="vcard-price">
          <span class="lbl">À partir de</span>
          <span class="val">${fmt(t.jour)} MAD</span>
          <span class="per">/jour</span>
        </div>
        <div class="vcard-actions">
          <a class="btn btn-green" href="${waUrl('Bonjour MEDNASS CAR, je suis intéressé(e) par la ' + c.name + ' (' + t.jour + ' MAD/jour). Est-elle disponible ?')}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.06 24l1.69-6.16a11.86 11.86 0 1 1 4.43 4.34L.06 24zM6.6 20.2l.37.22a9.86 9.86 0 1 0-3.34-3.26l.24.38-1 3.65 3.73-.99z"/></svg>
            WhatsApp
          </a>
          <a class="btn btn-navy" href="voiture.html?car=${c.id}">Détails</a>
        </div>
      </div>
    </article>`;
  }

  function renderFleet(filter = 'all'){
    const list = FLEET.filter(c => filter === 'all' || c.cat === filter);
    fleetEl.innerHTML = list.map(cardHTML).join('');
    observeReveals();
  }
  renderFleet();

  $$('#filters .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('#filters .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderFleet(chip.dataset.f);
    });
  });

  /* ---------- whatsapp links ---------- */
  const waGeneric = waUrl('Bonjour MEDNASS CAR, je souhaite des informations sur la location d\'une voiture.');
  ['#waFloat', '#footWa', '#ctaWa'].forEach(sel => { const el = $(sel); if (el) el.href = waGeneric; });

  /* ---------- header chrome ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  const burger = $('#burger'), navlinks = $('#navlinks');
  if (burger) burger.addEventListener('click', () => navlinks.classList.toggle('open'));
  if (navlinks) navlinks.addEventListener('click', e => { if (e.target.closest('a')) navlinks.classList.remove('open'); });

  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- reveals ---------- */
  let io;
  function observeReveals(){
    if(!('IntersectionObserver' in window)){ $$('.reveal').forEach(el => el.classList.add('in')); return; }
    if(!io){
      io = new IntersectionObserver(entries => {
        entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
      }, {threshold:.1, rootMargin:'0px 0px -40px 0px'});
    }
    $$('.reveal:not(.in)').forEach(el => io.observe(el));
  }
  observeReveals();
  setTimeout(() => $$('.reveal:not(.in)').forEach(el => el.classList.add('in')), 1500);
})();
