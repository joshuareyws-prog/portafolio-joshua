const REVEAL_SELECTOR = "[data-reveal]";
const REVEALED_CLASS = "revealed";
const READY_CLASS = "reveal-ready";
const DELAY_STEP_MS = 150;

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initReveal(): void {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    return;
  }

  const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  if (elements.length === 0) {
    return;
  }

  document.documentElement.classList.add(READY_CLASS);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add(REVEALED_CLASS);
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
  );

  elements.forEach((element) => {
    const delay = Number(element.dataset.revealDelay ?? "0");
    if (delay > 0) {
      element.style.transitionDelay = `${delay * DELAY_STEP_MS}ms`;
    }
    observer.observe(element);
  });
}
