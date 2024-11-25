import { Particle } from './particle.js';
import { randomInt } from '../libs/random.js';
const SYMBOLS = ' :\/^-~|;_><"+!{}=*?)(71]3[IJ#52C6L9V8T4$YFAS%0UEZPXNG@OK&RQDHWBM';

export class FallingAscii {
    /**
     * Particles array
     * @type {Particle[]}
     */
    #particles;
    /**
     * Particle minimum radius
     * @type {number}
     */
    #particleMinSize;
    /**
     * Particle maximum radius
     * @type {number}
     */
    #particleMaxSize;
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
     * @param {number} particleMinSize
     * @param {number} particleMaxSize
     * @param {string} particleColor
     * @param {boolean} monochrome
     * @param {string} fontFamily
     */
    constructor(particlesCount, particleMinSize, particleMaxSize, particleColor, monochrome, fontFamily) {
        this.#particles = new Array(particlesCount);
        this.#particleMinSize = particleMinSize;
        this.#particleMaxSize = particleMaxSize;
        this.particleColor = particleColor;
        this.monochrome = monochrome;
        this.fontFamily = fontFamily;
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
    get particleMinSize() {
        return this.#particleMinSize;
    }

    /**
     * Set particle minimum radius
     * @param {number} particleRadius
     */
    set particleMinSize(particleMinSize) {
        this.#particleMinSize = particleMinSize;
        this.#init();
    }

    /**
     * Get particle maximum radius
     * @returns {number}
     */
    get particleMaxSize() {
        return this.#particleMaxSize;
    }

    /**
     * Set particle maximum radius
     * @param {number} particleMaxSize
     */
    set particleMaxSize(particleMaxSize) {
        this.#particleMaxSize = particleMaxSize;
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
            return new Particle(randomInt(this.#imageLuminosity[0].length - 1), 0, randomInt(this.#particleMinSize, this.#particleMaxSize));
        }
        particle.reset(randomInt(this.#imageLuminosity[0].length - 1), 0, randomInt(this.#particleMinSize, this.#particleMaxSize));
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
            this.#particles[i].update();
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
        context2d.textAlign = 'center';
        context2d.textBaseline = 'middle';
        for (let i = 0; i < this.#particles.length; ++i) {
            context2d.globalAlpha = this.#imageLuminosity[Math.floor(this.#particles[i].y)][Math.floor(this.#particles[i].x)] * .5;
            if (!this.monochrome) {
                context2d.fillStyle = context2d.fillStyle = this.#imageColor[Math.floor(this.#particles[i].y)][Math.floor(this.#particles[i].x)];;
            }
            this.#particles[i].draw(context2d, SYMBOLS[Math.floor(context2d.globalAlpha * 50.196)], this.fontFamily);
        }
    }
}