const maxFichasGanadoras = 4;
class Juego {
    tablero;
    controlJugada;
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

    iniciarJuego() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    crearJuego() {
        this.tablero = new Tablero(this.canvas, this.ctx);
        this.tablero.dibujaGrid();
        this.controladorJugada = new ControladorJugada(this.tablero);
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
                        let result = this.controladorJugada.controlFichas(this.jugador1, ocupada.fila, ocupada.columna);
                        if (result) {
                            // Finalizar juego
                            this.emiter.emit('finishedgame', this.jugador1.getNombre());
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
                        let result = this.controladorJugada.controlFichas(this.jugador2, ocupada.fila, ocupada.columna);
                        if (result) {
                            // Finalizar juego
                            this.emiter.emit('finishedgame', this.jugador2.getNombre());
                        }
                    }
                }
                break;
        }
    }















}