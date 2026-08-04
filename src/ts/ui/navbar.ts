const NAVBAR_SELECTOR = "#navbar";
const SCROLLED_CLASS = "scrolled";

export function initNavbar(): void {
  const navbar = document.querySelector<HTMLElement>(NAVBAR_SELECTOR);
  if (!navbar) {
    return;
  }

  const onScroll = (): void => {
    navbar.classList.toggle(SCROLLED_CLASS, window.scrollY > 10);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
