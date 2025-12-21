// Scroll progress bar pattern: scrollY / (scrollHeight - innerHeight) -> width% [web:6]
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Hamburger menu
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      toggle.classList.toggle("is-open");
      const open = toggle.classList.contains("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("open", open);
      sparkAtEvent(e);
    });

    // Close menu when link clicked (mobile)
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    });
  }

  // Scroll progress
  const progress = document.getElementById("scroll-progress");
  const updateProgress = () => {
    if (!progress) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total <= 0 ? 0 : (window.scrollY / total) * 100;
    progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  // Auto collapse missing images (local + remote)
  initAutoHideImages();
  initRemoteThumbs();

  // Click/tap spark for any click
  window.addEventListener("pointerdown", sparkAtEvent);

  // Projects: forward data to project_description.html via sessionStorage
  const projectTiles = document.querySelectorAll(".project-tile");
  projectTiles.forEach(btn => {
    btn.addEventListener("click", () => {
      const raw = btn.getAttribute("data-project");
      if (!raw) return;
      sessionStorage.setItem("selectedProject", raw);
      window.location.href = "project_description.html";
    });
  });

  // Project description: render from sessionStorage (fallback to dummy)
  if (document.getElementById("pd-title")) {
    renderProjectDescription();
  }

  // Hobbies: add dummy blog tile (shows "dynamic sections" idea)
  const addBlog = document.getElementById("add-blog");
  const blogsGrid = document.getElementById("blogs-grid");
  if (addBlog && blogsGrid) {
    addBlog.addEventListener("click", () => {
      const a = document.createElement("a");
      a.className = "tile link-tile";
      a.href = "https://example.com/new-blog";
      a.target = "_blank";
      a.rel = "noreferrer";
      a.setAttribute("data-thumb", "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=60");

      a.innerHTML = `
        <div class="tile-top">
          <div class="tile-icon" aria-hidden="true">⬡</div>
          <img class="tile-thumb remote-thumb auto-hide-img" alt="Blog thumbnail"/>
        </div>
        <div class="tile-title"><strong>New Blog (Dummy)</strong></div>
        <div class="tile-sub muted">example.com/new-blog</div>
      `;
      blogsGrid.prepend(a);
      initRemoteThumbs(a);
      initAutoHideImages(a);
    });
  }

  // Hide loader only after everything is ready
  window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");
    if (loader) loader.classList.add("hidden");
  });
});

function initAutoHideImages(root = document) {
  const imgs = root.querySelectorAll("img.auto-hide-img");
  imgs.forEach(img => {
    const hide = () => img.classList.add("is-hidden");

    // Empty src => hide immediately
    const src = (img.getAttribute("src") || "").trim();
    if (!src) hide();

    img.addEventListener("error", hide, { once: true });

    // If loads but natural size is 0 (rare), hide
    img.addEventListener("load", () => {
      if (!img.naturalWidth || !img.naturalHeight) hide();
    }, { once: true });
  });
}

function initRemoteThumbs(root = document) {
  const thumbs = root.querySelectorAll("img.remote-thumb");
  thumbs.forEach(img => {
    const tile = img.closest("[data-thumb]");
    if (!tile) return;
    const url = tile.getAttribute("data-thumb");
    if (url) img.src = url;
  });
}

function sparkAtEvent(e) {
  const x = e.clientX ?? (e.touches && e.touches[0]?.clientX);
  const y = e.clientY ?? (e.touches && e.touches[0]?.clientY);
  if (typeof x !== "number" || typeof y !== "number") return;

  const s = document.createElement("span");
  s.className = "spark";
  s.style.left = `${x}px`;
  s.style.top = `${y}px`;
  document.body.appendChild(s);
  s.addEventListener("animationend", () => s.remove(), { once: true });
}

function renderProjectDescription() {
  const fallback = {
    title: "Project Title",
    thumb: "",
    problem: "Problem statement not found. Open from Projects page.",
    start: "",
    end: "",
    skills: ["HTML","CSS","JavaScript"],
    flow1: "",
    flow2: "",
    explain: "—",
    outputs: ["","","",""],
    demo: "",
    live: "",
    repo: ""
  };

  let data = fallback;
  try{
    const raw = sessionStorage.getItem("selectedProject");
    if (raw) data = JSON.parse(raw);
  }catch(_){ /* ignore */ }

  setText("pd-title", data.title || "Project");
  setText("pd-dates", `${data.start || "—"} — ${data.end || "—"}`);
  setText("pd-problem", data.problem || "—");
  setText("pd-explain", data.explain || "—");

  setSrc("pd-thumb", data.thumb);
  setSrc("pd-flow1", data.flow1);
  setSrc("pd-flow2", data.flow2);

  const outs = Array.isArray(data.outputs) ? data.outputs : [];
  setSrc("pd-out1", outs[0]);
  setSrc("pd-out2", outs[1]);
  setSrc("pd-out3", outs[2]);
  setSrc("pd-out4", outs[3]);

  // Skills floating
  const skillsWrap = document.getElementById("pd-skills");
  if (skillsWrap) {
    skillsWrap.innerHTML = "";
    (data.skills || []).forEach((sk) => {
      const d = document.createElement("div");
      d.className = "skill-float";
      d.title = sk;
      d.textContent = shortSkill(sk);
      skillsWrap.appendChild(d);
    });
  }

  // Links
  const live = document.getElementById("pd-live");
  const repo = document.getElementById("pd-repo");
  setLinkOrHide(live, data.live);
  setLinkOrHide(repo, data.repo);

  // Demo video: allow google drive share link (convert to preview) or embed link
  const wrap = document.getElementById("pd-demo-wrap");
  if (wrap) {
    const url = (data.demo || "").trim();
    if (!url) {
      wrap.innerHTML = `<p class="muted">No demo video provided.</p>`;
    } else {
      const embed = googleDrivePreview(url) || url;
      wrap.innerHTML = `<iframe src="${embed}" allow="autoplay; encrypted-media" allowfullscreen title="Demo video"></iframe>`;
    }
  }

  // Re-check missing images
  initAutoHideImages(document);
}

function setText(id, text){
  const el = document.getElementById(id);
  if (el) el.textContent = text ?? "";
}

function setSrc(id, src){
  const el = document.getElementById(id);
  if (!el) return;
  const v = (src || "").trim();
  el.setAttribute("src", v);
  if (!v) el.classList.add("is-hidden");
}

function setLinkOrHide(a, href){
  if (!a) return;
  const v = (href || "").trim();
  if (!v) {
    a.style.display = "none";
  } else {
    a.style.display = "";
    a.href = v;
  }
}

function shortSkill(s){
  const t = (s || "").trim();
  if (!t) return "SK";
  const map = { "JavaScript":"JS", "TypeScript":"TS", "Python":"Py", "OpenCV":"CV", "React":"Rx", "Docker":"Dk" };
  if (map[t]) return map[t];
  if (t.length <= 4) return t;
  return t.slice(0,2).toUpperCase();
}

function googleDrivePreview(url){
  // supports: https://drive.google.com/file/d/<ID>/view?...
  const m = url.match(/drive\.google\.com\/file\/d\/([^/]+)\//);
  if (!m) return null;
  return `https://drive.google.com/file/d/${m[1]}/preview`;
}
