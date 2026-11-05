/**
 * Pattern Stages Canvas Animations:
 * 1. Scattered Data
 * 2. Connected Nodes
 * 3. Constellation
 */

(function () {
  // Stage 1: Scattered Data
  const c1 = document.getElementById('canvas-scattered');
  if (c1) {
    const ctx1 = c1.getContext('2d');
    const w = (c1.width = 140);
    const h = (c1.height = 140);
    const dots = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.5 ? '#7C3AED' : '#4F46E5'
    }));

    function anim1() {
      ctx1.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx1.beginPath();
        ctx1.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx1.fillStyle = d.color;
        ctx1.shadowBlur = 6;
        ctx1.shadowColor = d.color;
        ctx1.fill();
      });
      requestAnimationFrame(anim1);
    }
    anim1();
  }

  // Stage 2: Connected Nodes
  const c2 = document.getElementById('canvas-connected');
  if (c2) {
    const ctx2 = c2.getContext('2d');
    const w = (c2.width = 140);
    const h = (c2.height = 140);
    const nodes = [
      { x: 30, y: 35, vx: 0.1, vy: 0.1 },
      { x: 80, y: 25, vx: -0.1, vy: 0.15 },
      { x: 115, y: 55, vx: -0.15, vy: -0.1 },
      { x: 95, y: 110, vx: 0.1, vy: -0.15 },
      { x: 45, y: 105, vx: -0.1, vy: 0.1 },
      { x: 20, y: 70, vx: 0.15, vy: -0.1 },
      { x: 70, y: 70, vx: 0.05, vy: 0.05 }
    ];

    function anim2() {
      ctx2.clearRect(0, 0, w, h);
      // update
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 15 || n.x > w - 15) n.vx *= -1;
        if (n.y < 15 || n.y > h - 15) n.vy *= -1;
      });

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 65) {
            ctx2.beginPath();
            ctx2.moveTo(nodes[i].x, nodes[i].y);
            ctx2.lineTo(nodes[j].x, nodes[j].y);
            ctx2.strokeStyle = 'rgba(79, 70, 229, 0.4)';
            ctx2.lineWidth = 1;
            ctx2.stroke();
          }
        }
      }

      // draw nodes
      nodes.forEach((n) => {
        ctx2.beginPath();
        ctx2.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx2.fillStyle = '#818CF8';
        ctx2.shadowBlur = 8;
        ctx2.shadowColor = '#4F46E5';
        ctx2.fill();
      });
      requestAnimationFrame(anim2);
    }
    anim2();
  }

  // Stage 3: Complete Constellation (Rotating 3D Wireframe Polyhedron)
  const c3 = document.getElementById('canvas-constellation');
  if (c3) {
    const ctx3 = c3.getContext('2d');
    const w = (c3.width = 140);
    const h = (c3.height = 140);
    const cx = w / 2;
    const cy = h / 2;

    // 3D Octahedron vertices
    const vertices = [
      { x: 0, y: -45, z: 0 },
      { x: 0, y: 45, z: 0 },
      { x: -45, y: 0, z: 0 },
      { x: 45, y: 0, z: 0 },
      { x: 0, y: 0, z: -45 },
      { x: 0, y: 0, z: 45 }
    ];

    const edges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    let angle = 0;

    function anim3() {
      ctx3.clearRect(0, 0, w, h);
      angle += 0.015;

      const projected = vertices.map((v) => {
        // Rotate around Y and X
        const cosY = Math.cos(angle);
        const sinY = Math.sin(angle);
        const x1 = v.x * cosY - v.z * sinY;
        const z1 = v.z * cosY + v.x * sinY;

        const cosX = Math.cos(angle * 0.7);
        const sinX = Math.sin(angle * 0.7);
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + v.y * sinX;

        const scale = 160 / (160 + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale
        };
      });

      // draw edges
      edges.forEach(([i, j]) => {
        ctx3.beginPath();
        ctx3.moveTo(projected[i].x, projected[i].y);
        ctx3.lineTo(projected[j].x, projected[j].y);
        ctx3.strokeStyle = 'rgba(20, 184, 166, 0.6)';
        ctx3.lineWidth = 1.2;
        ctx3.shadowBlur = 8;
        ctx3.shadowColor = '#14B8A6';
        ctx3.stroke();
      });

      // draw vertices
      projected.forEach((p) => {
        ctx3.beginPath();
        ctx3.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx3.fillStyle = '#F8FAFC';
        ctx3.shadowBlur = 10;
        ctx3.shadowColor = '#2DD4BF';
        ctx3.fill();
      });

      requestAnimationFrame(anim3);
    }
    anim3();
  }
})();
