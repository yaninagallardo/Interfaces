class ControladorJugada{
    constructor(tablero){
        this.tablero = tablero;
        this.filas = this.tablero.getCantFilas();
        this.columnas = this.tablero.getCantColumnas();
    }

    controlFichas(jugador, x, y) {
        let matrizCeldas = this.tablero.getMatriz();
        let fichasPosicionadas = jugador.getFichas();
        let ficha = fichasPosicionadas[fichasPosicionadas.length - 1];

        // control horizontal 
        let resultado = this.controlHorizontal(x, ficha, matrizCeldas);
        if (resultado) {
            return true;
        } else {
            // control vertical
            let resultado = this.controlVertical(y, ficha, matrizCeldas);
            if (resultado) {
                return true;
            } else {
                // control diagonal
                return this.controlDiagonal(x, y, ficha, matrizCeldas);
            }
        }
    }

    // Control solo horizontal
    controlHorizontal(x, ficha, matrizCeldas) {
        let contador = 1; //Ya suma ficha que ingresa
        contador += this.controlHorizontalAnterior(x, ficha, matrizCeldas);
        if (this.esGanador(contador)) {
            return true;
        } else {
            contador += this.controlHorizontalPosterior(x, ficha, matrizCeldas);
            return this.esGanador(contador);
        }
    }

    //Control Horizontal anterior a la ultima posicion
    controlHorizontalAnterior(x, ficha, matrizCeldas) {
        let contador = 0;
        let y = ficha.posY;

        while (y - 1 >= 0 && (ficha.getColor() === matrizCeldas[y - 1][x]?.fichaColor)) {
            contador++;
            y--;
        }
        return contador;
    }

    //Control Horizontal posterior a la ultima posicion
    controlHorizontalPosterior(x, ficha, matrizCeldas) {
        let contador = 0;
        let y = ficha.posY;
        while (y < matrizCeldas[y].length && (ficha.getColor() === matrizCeldas[y + 1][x]?.fichaColor)) {
            contador++;
            y++;
        }
        return contador;
    }

    // Control unico hacia abajo desde la ultima posicion
    controlVertical(y, ficha, matrizCeldas) {
        let contador = 1;
        let x = ficha.posX;
        let cantFilas = matrizCeldas[y].length;
        while (x < cantFilas - 1 && (ficha.getColor() === matrizCeldas[y][x + 1]?.fichaColor)) {
            contador++;
            x++;
        }
        return this.esGanador(contador);
    }

    // DIAGONAL

    controlDiagonal(x, y, ficha, matrizCeldas) {
        
        let contador = 1;

        // Diagonal 1
        contador += this.controlDiagonalIzqArriba(x, y, ficha, matrizCeldas);
        if (this.esGanador(contador)) {
            return true;
        } else {
            contador += this.controlDiagonalDerAbajo(x, y, ficha, matrizCeldas);
            if (this.esGanador(contador)) {
                return true;
            } else {
                // Diagonal 2
                contador = 1;
                contador += this.controlDiagonalIzqAbajo(x, y, ficha, matrizCeldas);
                if (this.esGanador(contador)) {
                    return true;
                } else {
                    contador = 1;
                    contador += this.controlDiagonalDerArriba(x, y, ficha, matrizCeldas);
                    return this.esGanador(contador);
                }
            }
        }
    }

    // Diagonal 1
    controlDiagonalIzqArriba(x, y, ficha, matrizCeldas) {
        let contador = 0;
        while ((x > 0 && y > 0) && ficha.getColor() === matrizCeldas[y - 1][x - 1]?.fichaColor) {
            contador++;
            x--;
            y--;
        }
        return contador;
    }

    controlDiagonalDerAbajo(x, y, ficha, matrizCeldas) {
        let contador = 0;
        while (x > 0
            && y > 0
            && x < this.filas
            && y < this.columnas
            && (ficha.getColor() === matrizCeldas[y + 1][x + 1]?.fichaColor)) {
            contador++;
            x++;
            y++;
        }
        return contador;
    }

    // Diagonal 2
    controlDiagonalDerArriba(x, y, ficha, matrizCeldas) {
        let contador = 0;
        while (x > 0
            && y > 0
            && x < this.filas
            && y < this.columnas
            && (ficha.getColor() === matrizCeldas[y + 1][x - 1]?.fichaColor)) {
            contador++;
            x--;
            y++;
        }
        return contador;
    }
    controlDiagonalIzqAbajo(x, y, ficha, matrizCeldas) {
        let contador = 0;
        while (x > 0
            && y > 0
            && x < this.filas
            && y < this.columnas
            && (ficha.getColor() === matrizCeldas[y - 1][x + 1]?.fichaColor)) {
            contador++;
            x++;
            y--;
        }
        return contador;
    }


    esGanador(cantFichas) {
        if (cantFichas >= maxFichasGanadoras) {
            return true;
        } else {
            return false;
        }
    }
}