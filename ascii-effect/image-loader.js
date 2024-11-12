export class ImageLoader {
    #image;
    #reader;
    #origImage;
    constructor(imageSrc) {
        this.#image = new Image();
        this.#reader = new FileReader();
        this.#origImage = imageSrc;
        this.imageFile = imageSrc; 
    }

    #updateImageFile(file) {
        if (FileReader && file && file.size) {
            this.#reader.onload = () => {
                this.#image.src = this.#reader.result;
            };
            this.#reader.readAsDataURL(file);
        }
    }

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

    get imageFile() {
        return this.#image.src;
    }

    get image() {
        return this.#image;
    }

    set listener(listener) {
        this.#image.onload = listener;
    }
}