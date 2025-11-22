import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let sketch = (p) => {
      // Particles for organic flow
      let particles = [];
      const particleCount = 120;

      // Muted color palette
      const palette = {
        bg: [250, 248, 245],
        particles: [
          [198, 219, 210, 60],   // Soft sage
          [215, 204, 200, 50],   // Warm beige
          [200, 210, 225, 55],   // Soft blue
          [230, 220, 210, 45],   // Pale peach
          [190, 205, 195, 65],   // Muted mint
        ]
      };

      // Particle class with organic movement
      class Particle {
        constructor() {
          this.reset();
          this.y = p.random(p.height);
          this.history = [];
          this.maxHistory = p.random(20, 50);
          this.color = p.random(palette.particles);
          this.noiseOffsetX = p.random(1000);
          this.noiseOffsetY = p.random(1000);
          this.speed = p.random(0.0008, 0.0015);
          this.size = p.random(2, 6);
          this.breathOffset = p.random(p.TWO_PI);
        }

        reset() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.history = [];
        }

        update(mouseX, mouseY) {
          // Perlin noise for organic movement
          const noiseX = p.noise(this.noiseOffsetX) * 2 - 1;
          const noiseY = p.noise(this.noiseOffsetY) * 2 - 1;

          // Mouse interaction - gentle attraction/repulsion
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = p.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          let mouseInfluence = 0;
          if (distance < maxDistance) {
            mouseInfluence = (1 - distance / maxDistance) * 0.5;
          }

          // Combine noise and mouse interaction
          this.x += noiseX * 0.8 + dx * mouseInfluence * 0.02;
          this.y += noiseY * 0.8 + dy * mouseInfluence * 0.02;

          // Update noise offsets for continuous flow
          this.noiseOffsetX += this.speed;
          this.noiseOffsetY += this.speed;

          // Breathing effect
          this.breathOffset += 0.02;

          // Store history for trail effect
          this.history.push({ x: this.x, y: this.y });
          if (this.history.length > this.maxHistory) {
            this.history.shift();
          }

          // Wrap around edges
          if (this.x < -50) this.x = p.width + 50;
          if (this.x > p.width + 50) this.x = -50;
          if (this.y < -50) this.y = p.height + 50;
          if (this.y > p.height + 50) this.y = -50;
        }

        display() {
          // Draw trail
          p.noFill();
          p.beginShape();
          for (let i = 0; i < this.history.length; i++) {
            const alpha = p.map(i, 0, this.history.length, 0, this.color[3]);
            p.stroke(this.color[0], this.color[1], this.color[2], alpha);
            p.strokeWeight(p.map(i, 0, this.history.length, 0.5, this.size));
            p.curveVertex(this.history[i].x, this.history[i].y);
          }
          p.endShape();

          // Draw main particle with breathing
          const breathSize = this.size + p.sin(this.breathOffset) * 1.5;
          p.noStroke();
          p.fill(this.color[0], this.color[1], this.color[2], this.color[3] * 1.5);
          p.circle(this.x, this.y, breathSize);

          // Soft glow
          p.fill(this.color[0], this.color[1], this.color[2], this.color[3] * 0.3);
          p.circle(this.x, this.y, breathSize * 2);
        }
      }

      // Noise field visualization
      let noiseScale = 0.003;
      let noiseStrength = 0;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current);

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };

      p.draw = () => {
        // Soft background with slight transparency for trail effect
        p.fill(palette.bg[0], palette.bg[1], palette.bg[2], 25);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);

        // Ambient noise field (subtle)
        noiseStrength = p.sin(p.frameCount * 0.005) * 0.1 + 0.1;

        // Update and display all particles
        for (let particle of particles) {
          particle.update(p.mouseX, p.mouseY);
          particle.display();
        }

        // Connection lines between nearby particles (very subtle)
        p.stroke(200, 210, 215, 15);
        p.strokeWeight(0.5);
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const d = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (d < 120) {
              const alpha = p.map(d, 0, 120, 20, 0);
              p.stroke(200, 210, 215, alpha);
              p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        // Reset particles on resize
        particles.forEach(p => p.reset());
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    />
  );
}
