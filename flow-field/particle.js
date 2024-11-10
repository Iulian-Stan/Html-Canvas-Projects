export class Particle {
    constructor(posX, posY, accel, tail, lifeSpan, color) {
        this.posX = posX;
        this.posY = posY;
        this.accel = accel;
        this.tail = tail;
        this.lifeSpan = lifeSpan;
        this.color = color;
        this.history = [];
    }

    // draw article
    draw(context2d) {
        context2d.save();
        context2d.strokeStyle = this.color;
        context2d.lineWidth = 1;
        context2d.beginPath();
        context2d.moveTo(this.posX, this.posY);
        for (let i = this.history.length - 1; i >= 0; --i) {
            context2d.lineTo(this.history[i].x, this.history[i].y);
        }
        context2d.stroke();
        context2d.restore();
    }

    // update particle position
    update(angle) {
        if (this.lifeSpan) {
            this.posX += Math.cos(angle) * this.accel;
            this.posY += Math.sin(angle) * this.accel;
            this.history.push({ x: this.posX, y: this.posY });
            if (this.history.length > this.tail) {
                this.history.shift();
            }
            this.lifeSpan -= 1;
        } else if (this.history.length) {
            this.history.shift();
        }
    }

    // reset particle
    reset(posX, posY, lifeSpan) {
        this.posX = posX;
        this.posY = posY;
        this.lifeSpan = lifeSpan;
        this.history = [];
    }
}