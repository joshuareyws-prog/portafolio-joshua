const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;
const MAGNETIC_FACTOR = 0.2;
export function initMagnetic() {
    if (prefersReducedMotion() || isCoarsePointer()) {
        return;
    }
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        const onMove = (event) => {
            const rect = button.getBoundingClientRect();
            const dx = event.clientX - (rect.left + rect.width / 2);
            const dy = event.clientY - (rect.top + rect.height / 2);
            button.style.transform =
                `translate(${(dx * MAGNETIC_FACTOR).toFixed(1)}px, ${(dy * MAGNETIC_FACTOR).toFixed(1)}px)`;
        };
        const onLeave = () => {
            button.style.transition = "transform 0.3s ease";
            button.style.transform = "";
            window.setTimeout(() => {
                button.style.transition = "";
            }, 300);
        };
        button.addEventListener("mousemove", onMove, { passive: true });
        button.addEventListener("mouseleave", onLeave);
    });
}
