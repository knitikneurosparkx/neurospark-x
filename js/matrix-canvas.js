/**
 * NeuroSpark X — Cosmic Matrix Background Canvas
 * Blends subtle Matrix digital rain streams with cosmic stars & constellation nodes.
 * Color Palette: Void Black (#0A0A0F), Electric Indigo (#4F46E5), Teal (#14B8A6), Deep Violet (#7C3AED), Soft White (#F8FAFC)
 */

(function () {
  const container = document.getElementById('bg-canvas-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'cosmic-matrix-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initElements();
  });

  // Mouse interaction
  const mouse = { x: null, y: null, radius: 150 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Matrix characters: mix of runes, greek, math, hex, katakana
  const chars = '01λψΩπΔ∑010101XYZ0123456789ABCDEFΞΨΩ⚡✦✧';
  const charArray = chars.split('');
  const fontSize = 13;
  let columns = Math.floor(width / (fontSize * 1.6));
  let drops = [];

  // Starry constellation nodes
  const starsCount = Math.min(80, Math.floor(width / 18));
  let stars = [];

  function initElements() {
    columns = Math.floor(width / (fontSize * 1.6));
    drops = [];
    for (let i = 0; i < columns; i++) {
      // Stagger drops randomly above the screen
      drops[i] = Math.floor(Math.random() * -100);
    }

    stars = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.6 ? '#14B8A6' : Math.random() > 0.3 ? '#818CF8' : '#F8FAFC'
      });
    }
  }

  initElements();

  let lastTime = 0;
  const fps = 30; // Smooth and battery-efficient
  const interval = 1000 / fps;

  function render(currentTime) {
    requestAnimationFrame(render);

    const delta = currentTime - lastTime;
    if (delta < interval) return;
    lastTime = currentTime - (delta % interval);

    // Fade trail to keep Void Black deep (#0A0A0F with low opacity)
    ctx.fillStyle = 'rgba(10, 10, 15, 0.22)';
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Star Constellations
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;

      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;

      // Draw star
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;
      ctx.fill();

      // Connect stars within distance (constellation effect)
      for (let j = i + 1; j < stars.length; j++) {
        const s2 = stars[j];
        const dist = Math.hypot(s.x - s2.x, s.y - s2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s2.x, s2.y);
          const alpha = (1 - dist / 110) * 0.15;
          ctx.strokeStyle = `rgba(79, 70, 229, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Mouse interactive constellation link
      if (mouse.x !== null) {
        const mouseDist = Math.hypot(s.x - mouse.x, s.y - mouse.y);
        if (mouseDist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          const alpha = (1 - mouseDist / mouse.radius) * 0.35;
          ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    ctx.shadowBlur = 0;

    // 2. Draw Subtle Matrix Digital Rain (Translucent Teal & Indigo/White highlights)
    // Only on every second or third column to maintain clean, mysterious vibe (not overwhelming green)
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i += 2) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * (fontSize * 1.6);
      const y = drops[i] * fontSize;

      if (y > 0 && y < height) {
        // Leading glyph: Bright Teal or Soft White
        ctx.fillStyle = Math.random() > 0.8 ? '#F8FAFC' : '#2DD4BF';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#14B8A6';
        ctx.fillText(char, x, y);

        // Body glyphs behind leading glyph are darker teal/indigo with very low opacity
        if (drops[i] > 1) {
          ctx.fillStyle = 'rgba(20, 184, 166, 0.15)';
          ctx.shadowBlur = 0;
          const prevChar = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(prevChar, x, y - fontSize);
        }
      }

      // Reset drop
      if (y > height && Math.random() > 0.985) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  requestAnimationFrame(render);
})();
