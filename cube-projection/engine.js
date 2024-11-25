export class Engine {
    /** @type {HTMLElement} */
    #canvas;
    /** @type {CanvasRenderingContext2D} */
    #context2d;
    /** @type {Renderer} */
    #previousTimeStamp;
    /** @type {number} */
    #renderer;
    /** @type {number} */
    #animationRequest;
    /** @type {number} */
    #frameRate;

    /**
     * Create Engine instance
     * @param {HTMLElement} canvas
     */
    constructor(canvas, renderer) {
        this.#canvas = canvas;
        this.#context2d = canvas.getContext('2d');
        this.#renderer = renderer;
        this.#frameRate = 0;
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
    init(width, height) {
        this.#canvas.width = width;
        this.#canvas.height = height;
        this.#init();
    }

    /**
     * Initialize the particles based on the image
     */
    #init() {
        this.#renderer.update(this.#canvas.width, this.#canvas.height);
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
        this.#renderer.update(this.#canvas.width, this.#canvas.height);
        this.#renderer.draw(this.#context2d);
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