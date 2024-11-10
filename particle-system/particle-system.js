import { randomFloat } from '../libs/random.js';
import { Particle } from './particle.js';

export class ParticleSystem {
    constructor(particlesRatio, particleMinRadius, particleMaxRadius, particleColor, linkDistance, linkColor, mouseRatio) {
        this.particlesRatio = particlesRatio;
        this.particleMinRadius = particleMinRadius;
        this.particleMaxRadius = particleMaxRadius;
        this.particleColor = particleColor;
        this.linkDistance = linkDistance;
        this.linkColor = linkColor;
        this.mouseRatio = mouseRatio;
    }

    init(width, height) {
        this.width = width;
        this.height = height;
        let area = canvas.width * canvas.height;
        this.particlesCount = area * this.particlesRatio;
        this.mouseR = area * this.mouseRatio;
        ;

        // create the particle system
        this.particles = [];
        for (let i = 0; i < this.particlesCount; ++i) {
            let radius = randomFloat(this.particleMinRadius, this.particleMaxRadius)
            let particle = new Particle(
                randomFloat(radius, this.width - radius),
                randomFloat(radius, this.height - radius),
                radius,
                randomFloat(-1, 1),
                randomFloat(-1, 1));
            this.particles.push(particle);
        }
    }

    update(mouseX, mouseY) {
        for (let i = 0; i < this.particles.length; ++i) {
            this.particles[i].update(this.width, this.height, mouseX, mouseY, this.mouseR);
        }
    }

    draw(context2d) {
        // draw particles and connections
        for (let i = 0; i < this.particles.length; ++i) {
            this.particles[i].draw(context2d, this.particleColor);
            for (let j = i + 1; j < this.particles.length; ++j) {
                let distance = this.particles[i].distance(this.particles[j].posX, this.particles[j].posY);
                if (distance > this.linkDistance) {
                    continue;
                }
                this.particles[i].connect(context2d, this.particles[j].posX, this.particles[j].posY, this.linkColor + Math.floor((1 - distance / this.linkDistance) * 255).toString(16));
            }
        }
    }

}