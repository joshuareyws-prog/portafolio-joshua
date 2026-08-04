const REVEAL_SELECTOR = "[data-reveal]";
const REVEALED_CLASS = "revealed";
const SKILL_SELECTOR = "[data-skill]";
const BAR_SELECTOR = "[data-bar]";
const COUNTER_SELECTOR = "[data-counter]";

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add(REVEALED_CLASS));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(REVEALED_CLASS);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((element) => observer.observe(element));
}

export function initProgressBars(): void {
  const skills = document.querySelectorAll<HTMLElement>(SKILL_SELECTOR);

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    skills.forEach((skill) => {
      const bar = skill.querySelector<HTMLElement>(BAR_SELECTOR);
      if (bar) {
        bar.style.width = `${Number(skill.dataset.skill) || 0}%`;
      }
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const skill = entry.target as HTMLElement;
        const bar = skill.querySelector<HTMLElement>(BAR_SELECTOR);
        if (bar) {
          const percent = Math.min(Math.max(Number(skill.dataset.skill) || 0, 0), 100);
          window.setTimeout(() => {
            bar.style.width = `${percent}%`;
          }, 150);
        }

        observer.unobserve(skill);
      });
    },
    { threshold: 0.35 },
  );

  skills.forEach((skill) => observer.observe(skill));
}

export function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>(COUNTER_SELECTOR);

  const animate = (counter: HTMLElement): void => {
    const target = Number(counter.dataset.counter) || 0;
    const suffix = counter.dataset.suffix ?? "";
    const duration = 1400;
    const start = performance.now();

    const step = (now: number): void => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(eased * target)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    counters.forEach((counter) => {
      counter.textContent = `${counter.dataset.counter ?? "0"}${counter.dataset.suffix ?? ""}`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
}
