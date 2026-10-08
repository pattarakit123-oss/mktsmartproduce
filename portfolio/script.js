(function () {
  'use strict';
  var KEY = 'portfolio_lang';
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  function initial() {
    try { var s = localStorage.getItem(KEY); if (s === 'th' || s === 'en') return s; } catch (e) {}
    return (navigator.language || 'th').toLowerCase().indexOf('th') === 0 ? 'th' : 'en';
  }

  function render(lang) {
    var c = window.CONTENT[lang];
    document.documentElement.lang = lang;
    $('lang').textContent = lang === 'th' ? 'EN' : 'TH';
    $('brand').textContent = c.brand;
    $('links').innerHTML = ['about', 'skills', 'projects', 'gallery', 'journey', 'contact']
      .map(function (k) { return '<a href="#' + k + '">' + esc(c.nav[k]) + '</a>'; }).join('');

    $('hero-eyebrow').textContent = c.hero.eyebrow;
    $('hero-title').innerHTML = c.hero.title;
    $('hero-lead').textContent = c.hero.lead;
    $('hero-cta1').textContent = c.hero.cta1;
    $('hero-cta2').textContent = c.hero.cta2;
    $('stats').innerHTML = c.stats.map(function (s) { return '<li><b>' + esc(s.n) + '</b><span>' + esc(s.l) + '</span></li>'; }).join('');

    $('about-h').textContent = c.about.h;
    $('about-body').innerHTML = c.about.p.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

    $('skills-h').textContent = c.skills.h;
    $('skills-body').innerHTML = c.skills.groups.map(function (g) {
      return '<div class="card"><h3>' + esc(g.t) + '</h3><ul>' + g.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
    }).join('');

    $('projects-h').textContent = c.projects.h;
    $('projects-body').innerHTML = c.projects.items.map(function (p) {
      return '<article class="card project"><h3>' + esc(p.title) + '</h3><div class="role">' + esc(p.role) + '</div>' +
        '<p>' + esc(p.desc) + '</p><p class="result">' + esc(p.result) + '</p>' +
        '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
        (p.link ? '<a class="more" href="' + esc(p.link) + '">' + esc(p.linkText) + '</a>' : '') + '</article>';
    }).join('');

    $('gallery-h').textContent = c.gallery.h;
    $('gallery-body').innerHTML = c.gallery.items.map(function (g) {
      return '<figure><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy"><figcaption>' + esc(g.cap) + '</figcaption></figure>';
    }).join('');

    $('journey-h').textContent = c.journey.h;
    $('journey-body').innerHTML = c.journey.items.map(function (j) {
      return '<li><div class="when">' + esc(j.when) + '</div><h3>' + esc(j.t) + '</h3><p>' + esc(j.d) + '</p></li>';
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
