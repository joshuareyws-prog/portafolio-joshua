import { initNavbar } from "./ui/navbar.js";
import { initThemeToggle } from "./ui/theme-toggle.js";
import { initLightbox } from "./ui/lightbox.js";
import { initMobileMenu } from "./ui/mobile-menu.js";
import { initScrollProgress } from "./effects/scroll-progress.js";
import { initBackToTop } from "./effects/back-to-top.js";

const initFooterYear = (): void => {
  const year = document.querySelector<HTMLElement>("#year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
};

const initContactForm = (): void => {
  const form = document.querySelector<HTMLFormElement>("#contactForm");
  const status = document.querySelector<HTMLElement>("#formStatus");

  if (!form || !status) {
    return;
  }

  const setStatus = (message: string, isError: boolean): void => {
    status.textContent = message;
    status.classList.toggle("form__status--error", isError);
    status.classList.add("show");
  };

  const hideStatus = (): void => {
    status.classList.remove("show");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector<HTMLInputElement>("#name")?.value.trim();
    const email = document.querySelector<HTMLInputElement>("#email")?.value.trim();
    const message = document.querySelector<HTMLTextAreaElement>("#message")?.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      setStatus("Por favor completa todos los campos.", true);
      return;
    }

    if (!emailPattern.test(email)) {
      setStatus("Ingresa un correo electrónico válido.", true);
      return;
    }

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const originalText = button?.textContent ?? "Enviar mensaje";

    if (button) {
      button.disabled = true;
      button.textContent = "Enviando...";
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      const data = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Web3Forms error");
      }

      form.reset();
      setStatus("¡Mensaje enviado! Te responderé pronto.", false);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "";
      const fallback = "Hubo un problema al enviar el mensaje. Intenta de nuevo.";
      const isApiError = detail && detail !== "Web3Forms error";
      setStatus(isApiError ? `Error: ${detail}` : fallback, true);
      console.error(error);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }

    window.setTimeout(hideStatus, 6000);
  });
};

function main(): void {
  initFooterYear();
  initNavbar();
  initThemeToggle();
  initLightbox();
  initMobileMenu();
  initContactForm();
  initScrollProgress();
  initBackToTop();
}

main();
