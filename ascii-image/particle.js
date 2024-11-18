export class Particle {
    /** @type {number} */
    #x;
    /** @type {number} */
    #y;
    /** @type {string} */
    #symbol;
    /** @type {string} */
    #color;

    /**
     * Create a particle
     * @param {number} x
     * @param {number} y
     * @param {string} symbol
     * @param {string} color
     */
    constructor(x, y, symbol, color) {
        this.#x = x;
        this.#y = y;
        this.#symbol = symbol;
        this.#color = color;
    }

    /**
     * Draw the particle
     * @param {CanvasRenderingContext2D} context2d
     * @param {string} font
     */
    draw(context2d, font) {
        context2d.font = font;
        context2d.fillStyle = this.#color;
        context2d.fillText(this.#symbol, this.#x, this.#y);
    }
}