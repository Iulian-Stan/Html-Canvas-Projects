const PI2 = Math.PI * 2;

export class Particle {
    constructor(posX, posY, radius, dirX, dirY) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.dirX = dirX;
        this.dirY = dirY;
    }

    distance(x, y) {
        let dx = this.posX - x;
        let dy = this.posY - y;
        return dx * dx + dy * dy;
    }

    connect(context2d, x, y, color) {
        context2d.save();
        context2d.strokeStyle = color;//`rgba(255, 255, 255, ${1 - distance / PARTICLES_CONNECT_DISTANCE})`;
        context2d.lineWidth = 1;
        context2d.beginPath();
        context2d.moveTo(this.posX, this.posY);
        context2d.lineTo(x, y);
        context2d.stroke();
        context2d.restore();
    }

    // draw article
    draw(context2d, color) {
        context2d.save();
        context2d.fillStyle = color;
        context2d.beginPath();
        context2d.arc(this.posX, this.posY, this.radius, 0, PI2);
        context2d.fill();
        context2d.restore();
    }

    // update particle position
    update(width, height, mouseX, mouseY, mouseR) {
        // toggle direction if position is outside the canvas
        if (this.posX + this.radius > width || this.posX - this.radius < 0) {
            this.dirX = -this.dirX;
        }
        if (this.posY + this.radius > height || this.posY - this.radius < 0) {
            this.dirY = -this.dirY;
        }
        this.posX += this.dirX;
        this.posY += this.dirY;

        // return if mouse is not inside the canvas
        if (mouseX === undefined || mouseY === undefined) {
            return;
        }

        // return if particle is outside mouse radius
        if (this.distance(mouseX, mouseY) > mouseR) {
            return;
        }

        if (mouseX < this.posX && this.posX < width - 10 * this.radius) {
            this.posX += 10;
        }
        if (mouseX > this.posX && this.posX > 10 * this.radius) {
            this.posX -= 10;
        }
        if (mouseY < this.posY && this.posY < height - 10 * this.radius) {
            this.posY += 10;
        }
        if (mouseY > this.posY && this.posY > 10 * this.radius) {
            this.posY -= 10;
        }
    }
}