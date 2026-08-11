const TOGGLE_SELECTOR = "#themeToggle";
const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";
const ANIM_CLASS = "theme-anim";

const getInitialTheme = (): "dark" | "light" =>
  localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";

const applyTheme = (theme: "dark" | "light", toggle: HTMLElement): void => {
  const root = document.documentElement;

  if (theme === "dark") {
    root.setAttribute(THEME_ATTR, "dark");
  } else {
    root.removeAttribute(THEME_ATTR);
  }

  toggle.setAttribute("aria-pressed", String(theme === "light"));
};

const addAnimClass = (): void => {
  const root = document.documentElement;
  root.classList.add(ANIM_CLASS);
  window.setTimeout(() => root.classList.remove(ANIM_CLASS), 350);
};

export function initThemeToggle(): void {
  const toggle = document.querySelector<HTMLElement>(TOGGLE_SELECTOR);
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
