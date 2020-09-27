const maxFichasGanadoras = 4;
class Juego {
    tablero;
    constructor(jugador1, jugador2, emiter) {
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.emiter = emiter;
        this.jugadorActivo = 'jugador1';
        this.canvas = document.querySelector("#canvas");
        this.canvas.width = 500;
        this.canvas.height = 300;
        this.ctx = this.canvas.getContext('2d');

        this.crearJuego();
    }

    activarTurno(jugador) {
        jugador.setTurnoActivo(true);
    }
    desactivarTurno(jugador) {
        jugador.setTurnoActivo(false);
    }

    crearJuego() {
        this.tablero = new Tablero(this.canvas, this.ctx);
        this.tablero.dibujaGrid();

        // this.jugador1 = new Jugador("Pablo", "rojo");
        // this.jugador2 = new Jugador("Yanina", "azul");

        let total = this.dividirFichas(this.tablero.calcularFichas());
        this.jugador1.setFichasRestantes(total);
        this.jugador2.setFichasRestantes(total);

        this.habilitarJugador(this.jugador1, this.jugador2);
    }

    habilitarJugador(jugadorHabilitado, jugadorDeshabilitar) {
        this.activarTurno(jugadorHabilitado);
        this.desactivarTurno(jugadorDeshabilitar);
    }

    dividirFichas(cant) {
        return cant / 2;
    }

    ubicarFicha(x, y) {
        let ocupada = false;
        switch (this.jugadorActivo) {
            case 'jugador1':
                if (this.jugador1.turnoActivo) {
                    ocupada = this.tablero.ocuparCelda(x, y, this.jugador1.getColor());
                    if (ocupada.celdaOcupada) {
                        this.jugador1.addFicha(ocupada.fila, ocupada.columna);
                        this.habilitarJugador(this.jugador2, this.jugador1);
                        this.jugadorActivo = 'jugador2';
                        let result = this.controlFichas(this.jugador1, ocupada.fila, ocupada.columna);
                        if (result) {
                            // Finalizar juego
                            this.finalizarJuego(this.jugador1.getNombre());
                        }
                    }
                }
                break;
            case 'jugador2':
                if (this.jugador2.turnoActivo) {
                    ocupada = this.tablero.ocuparCelda(x, y, this.jugador2.getColor());
                    if (ocupada.celdaOcupada) {
                        this.jugador2.addFicha(ocupada.fila, ocupada.columna);
                        this.habilitarJugador(this.jugador1, this.jugador2);
                        this.jugadorActivo = 'jugador1';
                        let result = this.controlFichas(this.jugador2, ocupada.fila, ocupada.columna);
                        if (result) {
                            // Finalizar juego
                            this.finalizarJuego(this.jugador2.getNombre());
                        }
                    }
                }
                break;
        }
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

    controlDiagonal(x, y, ficha, matrizCeldas) {
        let filas = this.tablero.getCantFilas();
        let columnas = this.tablero.getCantColumnas();
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
                contador += this.controlDiagonalIzqAbajo(x, y, ficha, matrizCeldas, filas, columnas);
                if (this.esGanador(contador)) {
                    return true;
                } else {
                    contador = 1;
                    contador += this.controlDiagonalDerArriba(x, y, ficha, matrizCeldas, filas, columnas);
                    return this.esGanador(contador);
                }
            }
        }
    }

    // Diagonal 1
    controlDiagonalIzqArriba(x, y, ficha, matrizCeldas) {
        let contador = 0;
        while ((x > 0 && y > 0)) {
            if (ficha.getColor() === matrizCeldas[y - 1][x - 1]?.fichaColor) {
                contador++;
                x--;
                y--;
            }
        }
        return contador;
    }

    controlDiagonalDerAbajo(x, y, ficha, matrizCeldas, filas, columnas) {
        let contador = 0;
        while (x > 0
            && y > 0
            && x < filas
            && y < columnas
            && (ficha.getColor() === matrizCeldas[y + 1][x + 1]?.fichaColor)) {
            contador++;
            x++;
            y++;
        }
        return contador;
    }

    // Diagonal 2
    controlDiagonalDerArriba(x, y, ficha, matrizCeldas, filas, columnas) {
        let contador = 0;
        while (x > 0
            && y > 0
            && x < filas
            && y < columnas
            && (ficha.getColor() === matrizCeldas[y + 1][x - 1]?.fichaColor)) {
            contador++;
            x--;
            y++;
        }
        return contador;
    }
    controlDiagonalIzqAbajo(x, y, ficha, matrizCeldas, filas, columnas) {
        let contador = 0;
        while (x > 0
            && y > 0
            && x < filas
            && y < columnas
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


    // -------------------- FINALIZAR JUEGO -----------------------------------

    finalizarJuego(ganador) {
        this.emiter.emit('finishedgame', ganador);
    }













}