type Flake = {
  x: number;
  y: number;
  radius: number;
  fall: number;
  drift: number;
  phase: number;
  alpha: number;
};

const PIXELS_PER_FLAKE = 9000;
const MAX_PIXEL_RATIO = 2;
const MAX_FRAME_SECONDS = 0.05;

function makeFlake(width: number, height: number, aboveTop: boolean): Flake {
  const depth = Math.random();
  return {
    x: Math.random() * width,
    y: aboveTop ? -10 - Math.random() * height : Math.random() * height,
    radius: 1 + depth * 2.6,
    fall: 24 + depth * 62,
    drift: 8 + Math.random() * 18,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.35 + depth * 0.6,
  };
}

export function startSnow(canvas: HTMLCanvasElement, { max, fromTop }: { max: number; fromTop: boolean }) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  let width = 0;
  let height = 0;
  let flakes: Flake[] = [];
  let frame = 0;
  let last = 0;
  let visible = true;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const target = Math.min(max, Math.round((width * height) / PIXELS_PER_FLAKE) + 24);
    flakes = flakes.slice(0, target);
    while (flakes.length < target) flakes.push(makeFlake(width, height, fromTop));
  };

  const draw = (now: number) => {
    const seconds = Math.min((now - last) / 1000, MAX_FRAME_SECONDS);
    last = now;
    context.clearRect(0, 0, width, height);
    context.fillStyle = getComputedStyle(canvas).color;
    for (const flake of flakes) {
      flake.y += flake.fall * seconds;
      flake.phase += seconds;
      if (flake.y > height + 6) {
        flake.y = -6;
        flake.x = Math.random() * width;
      }
      context.globalAlpha = flake.alpha;
      context.beginPath();
      context.arc(flake.x + Math.sin(flake.phase) * flake.drift, flake.y, flake.radius, 0, Math.PI * 2);
      context.fill();
    }
    frame = requestAnimationFrame(draw);
  };

  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const resume = () => {
    if (frame || !visible) return;
    last = performance.now();
    frame = requestAnimationFrame(draw);
  };

  const sizeObserver = new ResizeObserver(resize);
  const viewObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) resume();
    else pause();
  });

  resize();
  resume();
  sizeObserver.observe(canvas);
  viewObserver.observe(canvas);

  return () => {
    pause();
    sizeObserver.disconnect();
    viewObserver.disconnect();
  };
}
