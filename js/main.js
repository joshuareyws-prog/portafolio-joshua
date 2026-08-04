import { initNavbar } from "./ui/navbar.js";
import { initMobileMenu } from "./ui/mobile-menu.js";
import { initTyping } from "./animations/typing.js";
import { initReveal, initProgressBars, initCounters } from "./animations/reveal.js";
import { initParticles } from "./animations/particles.js";
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
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.querySelector("#name")?.value.trim();
        const email = document.querySelector("#email")?.value.trim();
        const message = document.querySelector("#message")?.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !message) {
            status.textContent = "Por favor completa todos los campos.";
            status.classList.add("show");
            return;
        }
        if (!emailPattern.test(email)) {
            status.textContent = "Ingresa un correo electrónico válido.";
            status.classList.add("show");
            return;
        }
        form.reset();
        status.textContent = "¡Mensaje enviado! Te responderé pronto.";
        status.classList.add("show");
        window.setTimeout(() => {
            status.classList.remove("show");
        }, 6000);
    });
};
function main() {
    initFooterYear();
    initNavbar();
    initMobileMenu();
    initTyping();
    initReveal();
    initProgressBars();
    initCounters();
    initContactForm();
    initParticles();
}
main();
