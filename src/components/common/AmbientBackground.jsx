import { useEffect, useRef } from "react";

const DEFAULT_LABELS = [
  "C#",
  ".NET 8",
  "ASP.NET Core",
  "EF Core",
  "LINQ",
  "SQL Server",
  "REST APIs",
  "Angular",
  "TypeScript",
  "RxJS",
  "React",
  "Next.js",
  "Tailwind",
  "Git",
  "MongoDB",
  "Firebase",
  "Supabase",
  "Clean Architecture",
];

const PALETTE = {
  dark: {
    ink: "217, 218, 220",
    accent: "255, 201, 60",
    node: 0.55,
    edge: 0.17,
    label: 0.46,
  },
  light: {
    ink: "43, 45, 49",
    accent: "176, 118, 0",
    node: 0.55,
    edge: 0.18,
    label: 0.6,
  },
};

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const font = (px) =>
  `500 ${px}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

const CSS = `
@keyframes eb-drift-a {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(48px, 34px, 0) scale(1.08); }
}
@keyframes eb-drift-b {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-56px, -28px, 0) scale(1.1); }
}
.eb-orb { will-change: transform; }
@media (prefers-reduced-motion: reduce) { .eb-orb { animation: none !important; } }
`;

export default function EngineeringBackground({
  darkMode = true,
  labels = DEFAULT_LABELS,
}) {
  const canvasRef = useRef(null);
  const themeRef = useRef(darkMode);
  const labelsRef = useRef(labels);
  const invalidateRef = useRef(() => {});
  const labelsKey = labels.join("|");

  useEffect(() => {
    themeRef.current = darkMode;
    invalidateRef.current();
  }, [darkMode]);

  useEffect(() => {
    labelsRef.current = labels;
  }, [labelsKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const names = shuffle(labelsRef.current);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let linkDist = 175;
    let nodes = [];
    let pulses = [];
    let adj = [];
    let edges = [];
    let raf = 0;
    let last = 0;
    let running = false;
    let tick = 0;
    let spawnClock = 0;
    let resizeTimer = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      target: 0,
      strength: 0,
      sx: -9999,
      sy: -9999,
    };
    const parallax = { x: 0, y: 0 };

    const palette = () => (themeRef.current ? PALETTE.dark : PALETTE.light);

    const createNodes = () => {
      const small = width < 640;
      const total = small
        ? 24
        : Math.min(54, Math.max(30, Math.round(width / 28)));
      const labelCount = Math.min(names.length, small ? 10 : names.length);
      const aspect = width / height;
      const gridCols = Math.max(1, Math.ceil(Math.sqrt(total * aspect)));
      const gridRows = Math.max(1, Math.ceil(total / gridCols));
      const cw = width / gridCols;
      const ch = height / gridRows;
      const spots = [];
      for (let i = 0; i < gridCols; i++) {
        for (let j = 0; j < gridRows; j++) {
          spots.push({
            x: (i + rand(0.15, 0.85)) * cw,
            y: (j + rand(0.15, 0.85)) * ch,
          });
        }
      }
      nodes = shuffle(spots)
        .slice(0, total)
        .map((s, i) => {
          const labeled = i < labelCount;
          return {
            x: s.x,
            y: s.y,
            dx: s.x,
            dy: s.y,
            vx: rand(-0.22, 0.22),
            vy: rand(-0.22, 0.22),
            z: labeled ? rand(0.9, 1.5) : rand(0.5, 1.1),
            phase: rand(0, TAU),
            label: labeled ? names[i] : null,
            glow: 0,
            hl: 0,
          };
        });
      pulses = [];
      adj = nodes.map(() => []);
      edges = [];
    };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const widthChanged = w !== width;
      width = w;
      height = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      linkDist = width < 640 ? 125 : width < 1024 ? 150 : 175;
      if (widthChanged || !nodes.length) createNodes();
      if (!running) render(0);
    };

    const nearest = (x, y, maxDist) => {
      let best = -1;
      let bestD = maxDist;
      for (let i = 0; i < nodes.length; i++) {
        const d = Math.hypot(nodes[i].dx - x, nodes[i].dy - y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    };

    const spawnPulse = (from, to, hops) => {
      if (pulses.length > 9) return;
      pulses.push({ from, to, t: 0, v: rand(1.8, 2.8), hops });
    };

    const render = (dt) => {
      const p = palette();
      const hot = mouse.strength > 0.01;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.dx = n.x + parallax.x * 26 * n.z;
        n.dy = n.y + parallax.y * 26 * n.z;
      }

      const hovered = hot ? nearest(mouse.sx, mouse.sy, 120) : -1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.hl += ((i === hovered ? 1 : 0) - n.hl) * Math.min(1, 0.18 * dt);
        n.glow *= Math.pow(0.93, dt);
      }

      adj = nodes.map(() => []);
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(
            nodes[i].dx - nodes[j].dx,
            nodes[i].dy - nodes[j].dy,
          );
          if (d < linkDist) {
            edges.push({ i, j, a: 1 - d / linkDist });
            adj[i].push(j);
            adj[j].push(i);
          }
        }
      }

      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      for (const e of edges) {
        const A = nodes[e.i];
        const B = nodes[e.j];
        const lit = Math.max(A.hl, B.hl);
        ctx.strokeStyle =
          lit > 0.02
            ? `rgba(${p.accent}, ${p.edge * e.a + 0.5 * lit * e.a})`
            : `rgba(${p.ink}, ${p.edge * e.a})`;
        ctx.beginPath();
        ctx.moveTo(A.dx, A.dy);
        ctx.lineTo(B.dx, B.dy);
        ctx.stroke();
      }

      spawnClock += dt;
      if (!reduced && spawnClock > 50 && edges.length) {
        spawnClock = -rand(0, 40);
        const e = edges[Math.floor(Math.random() * edges.length)];
        const flip = Math.random() < 0.5;
        spawnPulse(flip ? e.i : e.j, flip ? e.j : e.i, 2);
      }

      for (let k = pulses.length - 1; k >= 0; k--) {
        const pl = pulses[k];
        const A = nodes[pl.from];
        const B = nodes[pl.to];
        const len = Math.max(40, Math.hypot(B.dx - A.dx, B.dy - A.dy));
        pl.t += (pl.v * dt) / len;
        if (pl.t >= 1) {
          B.glow = 1;
          pulses.splice(k, 1);
          if (pl.hops > 0) {
            const options = (adj[pl.to] || []).filter((x) => x !== pl.from);
            if (options.length) {
              spawnPulse(
                pl.to,
                options[Math.floor(Math.random() * options.length)],
                pl.hops - 1,
              );
            }
          }
          continue;
        }
        const x = A.dx + (B.dx - A.dx) * pl.t;
        const y = A.dy + (B.dy - A.dy) * pl.t;
        const tt = Math.max(0, pl.t - 0.14);
        ctx.strokeStyle = `rgba(${p.accent}, 0.55)`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(A.dx + (B.dx - A.dx) * tt, A.dy + (B.dy - A.dy) * tt);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${p.accent}, 0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, TAU);
        ctx.fill();
      }
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const depth = n.z / 1.5;
        const g = Math.max(n.glow, n.hl * 0.85);
        const r = 1.5 * n.z + 0.6 + n.hl * 1.8;

        if (g > 0.02) {
          ctx.fillStyle = `rgba(${p.accent}, ${g * 0.2})`;
          ctx.beginPath();
          ctx.arc(n.dx, n.dy, r + 10 * g, 0, TAU);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${p.ink}, ${p.node * (0.5 + 0.5 * depth)})`;
        ctx.beginPath();
        ctx.arc(n.dx, n.dy, r, 0, TAU);
        ctx.fill();
        if (g > 0.02) {
          ctx.fillStyle = `rgba(${p.accent}, ${Math.min(1, g * 1.2)})`;
          ctx.beginPath();
          ctx.arc(n.dx, n.dy, r, 0, TAU);
          ctx.fill();
        }

        if (n.label) {
          ctx.strokeStyle = `rgba(${g > 0.3 ? p.accent : p.ink}, ${0.18 + 0.4 * g})`;
          ctx.beginPath();
          ctx.arc(n.dx, n.dy, r + 3.5, 0, TAU);
          ctx.stroke();

          ctx.font = font(Math.round((10 + n.z * 1.6) * 10) / 10);
          const right =
            n.dx + r + 9 + ctx.measureText(n.label).width > width - 8;
          ctx.textAlign = right ? "right" : "left";
          ctx.textBaseline = "middle";
          const tx = n.dx + (right ? -(r + 9) : r + 9);
          ctx.fillStyle = `rgba(${p.ink}, ${Math.min(0.95, p.label * (0.6 + 0.4 * depth) + n.hl * 0.4)})`;
          ctx.fillText(n.label, tx, n.dy);
          if (g > 0.05) {
            ctx.fillStyle = `rgba(${p.accent}, ${Math.min(1, g)})`;
            ctx.fillText(n.label, tx, n.dy);
          }
        }
      }
    };

    const step = (dt) => {
      tick += 0.012 * dt;
      mouse.strength +=
        (mouse.target - mouse.strength) * Math.min(1, 0.12 * dt);
      mouse.sx += (mouse.x - mouse.sx) * Math.min(1, 0.3 * dt);
      mouse.sy += (mouse.y - mouse.sy) * Math.min(1, 0.3 * dt);

      const tx = mouse.target ? mouse.x / width - 0.5 : 0;
      const ty = mouse.target ? mouse.y / height - 0.5 : 0;
      parallax.x += (tx - parallax.x) * Math.min(1, 0.05 * dt);
      parallax.y += (ty - parallax.y) * Math.min(1, 0.05 * dt);

      const hot = mouse.strength > 0.05;
      for (const n of nodes) {
        n.x += (n.vx + Math.sin(tick * 60 * 0.012 + n.phase) * 0.08) * dt;
        n.y += (n.vy + Math.cos(tick * 60 * 0.012 + n.phase) * 0.08) * dt;

        if (hot) {
          const ddx = n.dx - mouse.sx;
          const ddy = n.dy - mouse.sy;
          const d = Math.hypot(ddx, ddy);
          if (d < 110 && d > 0.001) {
            const push = (1 - d / 110) * 0.9 * mouse.strength * dt;
            n.x += (ddx / d) * push;
            n.y += (ddy / d) * push;
          }
        }

        const lo = n.label ? 18 : -20;
        const hiX = n.label ? width - 18 : width + 20;
        const hiY = n.label ? height - 18 : height + 20;
        if (n.x < lo) {
          n.x = lo;
          n.vx = Math.abs(n.vx);
        } else if (n.x > hiX) {
          n.x = hiX;
          n.vx = -Math.abs(n.vx);
        }
        if (n.y < lo) {
          n.y = lo;
          n.vy = Math.abs(n.vy);
        } else if (n.y > hiY) {
          n.y = hiY;
          n.vy = -Math.abs(n.vy);
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].label) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          if (!nodes[j].label) continue;
          const ddx = nodes[i].x - nodes[j].x;
          const ddy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(ddx, ddy);
          if (d < 110 && d > 0.001) {
            const push = (1 - d / 110) * 0.3 * dt;
            nodes[i].x += (ddx / d) * push;
            nodes[i].y += (ddy / d) * push;
            nodes[j].x -= (ddx / d) * push;
            nodes[j].y -= (ddy / d) * push;
          }
        }
      }
    };

    const loop = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(3, (now - last) / 16.667) || 1;
      last = now;
      step(dt);
      render(dt);
    };

    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (mouse.target === 0 && mouse.strength < 0.02) {
        mouse.sx = e.clientX;
        mouse.sy = e.clientY;
      }
      mouse.target = 1;
    };

    const onPointerDown = (e) => {
      onPointerMove(e);
      if (reduced) return;
      const seed = nearest(e.clientX, e.clientY, 170);
      if (seed < 0) return;
      nodes[seed].glow = 1;
      for (const j of adj[seed].slice(0, 4)) spawnPulse(seed, j, 3);
    };

    const onPointerUp = (e) => {
      if (e.pointerType !== "mouse") mouse.target = 0;
    };

    const onPointerOut = (e) => {
      if (!e.relatedTarget) mouse.target = 0;
    };

    const onBlur = () => {
      mouse.target = 0;
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 150);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (reduced) render(0);
      else start();
    };

    const onMotionChange = () => {
      reduced = motionQuery.matches;
      if (reduced) {
        stop();
        mouse.target = 0;
        mouse.strength = 0;
        parallax.x = 0;
        parallax.y = 0;
        pulses = [];
        render(0);
      } else {
        start();
      }
    };

    invalidateRef.current = () => {
      if (!running) render(0);
    };

    setup();
    start();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("blur", onBlur);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener?.("change", onMotionChange);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      invalidateRef.current = () => {};
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener?.("change", onMotionChange);
    };
  }, [labelsKey]);

  const orbA = darkMode ? 0.07 : 0.17;
  const orbB = darkMode ? 0.045 : 0.11;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden no-print"
    >
      <style>{CSS}</style>

      <div
        className="eb-orb absolute -top-24 left-[10%] h-[300px] w-[300px] rounded-full blur-[80px] sm:-top-32 sm:left-1/4 sm:h-[460px] sm:w-[460px] sm:blur-[130px]"
        style={{
          background: `rgba(255, 201, 60, ${orbA})`,
          animation: "eb-drift-a 18s ease-in-out infinite",
        }}
      />
      <div
        className="eb-orb absolute -bottom-24 right-[4%] h-[280px] w-[340px] rounded-full blur-[90px] sm:-bottom-[120px] sm:right-[12%] sm:h-[420px] sm:w-[520px] sm:blur-[140px]"
        style={{
          background: `rgba(255, 201, 60, ${orbB})`,
          animation: "eb-drift-b 24s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? "radial-gradient(circle at 50% 35%, transparent 35%, rgba(20, 22, 25, 0.55) 100%)"
            : "radial-gradient(circle at 50% 35%, transparent 35%, rgba(217, 218, 220, 0.55) 100%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
