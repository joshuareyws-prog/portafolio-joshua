const TYPED_SELECTOR = "#typed";
const CURSOR_SELECTOR = "#typedCursor";
const PHRASES = [
    "Ingeniero en Desarrollo y Tecnologías de Software.",
    "Construyo sitios web modernos y responsivos.",
];
const TYPE_SPEED = 70;
const DELETE_SPEED = 35;
const HOLD_TIME = 1800;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export function initTyping() {
    const element = document.querySelector(TYPED_SELECTOR);
    const cursor = document.querySelector(CURSOR_SELECTOR);
    if (!element || !cursor) {
        return;
    }
    if (prefersReducedMotion()) {
        element.textContent = PHRASES[0] ?? "";
        cursor.style.display = "none";
        return;
    }
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const type = () => {
        const phrase = PHRASES[phraseIndex] ?? "";
        const current = deleting ? phrase.length - 1 : phrase.length + 1;
        charIndex = deleting ? charIndex - 1 : charIndex + 1;
        element.textContent = phrase.substring(0, charIndex);
        let delay = deleting ? DELETE_SPEED : TYPE_SPEED;
        if (!deleting && charIndex === current - 1 && charIndex === phrase.length) {
            deleting = true;
            delay = HOLD_TIME;
        }
        else if (deleting && charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % PHRASES.length;
            delay = TYPE_SPEED;
        }
        window.setTimeout(type, delay);
    };
    type();
}
