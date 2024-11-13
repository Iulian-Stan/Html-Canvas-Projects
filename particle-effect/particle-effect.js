import { Particle } from "./particle.js";

export class ParticleEffect {
    #resolution;
    #image;
    #particles;
    #maxDistance;
    #forceDistance;
    #pushForce;
    #gravityForce;
    constructor(resolution) {
        this.#resolution = resolution;
        this.#particles = [];
        this.#maxDistance = 10000;
        this.#forceDistance = 10000;
        this.#pushForce = 500;
        this.#gravityForce = 0.05;
    }

    set resolution(resolution) {
        this.#resolution = resolution;
        this.#init();
    }

    get resolution() {
        return this.#resolution;
    }

    set image(image) {
        this.#image = image;
        this.#init();
    }

    #init() {
        if (!this.#image) return;
        this.#particles = [];
        let cellSize = this.#resolution * this.#resolution * 1.;
        for (let row = 0; row + this.#resolution < this.#image.height; row += this.#resolution) {
            for (let column = 0; column + this.#resolution < this.#image.width; column += this.#resolution) {
                let cellIndex = 0, r = 0, g = 0, b = 0, a = 0;
                for (let cellRow = row; cellRow < row + this.#resolution; ++cellRow) {
                    for (let cellColumn = column; cellColumn < column + this.#resolution; ++cellColumn) {
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
                if (a > 128) {
                    this.#particles.push(new Particle(column, row, `rgba(${r},${g},${b},${a/255})`));
                }
            }
        }
    }

    update(mouseX, mouseY) {
        if (!this.#particles || !this.#particles.length) return;
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i].update(mouseX, mouseY, this.#maxDistance, this.#forceDistance, this.#pushForce, this.#gravityForce);
        }
    }

    draw(context2d) {
        if (!this.#particles || !this.#particles.length) return;
        for (let i = 0; i < this.#particles.length; ++i) {
            this.#particles[i].draw(context2d, this.#resolution / 2);
        }
    }
}