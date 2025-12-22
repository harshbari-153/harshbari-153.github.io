// Hamburger
document.querySelector(".nav-toggle")?.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("show");
});

// Scroll progress
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  document.getElementById("scroll-progress").style.width =
    (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
});

// Project forwarding
function openProject(id) {
  localStorage.setItem("projectId", id);
  window.location.href = "project_description.html";
}

// Click spark
document.addEventListener("click", e => {
  const s = document.createElement("span");
  s.className = "spark";
  s.style.left = e.pageX + "px";
  s.style.top = e.pageY + "px";
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 600);
});
