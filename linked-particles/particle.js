const PI2 = Math.PI * 2;

export class Particle {
    /**
     * Particle X coordinate
     * @type {number}
     */
    #x;
    /**
     * Particle Y coordinate
     * @type {number}
     */
    #y;
    /**
     * Particle radius
     * @type {number}
     */
    #radius;
    /**
     * Particle movement displacement on X axis
     * @type {number}
     */
    #dx;
    /**
     * Particle movement displacement on Y axis
     * @type {number}
     */
    #dy;

    /**
     * Create a particle
     * @param {number} x Particle X coordinate
     * @param {number} y Particle Y coordinate
     * @param {number} radius Particle radius
     * @param {number} dx Particle movement displacement on X axis
     * @param {number} dy Particle movement displacement on Y axis
     */
    constructor(x, y, radius, dx, dy) {
        this.#x = x;
        this.#y = y;
        this.#radius = radius;
        this.#dx = dx;
        this.#dy = dy;
    }

    /**
     * Get particle's X coordinate
     * @returns {number} X coordinate
     */
    get x() {
        return this.#x;
    }

    /**
     * Get particle's Y coordinate
     * @returns {number} Y coordinate
     */
    get y() {
        return this.#y;
    }

    /**
     * Compute particle distance to a point
     * @param {number} x Point X coordinate
     * @param {number} y Point Y coordinate
     * @returns
     */
    distance(x, y) {
        let dx = this.#x - x;
        let dy = this.#y - y;
        return dx * dx + dy * dy;
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
        context2d.moveTo(this.#x, this.#y);
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
        context2d.arc(this.#x, this.#y, this.#radius, 0, PI2);
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
        if (this.#x + this.#radius > width || this.#x - this.#radius < 0) {
            this.#dx = -this.#dx;
        }
        if (this.#y + this.#radius > height || this.#y - this.#radius < 0) {
            this.#dy = -this.#dy;
        }
        this.#x += this.#dx;
        this.#y += this.#dy;

        // return if mouse is not inside the canvas
        if (mouseX === undefined || mouseY === undefined) {
            return;
        }

        // return if particle is outside mouse radius
        if (this.distance(mouseX, mouseY) > mouseRadius) {
            return;
        }

        if (mouseX < this.#x && this.#x < width - 10 * this.#radius) {
            this.#x += 10;
        }
        if (mouseX > this.#x && this.#x > 10 * this.#radius) {
            this.#x -= 10;
        }
        if (mouseY < this.#y && this.#y < height - 10 * this.#radius) {
            this.#y += 10;
        }
        if (mouseY > this.#y && this.#y > 10 * this.#radius) {
            this.#y -= 10;
        }
    }
}