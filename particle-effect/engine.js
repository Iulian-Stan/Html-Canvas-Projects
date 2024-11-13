export class Engine {
    #canvas;
    #context2d;
    #particleEffect;
    #imageLoader;
    #frameRate;
    #previousTimeStamp;
    #animationRequest;
    #mouseX;
    #mouseY;
    constructor(canvas, particleEffect, imageLoader) {
        this.#canvas = canvas;
        this.#context2d = canvas.getContext('2d');
        this.#frameRate = 0;
        this.#particleEffect = particleEffect;
        this.#imageLoader = imageLoader;
        imageLoader.listener = this.#updateImage.bind(this);
    }

    get frameRate() {
        return this.#frameRate;
    }

    set mouseX(mouseX) {
        this.#mouseX = mouseX;
    }

    get mouseX() {
        return this.#mouseX;
    }

    set mouseY(mouseY) {
        this.#mouseY = mouseY;
    }

    get mouseY() {
        return this.#mouseY;
    }

    init(width, height) {
        this.#canvas.width = width;
        this.#canvas.height = height;
        this.#updateImage();
    }

    #updateImage() {
        if (this.#imageLoader.image) {
            this.#context2d.drawImage(this.#imageLoader.image, 0, 0, this.#canvas.width, this.#canvas.height);
            this.#particleEffect.image = this.#context2d.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        }
    }

    #animationInit(timeStamp) {
        this.#previousTimeStamp = timeStamp;
        this.#animationRequest = window.requestAnimationFrame(this.#animationRun.bind(this));
    }

    #animationRun(timeStamp) {
        this.#frameRate = 1000. / (timeStamp - this.#previousTimeStamp);
        this.#previousTimeStamp = timeStamp;
        // clear the canvas
        this.#context2d.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        if (this.#particleEffect.resolution === 1) {
            // draw image
            this.#context2d.drawImage(this.#imageLoader.image, 0, 0, this.#canvas.width, this.#canvas.height);
        } else {
            // draw ascii
            this.#particleEffect.update(this.#mouseX, this.#mouseY);
            this.#particleEffect.draw(this.#context2d);
        }
        this.#animationRequest = window.requestAnimationFrame(this.#animationRun.bind(this));
    }

    startAnimation() {
        this.#animationRequest = window.requestAnimationFrame(this.#animationInit.bind(this));
    }

    stopAnimation() {
        window.cancelAnimationFrame(this.#animationRequest);
    }
}