import { Vector2D } from '../libs/vector2d.js';

export class Particle {
    /** @type {Vector2D} */
    #position;
    /** @type {number} */
    #luminosity;
    /** @type {string} */
    #color;

    /**
     * Create a particle
     * @param {number} x
     * @param {number} y
     * @param {number} luminosity
     * @param {string} color
     */
    constructor(x, y, luminosity, color) {
        this.#position = new Vector2D(x, y);
        this.#luminosity = luminosity;
        this.#color = color;
    }

    /**
     * Get particle luminosity
     * @returns {number}
     */
    get luminosity() {
        return this.#luminosity;
    }

    /**
     * Get distance to a point
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    distance(x, y) {
        return this.#position.distance(x, y);
    }

    /**
     * Draw the particle
     * @param {CanvasRenderingContext2D} context2d
     * @param {string} font
     */
    draw(context2d, symbol, font) {
        context2d.font = font;
        context2d.fillStyle = this.#color;
        context2d.fillText(symbol, this.#position.x, this.#position.y);
    }
}