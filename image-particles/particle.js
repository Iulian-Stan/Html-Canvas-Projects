import { Vector2D } from "../libs/vector2d.js";
const PI2 = Math.PI * 2;

export class Particle {
    /** @type {Vector2D} */
    #originalPos;
    /** @type {Vector2D} */
    #currentPos;
    /** @type {string} */
    #color;
    /** @type {Vector2D} */
    #velocity;

    /**
     * Construct a particle
     * @param {number} ox
     * @param {number} oy
     * @param {string} color
     * @param {number} x
     * @param {number} y
     */
    constructor(ox, oy, color, x, y) {
        this.#originalPos = new Vector2D(ox, oy);
        this.#color = color;
        this.#currentPos = new Vector2D(x, y);
        this.#velocity = new Vector2D(0, 0);
    }

    /**
     * Update particle position
     * @param {number} mouseX
     * @param {number} mouseY
     * @param {number} mouseRadius
     * @param {number} forceDistance
     * @param {number} pushForce
     * @param {number} gravityForce
     */
    update(mouseX, mouseY, mouseRadius, friction, amortization) {
        if (mouseX !== undefined && mouseY !== undefined) {
            let dx = mouseX - this.#currentPos.x;
            let dy = mouseY - this.#currentPos.y;
            let distance = dx * dx + dy * dy;
            let force = -mouseRadius / distance;
            if (distance < mouseRadius) {
                let angle = Math.atan2(dy, dx);
                this.#velocity.move(
                    force * Math.cos(angle),
                    force * Math.sin(angle)
                );
            }
        }
        this.#velocity.update(this.#velocity.x * friction, this.#velocity.y * friction);
        this.#currentPos.move(
            this.#velocity.x + (this.#originalPos.x - this.#currentPos.x) * amortization,
            this.#velocity.y + (this.#originalPos.y - this.#currentPos.y) * amortization
        );
    }

    /**
     * Draw the particle
     * @param {CanvasRenderingContext2D} context2d
     * @param {number} radius
     * @param {boolean} circle
     */
    draw(context2d, radius, circle) {
        context2d.fillStyle = this.#color;
        if (circle) {
            context2d.beginPath();
            context2d.arc(this.#currentPos.x, this.#currentPos.y, radius * .5, 0, PI2);
            context2d.fill();
        } else {
            context2d.fillRect(this.#currentPos.x, this.#currentPos.y, radius, radius);
        }
    }
}