export class Engine {
    constructor(canvas, flowField) {
        this.canvas = canvas;
        this.context2d = canvas.getContext('2d');
        this.frameRate = 0;
        this.flowField = flowField;
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.flowField.init(window.innerWidth, window.innerHeight);
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
        // update and draw particles
        this.flowField.update();
        this.flowField.draw(this.context2d);
        this.animationRequest = window.requestAnimationFrame(this.#animationRun.bind(this));
    }

    startAnimation() {
        this.animationRequest = window.requestAnimationFrame(this.#animationInit.bind(this));
    }

    stopAnimation() {
        window.cancelAnimationFrame(this.animationRequest);
    }
}