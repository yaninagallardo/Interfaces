class Ficha {

    constructor(x, y, color) {
        this.posX = x;
        this.posY = y;
        this.color = color;
        
    }

    getPosicion() {
        return {
            x: this.posX,
            y: this.posY
        }
    }

    setFicha(x, y, color) {
        this.posX = x;
        this.posY = y;
        this.color = color;
    }

    getColor(){
        return this.color;
    }
}