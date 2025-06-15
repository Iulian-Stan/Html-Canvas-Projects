export class Vector3D {
    /** @type {number} */
    #x;
    /** @type {number} */
    #y;
    /** @type {number} */
    #z;

    /**
     * Construct a 2D vector
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
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
     * Get z coordinate
     * @returns {number}
     */
    get z() {
        return this.#z;
    }

    /**
     * Reset vector values
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    reset(x, y, z) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    /**
     * Translate point position
     * @param {number} dx
     * @param {number} dy
     * @param {number} dz
     */
    translate(dx, dy, dz) {
        this.#x += dx;
        this.#y += dy;
        this.#y += dz;
    }

    /**
     * Computes distance to another point
     * For optimization reason it is squared
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */
    distance(x, y) {
        let dx = this.#x - x;
        let dy = this.#y - y;
        let dz = this.#z - z;
        return dx * dx + dy * dy + dz * dz;
    }
}