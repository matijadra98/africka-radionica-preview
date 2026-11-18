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
    if (kat) {
      document.getElementById('k-naslov').textContent = kat.n;
      document.getElementById('k-opis').textContent = kat.o;
      document.querySelector('#k-crumbs span').textContent = kat.n;
      document.title = kat.n + ' | Afrička Radionica';
    } else {
      document.getElementById('k-naslov').textContent = 'Svi proizvodi';
      document.querySelector('#k-crumbs span').textContent = 'Svi proizvodi';
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
    atrBox.innerHTML = ATR.map(function (x, i) {
      return '<details class="fg fgd"><summary>' + x.g + '</summary><div class="fg-list" data-name="a' + i + '"></div></details>';
    }).join('');
    var models = kat && kat.m && kat.m.length ? kat.m : [];
    if (!models.length) document.getElementById('fg-model').hidden = true;
    var groups = {
      md: models.map(function (m) { return [m, m, function (p) { return p.md === m; }]; }),
      d: DOST.map(function (x) { return [x[0], x[1], function (p) { return p.d === x[0]; }]; })
    };
    var lists = { md: document.querySelector('#fg-model .fg-list'), d: document.querySelector('[data-name="d"]') };
    ATR.forEach(function (x, i) {
      groups['a' + i] = x.v.map(function (v) { return [v, v, function (p) { return !!(p.a && p.a[x.g] && p.a[x.g].indexOf(v) > -1); }]; });
      lists['a' + i] = atrBox.querySelector('[data-name="a' + i + '"]');
    });
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
        return '<a class="prod" href="proizvod.html"><div class="ph"><img src="slike/' + p.s + '.webp" alt="' + p.n + '" loading="lazy">' +
          (p.z ? '<em>' + p.z + '</em>' : p.d === 'porudzbina' ? '<em>Po porudžbini</em>' : '') + '</div><h3>' + p.n + '</h3><p>' + p.c + ' din.</p></a>';
      }).join('');
      document.getElementById('k-prazno').hidden = list.length > 0;
      var active = [];
      Object.keys(groups).forEach(function (g) { sel(g).forEach(function (v) { var o = groups[g].filter(function (x) { return x[0] === v; })[0]; var pre = g.charAt(0) === 'a' ? ATR[+g.slice(1)].g + ': ' : ''; active.push([g, v, pre + o[1]]); }); });
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
  var add = document.getElementById('add');
  if (add) add.addEventListener('click', function () {
    var msg = document.getElementById('added');
    var size = document.querySelector('input[name="vel"]:checked');
    msg.hidden = false;
    msg.textContent = size ? 'Pregled: veličina ' + size.value + ' bi bila dodata u korpu. Kupovina radi na pravom sajtu.' : 'Izaberite veličinu.';
  });

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
