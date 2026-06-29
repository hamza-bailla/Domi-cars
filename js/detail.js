/* ============================================================
   MEDNASS CAR — Page détail voiture (?car=id)
   ============================================================ */
(() => {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (n) => n.toLocaleString('fr-FR');
  const WA = '212661731841';
  const waUrl = (txt) => `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;

  const SVG = {
    seats: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="7" r="3"/><path d="M3 21a6 6 0 0 1 12 0M16 11a3 3 0 0 0 0-6M21 21a6 6 0 0 0-5-5.9"/></svg>',
    fuel:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="10" height="18" rx="1.5"/><path d="M13 8h3a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8l-3-3"/></svg>',
    trans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="6" r="1.8"/><circle cx="6" cy="18" r="1.8"/><circle cx="18" cy="6" r="1.8"/><path d="M6 8v8M18 8v4a3 3 0 0 1-3 3H6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>',
    age:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    card:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    wa:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.06 24l1.69-6.16a11.86 11.86 0 1 1 4.43 4.34L.06 24zM6.6 20.2l.37.22a9.86 9.86 0 1 0-3.34-3.26l.24.38-1 3.65 3.73-.99z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z"/></svg>',
    pin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    cal:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>',
    mail:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
    user:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    send:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    desc:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M8 6h12M8 12h12M8 18h12M4 6h0M4 12h0M4 18h0"/></svg>',
    gear:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2.2-1.3L14 2h-4l-.3 2.1a7 7 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.3l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2.2 1.3L10 22h4l.3-2.1a7 7 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.3z"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/></svg>'
  };

  /* ---------- select car ---------- */
  const params = new URLSearchParams(location.search);
  const id = params.get('car');
  const car = FLEET.find(c => c.id === id) || FLEET[0];
  const t = tiers(car.day);
  const brand = car.name.split(' ')[0];
  document.title = `${car.name} — Location à ${VILLE} | MEDNASS CAR`;

  /* ============================================================
     LEFT COLUMN
     ============================================================ */
  const specBox = (icon, val) => `<div class="d-spec">${SVG[icon]}<div class="v">${val}</div></div>`;
  const thumbs = car.img.map((f, i) =>
    `<button class="${i === 0 ? 'active' : ''}" data-src="${img(f)}"><img src="${img(f)}" alt=""></button>`).join('');

  $('#detailMain').innerHTML = `
    <div class="panel reveal">
      <div class="d-breadcrumb">${brand} · ${car.name.replace(brand, '').trim() || car.name} · ${car.year}</div>
      <h1 class="d-title">Location ${car.name} à ${VILLE}</h1>
      <p class="d-meta">Location à ${VILLE} · ${t.jour} MAD/jour · Livraison gratuite · Assurance incluse</p>
      <div class="d-stars"><span class="stars">★★★★★</span><span>(Excellent)</span></div>
      <div class="d-price"><span class="lbl">À partir de</span><span class="val">${fmt(t.jour)} MAD</span><span class="per">/jour</span></div>
      <div class="d-subprice">${fmt(t.semaine)} MAD/semaine · ${fmt(t.mois)} MAD/mois</div>
      <div class="d-specs">
        ${specBox('seats', car.seats + ' places')}
        ${specBox('fuel', car.fuel)}
        ${specBox('trans', car.trans)}
      </div>
    </div>

    <div class="d-img-card reveal">
      <div class="d-img-badges">
        <span class="badge badge-ok">Disponible</span>
        <span class="badge badge-cat">${car.catLabel}</span>
      </div>
      <img id="dHero" src="${img(car.img[0])}" alt="${car.name}" />
      ${car.img.length > 1 ? `<div class="d-thumbs" id="dThumbs">${thumbs}</div>` : ''}
    </div>

    <div class="panel reveal">
      <h3 class="block-title">${SVG.desc} Description</h3>
      <p style="color:var(--text)">${car.desc}</p>
      <h3 class="block-title" style="margin-top:1.8rem">${SVG.gear} Équipements inclus</h3>
      <ul class="equip">
        ${equipements(car).map(e => `<li>${SVG.check} ${e}</li>`).join('')}
      </ul>
    </div>

    <div class="panel reveal">
      <h3 class="block-title">${SVG.age} Conditions de location</h3>
      <div class="cond-list" style="margin-bottom:.5rem">
        <div class="cond"><span class="ci">${SVG.age}</span><div><h4>Âge minimum 21 ans</h4><p>Au moins 21 ans révolus.</p></div></div>
        <div class="cond"><span class="ci">${SVG.card}</span><div><h4>Permis valide (2 ans)</h4><p>Permis depuis au moins 2 ans.</p></div></div>
        <div class="cond"><span class="ci">${SVG.clock}</span><div><h4>Durée minimum 3 jours</h4><p>Location de 3 jours minimum.</p></div></div>
      </div>
      <h3 class="block-title" style="margin-top:1.8rem">${SVG.shield} Nos garanties</h3>
      <div class="gcards" style="grid-template-columns:1fr 1fr">
        <div class="gcard"><span class="gi g1">${SVG.shield}</span><h4>Sans caution élevée</h4><p>Aucune mauvaise surprise.</p></div>
        <div class="gcard"><span class="gi g2">${SVG.card}</span><h4>Paiement à la livraison</h4><p>Payez à votre arrivée.</p></div>
        <div class="gcard"><span class="gi g3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 5v4h4"/></svg></span><h4>Annulation gratuite</h4><p>Jusqu'à 24h avant.</p></div>
        <div class="gcard"><span class="gi g4">${SVG.clock}</span><h4>Support rapide</h4><p>Réponse en moins de 5 min.</p></div>
      </div>
      <div class="detail-bottom-cta">
        <a class="btn btn-green btn-lg" target="_blank" rel="noopener" href="${waUrl('Bonjour MEDNASS CAR, je souhaite réserver la ' + car.name + ' (' + t.jour + ' MAD/jour).')}">${SVG.wa} Réserver via WhatsApp</a>
        <a class="btn btn-navy btn-lg" href="tel:+${WA}">${SVG.phone} Appeler</a>
      </div>
    </div>`;

  /* ============================================================
     RIGHT COLUMN — reservation form
     ============================================================ */
  const locOpts = ['Mohammedia','Casablanca','Aéroport Mohammed V','Rabat']
    .map(v => `<option${v===VILLE?' selected':''}>${v}</option>`).join('');

  $('#detailAside').innerHTML = `
    <div class="resa-card reveal" id="reserver">
      <div class="resa-head">
        <div class="rh-top">Réservation en ligne</div>
        <div class="rh-name">${car.name}</div>
        <div class="rh-price">À partir de <b>${fmt(t.jour)} MAD</b> /jour</div>
      </div>
      <div class="resa-body">
        <form id="resaForm" novalidate>
          <div class="form-label-sec">Réservation</div>
          <div class="frow">
            <div class="field"><label>Date de départ <span class="req">*</span></label>
              <div class="input-wrap"><span class="lead-ic">${SVG.cal}</span><input type="date" id="dDep" required></div></div>
            <div class="field"><label>Date de retour <span class="req">*</span></label>
              <div class="input-wrap"><span class="lead-ic">${SVG.cal}</span><input type="date" id="dRet" required></div></div>
          </div>
          <div class="frow">
            <div class="field"><label>Prise en charge</label>
              <div class="input-wrap"><span class="lead-ic">${SVG.pin}</span><select id="pickup">${locOpts}</select></div></div>
            <div class="field"><label>Restitution</label>
              <div class="input-wrap"><span class="lead-ic">${SVG.pin}</span><select id="dropoff">${locOpts}</select></div></div>
          </div>

          <div class="form-label-sec">Informations personnelles</div>
          <div class="field full"><label>Nom complet <span class="req">*</span></label>
            <div class="input-wrap"><span class="lead-ic">${SVG.user}</span><input type="text" id="fullname" placeholder="Nom et prénom" required></div></div>
          <div class="field full"><label>Email <span class="req">*</span></label>
            <div class="input-wrap"><span class="lead-ic">${SVG.mail}</span><input type="email" id="email" placeholder="votre@email.com" required></div></div>
          <div class="frow">
            <div class="field"><label>Pays <span class="req">*</span></label>
              <div class="input-wrap"><span class="lead-ic">${SVG.globe}</span><select id="country"><option>Maroc</option><option>France</option><option>Belgique</option><option>Espagne</option><option>Autre</option></select></div></div>
            <div class="field phone-field"><label>Téléphone <span class="req">*</span></label>
              <div class="input-wrap"><span class="phone-pre">${SVG.phone} +212</span><input type="tel" id="phone" placeholder="6 12 34 56 78" required></div></div>
          </div>
          <div class="field full"><label>Notes (optionnel)</label>
            <textarea id="notes" placeholder="Informations supplémentaires..."></textarea></div>

          <div class="resa-summary">
            <div class="row"><span>Durée</span><span id="sumDur">—</span></div>
            <div class="row"><span>Tarif appliqué</span><span id="sumRate">À partir de ${fmt(t.jour)} MAD</span></div>
            <div class="row total"><span>Total estimé</span><span id="sumTotal">—</span></div>
          </div>

          <button type="submit" class="btn btn-orange btn-lg btn-block">${SVG.send} Envoyer la demande</button>
          <p style="font-size:.78rem;color:var(--muted);text-align:center;margin-top:.8rem">Aucun paiement en ligne — réglez à la livraison.</p>
        </form>
      </div>
    </div>`;

  /* ---------- gallery ---------- */
  const dThumbs = $('#dThumbs');
  if (dThumbs){
    dThumbs.addEventListener('click', e => {
      const b = e.target.closest('button'); if(!b) return;
      $('#dHero').src = b.dataset.src;
      $$('#dThumbs button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  }

  /* ---------- live pricing ---------- */
  const dDep = $('#dDep'), dRet = $('#dRet');
  const today = new Date().toISOString().split('T')[0];
  dDep.min = today; dRet.min = today;
  dDep.addEventListener('change', () => {
    dRet.min = dDep.value || today;
    if (dRet.value && dRet.value < dDep.value) dRet.value = dDep.value;
    updateSummary();
  });
  dRet.addEventListener('change', updateSummary);

  function days(){
    if(!dDep.value || !dRet.value) return 0;
    return Math.max(0, Math.round((new Date(dRet.value) - new Date(dDep.value)) / 86400000));
  }

  function quote(d){
    if (d >= 30) return { rate: t.mois / 30,  label: 'Tarif mensuel',       total: Math.round(t.mois / 30 * d) };
    if (d >= 7)  return { rate: t.semaine / 7, label: 'Tarif hebdomadaire',  total: Math.round(t.semaine / 7 * d) };
    return { rate: t.jour, label: 'Tarif journalier', total: t.jour * d };
  }

  function updateSummary(){
    const d = days();
    if (d === 0){
      $('#sumDur').textContent = '—';
      $('#sumRate').textContent = `À partir de ${fmt(t.jour)} MAD`;
      $('#sumTotal').textContent = '—';
      return;
    }
    $('#sumDur').textContent = `${d} jour${d>1?'s':''}`;
    if (d < 3){
      $('#sumRate').textContent = 'Minimum 3 jours';
      $('#sumTotal').textContent = '—';
      return;
    }
    const q = quote(d);
    $('#sumRate').textContent = `${q.label} · ${fmt(Math.round(q.rate))} MAD/j`;
    $('#sumTotal').textContent = `${fmt(q.total)} MAD`;
  }
  updateSummary();

  /* ---------- submit ---------- */
  $('#resaForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#fullname').value.trim();
    const email = $('#email').value.trim();
    const phone = $('#phone').value.trim();
    const d = days();
    if(!name || !email || !phone) return toast('Champs manquants', 'Renseignez nom, email et téléphone.');
    if(!dDep.value || !dRet.value) return toast('Dates manquantes', 'Choisissez vos dates de location.');
    if(d < 3) return toast('Durée trop courte', 'La durée minimum est de 3 jours.');
    const q = quote(d);
    toast('Demande envoyée !', `${car.name} · ${d} jours · ~${fmt(q.total)} MAD. On vous recontacte sous 5 min.`);
    e.target.reset(); updateSummary();
  });

  /* ---------- toast ---------- */
  function toast(title, msg){
    const el = $('#toast');
    $('#toastTitle').textContent = title;
    $('#toastMsg').textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 5000);
  }

  /* ---------- chrome ---------- */
  const waGeneric = waUrl('Bonjour MEDNASS CAR, je souhaite des informations.');
  ['#waFloat', '#footWa'].forEach(s => { const el = $(s); if(el) el.href = waGeneric; });

  const header = $('#header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  const burger = $('#burger'), navlinks = $('#navlinks');
  if (burger) burger.addEventListener('click', () => navlinks.classList.toggle('open'));
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- reveals ---------- */
  const els = $$('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver(en => en.forEach(x => { if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target);} }), {threshold:.08});
    els.forEach(el => io.observe(el));
  }
  setTimeout(() => els.forEach(el => el.classList.add('in')), 1400);
})();
