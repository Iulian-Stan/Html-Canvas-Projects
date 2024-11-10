 export class Engine {
    constructor(canvas, particleSystem) {
        this.canvas = canvas;
        this.context2d = canvas.getContext('2d');
        this.frameRate = 0;
        this.particleSystem = particleSystem;
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particleSystem.init(window.innerWidth, window.innerHeight);
    }

    #animationInit(timeStamp) {
        this.previousTimeStamp = timeStamp;
        this.animationRequest = window.requestAnimationFrame(this.#animationRun.bind(this));
    }

    #animationRun(timeStamp) {
        this.frameRate = 1000. / (timeStamp - this.previousTimeStamp);
        this.previousTimeStamp = timeStamp;
        // clear the canvas
        this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // update and draw the field
        this.particleSystem.update(this.mouseX, this.mouseY);
        this.particleSystem.draw(this.context2d);
        this.animationRequest = window.requestAnimationFrame(this.#animationRun.bind(this));
    }

    startAnimation() {
        this.animationRequest = window.requestAnimationFrame(this.#animationInit.bind(this));
    }

    stopAnimation() {
        window.cancelAnimationFrame(this.animationRequest);
    }
}