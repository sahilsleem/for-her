/**
 * Gentle Romantic Petals & Hearts Particle System
 * 
 * Renders drifting cherry blossom petals, soft glowing hearts, and fairy sparkles.
 * Respects prefers-reduced-motion and battery/visibility states.
 */

export class RomanticCanvasEffect {
  constructor() {
    this.canvas = document.getElementById('petals-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.sparkles = [];
    this.isRunning = true;
    this.animationFrameId = null;
    
    // Check reduced motion preference
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reducedMotion) {
      this.maxParticles = 0;
    } else {
      // Mobile-friendly particle count
      this.maxParticles = window.innerWidth < 768 ? 20 : 35;
    }

    this.resize();
    this.initParticles();
    this.bindEvents();
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  createParticle(randomY = false) {
    const isHeart = Math.random() > 0.65;
    return {
      type: isHeart ? 'heart' : 'petal',
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -20,
      size: isHeart ? (Math.random() * 8 + 8) : (Math.random() * 10 + 10),
      speedY: Math.random() * 0.7 + 0.5,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      opacity: Math.random() * 0.45 + 0.35,
      // Rose & soft pink tones
      color: isHeart 
        ? (Math.random() > 0.5 ? '#e88796' : '#d45b73')
        : (Math.random() > 0.5 ? '#fcd5ce' : '#fed0d8')
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Pause when tab not visible to conserve battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });

    // Touch/click heart burst interaction
    window.addEventListener('celebrateHearts', (e) => {
      const originX = (e.detail && e.detail.x) || this.width / 2;
      const originY = (e.detail && e.detail.y) || this.height / 2;
      const count = (e.detail && e.detail.count) || 20;
      this.burstHearts(originX, originY, count);
    });
  }

  burstHearts(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
      const velocity = Math.random() * 5 + 3;
      this.sparkles.push({
        type: 'burstHeart',
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        size: Math.random() * 12 + 10,
        opacity: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6,
        color: Math.random() > 0.5 ? '#c03956' : '#e88796'
      });
    }
  }

  drawHeart(ctx, x, y, size, rotation, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;

    // Heart bezier curve
    const s = size / 16;
    ctx.beginPath();
    ctx.moveTo(0, -5 * s);
    ctx.bezierCurveTo(0, -9 * s, -8 * s, -9 * s, -8 * s, -4 * s);
    ctx.bezierCurveTo(-8 * s, 1 * s, 0, 6 * s, 0, 9 * s);
    ctx.bezierCurveTo(0, 6 * s, 8 * s, 1 * s, 8 * s, -4 * s);
    ctx.bezierCurveTo(8 * s, -9 * s, 0, -9 * s, 0, -5 * s);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawPetal(ctx, x, y, size, rotation, color, opacity, wobble) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(Math.cos(wobble), 1);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;

    // Petal curve
    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.quadraticCurveTo(size / 3, 0, 0, size / 2);
    ctx.quadraticCurveTo(-size / 3, 0, 0, -size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  update() {
    // Normal falling particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.wobble) * 0.4;
      p.wobble += p.wobbleSpeed;
      p.rotation += p.rotationSpeed;

      // Reset when particle goes off screen
      if (p.y > this.height + 25 || p.x < -30 || p.x > this.width + 30) {
        this.particles[i] = this.createParticle(false);
      }
    }

    // Burst celebration particles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.15; // gentle gravity
      s.vx *= 0.98;
      s.rotation += s.rotationSpeed;
      s.opacity -= 0.016;

      if (s.opacity <= 0 || s.y > this.height) {
        this.sparkles.splice(i, 1);
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render petals & hearts
    for (const p of this.particles) {
      if (p.type === 'heart') {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
      } else {
        this.drawPetal(this.ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity, p.wobble);
      }
    }

    // Render burst particles
    for (const s of this.sparkles) {
      this.drawHeart(this.ctx, s.x, s.y, s.size, s.rotation, s.color, s.opacity);
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.render();
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  toggle() {
    if (this.isRunning) {
      this.stop();
      if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);
    } else {
      this.start();
    }
    return this.isRunning;
  }
}

let romanticCanvasInstance = null;
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    romanticCanvasInstance = new RomanticCanvasEffect();
    window.romanticCanvas = romanticCanvasInstance;
  });
}
