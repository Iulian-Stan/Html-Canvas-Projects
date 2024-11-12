export class Particle {
    #x;
    #y;
    #symbol;
    #color;
    constructor(x, y, symbol, color) {
        this.#x = x;
        this.#y = y;
        this.#symbol = symbol;
        this.#color = color;
    }

    draw(context2d, font) {
        context2d.save();
        context2d.font = font;
        context2d.fillStyle = this.#color;
        context2d.fillText(this.#symbol, this.#x, this.#y);
        context2d.restore();
    }
}