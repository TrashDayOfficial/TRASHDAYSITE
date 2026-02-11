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

  fetchJSON(siteUrl).then(renderTagline).catch(function () { showLoadError('.js-tagline', '—'); });
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
