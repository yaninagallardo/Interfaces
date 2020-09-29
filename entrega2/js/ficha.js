const imgFichaRoja = "./img/fichas/rojo.png";
const imgFichaRojaGanador = "./img/fichas/rojo-ganador.png";

const imgFichaAzuls = "./img/fichas/azul.png";
const imgFichaAzulGanadora = "./img/fichas/azul-ganador.png";
class Ficha {

    constructor(x, y, fila, columna, color) {
        this.posX = x;
        this.posY = y;
        this.fila = fila;
        this.columna = columna;
        this.color = color;
        this.imgFicha = '';
        this.imgFichaGanador = '';

        this.setImages();
    }

    getPosicion() {
        return {
            x: this.posX,
            y: this.posY
        }
    }

    setFicha(x, y, fila, columna, color) {
        this.posX = x;
        this.posY = y;
        this.fila = fila;
        this.columna = columna;
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setImages() {
        switch (this.color) {
            case 'rojo':
                this.imgFicha = imgFichaRoja;
                this.imgFichaGanador = imgFichaRojaGanador;
                break;
            case 'azul':
                this.imgFicha = imgFichaAzuls;
                this.imgFichaGanador = imgFichaAzulGanadora;
                break;
        }
    }
    getImgFicha(){
        return this.imgFicha;
    }

    getImgGanador(){
        return this.imgFichaGanador;
    }
}