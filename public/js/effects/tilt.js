const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;
const MAX_TILT = 16;
export function initTilt() {
    if (prefersReducedMotion() || isCoarsePointer()) {
        return;
    }
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
        const onMove = (event) => {
            const rect = card.getBoundingClientRect();
            const posX = (event.clientX - rect.left) / rect.width;
            const posY = (event.clientY - rect.top) / rect.height;
            const rotateY = (posX - 0.5) * MAX_TILT;
            const rotateX = (0.5 - posY) * MAX_TILT;
            card.style.transform =
                `perspective(900px) translateY(-6px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        };
        const onLeave = () => {
            card.style.transform = "";
        };
        card.addEventListener("mousemove", onMove, { passive: true });
        card.addEventListener("mouseleave", onLeave);
    });
}
