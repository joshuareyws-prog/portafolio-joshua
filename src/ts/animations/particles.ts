interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
  pulse: number;
}

const PARTICLE_COLOR = "139, 92, 246";
const MIN_PARTICLES = 28;
const MAX_PARTICLES = 60;

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const countForScreen = (): number => {
  const width = window.innerWidth;
  const factor = Math.min(width / 24, MAX_PARTICLES);
  return Math.max(Math.floor(factor), MIN_PARTICLES);
};

export function initParticles(): void {
  if (prefersReducedMotion()) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.id = "particles";
  const style = canvas.style;
  style.position = "fixed";
  style.inset = "0";
  style.width = "100vw";
  style.height = "100vh";
  style.zIndex = "-1";
  style.pointerEvents = "none";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  let particles: Particle[] = [];
  let rafId = 0;

  const resize = (): void => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: countForScreen() }, () => createParticle());
  };

  const createParticle = (): Particle => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.2 + 0.6,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.35 + 0.1,
    pulse: Math.random() * Math.PI * 2,
  });

  const draw = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.pulse += 0.02;

      if (particle.x < 0) {
        particle.x = canvas.width;
      } else if (particle.x > canvas.width) {
        particle.x = 0;
      }
      if (particle.y < 0) {
        particle.y = canvas.height;
      } else if (particle.y > canvas.height) {
        particle.y = 0;
      }

      const twinkle = 0.55 + Math.sin(particle.pulse) * 0.45;
      const alpha = particle.alpha * twinkle;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${alpha.toFixed(3)})`;
      ctx.fill();
    });

    rafId = requestAnimationFrame(draw);
  };

  resize();
  draw();

  window.addEventListener("resize", resize, { passive: true });

  const cleanup = (): void => {
    window.cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };

  window.addEventListener("pagehide", cleanup, { once: true });
}
