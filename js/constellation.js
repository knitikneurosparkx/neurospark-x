/**
 * NeuroSpark X — Signature Personal Constellation Canvas
 * Renders the user's unlocked systems and products as an interactive celestial constellation.
 */

window.initPersonalConstellation = function (canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight || 450);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight || 450;
  });

  // Nodes representing user's ecosystem
  const nodes = [
    { id: 1, name: "SoulMap™ Protocol", status: "active", x: 0.5, y: 0.35, color: "#14B8A6", size: 9, category: "Growth" },
    { id: 2, name: "AI Agent OS", status: "owned", x: 0.3, y: 0.55, color: "#7C3AED", size: 8, category: "AI & Tools" },
    { id: 3, name: "Idea-to-Product Matrix", status: "owned", x: 0.7, y: 0.5, color: "#4F46E5", size: 8, category: "Systems" },
    { id: 4, name: "System Playbook", status: "owned", x: 0.42, y: 0.75, color: "#38BDF8", size: 7, category: "Learn" },
    { id: 5, name: "Autonomous Revenue Labs", status: "available", x: 0.2, y: 0.28, color: "#64748B", size: 5, category: "Labs" },
    { id: 6, name: "Studio Genesis Suite", status: "available", x: 0.8, y: 0.3, color: "#64748B", size: 5, category: "Studio" },
    { id: 7, name: "Matrix Prompt Vault", status: "owned", x: 0.62, y: 0.75, color: "#D4A017", size: 7, category: "AI Tools" }
  ];

  const links = [
    [0, 1], [0, 2], [1, 3], [2, 6], [3, 6], [0, 4], [0, 5], [1, 4]
  ];

  let hoveredNode = null;
  let pulseAngle = 0;

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    hoveredNode = null;
    nodes.forEach((node) => {
      const nx = node.x * width;
      const ny = node.y * height;
      if (Math.hypot(mx - nx, my - ny) < 20) {
        hoveredNode = node;
      }
    });
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  });

  canvas.addEventListener('click', () => {
    if (hoveredNode) {
      if (hoveredNode.status === 'available') {
        window.openProductDetail?.('prod-5');
      } else {
        alert(`Opening ${hoveredNode.name} Workspace...`);
      }
    }
  });

  function render() {
    ctx.clearRect(0, 0, width, height);
    pulseAngle += 0.04;

    // Draw connecting constellation paths
    links.forEach(([i, j]) => {
      const n1 = nodes[i];
      const n2 = nodes[j];
      const x1 = n1.x * width;
      const y1 = n1.y * height;
      const x2 = n2.x * width;
      const y2 = n2.y * height;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      const isOwnedLink = n1.status !== 'available' && n2.status !== 'available';
      if (isOwnedLink) {
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#4F46E5';
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
    });

    // Draw celestial nodes
    nodes.forEach((node) => {
      const x = node.x * width;
      const y = node.y * height;
      const isHovered = hoveredNode === node;

      // Glow properties based on status
      let radius = node.size;
      let glowBlur = 10;
      let alpha = 0.8;

      if (node.status === 'active') {
        // Strong pulsating glow
        radius += Math.sin(pulseAngle) * 2;
        glowBlur = 25 + Math.sin(pulseAngle) * 10;
        alpha = 1.0;
      } else if (node.status === 'owned') {
        glowBlur = 14;
        alpha = 0.9;
      } else {
        glowBlur = 2;
        alpha = 0.35;
      }

      if (isHovered) {
        radius += 3;
        glowBlur += 15;
      }

      // Outer Glow Aura
      ctx.beginPath();
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = node.status === 'available' ? 'rgba(255,255,255,0.02)' : 'rgba(20, 184, 166, 0.15)';
      ctx.fill();

      // Node Core
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.shadowBlur = glowBlur;
      ctx.shadowColor = node.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Node label
      ctx.font = isHovered ? "600 13px 'Space Grotesk'" : "500 11px 'Plus Jakarta Sans'";
      ctx.fillStyle = node.status === 'available' ? '#64748B' : '#F8FAFC';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, x, y + radius + 16);

      // Status subtitle
      if (isHovered || node.status === 'active') {
        ctx.font = "600 9px 'JetBrains Mono'";
        ctx.fillStyle = node.status === 'active' ? '#2DD4BF' : '#94A3B8';
        ctx.fillText(node.status.toUpperCase(), x, y + radius + 28);
      }
    });

    requestAnimationFrame(render);
  }

  render();
};
