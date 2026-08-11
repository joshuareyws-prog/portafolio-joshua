import { initNavbar } from "./ui/navbar.js";
import { initLightbox } from "./ui/lightbox.js";
import { initMobileMenu } from "./ui/mobile-menu.js";
import { initScrollProgress } from "./effects/scroll-progress.js";
import { initBackToTop } from "./effects/back-to-top.js";
const initFooterYear = () => {
    const year = document.querySelector("#year");
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }
};
const initContactForm = () => {
    const form = document.querySelector("#contactForm");
    const status = document.querySelector("#formStatus");
    if (!form || !status) {
        return;
    }
    const setStatus = (message, isError) => {
        status.textContent = message;
        status.classList.toggle("form__status--error", isError);
        status.classList.add("show");
    };
    const hideStatus = () => {
        status.classList.remove("show");
    };
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.querySelector("#name")?.value.trim();
        const email = document.querySelector("#email")?.value.trim();
        const message = document.querySelector("#message")?.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !message) {
            setStatus("Por favor completa todos los campos.", true);
            return;
        }
        if (!emailPattern.test(email)) {
            setStatus("Ingresa un correo electrónico válido.", true);
            return;
        }
        const button = form.querySelector('button[type="submit"]');
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
            const data = (await response.json());
            if (!response.ok || !data.success) {
                throw new Error(data.message ?? "Web3Forms error");
            }
            form.reset();
            setStatus("¡Mensaje enviado! Te responderé pronto.", false);
        }
        catch (error) {
            const detail = error instanceof Error ? error.message : "";
            const fallback = "Hubo un problema al enviar el mensaje. Intenta de nuevo.";
            const isApiError = detail && detail !== "Web3Forms error";
            setStatus(isApiError ? `Error: ${detail}` : fallback, true);
            console.error(error);
        }
        finally {
            if (button) {
                button.disabled = false;
                button.textContent = originalText;
            }
        }
        window.setTimeout(hideStatus, 6000);
    });
};
function main() {
    initFooterYear();
    initNavbar();
    initLightbox();
    initMobileMenu();
    initContactForm();
    initScrollProgress();
    initBackToTop();
}
main();
