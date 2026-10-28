import { useEffect, useRef } from 'react';

export default function ParticleBackground({ theme }: { theme: 'dark' | 'light' | 'neon' }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];
    
    let feathers: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      scale: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
      hueOffset: number;
    }> = [];

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const getPrimaryColor = () => {
      if (theme === 'neon') return 'rgba(217, 70, 239, 0.4)'; // Neon pink/purple
      if (theme === 'light') return 'rgba(99, 102, 241, 0.3)'; // Indigo/blue
      return 'rgba(226, 232, 240, 0.35)'; // Silver / dark theme
    };

    const getLineColor = (dist: number) => {
      const opacity = 0.15 * (1 - dist / 150);
      if (theme === 'neon') return `rgba(168, 85, 247, ${opacity})`;
      if (theme === 'light') return `rgba(99, 102, 241, ${opacity})`;
      return `rgba(203, 213, 225, ${opacity})`;
    };

    // Get theme color palette for feathers
    const getFeatherPalette = (opacity: number, hueOffset: number) => {
      if (theme === 'neon') {
        // Vibrant Neon Fuchsia, Electric Purple & Hot Pink
        return {
          stroke: `rgba(240, 171, 252, ${opacity * 0.95})`,
          fill: `rgba(192, 132, 252, ${opacity * 0.4})`,
          quill: `rgba(236, 72, 153, ${opacity})`,
          glow: `rgba(217, 70, 239, ${opacity * 0.5})`,
        };
      }
      if (theme === 'light') {
        // Rich Indigo, Deep Sapphire & Royal Blue for crisp contrast on light background
        return {
          stroke: `rgba(79, 70, 229, ${opacity * 0.95})`,
          fill: `rgba(99, 102, 241, ${opacity * 0.35})`,
          quill: `rgba(37, 99, 235, ${opacity * 0.95})`,
          glow: `rgba(147, 197, 253, ${opacity * 0.5})`,
        };
      }
      // Dark / Silver Owl Theme (Default)
      return {
        stroke: `rgba(248, 250, 252, ${opacity * 0.95})`,
        fill: `rgba(226, 232, 240, ${opacity * 0.35})`,
        quill: `rgba(255, 255, 255, ${opacity})`,
        glow: `rgba(203, 213, 225, ${opacity * 0.4})`,
      };
    };

    const init = () => {
      particles = [];
      feathers = [];
      const count = Math.min(40, (canvas.width * canvas.height) / 30000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
        });
      }

      // Initialize 16 BIG majestic floating feather shapes
      for (let i = 0; i < 16; i++) {
        feathers.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: Math.random() * 0.4 + 0.2, // gently floating down
          scale: Math.random() * 1.4 + 1.2, // Much BIGGER feathers! (1.2x to 2.6x scale)
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.006,
          opacity: Math.random() * 0.35 + 0.15,
          hueOffset: Math.random() * 30 - 15,
        });
      }
    };

    const drawFeather = (
      x: number,
      y: number,
      scale: number,
      rotation: number,
      opacity: number,
      hueOffset: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);

      const palette = getFeatherPalette(opacity, hueOffset);

      // Feather Outer Outline & Soft Fill
      ctx.strokeStyle = palette.stroke;
      ctx.fillStyle = palette.fill;
      ctx.lineWidth = 1.2;

      // Outer Feather Silhouette (Detailed 100px curve)
      ctx.beginPath();
      ctx.moveTo(0, -60); // Tip of feather
      ctx.quadraticCurveTo(24, -20, 18, 20);
      ctx.quadraticCurveTo(12, 45, 0, 60); // Base of feather
      ctx.quadraticCurveTo(-12, 45, -18, 20);
      ctx.quadraticCurveTo(-24, -20, 0, -60);
      ctx.fill();
      ctx.stroke();

      // Central Spine / Quill Stem
      ctx.beginPath();
      ctx.moveTo(0, -64);
      ctx.quadraticCurveTo(2, 0, 0, 68);
      ctx.strokeStyle = palette.quill;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Realistic Fine Feather Barbs (Slanted texture lines)
      ctx.strokeStyle = palette.stroke;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = -45; i <= 40; i += 8) {
        const sideWidth = Math.sin(((i + 50) / 100) * Math.PI) * 18;
        // Right Barb
        ctx.moveTo(0, i);
        ctx.quadraticCurveTo(sideWidth * 0.5, i - 4, sideWidth, i - 8);
        // Left Barb
        ctx.moveTo(0, i);
        ctx.quadraticCurveTo(-sideWidth * 0.5, i - 4, -sideWidth, i - 8);
      }
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getPrimaryColor();

      // Render Floating Majestic Feathers
      feathers.forEach((f) => {
        f.x += f.vx + Math.sin(f.y * 0.008) * 0.25;
        f.y += f.vy;
        f.rotation += f.rotSpeed;

        if (f.y > canvas.height + 80) {
          f.y = -80;
          f.x = Math.random() * canvas.width;
        }
        if (f.x < -80) f.x = canvas.width + 80;
        if (f.x > canvas.width + 80) f.x = -80;

        drawFeather(f.x, f.y, f.scale, f.rotation, f.opacity, f.hueOffset);
      });

      // Update & Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = getLineColor(dist);
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: theme === 'light' ? 'normal' : 'screen' }}
    />
  );
}
