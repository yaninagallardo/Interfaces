class Canvas {
    constructor(idCanvas, width, height) {
        this.canvas = document.querySelector(idCanvas);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = height;
        this.canvas.width = width;

        this.dibujar = false;
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
        this.lapizSeleccionado = true;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
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
const imagenMuestra = "./img/paisaje-muestra.jpg";
class ImageCanvas extends Canvas {
    constructor(imageInput, imageCropper, idCanvas, width, height) {
        super(idCanvas, width, height);

        this.image = document.querySelector(imageInput);
        this.imageExample = document.querySelector(imageCropper);
        this.imageExample.src = imageDefault;
        this.imageBase64 = null;
        this.filterApply = false;
    }

    cargarMuestrasdeFiltros(){
        this.negativo = document.querySelector("#filtro-negativo");
        this.sepia = document.querySelector("#filtro-sepia");
        this.byn = document.querySelector("#filtro-byn");
        this.blur = document.querySelector("#filtro-blur");
    }

    setImage(e) {
        this.limpiarCanvas();

        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            this.imageBase64 = content;
            this.drawImage(content);
        }
    }

    drawImage(content) {
        let canvasClone = this.canvas;
        let contextClone = this.ctx;
        let imageClone = this.imageExample;

        let imageShow = new Image();

        imageShow.src = content;
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
        }
    }

    descargarImagen() {
        let descarga = document.querySelector("#link-descarga");
        let image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        descarga.setAttribute("href", image);
    }

    /*--------------FILTROS -------------*/
    quitarFiltro() {
        console.log(this.filterApply);
    //     if(this.filterApply === true){
    //         let imageAspectRatio = (1.0 * this.imageBase64.width) / this.imageBase64.height;
    //         let imageScaledHeight = canvas.height;
    //         let imageScaledWidth = canvas.height * imageAspectRatio;
    //         this.ctx.drawImage(this.imageBase64, 0, 0, imageScaledWidth, imageScaledHeight);
    //         this.filterApply = false;
    //     }
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
                if (rojo > valueColorMax) rojo = valueColorMax;
                let verde = 0.349 * imageData.data[index] + 0.686 * imageData.data[index + 1] + 0.168 * imageData.data[index + 2];
                if (verde > valueColorMax) verde = valueColorMax;
                let azul = 0.272 * imageData.data[index] + 0.534 * imageData.data[index + 1] + 0.131 * imageData.data[index + 2];
                if (azul > valueColorMax) azul = valueColorMax;
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
                let colorGris = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
                imageData.data[index] = colorGris;
                imageData.data[index + 1] = colorGris;
                imageData.data[index + 2] = colorGris;
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

    contraste(contraste) {
        let imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

        let numPixels = imageData.width * imageData.height;
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

    }

    brillo() {
        let imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
        let param = 50;

        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                let index = (x + y * imageData.width) * 4;
                imageData.data[index] = this.trunc(param + imageData.data[index + 0]);
                imageData.data[index + 1] = this.trunc(param + imageData.data[index + 1]);
                imageData.data[index + 2] = this.trunc(param + imageData.data[index + 2]);
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    }

    trunc(value) {
        if (value < 0)
            return 0;
        if (value > 255)
            return 255;
        else return value;
    }


}