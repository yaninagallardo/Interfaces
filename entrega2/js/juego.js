
class Juego {
    tablero;
    constructor(canvas, ctx) {
        this.jugador1 = null;
        this.jugador2 = null;
        this.jugadorActivo = 'jugador1';
        this.canvas = canvas;
        this.ctx = ctx;

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

        this.jugador1 = new Jugador("Pablo", "rojo");
        this.jugador2 = new Jugador("Yanina", "azul");

        let total = this.dividirFichas(this.tablero.calcularFichas());
        this.jugador1.setFichasRestantes(total);
        this.jugador2.setFichasRestantes(total);

        this.habilitarJugador(this.jugador1);

        // const totalFichas = (data) => {
        //     console.log(data);

        //    };
        // emiter.on('totalFichas', function (e) {
        //     let total = this.dividirFichas(cant);
        //     this.jugador1.setFichasRestantes(total);
        //     this.jugador2.setFichasRestantes(total);
        // });
    }

    habilitarJugador(jugador) {
        this.activarTurno(jugador);
        this.tablero.setColor(jugador.getColor());
    }

    dividirFichas(cant) {
        return cant / 2;
    }

    ubicarFicha(x, y) {
        let ocupada = false;
        switch (this.jugadorActivo) {
            case 'jugador1':
                if (this.jugador1.turnoActivo) {
                    ocupada = this.tablero.ocuparCelda(x, y);
                    if (ocupada.celdaOcupada) {
                        this.jugador1.addFicha(x, y);
                        this.habilitarJugador(this.jugador2);
                        this.jugadorActivo = 'jugador2';
                    }
                }
                break;
            case 'jugador2':
                if (this.jugador2.turnoActivo) {
                    ocupada = this.tablero.ocuparCelda(x, y);
                    if (ocupada.celdaOcupada) {
                        this.jugador2.addFicha(x, y);
                        this.habilitarJugador(this.jugador1);
                        this.jugadorActivo = 'jugador1';
                    }
                }
                break;
        }

    }










}