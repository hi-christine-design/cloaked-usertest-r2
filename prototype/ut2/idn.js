/* Identity onboarding V2 (Christine, 23 Oct · Figma 9923:147149). Loaded by ut2.js with &ut2vonb=n3
   (the launcher's Onboarding · V2), after Yuan's v3id bundle. The cover tray and page 1 ("One you…")
   stay; the three scenes (work / dating / trip) give way to one page: "Have combined activities within
   Identity" — an activity panel whose tabs step Call → Messages → Mailbox → Login → Transaction on a loop.
   (The inbox idea is already told by the Vault onboarding, so this page is only the combined activity.)
   Round 59 · V3 (&ut2vonb=n4, Christine's reference video): the same page, but no tabs — calls, messages,
   mail and charges as one feed of cards drifting down without end, blurring out at the bottom. */
(function () {
  var page = document.getElementById('iiIntro'), scroller = document.getElementById('iiScroll'), s1 = document.getElementById('iiS1');
  if (!page || !scroller || !s1 || document.getElementById('iiN')) return;
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* round 69 (Christine): the cover tray says one line, like the Vault's */
  (function () {
    var tr = document.querySelector('#icIntroTray .vti-tray'); if (!tr) return;
    var h = tr.querySelector('.vti-h1'); if (h) h.textContent = 'One you, many identities';
    tr.setAttribute('aria-label', 'One you, many identities');
  })();

  /* the three scenes step aside (kept in the DOM for V1) */
  ['iiS2', 'iiS3', 'iiS4'].forEach(function (id) {
    var s = document.getElementById(id); if (!s) return;
    s.style.display = 'none'; s.removeAttribute('data-play'); s.setAttribute('aria-hidden', 'true');
  });

  /* avatars (project assets; Figma's own exports could not be fetched here) */
  var LYFT = 'assets/logo/Lyft.svg', DELTA = 'assets/logo/Delta.png', UNKNOWN = 'assets/Avatar/avatar-inbox/unknown.svg';
  function ini(c) { return '<span class="idn-av ini">' + c + '</span>'; }
  function img(src, cls) { return '<span class="idn-av' + (cls ? ' ' + cls : '') + '"><img src="' + src + '" alt=""></span>'; }
  var IN = '<img class="idn-in" src="assets/icons/Incoming.svg" alt="">';
  /* a row: [avatar, title, sub, right, opts] — opts: dot (unread), in (incoming arrow), two (two-line sub), amt (amount on the title line), spam */
  function row(r) {
    var o = r[4] || {};
    return '<div class="idn-row' + (o.two ? ' two' : '') + '">' +
      (o.dot ? '<i class="idn-dot" aria-hidden="true"></i>' : '') + r[0] +
      '<span class="idn-tx"><span class="idn-top"><b>' + esc(r[1]) + '</b>' + (o.amt ? '<em>' + esc(r[3]) + '</em>' : '') + '</span>' +
      '<span class="idn-sub">' + (o.in ? IN : '') + '<span>' + esc(r[2]) + '</span></span></span>' +
      (r[3] && !o.amt ? '<span class="idn-tag' + (o.spam ? ' spam' : '') + '">' + esc(r[3]) + '</span>' : '') + '</div>';
  }
  function date(t) { return '<div class="idn-date">' + esc(t) + '</div>'; }
  var TABS = [
    ['Call', [
      row([ini('C'), 'Casa del Mar Resort', 'Cancún, MX', 'Missed', { dot: 1, in: 1 }]),
      row([img(UNKNOWN, 'jade'), '(998)-234-5610', 'Cancún, MX', 'Call', { in: 1 }]),
      row([ini('M'), 'Miguel Ruiz', 'Hola! I’m outside terminal 3 — white van, blue sign with your name.', 'Voicemail', { two: 1 }]),
      row([img(UNKNOWN, 'jade'), '(800)-555-0199', 'Toll free', 'Spam', { in: 1, spam: 1 }]),
      date('Jun 10, 2026'),
      row([ini('H'), 'Hertz', 'Cancún, MX', 'Call', { in: 1 }])]],
    ['Messages', [
      row([ini('C'), 'Casa del Mar Resort', 'Your room is ready - early check-in approved']),
      row([ini('C'), 'Casa del Mar Resort', 'Hello, we can’t wait for you to be here at The Royal Sands', '', { dot: 1 }]),
      row([img(UNKNOWN), '+1(631)259-6025', 'I’m your driver, Carlos']),
      date('Aug 13, 2025'),
      row([img(DELTA, 'logo'), 'Delta', 'Schedule change — DL 2245 departs 11:40am'])]],
    ['Mailbox', [
      row([img(LYFT, 'logo'), 'Lyft', 'Your ride with Gunter on June']),
      row([ini('C'), 'Casa del Mar Resort', 'Your booking is confirmed at Casa del Mar Resort']),
      row([img(DELTA, 'logo'), 'Delta', 'Your Flight Receipt is here']),
      date('Jul 24, 2026'),
      row([img(LYFT, 'logo'), 'Lyft', 'Hi Yuan, welcome to the ride'])]],
    ['Login', [
      row([img(LYFT, 'logo'), 'Lyft', 'triptemporary523@cloaked.com']),
      row([img(DELTA, 'logo'), 'Delta', 'triptemporary523@cloaked.com'])]],
    ['Transaction', [
      row([ini('T'), 'Casa del Mar Resort', 'Travel to Cancun .2435', '$525.60', { amt: 1 }]),
      row([img(LYFT, 'logo'), 'Lyft', 'Travel to Cancun .2435', '$25.12', { amt: 1 }]),
      row([img(DELTA, 'logo'), 'Delta', 'Travel to Cancun .2435', '$325.24', { amt: 1 }])]]
  ];

  var QS = new URLSearchParams(location.search);
  /* round 76 (Christine: "너가 생각했을때 좋은 옵션"): V2 shows the Cancun trip identity card with its activity
     arriving under it one by one, like notifications, stacking up (Figma 9935:148267, but stacked so it also
     reads as "it all gathers here"). The drifting feed (round 59–63) stays behind &ut2idn=feed. */
  if (QS.get('ut2vonb') === 'n4' && QS.get('ut2idn') !== 'feed') {
    var src = document.querySelector('#iiS4 .ic-card');
    var card = src ? src.cloneNode(true) : null;
    if (card) {
      card.classList.remove('iti-c', 'in');
      var badge = card.querySelector('.idf-badge'); if (badge) badge.textContent = '3 items';
      var vs = card.querySelectorAll('.idf-v'), ks = card.querySelectorAll('.idf-k');
      [].forEach.call(ks, function (k, i) {
        var t = k.textContent.toLowerCase();
        if (t === 'phone') vs[i].textContent = '425-235-6234';
        if (t === 'email') vs[i].textContent = 'hidemy241@cloaked.com';
        if (t.indexOf('expiration') === 0) vs[i].textContent = '01/15/80';
      });
    }
    var NOTES = [
      row([img(UNKNOWN, 'jade'), '(998)-234-5610', 'Cancún, MX', 'Call', { in: 1 }]),
      row([ini('M'), 'Miguel Ruiz', 'Hola! I’m outside terminal 3 — white van, blue sign with your name.', 'Voicemail', { two: 1 }]),
      row([ini('T'), 'Casa del Mar Resort', 'Travel to Cancun .2435', '$525.60', { amt: 1 }]),
      row([img(LYFT, 'logo'), 'Lyft', 'Your ride with Gunter on June']),
      row([ini('C'), 'Casa del Mar Resort', 'Your room is ready - early check-in approved']),
      row([img(DELTA, 'logo'), 'Delta', 'Travel to Cancun .2435', '$325.24', { amt: 1 }])
    ];
    var ks2 = document.createElement('section'); ks2.className = 'vti-sec idk-sec'; ks2.id = 'iiN';
    ks2.innerHTML = '<div class="vti-stage"><div class="vti-art idk-art"><div class="idk-wrap" aria-hidden="true"><div class="idk-card"></div><div class="idk-notes"></div></div></div>' +
      '<div class="vti-copy"><h1>Have combined activities within Identity</h1></div></div>';
    if (card) ks2.querySelector('.idk-card').appendChild(card);
    s1.parentNode.insertBefore(ks2, s1.nextSibling);
    var notes = ks2.querySelector('.idk-notes'), nk = 0, nt = 0, non = false, MAX = 3, EVERY = 1700;
    function ding() {
      nt = 0; if (!non) return;
      var w = document.createElement('div'); w.className = 'idk-n';
      w.innerHTML = '<div class="idk-in">' + NOTES[nk % NOTES.length] + '</div>'; nk++;
      notes.insertBefore(w, notes.firstChild);
      void w.offsetWidth; w.classList.add('on');   /* opens its row and drops in — the "띵" */
      var all = notes.querySelectorAll('.idk-n:not(.out)');
      for (var i = MAX; i < all.length; i++) { (function (o) { o.classList.add('out'); setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 420); })(all[i]); }
      if (!still) nt = setTimeout(ding, EVERY);
    }
    function nstart() {
      if (non) return; non = true; notes.innerHTML = ''; nk = 0;
      if (still) { for (var i = 0; i < MAX; i++) ding(); return; }
      nt = setTimeout(ding, 500);
    }
    function nstop() { non = false; clearTimeout(nt); nt = 0; }
    function kcheck() {
      var H = Math.max(1, scroller.clientHeight);
      if (page.classList.contains('open') && Math.round(scroller.scrollTop / H) === Math.round(ks2.offsetTop / H)) nstart(); else nstop();
    }
    var kset = 0;
    scroller.addEventListener('scroll', function () { clearTimeout(kset); kset = setTimeout(kcheck, 160); }, { passive: true });
    new MutationObserver(function () { setTimeout(kcheck, 60); }).observe(page, { attributes: true, attributeFilter: ['class'] });
    window.UT2_IDN = 4;
    return;
  }

  var FEED = QS.get('ut2vonb') === 'n4';
  if (FEED) {
    /* V3 · one feed, in the Figma list-item style (the same rows as V2's tabs, mixed) */
    var cardH = [
      row([ini('C'), 'Casa del Mar Resort', 'Cancún, MX', 'Missed', { dot: 1, in: 1 }]),
      row([img(LYFT, 'logo'), 'Lyft', 'Your ride with Gunter on June']),
      row([ini('T'), 'Casa del Mar Resort', 'Travel to Cancun .2435', '$525.60', { amt: 1 }]),
      row([img(UNKNOWN), '+1(631)259-6025', 'I’m your driver, Carlos']),
      row([img(DELTA, 'logo'), 'Delta', 'Your Flight Receipt is here']),
      row([ini('M'), 'Miguel Ruiz', 'Hola! I’m outside terminal 3 — white van, blue sign with your name.', 'Voicemail', { two: 1 }]),
      row([img(LYFT, 'logo'), 'Lyft', 'Travel to Cancun .2435', '$25.12', { amt: 1 }]),
      row([ini('C'), 'Casa del Mar Resort', 'Your room is ready - early check-in approved']),
      row([img(UNKNOWN, 'jade'), '(800)-555-0199', 'Toll free', 'Spam', { in: 1, spam: 1 }]),
      row([img(DELTA, 'logo'), 'Delta', 'Schedule change — DL 2245 departs 11:40am', '', { dot: 1 }]),
      row([ini('H'), 'Hertz', 'Cancún, MX', 'Call', { in: 1 }]),
      row([img(DELTA, 'logo'), 'Delta', 'Travel to Cancun .2435', '$325.24', { amt: 1 }])
    ].join('');
    var fs = document.createElement('section'); fs.className = 'vti-sec idq-sec'; fs.id = 'iiN';
    fs.innerHTML = '<div class="vti-stage">' +
      '<div class="vti-art idq-art"><div class="idq-feed" aria-hidden="true"><div class="idq-run"><div class="idq-set">' + cardH + '</div><div class="idq-set">' + cardH + '</div></div>' +
      '<i class="idq-blur b1"></i><i class="idq-blur b2"></i><i class="idq-blur b3"></i></div></div>' +
      '<div class="vti-copy"><h1>Have combined activities within Identity</h1></div>' +
    '</div>';
    s1.parentNode.insertBefore(fs, s1.nextSibling);
    var run = fs.querySelector('.idq-run'), set = fs.querySelector('.idq-set');
    /* the run is two copies; it drifts down by one copy's height and starts over, so the seam never shows */
    function measure() { var h = set.offsetHeight; if (h) { run.style.setProperty('--h', h + 'px'); run.style.animationDuration = (h / 22) + 's'; } }
    function fcheck() {
      var H = Math.max(1, scroller.clientHeight), on = page.classList.contains('open') && Math.round(scroller.scrollTop / H) === Math.round(fs.offsetTop / H);
      if (on) measure();
      fs.classList.toggle('run', on && !still);
    }
    var fset = 0;
    scroller.addEventListener('scroll', function () { clearTimeout(fset); fset = setTimeout(fcheck, 160); }, { passive: true });
    new MutationObserver(function () { setTimeout(fcheck, 60); }).observe(page, { attributes: true, attributeFilter: ['class'] });
    window.UT2_IDN = 3;
    return;
  }

  var sec = document.createElement('section'); sec.className = 'vti-sec'; sec.id = 'iiN';
  sec.innerHTML = '<div class="vti-stage">' +
    '<div class="vti-art idn-art"><div class="idn-panel" aria-hidden="true">' +
      '<div class="idn-bar"><div class="idn-tabs">' + TABS.map(function (t, i) { return '<span class="idn-tab' + (i ? '' : ' on') + '">' + t[0] + '</span>'; }).join('') + '<i class="idn-line"></i></div></div>' +
      '<div class="idn-pages">' + TABS.map(function (t, i) { return '<div class="idn-pg' + (i ? '' : ' on') + '">' + t[1].join('') + '</div>'; }).join('') + '</div>' +
    '</div></div>' +
    '<div class="vti-copy"><h1>Have combined activities within Identity</h1></div>' +
  '</div>';
  s1.parentNode.insertBefore(sec, s1.nextSibling);

  var bar = sec.querySelector('.idn-bar'), strip = sec.querySelector('.idn-tabs'), line = sec.querySelector('.idn-line');
  var tabs = [].slice.call(sec.querySelectorAll('.idn-tab')), pgs = [].slice.call(sec.querySelectorAll('.idn-pg'));
  var k = 0, t = 0, on = false, STEP = 2400;

  function show(i, animate) {
    k = i;
    tabs.forEach(function (b, j) { b.classList.toggle('on', j === i); });
    pgs.forEach(function (p, j) { p.classList.toggle('on', j === i); });
    var tab = tabs[i], bw = bar.clientWidth, sw = strip.scrollWidth;
    /* the strip slides only as far as it must to keep the active tab in view (Figma: Transaction ends flush right) */
    var shift = Math.max(0, Math.min(sw - bw, tab.offsetLeft + tab.offsetWidth - bw));
    sec.classList.toggle('idn-still', !animate || still);
    strip.style.transform = 'translateX(' + (-shift) + 'px)';
    line.style.transform = 'translateX(' + tab.offsetLeft + 'px)'; line.style.width = tab.offsetWidth + 'px';
  }
  function tick() { t = 0; if (!on) return; show((k + 1) % TABS.length, true); t = setTimeout(tick, STEP); }
  function start() { if (on) return; on = true; show(0, false); if (!still) t = setTimeout(tick, STEP); }
  function stop() { on = false; clearTimeout(t); t = 0; }

  /* plays while its page is the one on screen (the build's scenes use the same rule) */
  function here() {
    if (!page.classList.contains('open')) return false;
    var H = Math.max(1, scroller.clientHeight);
    return Math.round(scroller.scrollTop / H) === Math.round(sec.offsetTop / H);
  }
  var settle = 0;
  function check() { if (here()) start(); else stop(); }
  scroller.addEventListener('scroll', function () { clearTimeout(settle); settle = setTimeout(check, 160); }, { passive: true });
  new MutationObserver(function () { setTimeout(check, 60); }).observe(page, { attributes: true, attributeFilter: ['class'] });
  window.UT2_IDN = 1;
})();
