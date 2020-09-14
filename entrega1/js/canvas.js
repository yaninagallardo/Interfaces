class Canvas {
    constructor(idCanvas, width, height) {
        this.canvas = document.querySelector(idCanvas);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = height;
        this.canvas.width = width;

        this.dibujar = false;
        this.limpiarDibujo = false;
        this.lapizSeleccionado = true;

        this.backgroundColor = "#ffffff";
        this.colorDraw = "#000000";
        this.colorCanvas = "#000000";
    }

    // Sets
    setWidth(width) {
        this.canvas.width = width;
    }

    noDibujar() {
        this.dibujar = false;
    }

    empezarDibujo(evt) {
        this.dibujar = true;
        let posicionActual = this.posicionMouse(evt);
        this.ctx.moveTo(posicionActual.x, posicionActual.y)
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.colorCanvas;
        this.ctx.lineWidth = 5; //Defino el ancho de la linea en pixeles
        this.ctx.beginPath();
    }

    dibujandoLinea(evt) {
        if (this.dibujar) {
            let posicion = this.posicionMouse(evt);
            this.ctx.lineTo(posicion.x, posicion.y);
            this.ctx.stroke();
            this.limpiarDibujo = true;
        }
    }

    posicionMouse(evt) {
        let clientRect = this.canvas.getBoundingClientRect();
        return { //objeto con posición del mouse
            x: Math.round(evt.clientX - clientRect.left),
            y: Math.round(evt.clientY - clientRect.top)
        }
    }

    // Botones
    limpiarCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.lapizSeleccionado = true;
        this.limpiarDibujo = false;
    }

    borrador() {
        this.colorCanvas = this.backgroundColor;
        this.lapizSeleccionado = false;
    }

    pincelSeleccionado() {
        this.lapizSeleccionado = true;
        this.colorCanvas = this.colorDraw;
    }

    setColor(color) {
        try {
            this.colorDraw = color;
            this.colorCanvas = color;
        } catch {
            this.colorDraw = "#000000";
            this.colorCanvas = "#000000";
        }
    }

}

/* --------------- IMAGEN ------------------*/
const valueColorMax = 255;
const imageDefault = "./img/no-disponible.jpg";
class ImageCanvas extends Canvas {
    constructor(imageInput, imageCropper, idCanvas, width, height) {
        super(idCanvas, width, height);

        this.image = document.querySelector(imageInput);
        this.imageExample = document.querySelector(imageCropper);
        this.imageExample.src = imageDefault;
        this.filterApply = false;
    }

    setImage(e) {
        this.limpiarCanvas();

        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async readerEvent => {
            let content = readerEvent.target.result;
            this.imageDataOriginal = await this.drawImage(content);
        }
    }

    drawImage(content) {
        let canvasClone = this.canvas;
        let contextClone = this.ctx;
        let imageClone = this.imageExample;

        let imageShow = new Image();

        imageShow.src = content;
        return new Promise(function (resolve) {
            imageShow.onload = function () {

                let imageScaledWidth = canvasClone.width;
                let imageScaledHeight = canvasClone.height;
                let imageAspectRatio = (1.0 * this.height) / this.width;

                if (this.width < this.height) {
                    imageAspectRatio = (1.0 * this.width) / this.height;
                    imageScaledWidth = canvasClone.height * imageAspectRatio;
                    imageScaledHeight = canvasClone.height;
                }
                contextClone.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

                let imageData = contextClone.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                contextClone.putImageData(imageData, 0, 0);
                imageClone.src = imageShow.src;

                resolve(this);
            }
        });

    }

    descargarImagen() {
        let descarga = document.querySelector("#link-descarga");
        let image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        descarga.setAttribute("href", image);
    }

    /*--------------FILTROS -------------*/
    quitarFiltro() {
        if (this.filterApply || this.limpiarDibujo) {
            this.ctx.drawImage(this.imageDataOriginal, 0, 0, this.canvas.width, this.canvas.height);
            this.filterApply = false;
        }
    }

    negativo() {
        this.quitarFiltro();
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                let index = (x + y * imageData.width) * 4;
                imageData.data[index] = valueColorMax - imageData.data[index];
                imageData.data[index + 1] = valueColorMax - imageData.data[index + 1];
                imageData.data[index + 2] = valueColorMax - imageData.data[index + 2];
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.filterApply = true;
    }

    sepia() {
        this.quitarFiltro();
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        for (let j = 0; j < imageData.height; j++) {
            for (let i = 0; i < imageData.width; i++) {
                let index = (i + imageData.width * j) * 4;

                let rojo = 0.393 * imageData.data[index] + 0.769 * imageData.data[index + 1] + 0.189 * imageData.data[index + 2];
                let verde = 0.349 * imageData.data[index] + 0.686 * imageData.data[index + 1] + 0.168 * imageData.data[index + 2];
                let azul = 0.272 * imageData.data[index] + 0.534 * imageData.data[index + 1] + 0.131 * imageData.data[index + 2];
                imageData.data[index] = rojo;
                imageData.data[index + 1] = verde;
                imageData.data[index + 2] = azul;
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.filterApply = true;
    }

    blanconegro() {
        this.quitarFiltro();
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                let index = (x + y * imageData.width) * 4;

                let colorGris = this.getGris(imageData.data[index], imageData.data[index + 1], imageData.data[index + 2]);

                imageData.data[index] = colorGris;
                imageData.data[index + 1] = colorGris;
                imageData.data[index + 2] = colorGris;
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.filterApply = true;
    }
    
    binario() {
        this.quitarFiltro();
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                let index = (x + y * imageData.width) * 4;

                let colorGris = this.getGris(imageData.data[index], imageData.data[index + 1], imageData.data[index + 2]);

                if (colorGris > 100) {
                    imageData.data[index] = valueColorMax;
                    imageData.data[index + 1] = valueColorMax;
                    imageData.data[index + 2] = valueColorMax;
                } else {
                    imageData.data[index] = 0;
                    imageData.data[index + 1] = 0;
                    imageData.data[index + 2] = 0;
                }
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.filterApply = true;
    }

    desenfoque() {
        this.quitarFiltro();
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < imageData.data.length; i++) {
            if (i % 4 === 3) { continue; }
            let pixel = imageData.data[i];
            imageData.data[i] = this.getValuePromedio(imageData.data, pixel, i, imageData.width);
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.filterApply = true;
    }

    getValuePromedio(data, pixel, i, width) {
        const max = 9;

        return (pixel + (data[i - 4]) + (data[i + 4]) +
            (data[i - 4 * width]) + (data[i + 4 * width]) +
            (data[i - 4 * width - 4]) + (data[i + 4 * width + 4]) +
            (data[i - 4 * width + 4]) + (data[i + 4 * width - 4])) / max;
    }

    contraste(parameter) {
        this.quitarFiltro();
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        let numPixels = imageData.width * imageData.height;
        let contraste = Number(parameter);
        let factor = (259 * (contraste + 255)) / (255 * (259 - contraste));

        for (let i = 0; i < numPixels; i++) {
            let r = imageData.data[i * 4];
            let g = imageData.data[i * 4 + 1];
            let b = imageData.data[i * 4 + 2];

            imageData.data[i * 4] = factor * (r - 128) + 128;
            imageData.data[i * 4 + 1] = factor * (g - 128) + 128;
            imageData.data[i * 4 + 2] = factor * (b - 128) + 128;
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.filterApply = true;
    }

    brillo(parameter) {
        this.quitarFiltro();
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let param = Number(parameter);
        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                let index = (x + y * imageData.width) * 4;
                imageData.data[index] = this.trunc(param + imageData.data[index + 0]);
                imageData.data[index + 1] = this.trunc(param + imageData.data[index + 1]);
                imageData.data[index + 2] = this.trunc(param + imageData.data[index + 2]);
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.filterApply = true;
    }

    saturacion(parametro) {
        this.quitarFiltro();
        let value = -(parametro);
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let i = (y * imageData.width + x) * 4;

                let gris = this.getGris(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);

                imageData.data[i] = gris * value + imageData.data[i] * (1 - value);
                imageData.data[i + 1] = gris * value + imageData.data[i + 1] * (1 - value);
                imageData.data[i + 2] = gris * value + imageData.data[i + 2] * (1 - value);
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.filterApply = true;
    }

    getGris(r, g, b) {
        return 0.2989 * r + 0.5870 * g + 0.1140 * b;
    }

    trunc(value) {
        if (value < 0)
            return 0;
        if (value > 255)
            return 255;
        else return value;
    }
}