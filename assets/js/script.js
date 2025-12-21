// Simple loader hide
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      loader.style.transition = "opacity 0.25s ease";
      setTimeout(() => loader.remove(), 250);
    }, 400);
  }
});

// Scroll progress bar
(function () {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = percent + "%";
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
})();

// Hamburger menu
(function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    }
  });
})();

// Click spark
(function () {
  const container = document.getElementById("click-spark-container");
  if (!container) return;

  const spawnSpark = (x, y) => {
    const spark = document.createElement("div");
    spark.className = "click-spark";
    spark.style.left = x + "px";
    spark.style.top = y + "px";
    container.appendChild(spark);
    spark.addEventListener("animationend", () => spark.remove());
  };

  window.addEventListener("click", (e) => {
    spawnSpark(e.clientX, e.clientY);
  });
})();

// Simple "pop" on clickable elements
(function () {
  const addTapAnimation = (selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("mousedown", () => {
        el.style.transform = "scale(0.98)";
      });
      el.addEventListener("mouseup", () => {
        el.style.transform = "";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
      el.addEventListener("touchstart", () => {
        el.style.transform = "scale(0.98)";
      });
      el.addEventListener("touchend", () => {
        el.style.transform = "";
      });
    });
  };

  addTapAnimation("a, button, .project-tile, .hobby-tile, .achievement-card");
})();

// Project routing: tile -> project_description.html?project=project1
(function () {
  const tiles = document.querySelectorAll(".project-tile");
  if (!tiles.length) return;

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const id = tile.getAttribute("data-project-id");
      if (!id) return;
      const url = new URL(window.location.origin + "/project_description.html");
      url.searchParams.set("project", id);
      window.location.href = url.pathname + url.search;
    });
  });
})();

// Dummy project data for description page
const PROJECT_DATA = {
  project1: {
    title: "Dummy Project One",
    problem: "Short problem statement describing what issue this project solves.",
    start: "Jan 2024",
    end: "Mar 2024",
    skills: ["Python", "Pandas", "Machine Learning"],
    description:
      "This is a dummy project description. Replace it with your own project details to explain what it does and how it is implemented.",
    live: "https://example.com/project1",
    github: "https://github.com/your-username/project1"
  },
  project2: {
    title: "Dummy Project Two",
    problem: "Another dummy problem statement for demonstration purposes.",
    start: "Jun 2024",
    end: "Aug 2024",
    skills: [".NET", "React", "PostgreSQL"],
    description:
      "Dummy project two description. You can update this block with your own project summary and technical highlights.",
    live: "https://example.com/project2",
    github: "https://github.com/your-username/project2"
  },
  project3: {
    title: "Dummy Project Three",
    problem: "Optional extra dummy project entry that you can reuse.",
    start: "Sep 2024",
    end: "Nov 2024",
    skills: ["Docker", "CI/CD"],
    description:
      "Dummy project three description. Feel free to rename or remove if not required.",
    live: "https://example.com/project3",
    github: "https://github.com/your-username/project3"
  }
};

// Populate project_description.html from query params
(function () {
  if (document.body.getAttribute("data-page") !== "project-detail") return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("project");

  const data = PROJECT_DATA[id] || null;
  const titleEl = document.getElementById("project-title");
  const dateSpan = document.querySelector("#project-dates span");
  const problemSpan = document.querySelector("#project-problem span");
  const descEl = document.getElementById("project-description-text");
  const skillsContainer = document.getElementById("project-skills-icons");
  const liveLink = document.getElementById("project-live-link");
  const githubLink = document.getElementById("project-github-link");

  if (!data) {
    if (titleEl) titleEl.textContent = "Project not found";
    if (descEl)
      descEl.textContent = "The requested project does not exist. Please select a project from the Projects page.";
    if (liveLink) liveLink.style.display = "none";
    if (githubLink) githubLink.style.display = "none";
    return;
  }

  if (titleEl) titleEl.textContent = data.title;
  if (dateSpan) dateSpan.textContent = `${data.start} – ${data.end}`;
  if (problemSpan) problemSpan.textContent = data.problem;
  if (descEl) descEl.textContent = data.description;

  if (skillsContainer) {
    skillsContainer.innerHTML = "";
    (data.skills || []).forEach((skill) => {
      const span = document.createElement("span");
      span.className = "skill-badge";
      span.textContent = skill;
      skillsContainer.appendChild(span);
    });
  }

  if (liveLink) {
    liveLink.href = data.live || "#";
    if (!data.live) liveLink.style.display = "none";
  }

  if (githubLink) {
    githubLink.href = data.github || "#";
    if (!data.github) githubLink.style.display = "none";
  }
})();
