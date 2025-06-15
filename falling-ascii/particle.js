import { Vector2D } from '../libs/vector2d.js';

export class Particle {
    /**
     * Particle position
     * @type {Vector2D}
     */
    #position;
    /**
     * Particle size
     */
    #size;

    /**
     * Construct a particle
     * @param {number} x
     * @param {number} y
     * @param {number} size
     */
    constructor(x, y, size) {
        this.#position = new Vector2D(x, y);
        this.#size = size;
    }

    /**
     * Reset the particle
     * @param {number} x
     * @param {number} y
     * @param {number} size
     */
    reset(x, y, size) {
        this.#position.reset(x, y);
        this.#size = size;
    }

    /**
     * Get X coordinate
     * @returns {number}
     */
    get x() {
        return this.#position.x;
    }

    /**
     * Get Y coordinate
     * @returns {number}
     */
    get y() {
        return this.#position.y;
    }

    update(amortization) {
        this.#position.translate(0, this.#size);
    }

    /**
     * @param {CanvasRenderingContext2D} context2d
     * @param {string} font
     */
    draw(context2d, symbol, font) {
       context2d.font = `${this.#size}px ${font}`;
       context2d.fillText(symbol, this.#position.x, this.#position.y);
    }
}