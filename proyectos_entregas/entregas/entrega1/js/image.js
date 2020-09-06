class ImageCanvas {
    constructor(imageInput, imageCropper) {
        this.imageDefault = "../../img/no-disponible.jpg";
        this.image = document.querySelector(imageInput);
        this.imageCropper = document.querySelector(imageCropper);
    }

    initClass() {
        this.imageCropper.src = this.imageDefault;
        this.image.addEventListener('change', (event) => {
            this.imageCropper.src = event.src;
        });
    }

    changeImageSelector() {
    }


}