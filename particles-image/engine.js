export class Engine {
    /** @type {HTMLElement} */
    #canvas;
    /** @type {CanvasRenderingContext2D} */
    #context2d;
    /** @type {number} */
    #frameRate;
    /** @type {ParticleEffect} */
    #particleEffect;
    /** @type {ImageLoader} */
    #imageLoader;
    /** @type {number} */
    #previousTimeStamp;
    /** @type {number} */
    #animationRequest;
    /** @type {number} */
    #mouseX;
    /** @type {number} */
    #mouseY;

    /**
     * Create Engine instance
     * @param {HTMLElement} canvas
     * @param {ImageLoader} imageLoader
     * @param {ParticleEffect} particleEffect
     */
    constructor(canvas, imageLoader, particleEffect) {
        this.#canvas = canvas;
        this.#context2d = canvas.getContext('2d');
        this.#frameRate = 0;
        this.#particleEffect = particleEffect;
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
     * Set mouse X position
     * @param {number} mouseX
     */
    set mouseX(mouseX) {
        this.#mouseX = mouseX;
    }

    /**
     * Get mouse X position
     * @returns {number} X position
     */
    get mouseX() {
        return this.#mouseX;
    }

    /**
     * Set mouse Y position
     * @param {number} mouseX
     */
    set mouseY(mouseY) {
        this.#mouseY = mouseY;
    }

    /**
     * Get mouse Y position
     * @returns {number} Y position
     */
    get mouseY() {
        return this.#mouseY;
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
        this.#particleEffect.image = this.#context2d.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
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
        this.#frameRate = 1000 / (timeStamp - this.#previousTimeStamp);
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