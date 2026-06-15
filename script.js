function toggleMenu() {
    const icon = document.querySelector(".hamburger-icon");
    const menu = document.querySelector(".menu-links");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.textContent = theme === "dark" ? "☀️" : "🌙";
    });
}

function initTheme() {
    const saved = localStorage.getItem("theme");
    applyTheme(saved || "light");

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            applyTheme(current === "dark" ? "light" : "dark");
        });
    });
}

function initScrollReveal() {
    const targets = document.querySelectorAll("section, footer");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    targets.forEach((target) => {
        target.classList.add("reveal");
        observer.observe(target);
    });
}

async function loadPartial(placeholderId, url) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;
    const response = await fetch(url);
    placeholder.outerHTML = await response.text();
}

document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        loadPartial("nav-placeholder", "./partials/nav.html"),
        loadPartial("footer-placeholder", "./partials/footer.html"),
    ]);
    initTheme();
    initScrollReveal();
});
