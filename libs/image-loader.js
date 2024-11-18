export class ImageLoader {
    /** @type {Image} */
    #image;
    /** @type {FileReader} */
    #reader;
    /** @type {string} */
    #origImage;

    /**
     * Construct a new image loader
     * @param {string} imageSrc
     */
    constructor(imageSrc) {
        this.#image = new Image();
        this.#reader = new FileReader();
        this.#origImage = imageSrc;
        this.imageFile = imageSrc;
    }

    /**
     * Update image file
     * @param {Blob} file
     */
    #updateImageFile(file) {
        if (FileReader && file && file.size) {
            this.#reader.onload = () => {
                this.#image.src = this.#reader.result;
            };
            this.#reader.readAsDataURL(file);
        }
    }

    /**
     * Set image file
     * @param {null|string|Blob} file
     */
    set imageFile(file) {
        if (!file) {
            this.imageFile = this.#origImage;
            return;
        }
        if (typeof file === 'string' || file instanceof String) {
            this.#image.src = file;
            return;
        }
        this.#updateImageFile(file);
    }

    /**
     * Get image file
     * @returns {string} Image file
     */
    get imageFile() {
        return this.#image.src;
    }

    /**
    * Get image
    * @returns {blob} Image
    */
    get image() {
        return this.#image;
    }

    /**
     * Set image load listener
     * @param {{() => {}}} listener
     */
    set listener(listener) {
        this.#image.onload = listener;
    }
}