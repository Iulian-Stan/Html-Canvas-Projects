const PI2 = Math.PI * 2;

export class Particle {
    #originalX;
    #originalY;
    #currentX;
    #currentY;
    #color;
    constructor(x, y, color) {
        this.#originalX = x;
        this.#originalY = y;
        this.#currentX = x;
        this.#currentY = y;
        this.#color = color;
    }

    #distance(x, y) {
        let dx = this.#currentX - x;
        let dy = this.#currentY - y;
        return dx * dx + dy * dy;
    }

    update(mouseX, mouseY, maxDistance, forceDistance, pushForce, gravityForce) {
        if (mouseX === undefined) mouseX = -10000;
        if (mouseY === undefined) mouseY = -10000;

        let dx = this.#currentX - mouseX;
        let dy = this.#currentY - mouseY;
        let distance = dx * dx + dy * dy;

        if (distance < forceDistance) {
            let force = Math.max((maxDistance - distance) / maxDistance, 0);
            this.#currentX -= dx / distance * force * pushForce;
            this.#currentY -= dy / distance * force * pushForce;
        } else {
            if (this.#currentX !== this.#originalX) {
                this.#currentX -= (this.#currentX - this.#originalX) * gravityForce;
            }
            if (this.#currentY !== this.#originalY) {
                this.#currentY -= (this.#currentY - this.#originalY) * gravityForce;
            }
        }
        // let mouseDist = this.#distance(mouseX, mouseY);
        // if (mouseDist < ) {
        //     return;
        // }
        // if (mouseDist > ) {

        // }
    }

    draw(context2d, radius) {
        context2d.save();
        context2d.fillStyle = this.#color;
        context2d.beginPath();
        context2d.arc(this.#currentX, this.#currentY, radius, 0, PI2);
        context2d.fill();
        context2d.restore();
    }
}