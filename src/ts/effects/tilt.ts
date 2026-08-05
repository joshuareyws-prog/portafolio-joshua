const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isCoarsePointer = (): boolean =>
  window.matchMedia("(pointer: coarse)").matches;

const MAX_TILT = 16;

export function initTilt(): void {
  if (prefersReducedMotion() || isCoarsePointer()) {
    return;
  }

  const cards = document.querySelectorAll<HTMLElement>(".project-card");

  cards.forEach((card) => {
    const onMove = (event: MouseEvent): void => {
      const rect = card.getBoundingClientRect();
      const posX = (event.clientX - rect.left) / rect.width;
      const posY = (event.clientY - rect.top) / rect.height;
      const rotateY = (posX - 0.5) * MAX_TILT;
      const rotateX = (0.5 - posY) * MAX_TILT;

      card.style.transform =
        `perspective(900px) translateY(-6px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    };

    const onLeave = (): void => {
      card.style.transform = "";
    };

    card.addEventListener("mousemove", onMove, { passive: true });
    card.addEventListener("mouseleave", onLeave);
  });
}
