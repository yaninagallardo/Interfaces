class ImageCanvas {
    constructor(imageInput, imageCropper) {
        this.imageDefault = "../../img/no-disponible.jpg";
        this.image = document.querySelector(imageInput);
        this.imageCropper = document.querySelector(imageCropper);
        this.imageCropper.src = this.imageDefault;
    }
    
    setImage(){
        this.imageCropper.src = event.src;
    }

}