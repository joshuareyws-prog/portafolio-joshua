const TOGGLE_SELECTOR = "#themeToggle";
const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";
const ANIM_CLASS = "theme-anim";

const getPreferredTheme = (): "dark" | "light" =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const getInitialTheme = (): "dark" | "light" => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : getPreferredTheme();
};

const applyTheme = (theme: "dark" | "light", toggle: HTMLElement): void => {
  const root = document.documentElement;

  if (theme === "light") {
    root.setAttribute(THEME_ATTR, "light");
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

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (event) => {
      if (localStorage.getItem(STORAGE_KEY)) {
        return;
      }
      theme = event.matches ? "light" : "dark";
      applyTheme(theme, toggle);
    });
}
