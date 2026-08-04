const TOGGLE_SELECTOR = "#navToggle";
const LINKS_SELECTOR = "#navLinks";
const OPEN_CLASS = "open";
export function initMobileMenu() {
    const toggle = document.querySelector(TOGGLE_SELECTOR);
    const links = document.querySelector(LINKS_SELECTOR);
    if (!toggle || !links) {
        return;
    }
    const closeMenu = () => {
        toggle.classList.remove(OPEN_CLASS);
        links.classList.remove(OPEN_CLASS);
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
    };
    const openMenu = () => {
        toggle.classList.add(OPEN_CLASS);
        links.classList.add(OPEN_CLASS);
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Cerrar menú");
    };
    toggle.addEventListener("click", () => {
        const isOpen = links.classList.contains(OPEN_CLASS);
        if (isOpen) {
            closeMenu();
        }
        else {
            openMenu();
        }
    });
    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!links.contains(target) && !toggle.contains(target)) {
            closeMenu();
        }
    });
}
