# NATO Scientific Project "Visit Card" Website

A front-end website designed as a scientific "visit card" and showcase landing page for a
multinational research project supported by the **NATO Science for Peace and Security (SPS)
Programme**.

The current design merges two sources:

- **Section structure** from the *NATO Research Project UI Mockups* project card
  (Team · Research topics · Key results · Publications · News & updates · Funding attribution),
  including the consortium site map in the hero.
- **Visual identity** from the NATO SPS site (NATO blue / green-energy palette, Outfit + Inter
  typography, soft cards and elevation), plus the mockup's information-design signatures:
  a four-hue accent strip, mono uppercase labels, hairline section rules and square metric tiles.

---

## 🎨 Theme & Aesthetic

- **NATO Blue Identity**: Deep Navy (`#002244`) & NATO Blue (`#004990`)
- **Green Energy Accents**: Clean Emerald (`#10B981`) and Eco Teal (`#0D9488`)
- **Four-hue accent scale** (`blue`, `green`, `amber`, `violet`) used to differentiate metric
  tiles, topics, teams and news categories. Blue and green stay dominant.
- **Typography**: *Outfit* (headings), *Inter* (body), *JetBrains Mono* (labels and data)
- **Clean Scientific Surfaces**: `#F8FAFC` / `#FFFFFF` backgrounds, hairline borders,
  accent-capped tiles.

---

## 📁 Folder Structure

```
NATO web site/
├── index.html                  # Home: hero, Team, Project Overview, Contact
├── results.html                # Key results + Publications
├── news.html                   # News & updates
├── gallery.html                # Gallery — Team and Lab photos
├── README.md
│
├── css/
│   ├── variables.css           # Color tokens, four-hue accent scale, radii, shadows, fonts
│   ├── style.css               # Reset, typography, header, hero/project card, section
│   │                           #   headers, mono-label system, footer, responsive queries
│   └── components.css          # Topics, team, key results, publications, news, funding,
│                               #   contact, buttons, badges, tags, forms
│
├── js/
│   ├── data.js                 # ALL project content lives here
│   └── main.js                 # Renders every section, mobile nav, scroll spy, form
│
└── assets/
    └── icons/                  # SVG icons (NATO star emblem, clean-energy emblem)
```

---

## 🧩 Page Sections

| Section | Anchor | Source of content in `js/data.js` |
| --- | --- | --- |
| Hero / project card | `#overview` | `meta` (title, summary, `stats` tiles, `partners` chips) |
| Consortium map | in `#overview` | `meta.sites`, `meta.mapHighlights`, `meta.mapExtent` |
| Project Overview | `#about` | `about.keyPoints`, `about.flow`, `topics[]` |
| Team | `#team` | `teams[]` → `members[]` |
| Key results | `results.html#results` | `results.metrics[]`, `results.lists[]` |
| Publications | `results.html#publications` | `publications[]` |
| News & updates | `news.html` | `news[]` |
| Gallery | `gallery.html` | `gallery.sections[]` |
| Funding attribution | `#acknowledgment` | `funding` |
| Contact | `#contact` | `contact` |

---

## ✏️ How to Customize Your Project Information

All content is in [`js/data.js`](js/data.js) — you do not need to edit HTML.

1. **Project identity**: `meta.acronym`, `meta.fullTitle`, `meta.grantReference`, `meta.summary`,
   `meta.eyebrow`.
2. **Hero metric tiles**: `meta.stats` — each entry is `{ label, value, accent }`.
3. **Partner-nation chips**: `meta.partners` — `{ role, city, country, flag, accent }`.
   `role` uses NATO SPS terminology: NPD (NATO country Project Director), PPD (Partner country
   Project Director), Partner.
4. **Consortium map**: `meta.sites` — one entry per site:
   `{ name, country, code, lon, lat, accent, dx, dy }`, where `lon`/`lat` are decimal degrees
   and `dx`/`dy` nudge the label off the marker (a negative `dx` right-aligns it).
   `meta.mapHighlights` maps a country name (as spelled in Natural Earth, e.g. `"France"`,
   `"Ukraine"`) to an accent. **Only the countries listed here are drawn** — the rest of the
   world is left blank, so the map shows the consortium's countries alone. Add a country here
   to put it on the map. `meta.mapExtent` is the geographic
   window `[west, south, east, north]` the projection is fitted to — widen or narrow it to
   reframe the map without touching any code.
   `meta.mapTerritories` corrects the source data: **Natural Earth's 110m country set files
   Crimea under Russia**, so a rule
   `{ name, from: "Russia", to: "Ukraine", inside: [lon, lat] }` moves that polygon to the
   country it belongs to. `inside` is any coordinate within the territory and is used to find
   its polygon. Because both polygons share the same topology arc along their common border,
   `topojson.merge` dissolves it — the territory is drawn as part of its country, with the real
   Natural Earth coastline and **no internal border line**.
5. **Research topics**: `topics[]` — `{ id, wp, title, description, lead, milestone, accent }`.
6. **Teams and people**: `teams[]` — team header (`id`, `name`, `institution`, `flag`, `wps`)
   plus `members[]` (`name`, `role`, `task`, `time`, optional `photo`).
   Without a `photo`, the circular avatar shows the member's initials, tinted with the team's
   accent. The institution is shown once in the team header, so members do not repeat it.
7. **Key results**: `results.metrics[]` (big figures) and `results.lists[]` (grouped bullets).
8. **Publications**: `publications[]` — `{ year, title, authors, journal, volume, doi }`.
9. **News**: `news[]` — `{ date, category, accent, title, summary }`.
10. **Funding & contact**: `funding`, `contact`.

Every `accent` field accepts `"blue"`, `"green"`, `"amber"` or `"violet"`.

### Gallery photographs

Photographs live in a subfolder of `assets/gallery/` named after their section:
`assets/gallery/team/` and `assets/gallery/lab/`. A static page cannot list a directory,
so each file must also be named in `js/data.js`:

```js
gallery: {
  sections: [
    {
      id: "team", folder: "team", accent: "blue", title: "Team",
      description: "…",
      images: [
        { file: "kickoff-meeting.jpg", caption: "Project kickoff meeting" },
        { file: "lab-visit.jpg" }        // caption optional
      ]
    }
  ]
}
```

`file` is the filename only — the folder comes from the section's `folder` field. A section
with no images shows a short note saying where to put them, so the page stays usable.
Adding a section to the array adds it to the page and to the jump links at the top.

Each section renders as a viewer: the first image fills a large stage, the rest sit in a
thumbnail strip below it. Visitors move between photographs with the arrows, by clicking a
thumbnail, by clicking the large image (advances one), or with the left/right arrow keys once
the viewer has focus. A section with a single image shows the stage alone, without arrows or
thumbnails. Portrait and landscape photographs can be mixed freely — the stage keeps a fixed
3:2 frame and fills the margins with a blurred copy of the photograph.

### Map dependencies

The map is drawn with [d3](https://d3js.org/) and
[topojson-client](https://github.com/topojson/topojson-client) (both pinned with SRI hashes in
`index.html`), projecting the Natural Earth 110m country topology fetched from jsDelivr.
It therefore needs an internet connection at page load. If the libraries or the topology cannot
be loaded, the map area shows a short notice and the site legend still lists every location, so
nothing else on the page breaks. To make the page fully self-contained, download
`countries-110m.json` into `assets/` and point `TOPOLOGY_URL` in `js/main.js` at the local copy.

### Placeholder slots to replace

- The **NATO SPS logo** slot in the header (`.sps-logo-slot` in `index.html`) is a placeholder
  until the official artwork is supplied by the SPS Programme Office.
- Team **portraits** fall back to initials until `photo` paths are added to `assets/images/`.

---

## 🚀 How to Run Locally

Pure front-end static project (HTML, CSS, vanilla JS):

### Option 1: Double-click to open
Open `index.html` directly in Safari, Chrome, Edge or Firefox.

### Option 2: Run a local static server
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000`.

---

## 🛡️ NATO SPS Compliance Note

Includes the standard acknowledgment text and disclaimer for NATO SPS-funded multi-year
scientific activities. Update the grant reference in `meta.grantReference`; it is mirrored into
the header, the funding attribution band and the footer.
