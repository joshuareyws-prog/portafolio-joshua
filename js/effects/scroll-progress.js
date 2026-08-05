export function initScrollProgress() {
    const bar = document.querySelector("#scrollProgress");
    if (!bar) {
        return;
    }
    let frameId = 0;
    const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        bar.style.transform = `scaleX(${ratio})`;
        frameId = 0;
    };
    const onScroll = () => {
        if (frameId === 0) {
            frameId = requestAnimationFrame(update);
        }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
}
