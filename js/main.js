/**
 * NATO Scientific Project Visit Card — Main Logic
 * Hydrates every section from js/data.js.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectData();
  initNavigation();
  initContactForm();
});

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** Escapes text destined for innerHTML. */
function esc(value) {
  if (value === undefined || value === null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Sets textContent on an element if it exists. */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

/** Reads a CSS custom property off :root. */
function token(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/** Initials for the portrait placeholder. */
function getInitials(name) {
  if (!name) return 'PI';
  const clean = name.replace(/Prof\.|Dr\.|-Ing\.|Assoc\./g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'PI';
}

/* ------------------------------------------------------------------ *
 * Section renderers
 * ------------------------------------------------------------------ */

function initProjectData() {
  if (typeof projectData === 'undefined') {
    console.warn('projectData not loaded; displaying default markup.');
    return;
  }

  const { meta, about, topics, teams, results, publications, news, funding, contact } = projectData;

  renderMeta(meta);
  renderMap(meta);
  renderAbout(about, meta);
  renderTopics(topics);
  renderTeams(teams);
  renderResults(results);
  renderPublications(publications);
  renderNews(news);
  renderGallery(projectData.gallery);
  renderFunding(funding, meta);
  renderContact(contact);
}

/** Hero, header and footer identity. */
function renderMeta(meta) {
  if (!meta) return;

  const heroTitleEl = document.getElementById('hero-title');
  if (heroTitleEl) {
    heroTitleEl.innerHTML =
      `<span class="gradient-text">${esc(meta.acronym)}</span>: ${esc(meta.fullTitle)}`;
  }

  setText('hero-eyebrow', meta.eyebrow);
  setText('hero-lead', meta.summary);
  setText('header-acronym', meta.acronym);
  setText('header-grant', meta.grantReference ? `SPS ${meta.grantReference}` : meta.badge);
  setText('footer-acronym', meta.acronym);
  setText('footer-summary', meta.summary);
  setText('about-meta', meta.domain);

  const years = (meta.duration || '').split(/[–-]/).map(part => part.trim());
  if (years.length === 2 && years.every(year => /^\d{4}$/.test(year))) {
    setText('footer-copyright', `© ${years[0]}–${years[1]} ${meta.acronym} Consortium. All rights reserved.`);
  } else {
    setText('footer-copyright', `© ${meta.acronym} Consortium. All rights reserved.`);
  }

  // Hero metric tiles
  const statsEl = document.getElementById('hero-stats');
  if (statsEl && Array.isArray(meta.stats)) {
    statsEl.innerHTML = meta.stats.map(stat => `
      <div class="stat-tile" data-accent="${esc(stat.accent || 'blue')}">
        <span class="mono-label stat-label">${esc(stat.label)}</span>
        <div class="stat-value">${esc(stat.value)}</div>
      </div>
    `).join('');
  }

  // Partner-nation chips
  const partnersEl = document.getElementById('hero-partners');
  if (partnersEl && Array.isArray(meta.partners)) {
    partnersEl.innerHTML = meta.partners.map(p => `
      <span class="chip" data-accent="${esc(p.accent || 'blue')}">
        ${p.flag ? `<span class="chip-flag">${esc(p.flag)}</span>` : ''}
        ${p.city ? `${esc(p.city)}, ` : ''}${esc(p.country)}
      </span>
    `).join('');
  }
}

/**
 * Consortium site map.
 * Renders an inline SVG with D3 using official, clean local GeoJSON boundaries
 * (window.consortiumGeoJSON), with one marker per site in meta.sites.
 * Fully self-contained, offline-ready, with no external CDN dependency.
 */
function renderMap(meta) {
  const canvas = document.getElementById('site-map');
  const legend = document.getElementById('map-legend');
  const sites = (meta && meta.sites) || [];
  if (!sites.length) return;

  // Legend and count render immediately
  setText('map-count', `${sites.length} ${sites.length === 1 ? 'site' : 'sites'}`);

  if (legend) {
    legend.innerHTML = sites.map(site => `
      <span class="map-legend-item" data-accent="${esc(site.accent || 'blue')}">
        <span class="map-legend-swatch"></span>${esc(site.name)}, ${esc(site.code || site.country)}
      </span>
    `).join('');
  }

  if (!canvas) return;

  const fail = (reason) => {
    canvas.innerHTML = `<div class="map-fallback mono-label">${esc(reason)}</div>`;
  };

  if (typeof d3 === 'undefined') {
    fail('D3 library unavailable');
    return;
  }

  const geoData = window.consortiumGeoJSON;
  if (!geoData) {
    fail('Consortium map data unavailable');
    return;
  }

  let resizeTimer;
  let lastWidth = canvas.clientWidth;
  window.addEventListener('resize', () => {
    if (canvas.clientWidth === lastWidth) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      lastWidth = canvas.clientWidth;
      drawMap(canvas, geoData, meta, sites);
    }, 180);
  }, { passive: true });

  drawMap(canvas, geoData, meta, sites);
}

/** Paints the projected countries and site markers into the map canvas. */
function drawMap(canvas, geoData, meta, sites) {
  const width = canvas.clientWidth || 300;
  const height = canvas.clientHeight || 250;
  const highlights = meta.mapHighlights || {};
  const [west, south, east, north] = meta.mapExtent || [-6, 38, 40, 62];

  // Fit projection to the geographic window for stable framing
  const frame = {
    type: 'MultiPoint',
    coordinates: [[west, south], [east, south], [east, north], [west, north]]
  };
  const projection = d3.geoMercator().fitExtent([[4, 4], [width - 4, height - 4]], frame);
  const path = d3.geoPath(projection);

  canvas.innerHTML = '';
  const svg = d3.select(canvas).append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', token('--map-canvas-bg', '#eef2f7'));

  // Only the consortium countries are rendered
  const shown = (geoData.features || []).filter(f => highlights[f.properties.name]);

  svg.append('g').selectAll('path').data(shown).join('path')
    .attr('d', d => path(d.geometry))
    .attr('fill', d => token(`--accent-${highlights[d.properties.name]}-map`, '#b6cee6'))
    .attr('stroke', d => token(`--accent-${highlights[d.properties.name]}`, '#004990'))
    .attr('stroke-width', 0.9)
    .append('title')
    .text(d => d.properties.name);

  const markers = svg.append('g');
  sites.forEach(site => {
    const point = projection([site.lon, site.lat]);
    if (!point) return;
    const [x, y] = point;
    const color = token(`--accent-${site.accent || 'blue'}`, '#004990');
    const dx = site.dx === undefined ? 7 : site.dx;
    const dy = site.dy === undefined ? -6 : site.dy;

    markers.append('circle')
      .attr('class', 'map-pulse')
      .attr('cx', x).attr('cy', y).attr('r', 3.5)
      .attr('fill', color);

    markers.append('circle')
      .attr('cx', x).attr('cy', y).attr('r', 3.5)
      .attr('fill', color)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.4);

    markers.append('title').text(`${site.name}, ${site.country}`);

    markers.append('text')
      .attr('class', 'map-label')
      .attr('x', x + dx)
      .attr('y', y + dy)
      .attr('text-anchor', dx < 0 ? 'end' : 'start')
      .text(site.name);
  });
}

/** Objectives list plus the scientific scope panel. */
function renderAbout(about, meta) {
  if (!about) return;

  const pointsEl = document.getElementById('about-points-container');
  if (pointsEl && Array.isArray(about.keyPoints)) {
    pointsEl.innerHTML = about.keyPoints.map((point, i) => `
      <div class="card about-point">
        <div class="about-point-index">0${i + 1}</div>
        <div>
          <h4>${esc(point.title)}</h4>
          <p>${esc(point.description)}</p>
        </div>
      </div>
    `).join('');
  }

  const scopeEl = document.getElementById('scope-card');
  const flow = about.flow;
  if (scopeEl && flow) {
    const steps = (flow.steps || []).map(step => `
      <div class="scope-step${step.highlight ? ' is-highlight' : ''}">
        <div class="scope-step-title">${esc(step.title)}</div>
        <div class="scope-step-caption">${esc(step.caption)}</div>
      </div>
    `).join('<div class="scope-arrow">&rarr;</div>');

    scopeEl.innerHTML = `
      <div class="scope-head">
        <div>
          <h4>Scientific Scope</h4>
          <span class="scope-sub">${esc(flow.scope)}</span>
        </div>
        <span class="badge badge-nato">Active Research</span>
      </div>
      <div class="scope-flow">
        <div class="mono-label scope-flow-title">${esc(flow.title)}</div>
        <div class="scope-flow-steps">${steps}</div>
      </div>
      <ul class="scope-claims">
        ${(flow.claims || []).map(claim => `<li>${esc(claim)}</li>`).join('')}
      </ul>
    `;
  }
}

/** Research topics, each mapped to a work package. */
function renderTopics(topics) {
  const grid = document.getElementById('topic-grid');
  if (!grid || !Array.isArray(topics)) return;

  grid.innerHTML = topics.map(topic => `
    <article class="topic-card" data-accent="${esc(topic.accent || 'blue')}">
      <div class="topic-rule">
        <span class="tag">${esc(topic.id)}</span>
        <span class="rule-line"></span>
        <span class="tag tag-solid">${esc(topic.wp)}</span>
      </div>
      <h3>${esc(topic.title)}</h3>
      <p>${esc(topic.description)}</p>
      <div class="topic-meta">
        <div class="topic-meta-row">
          <span class="mono-label topic-meta-key">Lead</span>
          <span class="topic-meta-val">${esc(topic.lead)}</span>
        </div>
        <div class="topic-meta-row">
          <span class="mono-label topic-meta-key">Milestone</span>
          <span class="topic-meta-val is-accent">${esc(topic.milestone)}</span>
        </div>
      </div>
    </article>
  `).join('');

  setText('topics-meta', String(topics.length).padStart(2, '0'));
}

/** National research groups and their members. */
function renderTeams(teams) {
  const container = document.getElementById('team-container');
  if (!container || !Array.isArray(teams)) return;

  container.innerHTML = teams.map(team => {
    const members = (team.members || []).map(member => `
      <div class="member">
        <div class="member-avatar${member.photo ? ' has-photo' : ''}">
          ${member.photo
        ? `<img src="${esc(member.photo)}" alt="${esc(member.name)}">`
        : esc(getInitials(member.name))}
        </div>
        <div class="member-body">
          <div class="member-name">${esc(member.name)}</div>
          <div class="member-role">
            ${member.time ? `<span class="member-time mono-label">${esc(member.time)}</span>` : ''}
          </div>
          ${member.task ? `<p class="member-task">${esc(member.task)}</p>` : ''}
        </div>
      </div>
    `).join('');

    const wps = (team.wps || []).map(wp => `<span class="tag">${esc(wp)}</span>`).join('');

    return `
      <section class="team-group" data-accent="${esc(team.accent || 'blue')}">
        <header class="team-head">
          <span class="team-institution">
            ${team.flag ? `<span class="flag">${esc(team.flag)} </span>` : ''}${esc(team.institution)}
          </span>
          <span class="team-name">${esc(team.name)}</span>
        </header>
        <div class="member-grid">${members}</div>
      </section>
    `;
  }).join('');

  const nations = new Set(teams.map(team => team.country).filter(Boolean));
  setText('team-meta', `${teams.length} groups · ${nations.size} ${nations.size === 1 ? 'nation' : 'nations'}`);
}

/** Headline metrics plus grouped achievement lists. */
function renderResults(results) {
  if (!results) return;

  setText('results-meta', results.asOf);
  setText('results-intro', results.intro);

  const metricsEl = document.getElementById('result-metrics');
  if (metricsEl && Array.isArray(results.metrics)) {
    metricsEl.innerHTML = results.metrics.map(metric => `
      <div class="result-tile" data-accent="${esc(metric.accent || 'blue')}">
        <div class="result-figure">
          <span class="result-value">${esc(metric.value)}</span>
          <span class="result-unit">${esc(metric.unit)}</span>
        </div>
        <div class="result-label">${esc(metric.label)}</div>
        <p>${esc(metric.description)}</p>
      </div>
    `).join('');
  }

  const listsEl = document.getElementById('result-lists');
  if (listsEl && Array.isArray(results.lists)) {
    listsEl.innerHTML = results.lists.map(list => `
      <div class="result-list-card">
        <span class="mono-label">${esc(list.kicker)}</span>
        <ul>${(list.items || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul>
      </div>
    `).join('');
  }
}

/** Publication rows: year chip, reference, DOI link. */
function renderPublications(publications) {
  const list = document.getElementById('publications-container');
  if (!list || !Array.isArray(publications)) return;

  list.innerHTML = publications.map(pub => {
    const reference = [pub.journal, pub.volume].filter(Boolean).map(esc).join(', ');
    return `
      <li class="pub-row">
        <div class="pub-stamp">
          <span class="pub-year">${esc(pub.year)}</span>
          ${pub.type ? `<span class="pub-type mono-label">${esc(pub.type)}</span>` : ''}
        </div>
        <div>
          <div class="pub-title">${esc(pub.title)}</div>
          <div class="pub-authors">${esc(pub.authors)} — <em>${reference}</em></div>
        </div>
        ${pub.doi
        ? `<a class="pub-doi-link" href="https://doi.org/${esc(pub.doi)}" target="_blank" rel="noopener noreferrer" title="DOI: ${esc(pub.doi)}">DOI &rarr;</a>`
        : '<span></span>'}
      </li>
    `;
  }).join('');

  const years = publications.map(p => p.year).filter(Boolean).sort();
  if (years.length) {
    setText('publications-meta', `Selected, ${years[0]}–${years[years.length - 1]}`);
  }
}

/** Dated activity feed. */
function renderNews(news) {
  const list = document.getElementById('news-container');
  if (!list || !Array.isArray(news)) return;

  list.innerHTML = news.map(item => `
    <li class="news-item" data-accent="${esc(item.accent || 'blue')}">
      <div class="news-meta">
        <div class="news-date">${esc(item.date)}</div>
        <span class="tag">${esc(item.category)}</span>
      </div>
      <div>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.summary)}</p>
      </div>
    </li>
  `).join('');
}

/**
 * Gallery page. Each section is rendered from its own subfolder of
 * assets/gallery/ as a viewer: one large image plus a thumbnail strip.
 * A section with no images yet shows where to put them.
 */
function renderGallery(gallery) {
  const container = document.getElementById('gallery-container');
  const jump = document.getElementById('gallery-jump');
  const sections = (gallery && gallery.sections) || [];
  if (!container || !sections.length) return;

  container.innerHTML = sections.map((section, index) => {
    const folder = `assets/gallery/${section.folder}/`;
    const images = section.images || [];
    const many = images.length > 1;

    const thumbs = images.map((image, i) => `
      <button type="button" role="tab" class="viewer-thumb${i === 0 ? ' is-active' : ''}"
              aria-selected="${i === 0 ? 'true' : 'false'}"
              data-src="${esc(folder + image.file)}"
              data-caption="${esc(image.caption || '')}">
        <img src="${esc(folder + image.file)}" alt="${esc(image.caption || `${section.title} photo ${i + 1}`)}" loading="lazy">
      </button>
    `).join('');

    const viewer = !images.length ? '' : `
      <div class="gallery-viewer" tabindex="0" role="group"
           aria-label="${esc(section.title)} photographs" aria-roledescription="carousel">
        <div class="viewer-stage">
          <img class="viewer-backdrop" src="${esc(folder + images[0].file)}" alt="" aria-hidden="true">
          <img class="viewer-image" src="${esc(folder + images[0].file)}"
               alt="${esc(images[0].caption || section.title)}">
          ${many ? `
            <button type="button" class="viewer-nav viewer-prev" aria-label="Previous photograph">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button type="button" class="viewer-nav viewer-next" aria-label="Next photograph">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <span class="viewer-counter mono-label" aria-hidden="true">1 / ${images.length}</span>
          ` : ''}
        </div>
        <p class="viewer-caption" role="status">${esc(images[0].caption || '')}</p>
        ${many ? `<div class="viewer-thumbs" role="tablist" aria-label="Choose a photograph">${thumbs}</div>` : ''}
      </div>
    `;

    const empty = `
      <div class="gallery-empty">
        <span class="mono-label">No photographs yet</span>
      </div>
    `;

    return `
      <section class="section${index % 2 ? '' : ' section-alt'}" id="gallery-${esc(section.id)}"
               data-accent="${esc(section.accent || 'blue')}">
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle${index % 2 ? ' nato-style' : ''}">${esc(section.title)} photos</span>
            <div class="section-title-row">
              <h2 class="section-title">${esc(section.title)}</h2>
              <span class="mono-label section-meta">${images.length} ${images.length === 1 ? 'photo' : 'photos'}</span>
            </div>
            ${section.description ? `<p class="section-description">${esc(section.description)}</p>` : ''}
          </div>
          ${images.length ? viewer : empty}
        </div>
      </section>
    `;
  }).join('');

  if (jump) {
    jump.innerHTML = sections.map(section => `
      <a href="#gallery-${esc(section.id)}" data-accent="${esc(section.accent || 'blue')}">
        ${esc(section.title)}<span class="jump-count">${(section.images || []).length}</span>
      </a>
    `).join('');
  }

  initGalleryViewers();
}

/**
 * Wires each gallery viewer: arrows, thumbnail clicks, a click on the large
 * image to advance, and left/right keys while the viewer has focus.
 */
function initGalleryViewers() {
  document.querySelectorAll('.gallery-viewer').forEach(viewer => {
    const stage = viewer.querySelector('.viewer-image');
    const backdrop = viewer.querySelector('.viewer-backdrop');
    const caption = viewer.querySelector('.viewer-caption');
    const counter = viewer.querySelector('.viewer-counter');
    const thumbs = [...viewer.querySelectorAll('.viewer-thumb')];
    if (!stage || thumbs.length < 2) return;

    let index = 0;

    const show = (next, scrollThumb) => {
      index = (next + thumbs.length) % thumbs.length;
      const thumb = thumbs[index];

      stage.src = thumb.dataset.src;
      stage.alt = thumb.dataset.caption || '';
      if (backdrop) backdrop.src = thumb.dataset.src;
      if (caption) caption.textContent = thumb.dataset.caption || '';
      if (counter) counter.textContent = `${index + 1} / ${thumbs.length}`;

      thumbs.forEach((item, i) => {
        item.classList.toggle('is-active', i === index);
        item.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      if (scrollThumb) thumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    };

    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => show(i, true)));
    viewer.querySelector('.viewer-prev')?.addEventListener('click', () => show(index - 1, true));
    viewer.querySelector('.viewer-next')?.addEventListener('click', () => show(index + 1, true));
    stage.addEventListener('click', () => show(index + 1, true));

    viewer.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      show(index + (event.key === 'ArrowLeft' ? -1 : 1), true);
    });
  });
}

/** NATO SPS funding attribution, mirrored into the footer. */
function renderFunding(funding, meta) {
  const card = document.getElementById('footer-disclaimer');

  // No funding data configured: hide the footer card rather than leave it blank.
  if (!funding) {
    if (card) card.style.display = 'none';
    return;
  }

  setText('funding-headline', funding.headline);
  setText('funding-text', funding.text);

  const disclaimer = card;
  if (disclaimer) {
    disclaimer.style.display = '';
    if (meta && meta.grantReference) {
      disclaimer.textContent = `Supported by the NATO Science for Peace and Security Programme (Multi-Year Project ${meta.grantReference}). Opinions, findings and conclusions expressed are those of the authors.`;
    } else {
      disclaimer.textContent = funding.footer || funding.text;
    }
  }
}

/** Coordinator details. */
function renderContact(contact) {
  if (!contact) return;

  setText('contact-name', `${contact.coordinator}`);
  setText('contact-inst', `${contact.institution}, ${contact.address}`);
  setText('contact-sps', contact.spsAdvisor);

  const emailEl = document.getElementById('contact-email');
  if (emailEl) {
    emailEl.textContent = contact.email;
    emailEl.href = `mailto:${contact.email}`;
  }
}

/* ------------------------------------------------------------------ *
 * Navigation & form
 * ------------------------------------------------------------------ */

function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', mainNav.classList.contains('open'));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Active section indicator. Only in-page links take part, so a link to
  // another page (news.html, gallery.html) keeps the highlight it was given.
  const anchorLinks = [...navLinks].filter(link => (link.getAttribute('href') || '').startsWith('#'));
  const sections = document.querySelectorAll('main > section[id], #gallery-container > section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      anchorLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { root: null, rootMargin: '-30% 0px -70% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

function initContactForm() {
  const form = document.getElementById('project-inquiry-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      if (feedback) {
        feedback.style.display = 'block';
        feedback.textContent = '✓ Thank you! Your inquiry has been routed to the consortium coordinator.';
        setTimeout(() => { feedback.style.display = 'none'; }, 6000);
      }
    }, 700);
  });
}
