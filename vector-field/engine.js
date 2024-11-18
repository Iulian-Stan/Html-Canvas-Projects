export class Engine {
    /** @type {HTMLElement} */
    #canvas;
    /** @type {CanvasRenderingContext2D} */
    #context2d;
    /** @type {number} */
    #frameRate;
    /** @type {VectorField} */
    #vectorField;
    /** @type {number} */
    #previousTimeStamp;
    /** @type {number} */
    #animationRequest;

    /**
     * Create Engine instance
     * @param {HTMLElement} canvas
     * @param {VectorField} vectorField
     */
    constructor(canvas, vectorField) {
        this.#canvas = canvas;
        this.#context2d = canvas.getContext('2d');
        this.#frameRate = 0;
        this.#vectorField = vectorField;
    }

    /**
     * Get the frame rate
     * @returns {number} Frame rate
     */
    get frameRate() {
        return this.#frameRate;
    }

    /**
     * Initialize the rendering engine and the vector field
     */
    init() {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
        let gradient = this.#context2d.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
        gradient.addColorStop('0.1', this.#vectorField.colors[0]);
        gradient.addColorStop('0.2', this.#vectorField.colors[1]);
        gradient.addColorStop('0.4', this.#vectorField.colors[2]);
        gradient.addColorStop('0.6', this.#vectorField.colors[3]);
        gradient.addColorStop('0.8', this.#vectorField.colors[4]);
        gradient.addColorStop('0.9', this.#vectorField.colors[5]);
        this.#context2d.strokeStyle = gradient;
        this.#context2d.lineWidth = 1;
        this.#vectorField.init(window.innerWidth, window.innerHeight);
    }

    /**
     * Initialize the animation to get the first timestamp
     * @param {number} timeStamp
     */
    #animationInit(timeStamp) {
        this.#previousTimeStamp = timeStamp;
        this.#animationRequest = window.requestAnimationFrame(this.#animationRun.bind(this));
    }

    /**
     * Run main animation routine
     * @param {number} timeStamp
     */
    #animationRun(timeStamp) {
        this.#frameRate = 1000/ (timeStamp - this.#previousTimeStamp);
        this.#previousTimeStamp = timeStamp;
        // clear the canvas
        this.#context2d.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        // draw the field
        this.#vectorField.draw(this.#context2d, this.mouseX, this.mouseY);
        this.#animationRequest = window.requestAnimationFrame(this.#animationRun.bind(this));
    }

    /**
     * Start the animation process
     */
    startAnimation() {
        this.#animationRequest = window.requestAnimationFrame(this.#animationInit.bind(this));
    }

    /**
     * Stop the animation process
     */
    stopAnimation() {
        window.cancelAnimationFrame(this.#animationRequest);
    }
}