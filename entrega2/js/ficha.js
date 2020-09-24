class Ficha {

    constructor(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosicion() {
        return {
            x: this.posX,
            y: this.posY
        }
    }

    setPosicion(x, y) {
        this.posX = x;
        this.posY = y;
    }
}