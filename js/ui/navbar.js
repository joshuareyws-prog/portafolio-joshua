const NAVBAR_SELECTOR = "#navbar";
const SCROLLED_CLASS = "scrolled";
export function initNavbar() {
    const navbar = document.querySelector(NAVBAR_SELECTOR);
    if (!navbar) {
        return;
    }
    const onScroll = () => {
        navbar.classList.toggle(SCROLLED_CLASS, window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}
