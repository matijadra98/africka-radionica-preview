// Afrička Radionica mockup: header, menu, reveal, product page, forms (no sending yet).
(function () {
  var hdr = document.querySelector('.hdr');
  function onScroll() { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('meni');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      hdr.classList.toggle('menu-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { btn.click(); btn.focus(); }
    });
  }

  // Reveal on scroll
  var els = Array.prototype.slice.call(document.querySelectorAll('.rv, .rv-img'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }


  // Dropdown "Više" in the category bar
  var mb = document.querySelector('.more-btn');
  if (mb) {
    mb.addEventListener('click', function () {
      var o = mb.getAttribute('aria-expanded') === 'true';
      mb.setAttribute('aria-expanded', String(!o));
      mb.parentElement.classList.toggle('open', !o);
    });
    document.addEventListener('click', function (e) {
      if (!mb.parentElement.contains(e.target)) { mb.setAttribute('aria-expanded', 'false'); mb.parentElement.classList.remove('open'); }
    });
  }

  // Nazivi atributa iz Odoo-a sa kvačicama, samo za prikaz
  var lepo = function (g) { return ({ 'Duzina': 'Dužina', 'Duzina kombinezona': 'Dužina kombinezona', 'Duzina haljine': 'Dužina haljine', 'Duzina pantalona': 'Dužina pantalona', 'Duzina suknje': 'Dužina suknje', 'Duzina jakne': 'Dužina jakne', 'Duzina kosulje': 'Dužina košulje', 'Duzina mantila': 'Dužina mantila', 'Duzina rukava': 'Dužina rukava', 'Veličina obuce': 'Veličina obuće', 'Gramaza': 'Gramaža', 'Size': 'Veličina' })[g] || g; };

  // Category page: render from js/katalog.js by ?k=
  var grid = document.getElementById('k-grid');
  var params = new URLSearchParams(location.search);
  var cur = params.get('k');
  if (cur) {
    Array.prototype.forEach.call(document.querySelectorAll('.cats a'), function (a) {
      if (a.getAttribute('href') === 'kategorija.html?k=' + cur) {
        a.setAttribute('aria-current', 'page');
        var more = a.closest('.more'); if (more) more.querySelector('.more-btn').classList.add('has-current');
      }
    });
  }
  if (grid && window.KAT && window.PROIZVODI) {
    var kat = window.KAT.filter(function (x) { return x.k === cur; })[0];
    var base = kat ? window.PROIZVODI.filter(function (p) { return p.k.indexOf(kat.k) > -1; }) : window.PROIZVODI.slice();
    // Pretraga (?q=): po nazivu, modelu i kategoriji, bez obzira na kvačice
    var q = (params.get('q') || '').trim();
    var bez = function (t) { return String(t).toLowerCase().replace(/đ/g, 'dj').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); };
    if (q && !kat) {
      var reci = bez(q).split(/\s+/).map(function (w) { return w.length > 4 ? w.replace(/(e|a|i|u|o)$/, '') : w; });
      base = window.PROIZVODI.filter(function (p) {
        var t = bez(p.n + ' ' + (p.md || '') + ' ' + p.k.map(function (k) { var c = window.KAT.filter(function (x) { return x.k === k; })[0]; return c ? c.n : ''; }).join(' '));
        return reci.every(function (w) { return t.indexOf(w) > -1; });
      });
      Array.prototype.forEach.call(document.querySelectorAll('.srch input'), function (i) { i.value = q; });
    }
    if (kat) {
      document.getElementById('k-naslov').textContent = kat.n;
      document.getElementById('k-opis').textContent = kat.o;
      document.querySelector('#k-crumbs span').textContent = kat.n;
      document.title = kat.n + ' | Afrička Radionica';
    } else {
      document.getElementById('k-naslov').textContent = q ? 'Pretraga: „' + q + '“' : 'Svi proizvodi';
      document.querySelector('#k-crumbs span').textContent = q ? 'Pretraga' : 'Svi proizvodi';
      if (q) { document.getElementById('k-opis').textContent = base.length ? 'Pronađeno: ' + base.length + '. Ako ne vidite ono što tražite, pišite nam preko kontakt stranice.' : 'Nismo našli proizvod za „' + q + '“. Probajte drugu reč, npr. haljina, suknja ili japanke.'; document.title = 'Pretraga | Afrička Radionica'; }
    }
    var chips = document.getElementById('k-chips');
    var grp = (kat && /^haljine/.test(kat.k)) ? ['haljine-pamucne', 'haljine-lanene', 'haljine-svilene']
            : (kat && /^pantalone/.test(kat.k)) ? ['pantalone-lanene', 'pantalone-pamucne', 'pantalone-svilene'] : null;
    if (grp) {
      chips.innerHTML = grp.map(function (k) {
        var n = window.KAT.filter(function (x) { return x.k === k; })[0].n;
        return '<a href="kategorija.html?k=' + k + '"' + (k === cur ? ' class="on" aria-current="page"' : '') + '>' + n + '</a>';
      }).join('');
    } else { chips.hidden = true; }

    var num = function (c) { return parseFloat(String(c).replace(/\./g, '').replace(',', '.')); };
    var DOST = [['stanje', 'Na stanju, isporuka 2–3 dana'], ['porudzbina', 'Po porudžbini, oko 3 nedelje']];
    var ATR = window.ATR || [];
    var atrBox = document.getElementById('fg-atr');
    // Samo filteri koje ta kategorija ima (kao na sadašnjem sajtu); bez kategorije svi
    var vis = function (x) { return !(kat && kat.f) || kat.f.indexOf(x.g) > -1; };
    // Glavni filter veličine (uvek vidljiv, kao dugmad): Veličina, inače Veličina obuce, inače Size
    var velBox = document.getElementById('fg-vel'), pv = -1;
    ['Veličina', 'Veličina obuce', 'Size'].some(function (n) {
      var i = ATR.map(function (x) { return x.g; }).indexOf(n);
      if (i > -1 && vis(ATR[i]) && base.some(function (p) { return p.a && p.a[n] && p.a[n].length; })) { pv = i; return true; }
      return false;
    });
    if (pv > -1) velBox.querySelector('legend').textContent = lepo(ATR[pv].g);
    else velBox.hidden = true;
    atrBox.innerHTML = ATR.map(function (x, i) {
      return (vis(x) && i !== pv) ? '<details class="fg fgd"><summary>' + lepo(x.g) + '</summary><div class="fg-list" data-name="a' + i + '"></div></details>' : '';
    }).join('');
    var models = kat && kat.m && kat.m.length ? kat.m : [];
    if (!models.length) document.getElementById('fg-model').hidden = true;
    var groups = {
      md: models.map(function (m) { return [m, m, function (p) { return p.md === m; }]; }),
      d: DOST.map(function (x) { return [x[0], x[1], function (p) { return p.d === x[0]; }]; })
    };
    var lists = { md: document.querySelector('#fg-model .fg-list'), d: document.querySelector('[data-name="d"]') };
    ATR.forEach(function (x, i) {
      if (!vis(x)) return;
      groups['a' + i] = x.v.map(function (v) { return [v, v, function (p) { return !!(p.a && p.a[x.g] && p.a[x.g].indexOf(v) > -1); }]; });
      lists['a' + i] = i === pv ? velBox.querySelector('.fg-list') : atrBox.querySelector('[data-name="a' + i + '"]');
    });
    // Atributi: samo vrednosti koje proizvodi u ovoj kategoriji imaju (kao Odoo); grupa bez vrednosti se ne prikazuje
    Object.keys(groups).forEach(function (g) {
      if (g.charAt(0) !== 'a') return;
      groups[g] = groups[g].filter(function (o) { return base.some(o[2]); });
      if (!groups[g].length) { var bx = lists[g].closest('.fgd') || lists[g].closest('fieldset'); if (bx.classList.contains('fgd')) bx.remove(); else bx.hidden = true; delete groups[g]; delete lists[g]; }
    });
    var moreF = document.getElementById('more-f');
    if (moreF && !models.length && !moreF.querySelector('.fgd')) moreF.hidden = true;
    Object.keys(groups).forEach(function (g) {
      lists[g].innerHTML = groups[g].map(function (o, i) {
        var n = base.filter(o[2]).length;
        return '<label class="fo"><input type="checkbox" name="' + g + '" value="' + o[0] + '"><span>' + o[1] + '</span><em>' + n + '</em></label>';
      }).join('');
    });
    if (models.length > 8) {
      var l = lists.md; l.classList.add('clip');
      var b = document.createElement('button'); b.type = 'button'; b.className = 'fg-more'; b.textContent = 'Prikaži sve modele (' + models.length + ')';
      b.addEventListener('click', function () { l.classList.remove('clip'); b.remove(); });
      l.after(b);
    }
    var fform = document.getElementById('f-form'), sortSel = document.getElementById('f-sort');
    function sel(g) { return Array.prototype.map.call(fform.querySelectorAll('input[name="' + g + '"]:checked'), function (i) { return i.value; }); }
    function render() {
      var cmin = parseFloat(document.getElementById('c-min').value), cmax = parseFloat(document.getElementById('c-max').value);
      var list = base.filter(function (p) {
        var v = num(p.c);
        if (!isNaN(cmin) && v < cmin) return false;
        if (!isNaN(cmax) && v > cmax) return false;
        return Object.keys(groups).every(function (g) {
          var s = sel(g); if (!s.length) return true;
          return groups[g].some(function (o) { return s.indexOf(o[0]) > -1 && o[2](p); });
        });
      });
      var so = sortSel.value;
      if (so === 'cena-r') list.sort(function (a, b) { return num(a.c) - num(b.c); });
      if (so === 'cena-o') list.sort(function (a, b) { return num(b.c) - num(a.c); });
      if (so === 'naziv') list.sort(function (a, b) { return a.n.localeCompare(b.n, 'sr'); });
      grid.innerHTML = list.map(function (p) {
        return '<a class="prod" href="proizvod.html?p=' + p.s.replace('p/', '') + '"><div class="ph"><img src="slike/' + p.s + '.webp" alt="' + p.n + '" loading="lazy">' +
          (p.z ? '<em>' + p.z + '</em>' : p.d === 'porudzbina' ? '<em>Po porudžbini</em>' : '') + '</div><h3>' + p.n + '</h3><p>' + (p.c ? p.c + ' din.' : 'Cena na upit') + '</p></a>';
      }).join('');
      document.getElementById('k-prazno').hidden = list.length > 0;
      var active = [];
      Object.keys(groups).forEach(function (g) { sel(g).forEach(function (v) { var o = groups[g].filter(function (x) { return x[0] === v; })[0]; var pre = g.charAt(0) === 'a' ? lepo(ATR[+g.slice(1)].g) + ': ' : ''; active.push([g, v, pre + o[1]]); }); });
      if (!isNaN(cmin) || !isNaN(cmax)) active.push(['cena', '', 'Cena: ' + (isNaN(cmin) ? '0' : cmin) + ' – ' + (isNaN(cmax) ? '55.000' : cmax) + ' din.']);
      document.getElementById('active-f').innerHTML = active.map(function (a) { return '<button type="button" data-g="' + a[0] + '" data-v="' + a[1] + '">' + a[2] + ' <span aria-hidden="true">×</span><span class="sr">ukloni filter</span></button>'; }).join('') + (active.length ? '<button type="button" class="clear">Poništi sve</button>' : '');
      document.getElementById('f-count').textContent = active.length ? '(' + active.length + ')' : '';
      document.getElementById('t-count').textContent = list.length + (list.length === 1 ? ' proizvod' : (list.length % 10 >= 2 && list.length % 10 <= 4 && (list.length % 100 < 12 || list.length % 100 > 14)) ? ' proizvoda' : ' proizvoda');
      document.getElementById('f-show').textContent = 'Prikaži (' + list.length + ')';
    }
    fform.addEventListener('change', render);
    fform.addEventListener('input', function (e) { if (e.target.type === 'number') render(); });
    fform.addEventListener('submit', function (e) { e.preventDefault(); });
    sortSel.addEventListener('change', render);
    document.getElementById('active-f').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.classList.contains('clear')) { fform.reset(); }
      else if (b.dataset.g === 'cena') { document.getElementById('c-min').value = ''; document.getElementById('c-max').value = ''; }
      else { var i = fform.querySelector('input[name="' + b.dataset.g + '"][value="' + b.dataset.v + '"]'); if (i) i.checked = false; }
      render();
    });
    document.getElementById('f-reset').addEventListener('click', function () { fform.reset(); render(); });
    var panel = document.getElementById('filteri'), opener = document.querySelector('.f-open');
    function setPanel(o) { panel.classList.toggle('open', o); opener.setAttribute('aria-expanded', String(o)); document.body.style.overflow = o ? 'hidden' : ''; if (o) panel.querySelector('input, button').focus(); else opener.focus(); }
    opener.addEventListener('click', function () { setPanel(!panel.classList.contains('open')); });
    panel.querySelector('.f-close').addEventListener('click', function () { setPanel(false); });
    document.getElementById('f-show').addEventListener('click', function () { setPanel(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) setPanel(false); });
    render();
  }

  // Product page: ?p=<id> prikazuje taj proizvod iz js/katalog.js (bez parametra ostaje primer)
  var pdp = document.querySelector('.pdp');
  var pid = params.get('p');
  if (pdp && pid && window.PROIZVODI) {
    var P = window.PROIZVODI.filter(function (x) { return x.s === 'p/' + pid; })[0];
    if (P) {
      var esc = function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
      var K0 = window.KAT.filter(function (x) { return x.k === P.k[0]; })[0];
      var img = pdp.querySelector('.pdp-img img');
      img.src = 'slike/' + P.s + '.webp'; img.alt = P.n; img.removeAttribute('width'); img.removeAttribute('height');
      pdp.querySelector('.crumbs').innerHTML = '<a href="kategorija.html?k=' + K0.k + '">' + esc(K0.n) + '</a>' + (P.md ? ' / ' + esc(P.md) : '');
      pdp.querySelector('h1').textContent = P.n;
      pdp.querySelector('.price').textContent = P.c ? P.c + ' din.' : 'Cena na upit';
      var nt = pdp.querySelector('.note');
      if (P.z) nt.textContent = P.z + '.'; else nt.remove();
      document.getElementById('trust').innerHTML = P.d === 'porudzbina'
        ? '<li>Šije se po porudžbini, izrada oko 3 nedelje</li><li>Plaćanje unapred: uplata na račun ili karticom</li><li>Besplatna dostava u Srbiji preko 4.000 din.</li>'
        : '<li>Plaćanje pouzećem, kuriru kad paket stigne</li><li>Na stanju, isporuka 2–3 dana</li><li>Besplatna dostava u Srbiji preko 4.000 din.</li>';
      pdp.dataset.d = P.d; pdp.dataset.id = pid;
      var fs = pdp.querySelector('fieldset'), html = '';
      Object.keys(P.a || {}).forEach(function (g, gi) {
        var lg = lepo(g);
        var tb = (g === 'Veličina' || g === 'Size') ? '<button type="button" class="tab-btn" data-tab>Tabela veličina</button>' : '';
        html += '<fieldset><legend class="leg-row"><span>' + esc(lg) + '</span>' + tb + '</legend><div class="sizes">' + P.a[g].map(function (v) {
          return '<label><input type="radio" name="' + (gi ? 'atr' + gi : 'vel') + '" value="' + esc(v) + '"><span>' + esc(v) + '</span></label>';
        }).join('') + '</div></fieldset>';
      });
      fs.outerHTML = html;
      var op = pdp.querySelector('.acc details p');
      if (P.o) op.textContent = P.o;
      document.title = P.n + ' | Afrička Radionica';
      var rel = window.PROIZVODI.filter(function (x) { return x !== P && x.k.indexOf(P.k[0]) > -1; }).slice(0, 4);
      var sec = document.querySelector('.pdp ~ .sec, .sec');
      if (sec && rel.length) {
        sec.querySelector('h2').textContent = 'Još iz kategorije ' + K0.n;
        var mo = sec.querySelector('a.more'); mo.href = 'kategorija.html?k=' + K0.k; mo.textContent = 'Sve iz kategorije';
        sec.querySelector('.grid').innerHTML = rel.map(function (x) {
          return '<a class="prod" href="proizvod.html?p=' + x.s.replace('p/', '') + '"><div class="ph"><img src="slike/' + x.s + '.webp" alt="' + esc(x.n) + '" loading="lazy"></div><h3>' + esc(x.n) + '</h3><p>' + (x.c ? x.c + ' din.' : 'Cena na upit') + '</p></a>';
        }).join('');
      }
    }
  }

  // Product image zoom
  var pimg = document.querySelector('.pdp-img');
  if (pimg) {
    var im = pimg.querySelector('img');
    pimg.addEventListener('click', function () { pimg.classList.toggle('zoom'); });
    pimg.addEventListener('mousemove', function (e) {
      var r = pimg.getBoundingClientRect();
      im.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
    });
  }
  // Korpa: čuva se u ovom pregledaču (localStorage), bez naloga
  var KEY = 'ar-korpa';
  function readCart() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function saveCart(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} updBag(); }
  function updBag() { var n = readCart().length; Array.prototype.forEach.call(document.querySelectorAll('.bag-n'), function (b) { b.textContent = n; }); var bg = document.querySelector('.bag'); if (bg) bg.setAttribute('aria-label', 'Korpa, ' + n + ' artikala'); }
  updBag();

  // Tabela veličina
  var dlg = document.getElementById('tabela');
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-tab]') && dlg) { dlg.showModal ? dlg.showModal() : dlg.setAttribute('open', ''); }
    if (e.target.closest('.tab-close') && dlg) { dlg.close ? dlg.close() : dlg.removeAttribute('open'); }
  });
  if (dlg) dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  var add = document.getElementById('add');
  if (add) add.addEventListener('click', function () {
    var msg = document.getElementById('added');
    msg.hidden = false;
    var izbor = [], fali = [];
    Array.prototype.forEach.call(document.querySelectorAll('.pdp fieldset'), function (f) {
      var c = f.querySelector('input:checked'), n = f.querySelector('legend span') ? f.querySelector('legend span').textContent : f.querySelector('legend').textContent;
      if (c) izbor.push(n + ': ' + c.value); else fali.push(n.toLowerCase());
    });
    if (fali.length) { msg.textContent = 'Prvo izaberite: ' + fali.join(' i ') + '.'; msg.className = 'added warn'; return; }
    var pd = document.querySelector('.pdp');
    var img = pd.querySelector('.pdp-img img').getAttribute('src');
    var cn = pd.querySelector('.price').textContent;
    var c = readCart();
    c.push({ n: pd.querySelector('h1').textContent, c: cn, img: img, iz: izbor.join(', '), d: pd.dataset.d || 'stanje' });
    saveCart(c);
    msg.className = 'added';
    msg.innerHTML = 'Dodato u korpu. <a href="korpa.html">Idi u korpu i poruči</a>';
  });

  // Stranica Korpa
  var cItems = document.getElementById('c-items');
  if (cItems) {
    var cnum = function (t) { return parseFloat(String(t).replace(/[^\d,]/g, '').replace(',', '.')) || 0; };
    var fmt = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' din.'; };
    var primer = false;
    var drawCart = function () {
      var c = readCart();
      if (!c.length && !primer && window.PROIZVODI) {
        var ex = window.PROIZVODI.filter(function (p) { return p.s === 'p/196414'; })[0] || window.PROIZVODI[0];
        c = [{ n: ex.n, c: ex.c + ' din.', img: 'slike/' + ex.s + '.webp', iz: 'Veličina: S/M', d: ex.d, primer: true }];
        document.getElementById('c-primer').hidden = false;
      } else document.getElementById('c-primer').hidden = true;
      cItems.innerHTML = c.map(function (x, i) {
        return '<li><img src="' + x.img + '" alt=""><div><h3>' + x.n + '</h3><p>' + (x.iz || '') + '</p><p>' + (x.d === 'porudzbina' ? 'Po porudžbini, oko 3 nedelje' : 'Na stanju, 2–3 dana') + '</p><button type="button" class="rm" data-i="' + i + '"' + (x.primer ? ' data-primer="1"' : '') + '>Ukloni</button></div><b>' + x.c + '</b></li>';
      }).join('');
      var sum = c.reduce(function (a, x) { return a + cnum(x.c); }, 0);
      document.getElementById('c-sum').innerHTML = c.length ? '<div><span>Proizvodi</span><span>' + fmt(sum) + '</span></div><div><span>Dostava</span><span>' + (sum >= 4000 ? 'besplatna' : 'po ceni kurirske službe') + '</span></div><div class="tot"><span>Ukupno</span><span>' + fmt(sum) + '</span></div>' : '';
      document.getElementById('c-prazno').hidden = c.length > 0;
      document.getElementById('c-form').hidden = c.length === 0;
      // Pouzeće samo kad je sve na stanju (logika korpe 11.11.2026)
      var svePoStanju = c.every(function (x) { return x.d !== 'porudzbina'; });
      var lp = document.getElementById('pay-pouzece'), ip = lp.querySelector('input');
      ip.disabled = !svePoStanju; lp.classList.toggle('off', !svePoStanju);
      lp.querySelector('small').textContent = svePoStanju ? 'Plaćate kuriru gotovinom kad paket stigne.' : 'Nije moguće: u korpi je komad koji se šije po porudžbini, on se plaća unapred.';
      if (!svePoStanju && ip.checked) ip.checked = false;
    };
    drawCart();
    cItems.addEventListener('click', function (e) {
      var b = e.target.closest('.rm'); if (!b) return;
      if (b.dataset.primer) { primer = true; cItems.innerHTML = ''; document.getElementById('c-primer').hidden = true; document.getElementById('c-sum').innerHTML = ''; document.getElementById('c-prazno').hidden = false; document.getElementById('c-form').hidden = true; return; }
      var c = readCart(); c.splice(+b.dataset.i, 1); saveCart(c); drawCart();
    });
    var cf = document.getElementById('c-form');
    cf.addEventListener('change', function (e) {
      if (e.target.name === 'placanje') {
        document.getElementById('e-c-pay').textContent = '';
        document.getElementById('c-email-opt').textContent = e.target.value === 'kartica' ? '(obavezan za plaćanje karticom)' : '(nije obavezan)';
      }
    });
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      var chk = function (id, msg) {
        var el = document.getElementById(id), er = document.getElementById('e-' + id);
        var bad = msg(el.value.trim());
        er.textContent = bad || ''; el.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad) { ok = false; first = first || el; }
      };
      chk('c-ime', function (v) { return v.length < 3 ? 'Upišite ime i prezime.' : ''; });
      chk('c-tel', function (v) { return v.replace(/\D/g, '').length < 8 ? 'Upišite broj telefona, npr. 064 123 4567.' : ''; });
      chk('c-adr', function (v) { return v.length < 3 ? 'Upišite ulicu i broj.' : ''; });
      chk('c-mesto', function (v) { return v.length < 2 ? 'Upišite mesto.' : ''; });
      chk('c-pb', function (v) { return !/^\d{5}$/.test(v.replace(/\s/g, '')) ? 'Poštanski broj ima 5 cifara, npr. 11000.' : ''; });
      var pay = cf.querySelector('input[name="placanje"]:checked');
      chk('c-email', function (v) { if (pay && pay.value === 'kartica' && !v) return 'Za plaćanje karticom upišite email, na njega šaljemo link.'; return v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Proverite email adresu.' : ''; });
      var ep = document.getElementById('e-c-pay');
      if (!pay) { ep.textContent = 'Izaberite način plaćanja.'; ok = false; first = first || cf.querySelector('input[name="placanje"]:not(:disabled)'); } else ep.textContent = '';
      var st = document.getElementById('c-status');
      st.hidden = false;
      if (!ok) { st.className = 'status bad f-wide'; st.textContent = 'Proverite označena polja.'; if (first) first.focus(); return; }
      st.className = 'status ok f-wide';
      st.textContent = 'Hvala! Ovo je pregled novog sajta, pa porudžbina nije poslata. Na pravom sajtu dobili biste potvrdu porudžbine' + (pay.value === 'pouzece' ? ' i paket plaćate kuriru.' : pay.value === 'racun' ? ' i podatke za uplatu.' : ' i link za plaćanje karticom na email.');
      st.focus();
    });
  }

  // Contact form: validation only
  var form = document.getElementById('kontakt-forma');
  if (!form) return;
  var msgs = { ime: 'Upišite ime i prezime.', email: 'Upišite ispravnu email adresu.', tema: 'Izaberite temu.', poruka: 'Napišite poruku.' };
  try {
    var t = new URLSearchParams(location.search).get('tema');
    if (t && form.tema.querySelector('option[value="' + t + '"]')) form.tema.value = t;
    if (location.hash === '#po-meri') form.tema.value = 'po-meri';
  } catch (e) {}
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = null;
    ['ime', 'email', 'tema', 'poruka'].forEach(function (n) {
      var f = form[n], ok = f.value.trim() !== '' && f.checkValidity();
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      document.getElementById('e-' + n).textContent = ok ? '' : msgs[n];
      if (!ok && !bad) bad = f;
    });
    var st = document.getElementById('status');
    st.hidden = false;
    if (bad) { st.className = 'status bad'; st.textContent = 'Proverite označena polja.'; bad.focus(); return; }
    st.className = 'status ok';
    st.textContent = 'Hvala. Ovo je pregled novog sajta, pa poruka nije poslata. Pišite nam na shop@africkaradionica.com.';
    st.focus();
  });
})();
