"use strict"

document.addEventListener("DOMContentLoaded", () => {
    const fichaAcostadaRojo = "./img/fichas/rojo-acostado.png";
    const fichaAcostadaAzul = "./img/fichas/azul-acostado.png";

    let juego = document.querySelector("#juego");
    let modalInicio = document.querySelector("#modal-inicio");
    let modalGanador = document.querySelector("#modal-ganador");
    let div = document.querySelector("#conjuntofichas1");
    let cronometro = new Cronometro();

    let iniciarJuego;
    let jugador1;
    let jugador2;

    let emiter = new EventEmitter();
    const finishedgame = (data) => {
        vistaGanador(data);
    };
    emiter.on('finishedgame', finishedgame);

    // Iniciar Juego desde boton
    document.querySelector("#iniciar-juego")?.addEventListener("click", () => {
        let inputsNombres = document.querySelectorAll("#input-jugador");
        hiddenContent(modalInicio);

        let labelNombres = document.querySelectorAll("#nombre-jugador");
        setTimeout(() => {
            labelNombres[0].textContent = jugador1.getNombre();
            labelNombres[1].textContent = jugador2.getNombre();
            visibleContent(juego);
        }, 600);
        crearCronometro();

        let nombre1 = inputsNombres[0].value !== "" ? inputsNombres[0].value : "Jugador 1";
        let nombre2 = inputsNombres[1].value !== "" ? inputsNombres[1].value : "Jugador 2";

        jugador1 = new Jugador(nombre1, 1, labelNombres[0]);
        jugador2 = new Jugador(nombre2, 2, labelNombres[1]);

        cargarJuego(jugador1, jugador2);
    });

    // Carga de juego
    function cargarJuego(jugador1, jugador2) {
        iniciarJuego = new Juego(jugador1, jugador2, emiter);
        // cargaFichas();
    }

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

    // Mostrar Ganador
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

    function mostrarInicio() {
        hiddenContent(juego);
        setTimeout(() => {
            visibleContent(modalInicio);
        }, 100);
    }

    // Funciones para botones de modal vista ganador
    document.querySelector("#boton-modalinicio").addEventListener("click", () => {
        hiddenContent(modalGanador);
        mostrarInicio();
    });
    document.querySelector("#boton-salir").addEventListener("click", () => {
        mostrarInicio();
        cronometro.pararCronometro();
    });
    document.querySelector("#boton-reinicio").addEventListener("click", () => {
        hiddenContent(modalGanador);
        iniciarJuego.limpiarCanvas();
        iniciarJuego = null;
        cargarJuego(jugador1, jugador2);
        cronometro.pararCronometro();
        cronometro.iniciarTiempo();
    });

    function crearCronometro(){
        cronometro = null;
        cronometro = new Cronometro();
        cronometro.iniciarTiempo();
    }

    function cargaFichas() {
        let top = 1;
        let left = 10;
        let cantTotal = iniciarJuego.getCantFichas();
        for (let index = 1; index < 2; index++) {
            top += 1;
            left += 1;

            let img = document.createElement("IMG");
            img.classList.add("ficha");
            img.classList.add("ficha1");
            img.setAttribute("src", fichaAcostadaRojo);
            img.style.marginTop = top + 'px';
            img.style.marginLeft = left + 'px';

            div.appendChild(img);
            switch(index){
                case 5:
                    top += 2;
                    left += 2;
            }
        }
        eventsDragFicha();
    }
    
    // Drag Ficha Rojo
    function eventsDragFicha() {
        let fichas = document.querySelectorAll(".ficha1");

        fichas?.forEach(el => {
            el.addEventListener("dragend", function (e) {
                if (jugador1.getTurnoActivo()) {
                    let canvasPosicion = canvas.getBoundingClientRect();
                    let obj = { //objeto posicion x, y
                        x: Math.round(e.pageX - canvasPosicion.x),
                        y: Math.round(e.pageY - canvasPosicion.y)
                    }
                    iniciarJuego.ubicarFicha(obj.x, obj.y);
                    // div.removeChild(el);
                }
            }, false);

        });
    }
});



