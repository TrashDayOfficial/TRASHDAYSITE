(function () {
  'use strict';

  var siteUrl = 'data/site.json';
  var showsUrl = 'data/shows.json';
  var listenUrl = 'data/listen.json';
  var pressUrl = 'data/press.json';

  function fetchJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  function renderTagline(data) {
    var el = document.querySelector('.js-tagline');
    if (el && data && data.tagline) el.textContent = data.tagline;
  }

  function applyTheme(data) {
    if (!data) return;
    var vars = [];
    if (data.bgLight) vars.push('  --bg-light:' + data.bgLight);
    if (data.bgDark) vars.push('  --bg-dark:' + data.bgDark);
    if (data.accentPrimary) vars.push('  --accent-primary:' + data.accentPrimary);
    if (data.accentSecondary) vars.push('  --accent-secondary:' + data.accentSecondary);
    if (data.accentTertiary) vars.push('  --accent-tertiary:' + data.accentTertiary);
    if (data.textOnLight) vars.push('  --text-on-light:' + data.textOnLight);
    if (data.textOnDark) vars.push('  --text-on-dark:' + data.textOnDark);
    if (data.textMutedLight) vars.push('  --text-muted-light:' + data.textMutedLight);
    if (data.textMutedDark) vars.push('  --text-muted-dark:' + data.textMutedDark);
    if (data.fontHeading) vars.push('  --font-heading:"' + data.fontHeading + '",sans-serif');
    if (data.fontBody) vars.push('  --font-body:"' + data.fontBody + '",sans-serif');
    var alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
    if (data.heroAlign) {
      vars.push('  --hero-align:' + (alignMap[data.heroAlign] || data.heroAlign));
      vars.push('  --hero-text-align:' + data.heroAlign);
    }
    if (data.sectionSpacing === 'compact') vars.push('  --section-padding:2rem');
    else if (data.sectionSpacing === 'spacious') vars.push('  --section-padding:6rem');
    if (data.borderRadius === 'none') vars.push('  --radius:0');
    else if (data.borderRadius === 'small') vars.push('  --radius:2px');
    else if (data.borderRadius === 'large') vars.push('  --radius:12px');
    if (vars.length) {
      var style = document.getElementById('theme-vars') || (function () {
        var s = document.createElement('style');
        s.id = 'theme-vars';
        document.head.appendChild(s);
        return s;
      })();
      style.textContent = ':root{' + vars.join(';') + '}';
    }
    document.body.classList.add('button-' + (data.buttonStyle || 'solid'));
    if (data.sectionSpacing && data.sectionSpacing !== 'normal') document.body.classList.add('spacing-' + data.sectionSpacing);
    if (data.borderRadius && data.borderRadius !== 'medium') document.body.classList.add('radius-' + data.borderRadius);
    var heroBg = document.querySelector('.js-hero-bg');
    if (heroBg && data.heroImage) {
      var imgPath = String(data.heroImage);
      if (imgPath && !/^(\/|https?:)/.test(imgPath)) imgPath = '/' + imgPath;
      heroBg.style.backgroundImage = 'url(' + imgPath + ')';
    }
    var logo = document.querySelector('.logo');
    if (logo && data.logoImage) {
      var logoPath = String(data.logoImage);
      if (logoPath && !/^(\/|https?:)/.test(logoPath)) logoPath = '/' + logoPath;
      logo.innerHTML = '<img src="' + escapeAttr(logoPath) + '" alt="TRASH DAY">';
    }
  }

  function renderShows(data) {
    var container = document.querySelector('.js-shows-list');
    if (!container) return;
    if (!data || !data.shows || !data.shows.length) {
      container.innerHTML = '<p class="loading">No shows right now.</p>';
      return;
    }
    container.innerHTML = data.shows
      .map(function (show) {
        var isTba = !show.dateDisplay || show.dateDisplay.toUpperCase() === 'TBA';
        var cardClass = 'show-card' + (isTba ? ' show-tba' : '');
        var timeAttr = show.date ? ' datetime="' + escapeAttr(show.date) + '"' : '';
        var ticketHtml =
          show.ticketUrl && !isTba
            ? '<a href="' + escapeAttr(show.ticketUrl) + '" class="show-link" target="_blank" rel="noopener">Tickets</a>'
            : '';
        return (
          '<article class="' +
          cardClass +
          '">' +
          '<time' +
          timeAttr +
          '>' +
          escape(show.dateDisplay || 'TBA') +
          '</time>' +
          '<div class="show-details">' +
          '<h3>' +
          escape(show.venue || '') +
          '</h3>' +
          '<p class="show-location">' +
          escape(show.city || '') +
          '</p>' +
          (show.notes ? '<p class="show-notes">' + escape(show.notes) + '</p>' : '') +
          '</div>' +
          ticketHtml +
          '</article>'
        );
      })
      .join('');
  }

  function renderListen(data) {
    var container = document.querySelector('.js-listen-grid');
    if (!container) return;
    if (!data || !data.links || !data.links.length) {
      container.innerHTML = '<p class="loading">No links yet.</p>';
      return;
    }
    container.innerHTML = data.links
      .map(function (link) {
        return (
          '<a href="' +
          escapeAttr(link.url || '#') +
          '" class="listen-card" target="_blank" rel="noopener">' +
          '<span class="listen-icon">▶</span>' +
          '<span>' +
          escape(link.label || '') +
          '</span>' +
          '</a>'
        );
      })
      .join('');
  }

  function renderPress(data) {
    var container = document.querySelector('.js-press-list');
    if (!container) return;
    if (!data) {
      container.innerHTML = '<p class="loading">No press yet.</p>';
      return;
    }
    var parts = [];
    if (data.quotes && data.quotes.length) {
      data.quotes.forEach(function (q) {
        parts.push(
          '<blockquote class="press-quote">' +
            '<p>"' + escape(q.quote || '') + '"</p>' +
            '<cite>— ' + escape(q.cite || '') + '</cite>' +
            '</blockquote>'
        );
      });
    }
    if (data.links && data.links.length) {
      parts.push('<div class="press-links">');
      data.links.forEach(function (link) {
        parts.push(
          '<a href="' +
            escapeAttr(link.url || '#') +
            '" target="_blank" rel="noopener">' +
            escape(link.label || link.url || '') +
            '</a>'
        );
      });
      parts.push('</div>');
    }
    container.innerHTML = parts.length ? parts.join('') : '<p class="loading">No press yet.</p>';
  }

  function escape(str) {
    if (str == null) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function showLoadError(selector, message) {
    var el = document.querySelector(selector);
    if (el) el.innerHTML = '<p class="loading">' + (message || 'Could not load.') + '</p>';
  }

  fetchJSON(siteUrl).then(function (data) {
    applyTheme(data);
    renderTagline(data);
  }).catch(function () { showLoadError('.js-tagline', '—'); });
  fetchJSON(showsUrl).then(renderShows).catch(function () { showLoadError('.js-shows-list', 'No shows right now.'); });
  fetchJSON(listenUrl).then(renderListen).catch(function () { showLoadError('.js-listen-grid', 'No links yet.'); });
  fetchJSON(pressUrl).then(renderPress).catch(function () { showLoadError('.js-press-list', 'No press yet.'); });

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
