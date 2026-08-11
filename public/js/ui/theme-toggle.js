const TOGGLE_SELECTOR = "#themeToggle";
const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";
const ANIM_CLASS = "theme-anim";
const getInitialTheme = () => localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
const applyTheme = (theme, toggle) => {
    const root = document.documentElement;
    if (theme === "dark") {
        root.setAttribute(THEME_ATTR, "dark");
    }
    else {
        root.setAttribute(THEME_ATTR, "light");
    }
    toggle.setAttribute("aria-pressed", String(theme === "light"));
};
const addAnimClass = () => {
    const root = document.documentElement;
    root.classList.add(ANIM_CLASS);
    window.setTimeout(() => root.classList.remove(ANIM_CLASS), 350);
};
export function initThemeToggle() {
    const toggle = document.querySelector(TOGGLE_SELECTOR);
    if (!toggle) {
        return;
    }
    let theme = getInitialTheme();
    applyTheme(theme, toggle);
    toggle.addEventListener("click", () => {
        theme = theme === "light" ? "dark" : "light";
        localStorage.setItem(STORAGE_KEY, theme);
        addAnimClass();
        applyTheme(theme, toggle);
    });
}
