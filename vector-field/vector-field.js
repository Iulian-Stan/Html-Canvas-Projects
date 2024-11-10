export class VectorField {
    constructor(cellSize, zoom, curve, colors) {
        this.cellSize = cellSize;
        this.zoom = zoom;
        this.curve = curve;
        this.radius = 10;
        this.vr = .00003;
        this.angle = 0;
        this.colors = colors;
    }

    init(width, height) {
        // create flow field
        this.width = width;
        this.height = height;
        this.mouseR = width * height * 0.05;
    }

    #drawLine(context2d, x, y, angle, curve) {
        context2d.beginPath();
        context2d.moveTo(x, y);
        context2d.lineTo(x + Math.cos(angle) * curve, y + Math.sin(angle) * curve);
        context2d.stroke();
    }

    draw(context2d, mouseX, mouseY) {
        for (let y = 0; y < this.height; y += this.cellSize) {
            for (let x = 0; x < this.width; x += this.cellSize) {
                this.radius += this.vr;
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.radius;
                let curve = this.curve;
                if (mouseX !== undefined && mouseY !== undefined) {
                    let dx = x - mouseX;
                    let dy = y - mouseY;
                    let dist = dx * dx + dy * dy;
                    if (dist < this.mouseR) {
                        curve *= dist / this.mouseR;
                    }
                }
                this.#drawLine(context2d, x, y, angle, curve);
            }
        }
    }
}