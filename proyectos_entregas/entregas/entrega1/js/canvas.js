class Canvas {
    constructor(idCanvas, width, height) {
        this.id = idCanvas;
        this.dibujar = false;
        this.lapizSeleccionado = true;

        this.backgroundColor = "#e2d5bc";
        this.colorDraw = "#000000";
        this.colorCanvas = "#000000";

        this.canvas = document.querySelector(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = height;
        this.canvas.width = width;
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

    borrador(){
        this.colorCanvas = this.backgroundColor;
        this.lapizSeleccionado = false;
    }

    pincelSeleccionado(){
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