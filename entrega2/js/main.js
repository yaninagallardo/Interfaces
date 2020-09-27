"use strict"

document.addEventListener("DOMContentLoaded", () => {
    let juego = document.querySelector("#juego");
    let modalInicio = document.querySelector("#modal-inicio");
    let modalGanador = document.querySelector("#modal-ganador");

    let cronometro = new Cronometro();

    let iniciarJuego;
    let jugador1;
    let jugador2;

    let emiter = new EventEmitter();
    const finishedgame = (data) => {
        vistaGanador(data);
    };
    emiter.on('finishedgame', finishedgame);

    // Iniciar Juego
    document.querySelector("#iniciar-juego")?.addEventListener("click", () => {
        let inputsNombres = document.querySelectorAll("#input-jugador");
        hiddenContent(modalInicio);

        let labelNombres = document.querySelectorAll("#nombre-jugador");
        setTimeout(() => {
            labelNombres[0].textContent = jugador1.getNombre();
            labelNombres[1].textContent = jugador2.getNombre();
            visibleContent(juego);
            cronometro.iniciarTiempo();
        }, 600);

        let nombre1 = inputsNombres[0].value !== "" ? inputsNombres[0].value : "Jugador 1";
        let nombre2 = inputsNombres[1].value !== "" ? inputsNombres[1].value : "Jugador 2";

        jugador1 = new Jugador(nombre1, 1, labelNombres[0]);
        jugador2 = new Jugador(nombre2, 2, labelNombres[1]);

        carga(jugador1, jugador2);
    });

    function carga(jugador1, jugador2) {
        iniciarJuego = new Juego(jugador1, jugador2, emiter);
    }

    // Drag Ficha Rojo
    document.querySelector(".ficha1")?.addEventListener("dragend", function (e) {
        if (jugador1.getTurnoActivo()) {
            let canvasPosicion = canvas.getBoundingClientRect();
            let obj = { //objeto posicion x, y
                x: Math.round(e.pageX - canvasPosicion.x),
                y: Math.round(e.pageY - canvasPosicion.y)
            }
            iniciarJuego.ubicarFicha(obj.x, obj.y);
        }
    }, false);
    // Drag Ficha Azul
    document.querySelector(".ficha2")?.addEventListener("dragend", function (e) {
        if (jugador2.getTurnoActivo()) {
            let canvasPosicion = canvas.getBoundingClientRect();
            let obj = { //objeto posicion x, y
                x: Math.round(e.pageX - canvasPosicion.x),
                y: Math.round(e.pageY - canvasPosicion.y)
            }
            iniciarJuego.ubicarFicha(obj.x, obj.y);
        }
    }, false);

    /**
     * Visibilizar / Esconder elementos HTML
     */
    function hiddenContent(content) {
        content.classList.add("hidden");
    }
    function visibleContent(content) {
        content.classList.remove("hidden");
    }

    function vistaGanador(nombreGanador) {
        jugador1.setTurnoActivo(false);
        jugador2.setTurnoActivo(false);

        cronometro.pararCronometro();
        let tiempoJugado = document.querySelector("#mostrar-tiempo");
        let labelGanador = document.querySelector("#nombre-ganador");

        labelGanador.textContent = nombreGanador;
        tiempoJugado.textContent = cronometro.getTiempo();

        visibleContent(modalGanador);
    }

    document.querySelector("#boton-modalinicio").addEventListener("click", () => {
        hiddenContent(modalGanador);
        hiddenContent(juego);
        setTimeout(() => {
            visibleContent(modalInicio);
        }, 700);
    });
    document.querySelector("#boton-reinicio").addEventListener("click", () => {
        hiddenContent(modalGanador);
        cronometro.reiniciarTiempo();
        iniciarJuego.crearJuego();
    });

});



