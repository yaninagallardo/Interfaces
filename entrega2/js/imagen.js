const imgFondo = "./img/fondo2.jpg";

class Imagen {
    constructor(ctx, size) {
        this.ctx = ctx;
        this.sizeCuadro = size;
     }

    // Dibujar Imagenes 
    dibujarFondo(width, height) {
        let background = new Image();
        background.src = imgFondo;
        let cargarimagen = function () {
            this.ctx.drawImage(background, 0, 0, width, height);
        }
        background.onload = cargarimagen.bind(this);
    }

    dibujarFicha(posX, posY, imgFicha) {
        console.log('dibuja ficha');
        let imageShow = new Image();
        imageShow.src = imgFicha;

        let cargarimagen = function () {
            let imageScaledWidth = this.sizeCuadro.width - 5;
            let imageScaledHeight = this.sizeCuadro.height - 5;
            this.ctx.drawImage(imageShow, (posX + 2.5), (posY), imageScaledWidth, imageScaledHeight);
        }
        imageShow.onload = cargarimagen.bind(this);
    }
}