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
     * @type {number}
     */
    #radius;
    /**
     * Particle movement displacement
     * @type {Vector2D}
     */
    #displacement;

    /**
     * Create a particle
     * @param {number} x Particle X coordinate
     * @param {number} y Particle Y coordinate
     * @param {number} radius Particle radius
     * @param {number} dx Particle movement displacement on X axis
     * @param {number} dy Particle movement displacement on Y axis
     */
    constructor(x, y, radius, dx, dy) {
        this.#position = new Vector2D(x, y);
        this.#radius = radius;
        this.#displacement = new Vector2D(dx, dy);
    }

    /**
     * Get particle's X coordinate
     * @returns {number} X coordinate
     */
    get x() {
        return this.#position.x;
    }

    /**
     * Get particle's Y coordinate
     * @returns {number} Y coordinate
     */
    get y() {
        return this.#position.y;
    }

    /**
     * Get the distance to a point
     * @param {number} x 
     * @param {number} y 
     */
    distance(x , y) {
        return this.#position.distance(x, y);
    }

    /**
     * Connect particle to a point
     * @param {CanvasRenderingContext2D} context2d
     * @param {number} x Point X coordinate
     * @param {number} y Point Y coordinate
     * @param {string} color Line color
     */
    connect(context2d, x, y, color) {
        context2d.save();
        context2d.strokeStyle = color;
        context2d.lineWidth = 1;
        context2d.beginPath();
        context2d.moveTo(this.#position.x, this.#position.y);
        context2d.lineTo(x, y);
        context2d.stroke();
        context2d.restore();
    }

    /**
     * Draw the particle
     * @param {CanvasRenderingContext2D} context2d
     * @param {string} color Particle color
     */
    draw(context2d, color) {
        context2d.save();
        context2d.fillStyle = color;
        context2d.beginPath();
        context2d.arc(this.#position.x, this.#position.y, this.#radius, 0, PI2);
        context2d.fill();
        context2d.restore();
    }

    /**
     * Update particle position
     * @param {number} width Canvas width
     * @param {number} height Canvas height
     * @param {number} mouseX Mouse X position
     * @param {number} mouseY Mouse Y position
     * @param {number} mouseRadius Mouse radius
     * @returns
     */
    update(width, height, mouseX, mouseY, mouseRadius) {
        // toggle direction if position is outside the canvas
        if (this.#position.x + this.#radius > width || this.#position.x - this.#radius < 0) {
            this.#displacement.move(-this.#displacement.x, 0);
        }
        if (this.#position.y + this.#radius > height || this.#position.y - this.#radius < 0) {
            this.#displacement.move(0, -this.#displacement.y);
        }
        this.#position.move(this.#displacement.x, this.#displacement.y);

        // return if mouse is not inside the canvas
        if (mouseX === undefined || mouseY === undefined) {
            return;
        }

        // return if particle is outside mouse radius
        if (this.distance(mouseX, mouseY) > mouseRadius) {
            return;
        }

        if (mouseX < this.#position.x && this.#position.x < width - 10 * this.#radius) {
            this.#position.move(10, 0);
        }
        if (mouseX > this.#position.x && this.#position.x > 10 * this.#radius) {
            this.#position.move(-10, 0);
        }
        if (mouseY < this.#position.y && this.#position.y < height - 10 * this.#radius) {
            this.#position.move(0, 10);
        }
        if (mouseY > this.#position.y && this.#position.y > 10 * this.#radius) {
            this.#position.move(0, -10);
        }
    }
}