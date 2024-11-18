import { randomFloat } from '../libs/random.js';
import { Particle } from './particle.js';

export class LinkedParticles {
    /**
     * Particles count
     * @type {number}
     */
    #particlesCount;
    /**
     * Particles
     * @type {Particle[]}
     */
    #particles;

    /**
     * Construct a new particle system
     * @param {number} particlesCount
     * @param {number} particleMinRadius
     * @param {number} particleMaxRadius
     * @param {string} particleColor
     * @param {number} linkDistance
     * @param {string} linkColor
     * @param {number} mouseRatio
     */
    constructor(particlesCount, particleMinRadius, particleMaxRadius, particleColor, linkDistance, linkColor, mouseRatio) {
        this.#particlesCount = particlesCount;
        this.particleMinRadius = particleMinRadius;
        this.particleMaxRadius = particleMaxRadius;
        this.particleColor = particleColor;
        this.linkDistance = linkDistance;
        this.linkColor = linkColor;
        this.mouseRatio = mouseRatio;
        this.#particles = new Array(particlesCount);
    }

    /**
     * Get the number of particles
     * @returns {number} number of particles
     */
    get particlesCount() {
        return this.#particlesCount;
    }

    /**
     * Set the number of particles
     * @param {number} number of particles
     */
    set particlesCount(particlesCount) {
        if (this.#particlesCount > particlesCount) {
            this.#particles.splice(0, this.#particlesCount - particlesCount);
        } else {
            for (let i = 0; i < particlesCount - this.#particlesCount; ++i) {
                this.#particles.push(this.#createParticle());
            }
        }
        this.#particlesCount = particlesCount;
    }

    #createParticle() {
        let radius = randomFloat(this.particleMinRadius, this.particleMaxRadius);
        return new Particle(
            randomFloat(radius, this.width - radius),
            randomFloat(radius, this.height - radius),
            radius,
            randomFloat(-1, 1),
            randomFloat(-1, 1));
    }

    init(width, height) {
        this.width = width;
        this.height = height;
        let area = canvas.width * canvas.height;
        this.mouseR = area * this.mouseRatio;

        // create the particle system
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i] = this.#createParticle();
        }
    }

    update(mouseX, mouseY) {
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i].update(this.width, this.height, mouseX, mouseY, this.mouseR);
        }
    }

    draw(context2d) {
        // draw particles and connections
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i].draw(context2d, this.particleColor);
            for (let j = i + 1; j < this.#particles.length; ++j) {
                let distance = this.#particles[i].distance(this.#particles[j].x, this.#particles[j].y);
                if (distance > this.linkDistance) {
                    continue;
                }
                this.#particles[i].connect(context2d, this.#particles[j].x, this.#particles[j].y, this.linkColor + Math.floor((1 - distance / this.linkDistance) * 255).toString(16));
            }
        }
    }

}