import { Vector2D } from '../libs/vector2d.js';
const PI2 = Math.PI * 2;

export class Particle {
    /**
     * Particle position
     * @type {Vector2D}
     */
    #position;
    /**
     * Particle radius
     */
    #radius;
    /**
     * Particle movement velocity
     * @type {Vector2D}
     */
    #velocity;

    /**
     * Construct a particle
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y, r, vx, vy) {
        this.#position = new Vector2D(x, y);
        this.#radius = r;
        this.#velocity = new Vector2D(vx, vy);
    }

    reset(x, y, r, vx, vy) {
        this.#position.update(x, y);
        this.#radius = r;
        this.#velocity.update(vx, vy);
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
        this.#position.move(this.#velocity.x / amortization, this.#velocity.y / amortization);
    }

    /**
     * Draw the particle
     * @param {CanvasRenderingContext2D} context2d
     */
    draw(context2d) {
        context2d.beginPath();
        context2d.arc(this.#position.x, this.#position.y, this.#radius, 0, PI2);
        context2d.fill();
    }
}