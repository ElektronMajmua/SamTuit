"use strict";

const pdfFiles = {
  "amaliyot-submenu": Array.from({ length: 15 }, (_, i) => `${i + 1}-mavzu.pdf`),
  "maruza-submenu": Array.from({ length: 15 }, (_, i) => `${i + 1}-mavzu.pdf`)
};

window.onload = () => {
  loadMenus();
  setInitialMessage();
  document.addEventListener("click", closeAllSubmenus);
};

function loadMenus() {
  Object.entries(pdfFiles).forEach(([submenuId, files]) => {
    const submenu = document.getElementById(submenuId);
    files.forEach(file => {
      const div = document.createElement("div");
      div.textContent = file.replace(".pdf", "");
      div.className = "submenu-item";
      div.onclick = e => {
        e.stopPropagation();
        showPDF(`${submenuId.startsWith("amaliyot") ? "amaliyot" : "maruza"}/${file}`);
        closeAllSubmenus();
      };
      submenu.appendChild(div);
    });
  });
}

function toggleSubmenu(event, id) {
  event.stopPropagation();
  const submenu = document.getElementById(id);
  const isActive = submenu.classList.contains("active");
  closeAllSubmenus();
  if (!isActive) submenu.classList.add("active");
}

function closeAllSubmenus() {
  document.querySelectorAll(".submenu.active").forEach(el => el.classList.remove("active"));
}

function showPDF(path) {
  document.getElementById("pdf-viewer").innerHTML =
    `<iframe src="${path}#toolbar=0&zoom=65"></iframe>`;
}

function setInitialMessage() {
  document.getElementById("pdf-viewer").innerHTML = `
    <div class="home-message">
      <h1>Elektron Majmuaga Xush Kelibsiz!</h1>
      <p>Iltimos, chapdagi menyudan bo‘lim tanlang va PDF hujjat bilan tanishing.</p>
    </div>
  `;
}
