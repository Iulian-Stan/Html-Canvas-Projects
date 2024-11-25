import { Vector2D } from '../libs/vector2d.js';
import { Vector3D } from '../libs/vector3d.js';

export class Renderer {
    /** @type {Vector3D[]} */
    #points3d;
    /** @type {Vector2D[]} */
    #points2d;
    /** @type {Vector3D[]} */
    #normals;
    /** @type {Cube} */
    #cube;
    /** @type {Vector3D} */
    #rotation;
    
    constructor(focalLength, edgeColor, faceColor, cube) {
        this.focalLength = focalLength;
        this.edgeColor = edgeColor;
        this.faceColor = faceColor;
        this.#cube = cube;
        this.#points2d = new Array(cube.vertices);
        this.#points3d = new Array(cube.vertices);
        for (let i = 0; i < cube.vertices; ++i) {
            this.#points2d[i] = new Vector2D;
            this.#points3d[i] = new Vector3D;
        }
        this.#normals = new Array(cube.faces.length);
        this.#rotation = new Vector3D(0, 0, 0);
        this.autoRotate = true;
        this.xAngleInc = 0.01;
        this.yAngleInc = 0;
        this.zAngleInc = 0;
    }

    init() {
        this.#cube.init(this.#points3d);
    }
    
    #vertexRotate(rx, ry, rz) {
        let cosx = Math.cos(rx), sinx = Math.sin(rx);
        let cosy = Math.cos(ry), siny = Math.sin(ry);
        let cosz = Math.cos(rz), sinz = Math.sin(rz);
        let origin = this.#cube.origin;
        for (let i = 0; i < this.#points3d.length; ++i) {
            let point = this.#points3d[i];
            let px = point.x - origin.x, py = point.y - origin.y, pz = point.z - origin.z;
            point.reset(
                px * cosy * cosz + py * (sinx * siny * cosz - cosx * sinz) + pz * (cosx * siny * cosz + sinx * sinz),
                px * cosy * sinz + py * (sinx * siny * sinz + cosx * cosz) + pz * (cosx * siny * sinz - sinx * cosz),
                -px * siny + py * sinx * cosy + pz * cosx * cosy
            );
            this.#points3d[i].reset(
                point.x + origin.x,
                point.y + origin.y,
                point.z + origin.z
            );
        }
    }

    /**
     * Compute 2D projection of the 3D object
     */
    #vertexProjection() {
        for (let i = 0; i < this.#points3d.length; ++i) {
            this.#points2d[i].reset(
                this.#points3d[i].x * this.focalLength / this.#points3d[i].z,
                this.#points3d[i].y * this.focalLength / this.#points3d[i].z
            );
        }
    }

    /**
     * Compute normal vectors for all faces of the 3D object
     */
    #faceNormals() {
        for (let i = 0; i < this.#cube.faces.length; ++i) {
            let face = this.#cube.faces[i];

            let p1 = this.#points3d[face[0]];
            let p2 = this.#points3d[face[1]];
            let p3 = this.#points3d[face[2]];

            let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
            let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);

            let n = new Vector3D(
                v1.y * v2.z - v1.z * v2.y,
                v1.z * v2.x - v1.x * v2.z,
                v1.x * v2.y - v1.y * v2.x
            );

            this.#normals[i] = (p1.x * n.x + p1.y * n.y + p1.z * n.z);
        }
    }

    update(width, height) {
        this.init();

        if (this.autoRotate) {
            this.#rotation.translate(this.xAngleInc, this.yAngleInc, this.zAngleInc);
        }
        this.#vertexRotate(this.#rotation.x, this.#rotation.y, this.#rotation.z);
        this.#faceNormals();

        this.#vertexProjection();

        for (let i = 0; i < this.#points2d.length; ++i) {
            this.#points2d[i].translate(width * .5, height * .5);
        }
    }

    /**
     * Draw the 3D projection
     * @param {CanvasRenderingContext2D} context2d 
     */
    draw(context2d) {
        context2d.strokeStyle = this.edgeColor;
        context2d.fillStyle = this.faceColor;
        for (let i = 0; i < this.#cube.faces.length; ++i) {
           if (this.#normals[i] < 0) continue;
            let face = this.#cube.faces[i];
            context2d.beginPath();
            context2d.moveTo(this.#points2d[face[0]].x, this.#points2d[face[0]].y);
            for (let j = 1; j < face.length; ++j) {
                context2d.lineTo(this.#points2d[face[j]].x, this.#points2d[face[j]].y);
            }
            context2d.closePath();
            context2d.stroke();
            context2d.fill();
        }
    }
}