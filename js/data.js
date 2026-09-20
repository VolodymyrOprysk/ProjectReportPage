/**
 * NGES — NATO SPS Multi-Year Project
 * Content transcribed from: Form_Paul-Boncour-Strizhak.docx
 * ----------------------------------------------------------------------------
 * Every section rendered on the page is driven by this file.
 * Edit the values here; no HTML changes are required.
 *
 * `accent` accepts: "blue" | "green" | "amber" | "violet"
 */

const projectData = {
  meta: {
    acronym: "NGES",
    badge: "SPS MYP",
    eyebrow: "NATO Science for Peace and Security — Multi-Year Project",
    fullTitle: "New Green Energy Solution",
    tagline: "Metal hydride catalysts for green fuel from carbon oxides",

    grantReference: null,

    duration: "36 months",
    domain: "Catalysis · Metal hydrides · Green fuel",
    summary: "Innovative metal hydride catalysts are being developed to hydrogenate carbon monoxide and carbon dioxide into green fuels. A successful laboratory batch of these efficient composite materials opens new avenues for industrial hydrogen applications.",

    /* Hero metric tiles */
    stats: [
      { label: "Duration", value: "36 months", accent: "blue" },
      { label: "Partner nations", value: "2", accent: "green" },
      { label: "Institutes", value: "3", accent: "amber" },
      { label: "Tasks", value: "4", accent: "violet" },
      { label: "Researchers", value: "12", accent: "blue" }
    ],

    /* Partner-nation chips shown under the hero metrics */
    partners: [
      { city: "Paris", country: "France", flag: "🇫🇷", accent: "blue" },
      { city: "Kyiv", country: "Ukraine", flag: "🇺🇦", accent: "amber" },
      { city: "Lviv", country: "Ukraine", flag: "🇺🇦", accent: "green" }
    ],

    /* Consortium sites plotted on the hero map (lon/lat in decimal degrees) */
    sites: [
      { name: "Paris", country: "France", code: "FR", lon: 2.3522, lat: 48.8566, accent: "blue", dx: 5, dy: -7 },
      { name: "Lviv", country: "Ukraine", code: "UA", lon: 24.0297, lat: 49.8397, accent: "green", dx: -7, dy: -6 },
      { name: "Kyiv", country: "Ukraine", code: "UA", lon: 30.5234, lat: 50.4501, accent: "amber", dx: 7, dy: -6 }
    ],

    /* Country fills behind the site markers: country name -> accent */
    mapHighlights: {
      "France": "blue",
      "Ukraine": "amber"
    },

    /* Geographic window the map is fitted to: [west, south, east, north]. */
    mapExtent: [-7, 40, 42, 54]
  },

  about: {
    vision: "To advance energy and environmental security by developing innovative catalysts for the hydrogenation of carbon monoxide and carbon dioxide using molecular hydrogen to produce green fuel, extending the range of available catalysts by exploiting the unique properties of metal hydrides.",
    keyPoints: [
      {
        title: "Metal Hydrides as Catalysts",
        description: "Taking metal hydrides — known until now for hydrogen storage — into catalysis. Preliminary results indicate that even motor fuel may be obtained this way."
      },
      {
        title: "Green Fuel from Carbon Oxides",
        description: "Fischer-Tropsch-type conversion of CO and CO₂ into aliphatic hydrocarbons, with selectivity controlled through catalyst composition and reactor design."
      },
      {
        title: "Energy & Environmental Security",
        description: "SPS Key Priorities 1b and 1e: cutting greenhouse-gas emissions while reducing dependence on vulnerable fuel supply chains."
      }
    ],
    /* Conceptual process diagram rendered beside the objectives */
    flow: {
      title: "Carbon oxide hydrogenation route",
      scope: "CO / CO₂ + H₂ → green fuel",
      steps: [
        { title: "CO / CO₂ + H₂", caption: "Waste carbon oxides", highlight: false },
        { title: "Metal hydride catalyst", caption: "RMgCo₄Hₓ · TiV₂ · MgH₂", highlight: true },
        { title: "Green fuel", caption: "C1-C6 hydrocarbons", highlight: false }
      ],
      claims: [
        "Extends metal hydrides from hydrogen storage into catalysis",
        "Converts waste carbon oxides into motor-fuel components and alcohols",
        "Combines hydrogen generation and catalysis in one portable material",
        "Targets TRL 4 — a laboratory batch validated at lab scale"
      ]
    }
  },

  /* The four tasks of the work plan */
  topics: [
    {
      id: "T1",
      wp: "Task 1",
      accent: "blue",
      title: "Conditions for Catalytic Testing of Metal Hydrides",
      description: "Modernising the experimental facility and fixing the operating window for carbon oxide hydrogenation: temperature, pressure, flow rates, reactant ratios and contact time.",
      lead: "IPCh-NASU · PhMI-NASU · ICMPE",
      milestone: "18 months — New and modernised equipment installed; intermetallics and their hydrides"
    },
    {
      id: "T2",
      wp: "Task 2",
      accent: "green",
      title: "Catalytic & Physicochemical Properties of RMgCo₄Hₓ Hydrides",
      description: "Parent RMgCo₄ compounds (R = Y, La, Ce, Gd) by arc-melting and sintering, hydrogenated at 10 bar H₂ on a Sieverts-type apparatus, with PCT diagrams and thermodesorption spectra.",
      lead: "IPCh-NASU · PhMI-NASU · ICMPE",
      milestone: "Completion at month 18 — Catalyst for carbon oxide reduction at different conditions"
    },
    {
      id: "T3",
      wp: "Task 3",
      accent: "amber",
      title: "Catalytic & Physicochemical Properties of TiV₂, ZrV₂ and HfV₂",
      description: "Arc-melted and annealed intermetallics hydrogenated to x ≈ 5, correlating catalytic behaviour with electronic state, phase composition, dispersity and crystallinity.",
      lead: "IPCh-NASU · PhMI-NASU · ICMPE",
      milestone: "Completion at month 27 — New physicochemical data on catalytic activity"
    },
    {
      id: "T4",
      wp: "Task 4",
      accent: "violet",
      title: "Metal Hydride-Based Catalyst for Carbon Oxide Hydrogenation",
      description: "Complex hydrides Mg₂NiH₄, Mg₂CoH₅ and Mg₂FeH₆ plus milled MgH₂ composites, then scale-up of the best catalyst and verification under industrially relevant conditions.",
      lead: "PhMI-NASU · IPCh-NASU · ICMPE",
      milestone: "Completion at month 36 — Modified metal hydride-based catalyst"
    }
  ],

  /* Three research groups across two nations.
     Each member: name, role (position), task (contribution), time (% of time).
     Add `photo: "assets/images/<file>"` to replace the initials avatar. */
  teams: [
    {
      accent: "blue",
      name: "Characterisation & synchrotron studies",
      institution: "Institut de Chimie et des Matériaux Paris-Est (ICMPE–CNRS), Thiais",
      country: "France",
      flag: "🇫🇷",
      members: [
        {
          name: "Dr. Valérie Paul-Boncour",
          role: "NATO Country Project Director",
          task: "Project management and administration; sample characterisation using synchrotron radiation",
          time: "30%"
        },
        {
          name: "Dr. Claudia Zlotea",
          role: "Senior researcher",
          task: "Characterisation by in situ XRD and XAS",
          time: "10%"
        },
        {
          name: "Dr. Fermin Cuevas",
          role: "Senior researcher",
          task: "Hydrogenation properties and characterisation",
          time: "10%"
        },
        {
          name: "Junxian Zhang",
          role: "Research engineer",
          task: "Characterisation by ICP",
          time: "10%"
        }
      ]
    },
    {
      accent: "amber",
      name: "Catalysis & catalytic testing",
      institution: "L.V. Pisarzhevskii Institute of Physical Chemistry, NAS of Ukraine, Kyiv",
      country: "Ukraine",
      flag: "🇺🇦",
      members: [
        {
          name: "Prof. Peter Strizhak",
          role: "Partner Country Project Director",
          task: "Contacts with the NPD, coordination of the Ukrainian teams, workshop organisation, reporting",
          time: "30%"
        },
        {
          name: "Dr. Igor Bychko",
          role: "Senior researcher · young scientist",
          task: "Catalytic experiments on CO and CO₂ hydrogenation; catalyst characterisation",
          time: "60%"
        },
        {
          name: "Dr. Sci. Andrii Trypolskyi",
          role: "Senior researcher",
          task: "Modernisation and installation of new equipment; characterisation by N₂ adsorption–desorption",
          time: "60%"
        }
      ]
    },
    {
      accent: "green",
      name: "Materials synthesis & structural analysis",
      institution: "Karpenko Physico-Mechanical Institute, NAS of Ukraine, Lviv",
      country: "Ukraine",
      flag: "🇺🇦",
      members: [
        {
          name: "Dr. Yuriy Verbovytskyy",
          role: "Partner Country Co-Director",
          task: "Coordination of the team; sample preparation; X-ray phase and structural analysis",
          time: "30%"
        },
        {
          name: "Prof. Ihor Zavaliy",
          role: "Head of department",
          task: "Consultation and project discussions; presentation of the results",
          time: "10%"
        },
        {
          name: "Dr. Vasyl Berezovets",
          role: "Senior researcher · young scientist",
          task: "Mechanical alloying and reactive ball milling; installation and modernisation of equipment; preparation of MgH₂-based composites and studies of their hydrolysis reactions",
          time: "60%"
        },
        {
          /* Not listed in the participants table of the application form.
             Placed with the Lviv team and given a task based on his published
             work on MgH₂ composites with Zavaliy and Berezovets; confirm his
             role and share of time. */
          name: "Dr. Oleksandr Kononiuk",
          role: "Researcher",
          task: "MgH₂-based composite materials; hydrogen absorption–desorption and hydrolysis performance"
        },
        {
          name: "Dr. Khrystyna Vlad",
          role: "PhD · young scientist",
          task: "Alloy and nanopowder preparation",
          time: "60%"
        }
      ]
    }
  ],

  /* Expected outcomes: targets and criteria from the project plan */
  results: {
    asOf: "Targets at completion",
    intro: "Criteria by which the success of the project will be judged, together with the scientific, technical and partnership deliverables set out in the project plan.",
    metrics: [
      {
        value: "4",
        unit: "TRL",
        accent: "blue",
        label: "Technology readiness",
        description: "Beginning at TRL 2 — technology concept formulated from preliminary catalytic results — through TRL 3 experimental proof of concept to a lab-validated batch at TRL 4."
      },
      {
        value: "3",
        unit: "papers",
        accent: "green",
        label: "Journal publications",
        description: "Minimum three high-quality research papers in internationally recognised peer-reviewed journals."
      },
      {
        value: "3",
        unit: "talks",
        accent: "amber",
        label: "Conference presentations",
        description: "Minimum three presentations at international conferences for peer-to-peer exchange and networking."
      },
      {
        value: "3",
        unit: "YSci",
        accent: "violet",
        label: "Young scientists",
        description: "Early-career Ukrainian researchers trained, including work at the partner institution ICMPE–CNRS in France."
      }
    ],
    lists: [
      {
        kicker: "Criteria for success",
        items: [
          "Single-phase parent intermetallics and their hydrides prepared — by year 2 (20%).",
          "Modified catalytic hydrides discovered — by year 2.5 (30%).",
          "Novel materials with enhanced catalytic properties obtained — by year 2.5 (20%).",
          "Experimental carbon oxide reduction pilot system demonstrated with end-users — at project end (30%)."
        ]
      },
      {
        kicker: "Scientific & technical",
        items: [
          "Innovative metal hydride catalysts for the hydrogenation of CO and CO₂.",
          "Optimised reaction conditions — temperature, pressure and contact time — for high yield and selectivity.",
          "Configuration for an industrial-scale hydride-based catalyst system.",
          "Recommendations and technology transfer to end-users, including SOE “KATEK”."
        ]
      },
      {
        kicker: "Partnership & capacity",
        items: [
          "Joint research between a NATO country (France) and a NATO partner country (Ukraine).",
          "New and modernised equipment installed in the Ukrainian laboratories.",
          "Training of Ukrainian young researchers at ICMPE–CNRS, leading to joint publications."
        ]
      }
    ]
  },

  /* Publications. The project's own outputs come first, followed by earlier
     work by the consortium that underpins the proposal.
     DOIs are not listed in the application form; add them here to turn each
     entry into a link. */
  publications: [
    {
      year: "2026",
      type: "Journal article",
      title: "Synthesis, structure, electrochemical and catalytic properties of YMgNi₄₋ₓCoₓ (0 ≤ x ≤ 4) alloys",
      authors: "Verbovytskyy Yu.V., Fatieiev D.S., Bychko I.B., Berezovets V.V., Trypolskyi A.I., Zavaliy I.Yu., Strizhak P.E., Paul-Boncour V.",
      journal: "Physicochemical Mechanics of Materials (Фізико-хімічна механіка матеріалів)",
      volume: "No. 3, 107–114 — in Ukrainian",
      doi: ""
    },
    {
      year: "2026",
      type: "Conference paper",
      title: "Synthesis, structure, electrochemical and catalytic properties of YMgNi₄₋ₓCoₓ (0 ≤ x ≤ 4) alloys and their hydrides",
      authors: "Verbovytskyy Yu., Fatieiev D., Bychko I., Berezovets V., Zavaliy I., Strizhak P., Paul-Boncour V.",
      journal: "25th Int. Conference of Solid Compounds of Transition Elements & XVI Int. Conference on Crystal Chemistry of Intermetallic Compounds, Lviv, Ukraine / Lublin, Poland, 15–18 June",
      volume: "p. 148",
      doi: ""
    },
    {
      /* The source list gives 2006 for this abstract; read as a typo for 2026,
         since the conference, the authors and the subject all belong to this
         project. Correct the year here if that reading is wrong. */
      year: "2026",
      type: "Conference paper",
      title: "Features of CO₂ hydrogenation in the presence of the intermetallic YMgNi₂Co₂ and its hydride",
      authors: "Fatieiev D.S., Trypolskyi A.I., Verbovytskyy Yu.V., Zavaliy I.Yu., Strizhak P.E.",
      journal: "International Research and Practice Conference “Nanotechnology and Nanomaterials”, Chernivtsi, Ukraine, 26–28 August",
      volume: "p. 330",
      doi: ""
    }
  ],

  /* News & updates. The application has not started, so these are the dated
     entries of the planned schedule; replace them with announcements once the
     project is running. */
  news: [
    {
      date: "Month 0",
      category: "Kickoff",
      accent: "blue",
      title: "Project kickoff meeting",
      summary: "The three teams convene to confirm the work plan, the division of tasks and the reporting schedule."
    },
    {
      date: "Months 1–18",
      category: "Task 1",
      accent: "blue",
      title: "Equipment modernisation and catalytic testing conditions",
      summary: "Existing equipment is modernised and new catalysts based on metal hydrides are created and tested, establishing the operating window that controls the selectivity of carbon oxide hydrogenation."
    },
    {
      date: "Month 6",
      category: "Reporting",
      accent: "green",
      title: "Milestone One — first progress and financial report",
      summary: "First reporting point to the SPS Programme Office; no more than 12 months may elapse between reports."
    },
    {
      date: "Months 7–18",
      category: "Task 2",
      accent: "green",
      title: "RMgCo₄Hₓ hydrides synthesised and characterised",
      summary: "Parent RMgCo₄ samples (R = Y, La, Ce, Gd) prepared by arc-melting and sintering, then hydrogenated at 10 bar H₂; PCT diagrams and thermodesorption spectra recorded."
    },
    {
      date: "Months 7–27",
      category: "Task 3",
      accent: "amber",
      title: "TiV₂, ZrV₂ and HfV₂ intermetallics and their hydrides",
      summary: "Parent intermetallics arc-melted from ingots and homogenised by high-temperature annealing; correlations established between catalytic and physicochemical properties."
    },
    {
      date: "Months 28–36",
      category: "Task 4",
      accent: "violet",
      title: "Scale-up of the selected hydride-based catalyst",
      summary: "Mg₂NiH₄, Mg₂CoH₅, Mg₂FeH₆ and milled MgH₂ composites screened; a scaled-up batch of the best catalyst is verified against industrially relevant criteria."
    },
    {
      date: "Month 36",
      category: "Reporting",
      accent: "blue",
      title: "Final technical and financial report",
      summary: "Delivery of the modified metal hydride-based catalyst for carbon oxide hydrogenation, with the final report to the SPS Programme Office."
    }
  ],

  /* Gallery (gallery.html). Each section maps to a subfolder of assets/gallery/,
     so `folder: "team"` means the files live in assets/gallery/team/.
     Static pages cannot list a directory, so every image is named here.
     Add a file to the folder and a line to `images` — `caption` is optional. */
  gallery: {
    sections: [
      {
        id: "team",
        folder: "team",
        accent: "blue",
        title: "Team",
        description: "The people behind the project, at work and at project meetings.",
        images: [
          // { file: "kickoff-meeting.jpg", caption: "Project kickoff meeting" },
          { file: "department7.jpg", caption: "Department #7 of Karpenko Physico-mechanical Institute of NASU" },
          { file: "vb.jpg", caption: "Dr. Vasyl Berezovets @ SCTE conference" },
          { file: "khv.jpg", caption: "Dr. Khrystyna Vlad in lab" },
          { file: "ok.jpg", caption: "Dr. Oleksandr Kononiuk in lab" },
        ]
      },
      {
        id: "lab",
        folder: "lab",
        accent: "green",
        title: "Lab",
        description: "Equipment, syntheses and measurements across the three laboratories.",
        images: [
          // { file: "sieverts-rig.jpg", caption: "Sieverts-type apparatus, Lviv" },
        ]
      }
    ]
  },

  contact: {
    coordinator: "TBD",
    role: "TBD",
    institution: "TBD",
    address: "TBD",
    email: "[EMAIL_ADDRESS]",
    spsAdvisor: "TBD",
    spsUrl: "TBD"
  }
};
