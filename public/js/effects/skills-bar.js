const SKILL_SELECTOR = "[data-skill]";
const FILL_SELECTOR = ".skill__bar-fill";
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animateSkill = (skill) => {
    const fill = skill.querySelector(FILL_SELECTOR);
    if (!fill) {
        return;
    }
    const target = Number(skill.dataset.skill ?? "0");
    fill.style.width = `${target}%`;
};
export function initSkillsBar() {
    const skills = document.querySelectorAll(SKILL_SELECTOR);
    if (skills.length === 0) {
        return;
    }
    if (prefersReducedMotion()) {
        return;
    }
    skills.forEach((skill) => {
        const fill = skill.querySelector(FILL_SELECTOR);
        if (fill) {
            fill.style.width = "0";
        }
    });
    if (!("IntersectionObserver" in window)) {
        skills.forEach(animateSkill);
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateSkill(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skills.forEach((skill) => observer.observe(skill));
}
