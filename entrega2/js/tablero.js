const imgFichaRojo = "./img/fichaRojo.png";
const imgFichaAzul = "./img/fichaAzul.png";
const imgFichaVerde = "./img/fichaVerde.png";


class Tablero {
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
    }

    dibujaGrid() {
        let disX = this.sizeCuadro.width;
        let disY = this.sizeCuadro.height;
        let anchoLinea = 0.4;
        let color = "#44414B";


        this.ctx.lineWidth = anchoLinea;
        this.ctx.strokeStyle = color;

        for (let i = 0; i < this.canvas.width; i += disX) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();
            this.columnas.push(i);
        }
        for (let i = 0; i < this.canvas.height; i += disY) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();
            this.filas.push(i);
        }
        this.cantFilas = this.filas.length;
        this.cantColumnas = this.columnas.length;
        let fila = 0;
        let columna = 0;

        for (let x = 0; x < this.columnas.length; x++) {
            fila = 0;
            for (let y = 0; y < this.filas.length; y++) {
                let celda = {
                    x: this.columnas[x],
                    y: this.columnas[y],
                    disX: disX,
                    disY: disY,
                    ocupada: false,
                    fila: fila,
                    columna: columna
                }
                this.matriz.push(celda);
                fila++;
            }
            columna++;
        }
        this.calcularFichas();

    }

    ocuparCelda(x, y) {
        for (let i = 0; i < this.matriz.length; i++) {
            if (!this.matriz[i].ocupada &&
                x > this.matriz[i].x && //31 > 50 si
                x < this.matriz[i].x + this.matriz[i].disX && //31 < 50 + 50 si
                y > this.matriz[i].y && // 25 > 150 si
                y < this.matriz[i].y + this.matriz[i].disY // 25 < 150 + 200 si
            ) {
                let index = this.buscarUltimaFila(this.matriz[i].columna);

                this.dibujarFicha(this.matriz[index].x, this.matriz[index].y);
                this.matriz[index].ocupada = true;
                return {
                    posX: this.matriz[index].x,
                    posY: this.matriz[index].y
                }
                
            }
        }
    }

    buscarUltimaFila(columna) {
        for (let f = this.cantFilas - 1; f >= 0; f--) {
            let index = this.matriz.findIndex(x => x.columna === columna && x.fila === f);
            if (!this.matriz[index].ocupada) {
                return index;
            }
        }
    }

    calcularFichas() {
        let total = this.cantFilas * this.cantColumnas;
        // const emiter = new EventEmitter();
        // emiter.on('totalFichas', handleMyEvent);
        // emiter.emit('totalFichas', total);
    }

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

    dibujarFicha(posX, posY) {
        let imageShow = new Image();
        imageShow.src = this.imgFicha;
        let cargarimagen = function () {
            let imageScaledWidth = this.sizeCuadro.width - 2;
            let imageScaledHeight = this.sizeCuadro.height - 2;

            this.ctx.drawImage(imageShow, posX, posY, imageScaledWidth, imageScaledHeight);
        }
        imageShow.onload = cargarimagen.bind(this);
    }

}