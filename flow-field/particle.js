export class Particle {
    /** @type {number} */
    #posX;
    /** @type {number} */
    #posY;
    /** @type {number} */
    #accel;
    /** @type {number} */
    #tail;
    /** @type {number} */
    #lifeSpan;
    /** @type {string} */
    #color;
    /** @type {{x: number, y: number}[]} */
    #history;

    /**
     * Create a particle
     * @param {number} posX
     * @param {number} posY
     * @param {number} accel
     * @param {number} tail
     * @param {*number} lifeSpan
     * @param {string} color
     */
    constructor(posX, posY, accel, tail, lifeSpan, color) {
        this.#posX = posX;
        this.#posY = posY;
        this.#accel = accel;
        this.#tail = tail;
        this.#lifeSpan = lifeSpan;
        this.#color = color;
        this.#history = [];
    }

    /**
     * Get particle X coordinate
     * @returns {number} X coordinate
     */
    get posX() {
        return this.#posX;
    }

    /**
     * Get particle Y coordinate
     * @returns {number} Y coordinate
     */
    get posY() {
        return this.#posY;
    }

    /**
     * Get particle lifespan
     * @returns {number} lifespan
     */
    get lifeSpan() {
        return this.#lifeSpan;
    }

    /**
     * Get particle history
     * @returns {number[]} history
     */
    get history() {
        return this.#history;
    }

    /**
     * Draw the particle
     * @param {CanvasRenderingContext2D} context2d
     */
    draw(context2d) {
        context2d.save();
        context2d.strokeStyle = this.#color;
        context2d.lineWidth = 1;
        context2d.beginPath();
        context2d.moveTo(this.#posX, this.#posY);
        for (let i = this.#history.length - 1; i >= 0; --i) {
            context2d.lineTo(this.#history[i].x, this.#history[i].y);
        }
        context2d.stroke();
        context2d.restore();
    }

    /**
     * Update particle position
     * @param {number} angle
     */
    update(angle) {
        if (this.#lifeSpan) {
            this.#posX += Math.cos(angle) * this.#accel;
            this.#posY += Math.sin(angle) * this.#accel;
            this.#history.push({ x: this.#posX, y: this.#posY });
            if (this.#history.length > this.#tail) {
                this.#history.shift();
            }
            this.#lifeSpan -= 1;
        } else if (this.#history.length) {
            this.#history.shift();
        }
    }

    /**
     * Reset particle position and lifespan
     * @param {number} posX
     * @param {number} posY
     * @param {number} lifeSpan
     */
    reset(posX, posY, lifeSpan) {
        this.#posX = posX;
        this.#posY = posY;
        this.#lifeSpan = lifeSpan;
        this.#history = [];
    }
}