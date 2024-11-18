import { Particle } from './particle.js';
import { randomFloat, randomInt } from '../libs/random.js';

export class FallingParticles {
    /**
     * Particles array
     * @type {Particle[]}
     */
    #particles;
    /**
     * Particle minimum radius
     * @type {number}
     */
    #particleMinRadius;
    /**
     * Particle maximum radius
     * @type {number}
     */
    #particleMaxRadius;
    /**
     * Particle minimum speed
     * @type {number}
     */
    #particleMinSpeed;
    /**
     * Particle maximum speed
     * @type {number}
     */
    #particleMaxSpeed;
    /**
     * Image luminosity map
     * @type {number[][]}
     */
    #imageLuminosity;
    /**
     * Image color map
     * @type {string[][]}
     */
    #imageColor;

    /**
     * Construct the particle effect
     * @param {number} particlesCount
     * @param {number} particleMinRadius
     * @param {number} particleMaxRadius
     * @param {number} particleMinSpeed
     * @param {number} particleMaxSpeed
     * @param {string} particleColor
     * @param {boolean} monochrome
     */
    constructor(particlesCount, particleMinRadius, particleMaxRadius, particleMinSpeed, particleMaxSpeed, particleColor, monochrome) {
        this.#particles = new Array(particlesCount);
        this.#particleMinRadius = particleMinRadius;
        this.#particleMaxRadius = particleMaxRadius;
        this.#particleMinSpeed = particleMinSpeed;
        this.#particleMaxSpeed = particleMaxSpeed;
        this.particleColor = particleColor;
        this.monochrome = monochrome;
    }

    /**
     * Get particles count
     * @returns {number}
     */
    get particlesCount() {
        return this.#particles.length;
    }

    /**
     * Set particles count
     * @param {number} particlesCount
     */
    set particlesCount(particlesCount) {
        if (this.#particles.length > particlesCount) {
            this.#particles.splice(particlesCount);
            return;
        }
        for (let i = 0; i < particlesCount - this.#particles.length; ++i) {
            this.#particles.push(this.#createParticle());
        }
    }

    /**
     * Get particle minimum radius
     * @returns {number}
     */
    get particleMinRadius() {
        return this.#particleMinRadius;
    }

    /**
     * Set particle minimum radius
     * @param {number} particleRadius
     */
    set particleMinRadius(particleMinRadius) {
        this.#particleMinRadius = particleMinRadius;
        this.#init();
    }

    /**
     * Get particle maximum radius
     * @returns {number}
     */
    get particleMaxRadius() {
        return this.#particleMaxRadius;
    }

    /**
     * Set particle maximum radius
     * @param {number} particleMaxRadius
     */
    set particleMaxRadius(particleMaxRadius) {
        this.#particleMaxRadius = particleMaxRadius;
        this.#init();
    }

    /**
     * Get particle minimum speed
     * @returns {number}
     */
    get particleMinSpeed() {
        return this.#particleMinSpeed;
    }

    /**
     * Set particle minimum speed
     * @param {number} particleMinSpeed
     */
    set particleMinSpeed(particleMinSpeed) {
        this.#particleMinSpeed = particleMinSpeed;
        this.#init();
    }

    /**
     * Get particle maximum speed
     * @returns {number}
     */
    get particleMaxSpeed() {
        return this.#particleMaxSpeed;
    }

    /**
     * Set particle maximum speed
     * @param {number} particleMaxSpeed
     */
    set particleMaxSpeed(particleMaxSpeed) {
        this.#particleMaxSpeed = particleMaxSpeed;
        this.#init();
    }

    /**
     * Get particles count
     * @returns {number}
     */
    get particlesCount() {
        return this.#particles.length;
    }

    /**
     * Set the image
     * @param {null|ImageData} Image
     */
    set image(image) {
        this.#imageLuminosity = Array.from(Array(image.height), () => new Array(image.width));
        this.#imageColor = Array.from(Array(image.height), () => new Array(image.width));
        for (let row = 0; row < image.height; ++row) {
            for (let column = 0; column < image.width; ++column) {
                let index = (row * image.width + column) * 4;
                let red = image.data[index];
                let green = image.data[index + 1];
                let blue = image.data[index + 2];
                this.#imageLuminosity[row][column] = Math.sqrt(
                    red * red * 0.299 +
                    green * green * 0.587 +
                    blue * blue * 0.114
                ) / 100;
                this.#imageColor[row][column] = `rgb(${red},${green},${blue})`;
            }
        }
        this.#init();
    }

    /**
     * Create a new or update an existing particle
     * @param {Particle|null} particle 
     * @returns {null|Particle}
     */
    #createParticle(particle) {
        if (!particle) {
            return new Particle(randomInt(this.#imageLuminosity[0].length - 1), 0, randomInt(this.#particleMinRadius, this.#particleMaxRadius), 0, randomFloat(this.#particleMinSpeed, this.#particleMaxSpeed));
        }
        particle.reset(randomInt(this.#imageLuminosity[0].length - 1), 0, randomInt(this.#particleMinRadius, this.#particleMaxRadius), 0, randomFloat(this.#particleMinSpeed, this.#particleMaxSpeed));
    }

    /**
     * Initialize the particle effect
     */
    #init() {
        if (!this.#imageLuminosity) return;
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i] = this.#createParticle();
        }
    }

    /**
     * Update particles positions
     */
    update() {
        if (!this.#particles || !this.#particles.length) return;
        let height = this.#imageLuminosity.length;
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i].update(Math.max(1, this.#imageLuminosity[Math.floor(this.#particles[i].y)][Math.floor(this.#particles[i].x)]));
            if (this.#particles[i].y >= height) {
                this.#createParticle(this.#particles[i]);
            }
        }
    }

    /**
     * Draw the particles
     * @param {CanvasRenderingContext2D} context2d
     */
    draw(context2d) {
        if (!this.#particles || !this.#particles.length) return;
        if (this.monochrome) {
            context2d.fillStyle = this.particleColor;
        }
        for (let i = 0; i < this.#particles.length; ++i) {
            context2d.globalAlpha = this.#imageLuminosity[Math.floor(this.#particles[i].y)][Math.floor(this.#particles[i].x)] * 0.5;
            if (!this.monochrome) {
                context2d.fillStyle = this.#imageColor[Math.floor(this.#particles[i].y)][Math.floor(this.#particles[i].x)];
            }
            this.#particles[i].draw(context2d);
        }
    }
}