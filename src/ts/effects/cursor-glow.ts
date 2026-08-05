const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isCoarsePointer = (): boolean =>
  window.matchMedia("(pointer: coarse)").matches;

export function initCursorGlow(): void {
  if (prefersReducedMotion() || isCoarsePointer()) {
    return;
  }

  const glow = document.createElement("div");
  glow.id = "cursorGlow";
  glow.setAttribute("aria-hidden", "true");
  document.body.appendChild(glow);

  let frameId = 0;
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;

  const render = (): void => {
    glow.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    frameId = 0;
  };

  const onMove = (event: MouseEvent): void => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (frameId === 0) {
      frameId = requestAnimationFrame(render);
    }
  };

  const cleanup = (): void => {
    window.removeEventListener("mousemove", onMove);
    glow.remove();
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("pagehide", cleanup, { once: true });
}
