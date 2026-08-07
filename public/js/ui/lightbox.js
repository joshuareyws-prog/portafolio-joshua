const LIGHTBOX_SELECTOR = "#lightbox";
const TRIGGER_SELECTOR = ".project-card__media";
const OPEN_CLASS = "open";
export function initLightbox() {
    const lightbox = document.querySelector(LIGHTBOX_SELECTOR);
    if (!lightbox) {
        return;
    }
    const image = lightbox.querySelector(".lightbox__img");
    const closeButton = lightbox.querySelector(".lightbox__close");
    if (!image || !closeButton) {
        return;
    }
    const open = (img) => {
        image.src = img.currentSrc || img.src;
        image.alt = img.alt || "";
        lightbox.classList.add(OPEN_CLASS);
        document.body.style.overflow = "hidden";
        closeButton.focus();
    };
    const close = () => {
        lightbox.classList.remove(OPEN_CLASS);
        document.body.style.overflow = "";
    };
    document.querySelectorAll(TRIGGER_SELECTOR).forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const img = trigger.querySelector("img");
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
