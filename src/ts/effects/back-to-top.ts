const SHOW_THRESHOLD = 400;

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initBackToTop(): void {
  const button = document.querySelector<HTMLButtonElement>("#backToTop");
  if (!button) {
    return;
  }

  const onScroll = (): void => {
    button.classList.toggle("visible", window.scrollY > SHOW_THRESHOLD);
  };

  const onClick = (): void => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  button.addEventListener("click", onClick);
}
