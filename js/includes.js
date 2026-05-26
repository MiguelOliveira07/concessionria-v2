async function loadComponent(id, file) {

    const element = document.getElementById(id);
    if (!element) return;

    try {

        const response = await fetch(file);
        const data = await response.text();

        element.innerHTML = data;

        if (id === "header") {
            configurarLinks();
            configurarMenuMobile();
        }

    } catch (error) {
        console.error("Erro ao carregar componente:", error);
    }
}


/* =========================
   BASE AUTOMÁTICO
========================= */
const base = window.location.pathname.includes("/pages/") ? "../" : "";


/* =========================
   HISTÓRICO (SESSÃO)
========================= */
const CURRENT_KEY = "current_page";
const PREV_KEY = "prev_page";


function registrarPagina() {

    const current = window.location.pathname;
    const prev = sessionStorage.getItem(CURRENT_KEY);

    if (prev && prev !== current) {
        sessionStorage.setItem(PREV_KEY, prev);
    }

    sessionStorage.setItem(CURRENT_KEY, current);
}


/* =========================
   COMPONENTES
========================= */
loadComponent("header", base + "componentes/header.html");
loadComponent("footer", base + "componentes/footer.html");


/* =========================
   LINKS DO MENU
========================= */
function configurarLinks() {

    const setSafeHref = (selector, path) => {
        const el = document.querySelector(selector);
        if (el) el.href = base + path;
    };

    setSafeHref(".nav-home", "index.html");
    setSafeHref(".nav-catalogo", "catalogo.html");
    setSafeHref(".nav-galeria", "galeria.html");
    setSafeHref(".nav-destaques", "em-destaque.html");
    setSafeHref(".nav-sobre", "sobre.html");
    setSafeHref(".nav-contato", "contato.html");

    // 🔥 LOGO CLICÁVEL (CORRETO ENTRE PASTAS)
    setSafeHref(".nav-logo", "index.html");
}


/* =========================
   MENU MOBILE
========================= */
function configurarMenuMobile() {

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }
}


/* =========================
   VOLTAR SEGURO
========================= */
window.voltarProjeto = function (event) {

    event.preventDefault();

    const prev = sessionStorage.getItem(PREV_KEY);

    sessionStorage.removeItem(PREV_KEY);

    if (!prev) {
        window.location.href = base + "index.html";
        return;
    }

    const isExterno =
        prev.startsWith("http") ||
        prev.startsWith("file:") ||
        !prev.includes("/project-main/");

    if (isExterno) {
        window.location.href = base + "index.html";
        return;
    }

    window.location.href = prev;
};


/* =========================
   INICIALIZAÇÃO
========================= */
document.addEventListener("DOMContentLoaded", () => {
    registrarPagina();
});