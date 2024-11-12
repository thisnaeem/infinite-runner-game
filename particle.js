class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    createParticle(x, y, color, type = 'jump') {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.bottom = `${y}px`;
        
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        
        document.getElementById('game-container').appendChild(particle);

        const angle = type === 'jump' ? 
            Math.random() * Math.PI : 
            Math.random() * Math.PI * 2;
        
        const velocity = type === 'jump' ? 
            Math.random() * 6 + 2 : 
            Math.random() * 3 + 1;

        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        this.particles.push({
            element: particle,
            x: 0,
            y: 0,
            vx,
            vy,
            opacity: 1,
            type
        });
    }

    createJumpEffect(x, y) {
        for (let i = 0; i < 8; i++) {
            this.createParticle(x, y, 'var(--player-color)', 'jump');
        }
    }

    createCollectEffect(x, y, color) {
        for (let i = 0; i < 12; i++) {
            this.createParticle(x, y, color, 'collect');
        }
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.type === 'collect') {
                particle.vy += 0.2; // Gravity for collect particles
            }
            
            particle.opacity -= 0.03;

            particle.element.style.transform = `translate(${particle.x}px, ${-particle.y}px)`;
            particle.element.style.opacity = particle.opacity;

            if (particle.opacity <= 0) {
                particle.element.remove();
                this.particles.splice(i, 1);
            }
        }
    }

    clear() {
        this.particles.forEach(particle => particle.element.remove());
        this.particles = [];
    }
}

const particleSystem = new ParticleSystem();