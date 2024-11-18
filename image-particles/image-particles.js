import { randomInt } from "../libs/random.js";
import { Particle } from "./particle.js";

export class ImageParticles {
    /** @type {number} */
    #particleRadius;
    /** @type {number} */
    #mouseRadius;
    /** @type {number} */
    #image;
    /** @type {number} */
    #particles;

    /**
     * Construct the particle effect
     * @param {number} particleRadius
     * @param {number} mouseRadius
     */
    constructor(particleRadius, mouseRadius, friction, amortization, circle) {
        this.#particleRadius = particleRadius;
        this.#mouseRadius = mouseRadius;
        this.friction = friction;
        this.amortization = amortization;
        this.circle = circle;
        this.#particles = [];
    }

    /**
     * Set particles radius
     * @param {number} particleRadius
     */
    set particleRadius(particleRadius) {
        this.#particleRadius = particleRadius;
        this.#init();
    }

    /**
     * Get the resolution
     * @returns {number} Resolution
     */
    get particleRadius() {
        return this.#particleRadius;
    }

    /**
     * Set the image
     * @param {null|ImageData} Image
     */
    set image(image) {
        this.#image = image;
        this.#init();
    }

    /**
     * Initialize the particle effect
     */
    #init() {
        if (!this.#image) return;
        this.#particles = [];
        let cellSize = this.#particleRadius * this.#particleRadius * 1.;
        for (let row = 0; row + this.#particleRadius < this.#image.height; row += this.#particleRadius) {
            for (let column = 0; column + this.#particleRadius < this.#image.width; column += this.#particleRadius) {
                let cellIndex = 0, r = 0, g = 0, b = 0, a = 0;
                for (let cellRow = row; cellRow < row + this.#particleRadius; ++cellRow) {
                    for (let cellColumn = column; cellColumn < column + this.#particleRadius; ++cellColumn) {
                        cellIndex = (this.#image.width * cellRow + cellColumn) * 4;
                        r += this.#image.data[cellIndex];
                        g += this.#image.data[cellIndex + 1];
                        b += this.#image.data[cellIndex + 2];
                        a += this.#image.data[cellIndex + 3];
                    }
                }
                r /= cellSize;
                g /= cellSize;
                b /= cellSize;
                a /= cellSize;
                if (a > 128) {
                    this.#particles.push(new Particle(column, row, `rgba(${r},${g},${b},${a/255})`, randomInt(this.#image.width - 1), this.#image.height));
                }
            }
        }
    }

    /**
     * Update the particle effect
     * @param {number} mouseX
     * @param {number} mouseY
     * @returns
     */
    update(mouseX, mouseY) {
        if (!this.#particles || !this.#particles.length) return;
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i].update(mouseX, mouseY, this.#mouseRadius, this.friction, this.amortization);
        }
    }

    /**
     * Draw the particle effect
     * @param {CanvasRenderingContext2D} context2d
     */
    draw(context2d) {
        if (!this.#particles || !this.#particles.length) return;
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i].draw(context2d, this.#particleRadius, this.circle);
        }
    }
}