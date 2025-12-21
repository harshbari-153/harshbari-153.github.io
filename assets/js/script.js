/* ========= Shared UI: nav, loader, scroll progress, click spark ========= */

const $ = (sel, root = document) => root.querySelector(sel);

function setYear() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function hideLoaderWhenReady() {
  const loader = $("#loader");
  if (!loader) return;

  // Keep it visible very briefly so the animation is noticeable
  const minMs = 550;
  const start = performance.now();

  function done() {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, minMs - elapsed);
    setTimeout(() => loader.classList.add("is-hidden"), wait);
  }

  if (document.readyState === "complete") done();
  else window.addEventListener("load", done, { once: true });
}

function setupNav() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on link click (mobile)
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (menu.classList.contains("is-open")) {
      if (!e.target.closest("#navMenu") && !e.target.closest("#navToggle")) closeMenu();
    }
  });

  // Close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

function setupScrollProgress() {
  const bar = $("#scroll-progress");
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupClickSpark() {
  const layer = $("#spark-layer");
  if (!layer) return;

  function spawnSpark(x, y) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    layer.appendChild(s);
    s.addEventListener("animationend", () => s.remove(), { once: true });
  }

  document.addEventListener("pointerdown", (e) => {
    // Avoid sparking on text selection drags; still keep simple
    spawnSpark(e.clientX, e.clientY);
  }, { passive: true });
}

/* ========= Data: Projects + Hobbies (Blogs) ========= */

const PROJECTS = [
  {
    id: "p1",
    title: "Retail Demand Forecasting (Dummy)",
    thumbnail: "assets/images/project1.jpg", // optional
    problem: "Predict product demand to reduce stockouts and overstocking (dummy text).",
    startDate: "Jan 2025",
    endDate: "Mar 2025",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original-wordmark.svg" },
      { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original-wordmark.svg" },
    ],
    flowcharts: ["assets/images/flow1.png", "assets/images/flow2.png"],
    explanation: "This project ingests sales data, cleans it, trains a model, and shows forecasts in a simple UI (dummy).",
    outputs: ["assets/images/out1.png", "assets/images/out2.png", "assets/images/out3.png", "assets/images/out4.png"],
    video: "", // paste Google Drive preview link OR keep empty
    liveLink: "https://example.com/live",
    githubLink: "https://github.com/your/repo"
  },
  {
    id: "p2",
    title: "Resume Parser + Ranking (Dummy)",
    thumbnail: "", // no image -> will collapse
    problem: "Extract candidate info from PDFs and rank candidates using skill matching (dummy text).",
    startDate: "Apr 2025",
    endDate: "Jun 2025",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    ],
    flowcharts: ["", ""],
    explanation: "Uploads resume PDFs, extracts text, normalizes skills, computes a score, and renders results (dummy).",
    outputs: ["", "", "", ""],
    video: "", // example: "https://drive.google.com/file/d/FILE_ID/preview"
    liveLink: "https://example.com/resume-parser",
    githubLink: "https://github.com/your/repo2"
  }
];

const HOBBIES = [
  {
    sectionTitle: "Blogs",
    items: [
      {
        title: "C Practice Challenge I: Control Flow, Loops & Arrays",
        url: "https://medium.com/@bari.harsh2001/c-practice-challenge-i-control-flow-loops-arrays-d7bdd2a9ab3b",
        thumb: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*o9rqgDJQBFLwPQK3dfEx_Q.png"
      },
      {
        title: "C Practice Challenge II: Strings, Functions,File Handling & Structures",
        url: "https://medium.com/@bari.harsh2001/c-practice-challenge-ii-strings-functions-file-handling-structures-5ecaaa1fcae3",
        thumb: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*z1PhdndOwbG1Rp7lU7zkRw.png"
      },
      {
        title: "Unlock Hidden Secrets with (a+b)² = a² + 2ab + b²",
        url: "https://medium.com/@bari.harsh2001/unlock-hidden-secrets-with-a-b-²-a²-2ab-b²-8b9490cfb10d",
        thumb: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*EtArJKsPkFa6Uice2wZcOg.png"
      },
      {
        title: "Connecting Dots with Messy Relations and Strict Functions",
        url: "https://medium.com/@bari.harsh2001/connecting-dots-with-messy-relations-and-strict-functions-cdc95a042bac",
        thumb: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*GaaQjPVp1yC23Yg_EH5Tsw.jpeg"
      }
    ]
  }
];

/* ========= Rendering ========= */

function svgProjectIcon() {
  // small inline svg (no extra assets)
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h16v4H4V4zm0 6h10v10H4V10zm12 0h4v10h-4V10z"></path>
    </svg>
  `;
}

function renderProjectsGrid() {
  const grid = $("#projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  PROJECTS.forEach(p => {
    const a = document.createElement("a");
    a.className = "tile";
    a.href = `project_description.html?pid=${encodeURIComponent(p.id)}`;
    a.setAttribute("aria-label", `Open project: ${p.title}`);

    const thumbHtml = p.thumbnail
      ? `<div class="tile__thumb media-box">
           <img src="${p.thumbnail}" alt="${p.title} thumbnail" loading="lazy"
                onerror="this.closest('.tile__thumb').classList.add('is-collapsed'); this.remove();" />
         </div>`
      : "";

    a.innerHTML = `
      <div class="tile__top">
        <div class="tile__icon">${svgProjectIcon()}</div>
        <h3 class="tile__title">${p.title}</h3>
      </div>
      ${thumbHtml}
      <p class="muted small">Click to view full details</p>
    `;

    // Store full details locally (so you can edit in one place)
    a.addEventListener("click", () => {
      localStorage.setItem("selectedProjectId", p.id);
    });

    grid.appendChild(a);
  });
}

function getProjectIdFromQueryOrStorage() {
  const params = new URLSearchParams(location.search);
  return params.get("pid") || localStorage.getItem("selectedProjectId") || PROJECTS[0]?.id;
}

function embedVideoInto(container, url) {
  // Expect Google Drive preview link or any embeddable iframe link
  if (!url) return false;

  const safeUrl = url.trim();
  if (!safeUrl) return false;

  container.innerHTML = `
    <iframe
      src="${safeUrl}"
      allow="autoplay; encrypted-media"
      allowfullscreen
      title="Project demo video">
    </iframe>
  `;
  return true;
}

function renderProjectDescription() {
  if (document.documentElement.dataset.page !== "project-description") return;

  const pid = getProjectIdFromQueryOrStorage();
  const p = PROJECTS.find(x => x.id === pid) || PROJECTS[0];
  if (!p) return;

  $("#pdTitle").textContent = p.title;
  $("#pdDates").textContent = `${p.startDate} — ${p.endDate}`;
  $("#pdProblem").textContent = p.problem;
  $("#pdExplain").textContent = p.explanation;

  // Links
  const live = $("#pdLive");
  const gh = $("#pdGitHub");
  live.href = p.liveLink || "#";
  gh.href = p.githubLink || "#";
  if (!p.liveLink) live.classList.add("is-disabled");
  if (!p.githubLink) gh.classList.add("is-disabled");

  // Thumbnail collapse if missing
  const thumb = $("#pdThumb");
  const thumbBox = $("#pdThumbBox");
  if (p.thumbnail) {
    thumb.src = p.thumbnail;
    thumb.onerror = () => { thumbBox.classList.add("is-collapsed"); thumb.remove(); };
  } else {
    thumbBox.classList.add("is-collapsed");
  }

  // Skills
  const skillsWrap = $("#pdSkills");
  skillsWrap.innerHTML = "";
  (p.skills || []).forEach(s => {
    const img = document.createElement("img");
    img.className = "skill-icon";
    img.alt = s.name;
    img.loading = "lazy";
    img.src = s.icon;
    skillsWrap.appendChild(img);
  });

  // Flowcharts
  const f1 = $("#pdFlow1");
  const f2 = $("#pdFlow2");
  const flow = p.flowcharts || ["", ""];
  [f1, f2].forEach((img, idx) => {
    const url = flow[idx] || "";
    if (!url) {
      img.closest(".media-box").classList.add("is-collapsed");
      return;
    }
    img.src = url;
    img.onerror = () => { img.closest(".media-box").classList.add("is-collapsed"); img.remove(); };
  });

  // Outputs (4)
  const outWrap = $("#pdOutputs");
  outWrap.innerHTML = "";
  (p.outputs || []).slice(0, 4).forEach((u) => {
    const box = document.createElement("div");
    box.className = "media-box";
    if (!u) {
      box.classList.add("is-collapsed");
      return;
    }
    box.innerHTML = `<img class="collapsible-media" src="${u}" alt="Output image" loading="lazy"
      onerror="this.closest('.media-box').classList.add('is-collapsed'); this.remove();" />`;
    outWrap.appendChild(box);
  });

  // Video
  const videoBlock = $("#pdVideoBlock");
  const videoBox = $("#pdVideo");
  const ok = embedVideoInto(videoBox, p.video);
  if (!ok) videoBlock.style.display = "none";
}

function renderHobbies() {
  if (document.documentElement.dataset.page !== "hobbies") return;

  const host = $("#hobbiesSections");
  host.innerHTML = "";

  HOBBIES.forEach(section => {
    const wrapper = document.createElement("section");
    wrapper.className = "card card--soft mt";
    wrapper.innerHTML = `
      <div class="section-head">
        <h2 class="h2">${section.sectionTitle}</h2>
        <p class="muted small">Click a tile to open.</p>
      </div>
      <div class="grid grid--3"></div>
    `;

    const grid = $(".grid", wrapper);

    section.items.forEach(item => {
      const a = document.createElement("a");
      a.className = "tile";
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noreferrer";

      a.innerHTML = `
        <div class="tile__top">
          <div class="tile__icon">${svgProjectIcon()}</div>
          <h3 class="tile__title">${item.title}</h3>
        </div>
        <div class="tile__thumb">
          <img src="${item.thumb}" alt="${item.title} thumbnail" loading="lazy"
               onerror="this.closest('.tile__thumb').classList.add('is-collapsed'); this.remove();" />
        </div>
        <p class="muted small"></p>
      `;

      grid.appendChild(a);
    });

    host.appendChild(wrapper);
  });
}

/* ========= Init ========= */

function init() {
  setYear();
  hideLoaderWhenReady();
  setupNav();
  setupScrollProgress();
  setupClickSpark();

  renderProjectsGrid();
  renderProjectDescription();
  renderHobbies();
}

init();
