import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ *
-  - Ambient Background
-  - cached blueprint grid (dots + registration marks)
-  - circuit-trace "data packets" that run along the grid and turn at nodes
-  - constellation particles that drift, link up and gently avoid the cursor
-  - smooth cursor spotlight + magnetic dots, tap / click ripples
-  - crisp on retina, FPS-independent, pauses when the tab is hidden,
-    honours prefers-reduced-motion, theme switch without restarting
- ------------------------------------------------------------------ */

const PALETTE = {
  dark: {
    ink: "217, 218, 220",
    accent: "255, 201, 60",
    glow: "255, 201, 60",
    dot: 0.14,
    plus: 0.2,
    link: 0.16,
    particle: 0.35,
    glowA: 0.12,
  },
  light: {
    ink: "43, 45, 49",
    accent: "186, 128, 0",
    glow: "255, 201, 60",
    dot: 0.16,
    plus: 0.22,
    link: 0.14,
    particle: 0.3,
    glowA: 0.24,
  },
};

const TAU = Math.PI * 2;
const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const rand = (a, b) => a + Math.random() * (b - a);

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

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function EngineeringBackground({ darkMode = true }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(darkMode);
  const invalidateRef = useRef(() => {});

  useEffect(() => {
    themeRef.current = darkMode;
    invalidateRef.current();
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let spacing = 56;
    let cols = 0;
    let rows = 0;
    let gridLayer = null;
    let packets = [];
    let particles = [];
    const ripples = [];

    const mouse = {
      x: -9999,
      y: -9999,
      sx: -9999,
      sy: -9999,
      target: 0,
      strength: 0,
      radius: 190,
    };

    let raf = 0;
    let last = 0;
    let running = false;
    let tick = 0;
    let resizeTimer = 0;

    const palette = () => (themeRef.current ? PALETTE.dark : PALETTE.light);
    const isMajor = (gx, gy) => gx % 4 === 0 && gy % 4 === 0;

    const buildGridLayer = () => {
      const p = palette();
      const layer = document.createElement("canvas");
      layer.width = Math.ceil(width * dpr);
      layer.height = Math.ceil(height * dpr);
      const g = layer.getContext("2d");
      if (!g) return;
      g.scale(dpr, dpr);

      g.fillStyle = `rgba(${p.ink}, ${p.dot})`;
      g.beginPath();
      for (let gx = 1; gx < cols; gx++) {
        for (let gy = 1; gy < rows; gy++) {
          const px = gx * spacing;
          const py = gy * spacing;
          g.moveTo(px + 1, py);
          g.arc(px, py, 1, 0, TAU);
        }
      }
      g.fill();

      g.strokeStyle = `rgba(${p.ink}, ${p.plus})`;
      g.lineWidth = 1;
      g.beginPath();
      for (let gx = 1; gx < cols; gx++) {
        for (let gy = 1; gy < rows; gy++) {
          if (!isMajor(gx, gy)) continue;
          const px = gx * spacing;
          const py = gy * spacing;
          g.moveTo(px - 4, py);
          g.lineTo(px + 4, py);
          g.moveTo(px, py - 4);
          g.lineTo(px, py + 4);
        }
      }
      g.stroke();
      gridLayer = layer;
    };

    const nextNode = (pk) => {
      const [dx, dy] = DIRS[pk.dir];
      if (dx) {
        return dx > 0
          ? (Math.floor(pk.x / spacing) + 1) * spacing
          : (Math.ceil(pk.x / spacing) - 1) * spacing;
      }
      return dy > 0
        ? (Math.floor(pk.y / spacing) + 1) * spacing
        : (Math.ceil(pk.y / spacing) - 1) * spacing;
    };

    const makePacket = (anywhere) => {
      const lane = (max) =>
        (1 + Math.floor(Math.random() * Math.max(1, max - 1))) * spacing;
      const dir = Math.floor(Math.random() * 4);
      let x;
      let y;
      if (anywhere) {
        x = lane(cols);
        y = lane(rows);
      } else if (dir === 0) {
        x = -4;
        y = lane(rows);
      } else if (dir === 2) {
        x = width + 4;
        y = lane(rows);
      } else if (dir === 1) {
        x = lane(cols);
        y = -4;
      } else {
        x = lane(cols);
        y = height + 4;
      }
      const pk = {
        x,
        y,
        dir,
        speed: rand(0.7, 1.5),
        alpha: rand(0.3, 0.6),
        trail: [],
        next: 0,
      };
      pk.next = nextNode(pk);
      return pk;
    };

    const createEntities = () => {
      const small = width < 640;
      const packetCount = Math.min(16, Math.max(6, Math.floor(width / 110)));
      packets = Array.from({ length: packetCount }, () => makePacket(true));

      const particleCount = Math.min(
        34,
        Math.max(14, Math.floor(width / (small ? 48 : 42))),
      );
      particles = Array.from({ length: particleCount }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: i % 3 === 0 ? 2.4 : 1.4,
        gold: i % 3 === 0,
      }));
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
      spacing = width < 640 ? 44 : 56;
      cols = Math.ceil(width / spacing);
      rows = Math.ceil(height / spacing);
      buildGridLayer();
      if (widthChanged || !packets.length) createEntities();
      if (!running) render(0);
    };

    const render = (dt) => {
      const p = palette();
      const s = mouse.strength;
      const R = mouse.radius;
      const mx = mouse.sx;
      const my = mouse.sy;
      const hot = s > 0.01;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (gridLayer) ctx.drawImage(gridLayer, 0, 0, width, height);

      if (hot) {
        const rr = R + 8;
        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, rr, 0, TAU);
        ctx.clip();
        ctx.clearRect(mx - rr, my - rr, rr * 2, rr * 2);
        ctx.restore();

        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, R);
        grad.addColorStop(0, `rgba(${p.glow}, ${p.glowA * s})`);
        grad.addColorStop(0.55, `rgba(${p.glow}, ${p.glowA * 0.35 * s})`);
        grad.addColorStop(1, `rgba(${p.glow}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, R, 0, TAU);
        ctx.fill();

        const gx0 = Math.max(1, Math.floor((mx - rr) / spacing));
        const gx1 = Math.min(cols - 1, Math.ceil((mx + rr) / spacing));
        const gy0 = Math.max(1, Math.floor((my - rr) / spacing));
        const gy1 = Math.min(rows - 1, Math.ceil((my + rr) / spacing));

        for (let gx = gx0; gx <= gx1; gx++) {
          for (let gy = gy0; gy <= gy1; gy++) {
            const px = gx * spacing;
            const py = gy * spacing;
            const dx = px - mx;
            const dy = py - my;
            const dist = Math.hypot(dx, dy);
            if (dist > rr) continue;

            const f = Math.max(0, 1 - dist / R) * s;
            const ox = dist ? -(dx / dist) * f * 5 : 0;
            const oy = dist ? -(dy / dist) * f * 5 : 0;
            const rad = 1 + f * 2.2;

            if (isMajor(gx, gy)) {
              ctx.strokeStyle = `rgba(${p.ink}, ${p.plus})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(px - 4, py);
              ctx.lineTo(px + 4, py);
              ctx.moveTo(px, py - 4);
              ctx.lineTo(px, py + 4);
              ctx.stroke();
            }

            ctx.fillStyle = `rgba(${p.ink}, ${p.dot})`;
            ctx.beginPath();
            ctx.arc(px + ox, py + oy, rad, 0, TAU);
            ctx.fill();
            if (f > 0.04) {
              ctx.fillStyle = `rgba(${p.accent}, ${Math.min(0.9, f * 1.15)})`;
              ctx.beginPath();
              ctx.arc(px + ox, py + oy, rad, 0, TAU);
              ctx.fill();
            }
          }
        }
      }

      ctx.lineCap = "round";
      ctx.lineWidth = 1.4;
      for (let i = 0; i < packets.length; i++) {
        const pk = packets[i];

        let remaining = pk.speed * dt;
        while (remaining > 0) {
          const [dx, dy] = DIRS[pk.dir];
          const pos = dx ? pk.x : pk.y;
          const sign = dx || dy;
          const dist = (pk.next - pos) * sign;
          if (dist > remaining) {
            pk.x += dx * remaining;
            pk.y += dy * remaining;
            remaining = 0;
          } else {
            if (dx) pk.x = pk.next;
            else pk.y = pk.next;
            remaining -= dist;
            pk.trail.push({ x: pk.x, y: pk.y });
            if (Math.random() < 0.28)
              pk.dir = (pk.dir + (Math.random() < 0.5 ? 1 : 3)) % 4;
            pk.next = nextNode(pk);
          }
        }

        const lastPt = pk.trail[pk.trail.length - 1];
        if (!lastPt || Math.hypot(pk.x - lastPt.x, pk.y - lastPt.y) >= 6) {
          pk.trail.push({ x: pk.x, y: pk.y });
        }
        while (pk.trail.length > 10) pk.trail.shift();

        if (
          pk.x < -spacing ||
          pk.x > width + spacing ||
          pk.y < -spacing ||
          pk.y > height + spacing
        ) {
          packets[i] = makePacket(false);
          continue;
        }

        const n = pk.trail.length;
        for (let k = 1; k < n + 1; k++) {
          const a = pk.trail[k - 1];
          const b = k < n ? pk.trail[k] : pk;
          ctx.strokeStyle = `rgba(${p.accent}, ${pk.alpha * (k / n)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${p.accent}, ${Math.min(1, pk.alpha + 0.3)})`;
        ctx.beginPath();
        ctx.arc(pk.x, pk.y, 1.8, 0, TAU);
        ctx.fill();
      }

      const linkDist = width < 640 ? 100 : 120;
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        pt.x += (pt.vx + Math.sin(tick + i) * 0.12) * dt;
        pt.y += (pt.vy + Math.cos(tick + i) * 0.12) * dt;

        if (hot) {
          const dx = pt.x - mx;
          const dy = pt.y - my;
          const d = Math.hypot(dx, dy);
          if (d < 70 && d > 0.001) {
            const push = (1 - d / 70) * 1.4 * s * dt;
            pt.x += (dx / d) * push;
            pt.y += (dy / d) * push;
          }
        }

        if (pt.x < -10) pt.x = width + 10;
        if (pt.x > width + 10) pt.x = -10;
        if (pt.y < -10) pt.y = height + 10;
        if (pt.y > height + 10) pt.y = -10;

        ctx.lineWidth = 0.85;
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const ddx = pt.x - other.x;
          const ddy = pt.y - other.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < linkDist * linkDist) {
            const la = (1 - Math.sqrt(d2) / linkDist) * p.link;
            ctx.strokeStyle =
              pt.gold || other.gold
                ? `rgba(${p.accent}, ${la * 1.3})`
                : `rgba(${p.ink}, ${la})`;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        if (hot) {
          const mDist = Math.hypot(pt.x - mx, pt.y - my);
          if (mDist < R * 0.9) {
            ctx.strokeStyle = `rgba(${p.accent}, ${(1 - mDist / (R * 0.9)) * 0.45 * s})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }

        ctx.fillStyle = pt.gold
          ? `rgba(${p.accent}, ${themeRef.current ? 0.85 : 0.8})`
          : `rgba(${p.ink}, ${p.particle})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, TAU);
        ctx.fill();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 3.2 * dt;
        r.alpha *= Math.pow(0.955, dt);
        if (r.alpha < 0.02 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${p.accent}, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, TAU);
        ctx.stroke();
        ctx.strokeStyle = `rgba(${p.accent}, ${r.alpha * 0.45})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.62, 0, TAU);
        ctx.stroke();
      }
    };

    const loop = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(3, (now - last) / 16.667) || 1;
      last = now;
      tick += 0.012 * dt;
      mouse.strength +=
        (mouse.target - mouse.strength) * Math.min(1, 0.12 * dt);
      mouse.sx += (mouse.x - mouse.sx) * Math.min(1, 0.25 * dt);
      mouse.sy += (mouse.y - mouse.sy) * Math.min(1, 0.25 * dt);
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
      if (ripples.length > 6) ripples.shift();
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 8,
        maxRadius: 240,
        alpha: 0.55,
      });
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
        render(0);
      } else {
        start();
      }
    };

    invalidateRef.current = () => {
      buildGridLayer();
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
  }, []);

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

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GRAIN,
          opacity: darkMode ? 0.05 : 0.07,
          mixBlendMode: darkMode ? "overlay" : "multiply",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
