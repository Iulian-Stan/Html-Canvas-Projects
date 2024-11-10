import { randomInt } from '../libs/random.js';
import { Particle } from './particle.js';

export class FlowField {
    constructor(cellSize, zoom, curve, particlesCount, colors) {
        this.cellSize = cellSize;
        this.zoom = zoom;
        this.curve = curve;
        this.particlesCount = particlesCount;
        this.colors = colors;
    }

    init(width, height) {
        this.width = width;
        this.height = height;
        // create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.angles = [];
        for (let y = 0; y < this.rows; ++y) {
            for (let x = 0; x < this.cols; ++x) {
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.angles.push(angle);
            }
        }

        this.particles = [];
        for (let i = 0; i < this.particlesCount; ++i) {
            let particle = new Particle(
                randomInt(this.width),
                randomInt(this.height),
                randomInt(5) + 2,
                randomInt(200) + 10,
                randomInt(100),
                this.colors[i % this.colors.length]);
            this.particles.push(particle);
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; ++i) {
            if (!this.particles[i].lifeSpan && !this.particles[i].history.length) {
                this.particles[i].reset(
                    randomInt(this.width),
                    randomInt(this.height),
                    randomInt(100)
                );
            }
            let col = Math.floor(this.particles[i].posX / this.cellSize);
            let row = Math.floor(this.particles[i].posY / this.cellSize);
            let index = row * this.cols + col;
            this.particles[i].update(this.angles[index]);
        }
    }

    draw(context2d) {
        for (let i = 0; i < this.particles.length; ++i) {
            this.particles[i].draw(context2d);
        }
    }
}