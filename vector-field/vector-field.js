export class VectorField {
    /** @type {number} */
    #gridCellSize;
    /** @type {number} */
    #zoom;
    /** @type {number} */
    #lineLength;
    /** @type {number} */
    #radius;
    /** @type {number} */
    #vr;
    /** @type {number} */
    #width;
    /** @type {number} */
    #height;
    /** @type {number} */
    #mouseR;
    /** @type {string[]} */
    #colors;

    /**
     * Construct vector field
     * @param {number} cellSize
     * @param {number} zoom
     * @param {number} curve
     */
    constructor(cellSize, zoom, curve, colors) {
        this.#gridCellSize = cellSize;
        this.#zoom = zoom;
        this.#lineLength = curve;
        this.#radius = 10;
        this.#vr = .00003;
        this.#colors = colors;
    }

    /**
     * Get grid cell size
     * @returns {number} cell size
     */
    get gridCellSize() {
        return this.#gridCellSize;
    }

    /**
     * Set grid cell size
     * @param {number} cell size
     */
    set gridCellSize(gridCellSize) {
        this.#gridCellSize = gridCellSize;
    }

    /**
     * Get zoom
     * @returns {number} zoom
     */
    get zoom() {
        return this.#zoom;
    }

    /**
     * Set zoom
     * @param {number} zoom
     */
    set zoom(zoom) {
        this.#zoom = zoom;
    }

    /**
     * Get line length
     * @returns {number} line length
     */
    get lineLength() {
        return this.#lineLength;
    }

    /**
     * Set line length
     * @param {number} lineLength
     */
    set lineLength(lineLength) {
        this.#lineLength = lineLength;
    }

    /**
     * Get colors array
     * @returns {string[]} colors array
     */
    get colors() {
        return this.#colors;
    }

    /**
     * Set mouse X position
     * @param {number} mouseX
     */
    set colors(colors) {
        this.#colors = colors;
    }

    /**
     * Get colors array
     * @returns {string[]} colors array
     */
    get colors() {
        return this.#colors;
    }

    /**
     * Initialize the vector field
     * @param {number} width
     * @param {number} height
     */
    init(width, height) {
        this.#width = width;
        this.#height = height;
        this.#mouseR = width * height * 0.05;
    }

    /**
     * Draw the vector field
     * @param {CanvasRenderingContext2D} context2d
     * @param {number} mouseX
     * @param {number} mouseY
     */
    draw(context2d, mouseX, mouseY) {
        for (let y = 0; y < this.#height; y += this.#gridCellSize) {
            for (let x = 0; x < this.#width; x += this.#gridCellSize) {
                this.#radius += this.#vr;
                let angle = (Math.cos(x * this.#zoom) + Math.sin(y * this.#zoom)) * this.#radius;
                let curve = this.#lineLength;
                if (mouseX !== undefined && mouseY !== undefined) {
                    let dx = x - mouseX;
                    let dy = y - mouseY;
                    let dist = dx * dx + dy * dy;
                    if (dist < this.#mouseR) {
                        curve *= dist / this.#mouseR;
                    }
                }
                context2d.beginPath();
                context2d.moveTo(x, y);
                context2d.lineTo(x + Math.cos(angle) * curve, y + Math.sin(angle) * curve);
                context2d.stroke();
            }
        }
    }
}