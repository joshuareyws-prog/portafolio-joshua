const SHOW_THRESHOLD = 400;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export function initBackToTop() {
    const button = document.querySelector("#backToTop");
    if (!button) {
        return;
    }
    const onScroll = () => {
        button.classList.toggle("visible", window.scrollY > SHOW_THRESHOLD);
    };
    const onClick = () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    button.addEventListener("click", onClick);
}
