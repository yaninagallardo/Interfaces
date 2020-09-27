const imgFichaRojo = "./img/fichas/rojo.png";
const imgFichaRojoGanador = "./img/fichas/rojo-ganador.png";

const imgFichaAzul = "./img/fichas/azul.png";
const imgFichaAzulGanador = "./img/fichas/azul-ganador.png";

const imgFondo = "./img/fondo2.jpg";
const imgCirculo = "./img/fichas/ficha3d-blanco.png";

class Tablero {
    celdasOcupadas = [];
    constructor(canvas, ctx) {
        this.imgFicha = imgFichaRojo;
        this.canvas = canvas;
        this.ctx = ctx;
        this.columnas = [];
        this.filas = [];
        this.cantColumnas = 0;
        this.cantFilas = 0;
        this.matriz = [];
        this.sizeCuadro = { width: 50, height: 50 };
        this.matrizCeldas = [];
    }

    getCantFilas(){
        return this.cantFilas;
    }
    getCantColumnas(){
        return this.cantColumnas;
    }

    dibujaGrid() {
        let disX = this.sizeCuadro.width;
        let disY = this.sizeCuadro.height;

        for (let i = 0; i < this.canvas.width; i += disX) {
            this.columnas.push(i);
        }
        for (let i = 0; i < this.canvas.height; i += disY) {
            this.filas.push(i);
        }
        this.cantFilas = this.filas.length;
        this.cantColumnas = this.columnas.length;
        let fila = 0;
        let columna = 0;
        this.dibujarFondo();
        for (let x = 0; x < this.cantColumnas; x++) {
            this.matrizCeldas[columna] = [];
            fila = 0;
            for (let y = 0; y < this.cantFilas; y++) {
                let celda = {
                    x: this.columnas[x],
                    y: this.columnas[y],
                    disX: disX,
                    disY: disY,
                    ocupada: false,
                    fila: fila,
                    columna: columna,
                    fichaColor: ""
                }
                this.matriz.push(celda);
                this.matrizCeldas[columna][fila] = celda;
                if(y > 0){
                    this.dibujarFicha(celda.x, celda.y);
                }
                fila++;
            }
            columna++;
        }
        this.calcularFichas();
    }

    
/**
 * controla: celda desocupada, ultima posicion en X manteniendo posicion Y.
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} color 
 */
    ocuparCelda(x, y, color) {
        let celdaOcupada = {
            fila: 0,
            columna: 0,
            celdaOcupada: false
        }
        for (let i = 0; i < this.matriz.length; i++) {
            if (!this.matriz[i].ocupada &&
                x > this.matriz[i].x && 
                x < this.matriz[i].x + this.matriz[i].disX && 
                y > this.matriz[i].y && 
                y < this.matriz[i].y + this.matriz[i].disY 
            ) {
                let index = this.buscarUltimaFila(this.matriz[i].columna);
                if(this.matriz[index].fila > this.cantFilas - 6){
                    this.setColor(color);
                    this.dibujarFicha(this.matriz[index].x, this.matriz[index].y);
    
                    this.matriz[index].fichaColor = color;
                    this.matrizCeldas[this.matriz[index].columna][this.matriz[index].fila].fichaColor = color;
                    
                    this.matriz[index].ocupada = true;
                    celdaOcupada = {
                        fila: this.matriz[index].fila,
                        columna: this.matriz[index].columna,
                        celdaOcupada: true
                    }
                }
            }
        }
        return celdaOcupada;
    }

    getMatriz() {
        return this.matrizCeldas;
    }

    /**
     * Busqueda de ultima fila libre para insertar la nueva ficha
     * @param {*} columna 
     */
    buscarUltimaFila(columna) {
        for (let f = this.cantFilas - 1; f >= 0; f--) {
            let index = this.matriz.findIndex(x => x.columna === columna && x.fila === f);
            if (!this.matriz[index].ocupada) {
                return index;
            }
        }
    }

    /**
     * Calculo de cantidad de celdas disponibles en el tablero
     */
    calcularFichas() {
        return this.cantFilas * this.cantColumnas;
    }

    /**
     * set del color de la ficha que se dibujara en el tablero
     * @param {} color 
     */
    setColor(color) {
        switch (color) {
            case 'rojo':
                this.imgFicha = imgFichaRojo;
                break;
            case 'azul':
                this.imgFicha = imgFichaAzul;
                break;
        }
    }

    // Dibujar Imagenes 
    dibujarFondo() {
        let background = new Image();
        background.src = imgFondo;
        let cargarimagen = function () {
            this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
        }
        background.onload = cargarimagen.bind(this);
        this.imgFicha = imgCirculo;

    }

    dibujarFicha(posX, posY) {
        let imageShow = new Image();
        imageShow.src = this.imgFicha;
        let cargarimagen = function () {
            let imageScaledWidth = this.sizeCuadro.width - 5;
            let imageScaledHeight = this.sizeCuadro.height - 5;

            this.ctx.drawImage(imageShow, (posX+2.5), (posY), imageScaledWidth, imageScaledHeight);
        }
        imageShow.onload = cargarimagen.bind(this);
    }
}