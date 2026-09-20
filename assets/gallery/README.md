# Gallery images

Drop photos into the subfolder for their section:

```
assets/gallery/team/   → Gallery page, "Team" section
assets/gallery/lab/    → Gallery page, "Lab" section
```

A static page cannot list a directory, so each photo must also be named in
`js/data.js` under `gallery.sections[].images`:

```js
images: [
  { file: "kickoff-meeting.jpg", caption: "Project kickoff meeting" },
  { file: "sieverts-rig.jpg" }          // caption is optional
]
```

`file` is the filename only — the folder comes from the section's `folder` field.
Use web formats (`.jpg`, `.png`, `.webp`) and keep the long edge around 1600 px;
the grid renders them at roughly 400 px wide.
