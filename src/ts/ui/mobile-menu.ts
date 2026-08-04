const TOGGLE_SELECTOR = "#navToggle";
const LINKS_SELECTOR = "#navLinks";
const OPEN_CLASS = "open";

export function initMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>(TOGGLE_SELECTOR);
  const links = document.querySelector<HTMLElement>(LINKS_SELECTOR);

  if (!toggle || !links) {
    return;
  }

  const closeMenu = (): void => {
    toggle.classList.remove(OPEN_CLASS);
    links.classList.remove(OPEN_CLASS);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  };

  const openMenu = (): void => {
    toggle.classList.add(OPEN_CLASS);
    links.classList.add(OPEN_CLASS);
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
  };

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.contains(OPEN_CLASS);
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const target = event.target as Node;
    if (!links.contains(target) && !toggle.contains(target)) {
      closeMenu();
    }
  });
}
