import { Particle } from './particle.js';
const SYMBOLS = ' :\/^-~|;_><"+!{}=*?)(71]3[IJ#52C6L9V8T4$YFAS%0UEZPXNG@OK&RQDHWBM';

export class ImageAscii {
    #fontSize;
    #fontFamily;
    #font;
    #image;
    #particles;
    constructor(fontSize, fontFamily, mouseRadius) {
        this.#fontSize = fontSize;
        this.#fontFamily = fontFamily;
        this.#setFont();
        this.#particles = [];
        this.mouseRadius = mouseRadius;
    }

    #setFont() {
        this.#font = `${this.#fontSize * 1.2}px ${this.#fontFamily}`;
    }

    set fontSize(fontSize) {
        this.#fontSize = fontSize;
        this.#setFont();
        this.#init();
    }

    get fontSize() {
        return this.#fontSize;
    }

    set image(image) {
        this.#image = image;
        this.#init();
    }

    #init() {
        if (!this.#image) return;
        this.#particles = [];
        let cellSize = this.#fontSize * this.#fontSize * 1.;
        for (let row = 0; row + this.#fontSize < this.#image.height; row += this.#fontSize) {
            for (let column = 0; column + this.#fontSize < this.#image.width; column += this.#fontSize) {
                let cellIndex = 0, r = 0, g = 0, b = 0, a = 0;
                for (let cellRow = row; cellRow < row + this.#fontSize; ++cellRow) {
                    for (let cellColumn = column; cellColumn < column + this.#fontSize; ++cellColumn) {
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
                let luminosity = Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114) / 100;
                if (a > 128) {
                    this.#particles.push(new Particle(column, row, luminosity, `rgba(${r},${g},${b},${a/255})`));
                }
            }
        }
    }

    draw(context2d, mouseX, mouseY) {
        if (!this.#particles || !this.#particles.length) return;        
        context2d.textAlign = 'center';
        context2d.textBaseline = 'middle';
        for (let i = 0; i < this.#particles.length; ++i) {
            let distance = this.#particles[i].distance(mouseX, mouseY);
            let luminosity = this.#particles[i].luminosity;
            if (distance < this.mouseRadius) {
                luminosity *= distance / this.mouseRadius;
            }
            this.#particles[i].draw(context2d, SYMBOLS[Math.floor(luminosity * 25.1)], this.#font);
        }
    }
}