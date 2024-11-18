 export class Engine {
    /** @type {HTMLElement} */
    #canvas;
    /** @type {CanvasRenderingContext2D} */
    #context2d;
    /** @type {number} */
    #frameRate;
    /** @type {VectorField} */
    #particleSystem;
    /** @type {number} */
    #previousTimeStamp;
    /** @type {number} */
    #animationRequest;

    /**
     * Create Engine instance
     * @param {HTMLElement} canvas
     * @param {VectorField} vectorField
     */
    constructor(canvas, particleSystem) {
        this.#canvas = canvas;
        this.#context2d = canvas.getContext('2d');
        this.#frameRate = 0;
        this.#particleSystem = particleSystem;
    }

    /**
     * Get the frame rate
     * @returns {number} Frame rate
     */
    get frameRate() {
        return this.#frameRate;
    }

    /**
     * Initialize the rendering engine
     */
    init() {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
        this.#particleSystem.init(window.innerWidth, window.innerHeight);
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
        // update and draw the field
        this.#particleSystem.update(this.mouseX, this.mouseY);
        this.#particleSystem.draw(this.#context2d);
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