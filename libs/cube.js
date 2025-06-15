import { Vector3D } from './vector3d.js';

export class Cube {
    /** @type {Vector3D} */
    #origin;
    /** @type {number} */
    #size;
    /** @type {Vector3D[]} */
    #vertices;
    /** @type {number[][]} */
    #faces;

    constructor(x, y, z, size) {
        this.#size = size *= .5;
        this.#origin = new Vector3D(x, y, z);
        this.#vertices = [
            new Vector3D(x - size, y - size, z - size),
            new Vector3D(x + size, y - size, z - size),
            new Vector3D(x + size, y + size, z - size),
            new Vector3D(x - size, y + size, z - size),
            new Vector3D(x - size, y - size, z + size),
            new Vector3D(x + size, y - size, z + size),
            new Vector3D(x + size, y + size, z + size),
            new Vector3D(x - size, y + size, z + size),
        ];
        this.#faces = [
            [0, 1, 2, 3],
            [0, 4, 5, 1],
            [1, 5, 6, 2],
            [3, 2, 6, 7],
            [0, 3, 7, 4],
            [4, 7, 6, 5]
        ];
        this.length = 8;
    }

    /**
     * Get the number of vertices
     * @returns {number}
     */
    get vertices() {
        return this.#vertices.length;
    }

    /**
     * Get the number of vertices
     * @returns {number}
     */
    get faces() {
        return this.#faces;
    }

    /**
     * Get cube origin point
     * @returns {Vector3D}
     */
    get origin() {
        return this.#origin;
    }

    /**
     * Initialize array with cube vertices
     * @param {Vector3D[]} vertices
     */
    init(vertices) {
        for (let i = 0; i < vertices.length; ++i) {
            let point = this.#vertices[i];
            vertices[i].reset(point.x, point.y, point.z);
        }
    }
}