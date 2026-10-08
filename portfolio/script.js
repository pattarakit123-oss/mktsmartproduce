(function () {
  'use strict';
  var KEY = 'portfolio_lang';
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var SECTIONS = ['about', 'skills', 'projects', 'certs', 'gallery', 'journey', 'contact'];

  function initial() {
    try { var s = localStorage.getItem(KEY); if (s === 'th' || s === 'en') return s; } catch (e) {}
    return (navigator.language || 'th').toLowerCase().indexOf('th') === 0 ? 'th' : 'en';
  }

  function render(lang) {
    var c = window.CONTENT[lang];
    document.documentElement.lang = lang;
    $('lang').textContent = lang === 'th' ? 'EN' : 'TH';
    $('brand').textContent = c.brand;
    $('links').innerHTML = SECTIONS.map(function (k) { return '<a href="#' + k + '">' + esc(c.nav[k]) + '</a>'; }).join('');

    $('hero-eyebrow').textContent = c.hero.eyebrow;
    $('hero-title').innerHTML = c.hero.title;
    $('hero-lead').textContent = c.hero.lead;
    $('hero-cta1').textContent = c.hero.cta1;
    $('hero-cta2').textContent = c.hero.cta2;
    $('hero-img').src = c.hero.img;
    $('hero-img').alt = c.hero.imgAlt;
    $('hero-sticker').textContent = c.hero.sticker;
    var words = c.hero.marquee.map(function (w) { return '<span>' + esc(w) + ' ✦</span>'; }).join('');
    $('marquee').innerHTML = words + words + words + words;
    $('stats').innerHTML = c.stats.map(function (s) { return '<li><b>' + esc(s.n) + '</b><span>' + esc(s.l) + '</span></li>'; }).join('');

    $('about-h').textContent = c.about.h;
    $('about-kicker').textContent = c.about.kicker;
    $('about-chips').innerHTML = c.about.chips.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('');
    $('about-punch').textContent = c.about.punch;
    $('about-body').innerHTML = c.about.p.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

    $('skills-h').textContent = c.skills.h;
    $('skills-body').innerHTML = c.skills.groups.map(function (g) {
      return '<div class="card"><h3>' + esc(g.t) + '</h3><ul>' + g.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
    }).join('');

    $('projects-h').textContent = c.projects.h;
    $('projects-body').innerHTML = c.projects.items.map(function (p) {
      return '<article class="card project"><div class="head"><h3>' + esc(p.title) + '</h3><div class="role">' + esc(p.role) + '</div></div>' +
        '<div class="inner"><p>' + esc(p.desc) + '</p><p class="result">' + esc(p.result) + '</p>' +
        '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
        (p.link ? '<a class="more" href="' + esc(p.link) + '">' + esc(p.linkText) + '</a>' : '') + '</div></article>';
    }).join('');

    $('certs-h').textContent = c.certs.h;
    $('certs-body').innerHTML = c.certs.items.map(function (x) {
      return '<figure><img src="' + esc(x.src) + '" alt="' + esc(x.alt) + '" loading="lazy"><figcaption><div class="t">' + esc(x.title) + '</div><div class="s">' + esc(x.sub) + '</div>' +
        '<span class="m">' + esc(x.issuer + (x.date ? ' · ' + x.date : '')) + '</span></figcaption></figure>';
    }).join('');

    $('gallery-h').textContent = c.gallery.h;
    $('gallery-body').innerHTML = c.gallery.items.map(function (g) {
      return '<figure><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy"><figcaption>' + esc(g.cap) + '</figcaption></figure>';
    }).join('');

    $('journey-h').textContent = c.journey.h;
    $('journey-body').innerHTML = c.journey.items.map(function (j) {
      return '<li><span class="when">' + esc(j.when) + '</span><h3>' + esc(j.t) + '</h3><p>' + esc(j.d) + '</p></li>';
    }).join('');

    $('contact-h').textContent = c.contact.h;
    $('contact-lead').textContent = c.contact.lead;
    $('contact-body').innerHTML = c.contact.links.map(function (l) { return '<a class="btn" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.t) + '</a>'; }).join('');
    $('footer').textContent = c.footer;
    document.title = c.brand + ' — Portfolio';
  }

  var lang = initial();
  render(lang);
  $('lang').addEventListener('click', function () {
    lang = lang === 'th' ? 'en' : 'th';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    render(lang);
  });
})();
