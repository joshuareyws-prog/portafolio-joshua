const LIGHTBOX_SELECTOR = "#lightbox";
const TRIGGER_SELECTOR = ".project-card__media";
const OPEN_CLASS = "open";

export function initLightbox(): void {
  const lightbox = document.querySelector<HTMLElement>(LIGHTBOX_SELECTOR);
  if (!lightbox) {
    return;
  }

  const image = lightbox.querySelector<HTMLImageElement>(".lightbox__img");
  const closeButton = lightbox.querySelector<HTMLButtonElement>(".lightbox__close");
  if (!image || !closeButton) {
    return;
  }

  const open = (img: HTMLImageElement): void => {
    image.src = img.currentSrc || img.src;
    image.alt = img.alt || "";
    lightbox.classList.add(OPEN_CLASS);
    document.body.style.overflow = "hidden";
    closeButton.focus();
  };

  const close = (): void => {
    lightbox.classList.remove(OPEN_CLASS);
    document.body.style.overflow = "";
  };

  document.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR).forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const img = trigger.querySelector<HTMLImageElement>("img");
      if (img) {
        open(img);
      }
    });
  });

  closeButton.addEventListener("click", close);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      close();
    }
  });
}
