import { useEffect, useRef, memo } from "react";

const AmbientBackground = memo(function AmbientBackground({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    const particleCount = Math.min(44, Math.floor((width * height) / 32000));
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      radius: Math.random() * 1.8 + 1.3,
      isAccent: i % 3 !== 0,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 160 && distMouse > 0) {
          p.x -= (dxMouse / distMouse) * 0.35;
          p.y -= (dyMouse / distMouse) * 0.35;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isAccent) {
          ctx.fillStyle = darkMode
            ? "rgba(255, 201, 60, 0.55)"
            : "rgba(255, 201, 60, 0.9)";
          ctx.fill();
          if (!darkMode) {
            ctx.strokeStyle = "rgba(43, 45, 49, 0.35)";
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = darkMode
            ? "rgba(217, 218, 220, 0.32)"
            : "rgba(43, 45, 49, 0.28)";
          ctx.fill();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 135) {
            const alpha = (1 - dist / 135) * (darkMode ? 0.16 : 0.14);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = darkMode
              ? `rgba(255, 201, 60, ${alpha})`
              : `rgba(43, 45, 49, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [darkMode]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden no-print"
      aria-hidden="true"
    >
      <div className="bg-palette-grid absolute inset-0 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_20%,#000_55%,transparent_100%)]" />
      <div className="animate-aurora-1 absolute -top-36 left-[12%] h-[450px] w-[450px] rounded-full bg-[#FFC93C]/14 blur-[125px] dark:bg-[#FFC93C]/12" />
      <div className="animate-aurora-2 absolute top-[30%] -right-28 h-[420px] w-[420px] rounded-full bg-[#2B2D31]/10 blur-[125px] dark:bg-[#D9DADC]/10" />
      <div className="animate-aurora-pulse absolute bottom-[-60px] left-[22%] h-[380px] w-[380px] rounded-full bg-[#FFC93C]/14 blur-[115px] dark:bg-[#FFC93C]/10" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
});

export default AmbientBackground;
