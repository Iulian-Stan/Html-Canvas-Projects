export class Vector2D {
    /** @type {number} */
    #x;
    /** @type {number} */
    #y;

    /**
     * Construct a 2D vector
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    /**
     * Get X coordinate
     * @returns {number}
     */
    get x() {
        return this.#x;
    }

    /**
     * Get Y coordinate
     * @returns {number}
     */
    get y() {
        return this.#y;
    }

    /**
     * Update vector values
     * @param {number} x
     * @param {number} y 
     */
    update(x, y) {
        this.#x = x;
        this.#y = y;
    }

    /**
     * Move point position
     * @param {number} dx
     * @param {number} dy 
     */
    move(dx, dy) {
        this.#x += dx;
        this.#y += dy;
    }

    /**
     * Computes distance to another point
     * For optimization reason it is squared
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    distance(x, y) {
        let dx = this.#x - x;
        let dy = this.#y - y;
        return dx * dx + dy * dy;
    }
}