export class Engine {
    /** @type {HTMLElement} */
    #canvas;
    /** @type {CanvasRenderingContext2D} */
    #context2d;
    /** @type {number} */
    #frameRate;
    /** @type {AsciiEffect} */
    #imageAscii;
    /** @type {ImageLoader} */
    #imageLoader;
    /** @type {number} */
    #previousTimeStamp;
    /** @type {number} */
    #animationRequest;

    /**
     * Create Engine instance
     * @param {HTMLElement} canvas
     * @param {ImageLoader} imageLoader
     * @param {AsciiEffect} asciiEffect
     */
    constructor(canvas, imageLoader, asciiEffect) {
        this.#canvas = canvas;
        this.#context2d = canvas.getContext('2d');
        this.#frameRate = 0;
        this.#imageAscii = asciiEffect;
        this.#imageLoader = imageLoader;
        imageLoader.listener = this.#updateImage.bind(this);
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
        this.#updateImage();
    }

    /**
     * Update image data
     */
    #updateImage() {
        if (!this.#imageLoader.image.height || !this.#imageLoader.image.width) return;
        let x = 0, y = 0, width = this.#canvas.width, height = this.#canvas.height;
        let imageAR = this.#imageLoader.image.width / this.#imageLoader.image.height;
        let canvasAR = this.#canvas.width / this.#canvas.height;
        if (imageAR > canvasAR) {
            height = this.#imageLoader.image.height * this.#canvas.width / this.#imageLoader.image.width;
            y = (this.#canvas.height - height) * .5;
        } else {
            width = this.#imageLoader.image.width * this.#canvas.height / this.#imageLoader.image.height;
            x = (this.#canvas.width - width) * .5;
        }
        this.#context2d.drawImage(this.#imageLoader.image, x, y, width, height);
        this.#imageAscii.image = this.#context2d.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
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
        if (this.#imageAscii.resolution === 1) {
            // draw image
            this.#context2d.drawImage(this.#imageLoader.image, 0, 0, this.#canvas.width, this.#canvas.height);
        } else {
            // draw ascii
            this.#imageAscii.draw(this.#context2d, this.mouseX, this.mouseY);
        }
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