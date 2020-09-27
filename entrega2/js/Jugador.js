class Jugador {
    constructor(nombre, numeroJugador, label) {
        this.jugadorNumero = numeroJugador;
        this.labelNombre = label;
        this.nombre = nombre;
        this.turnoActivo = false;
        this.fichasAgregadas = [];
        this.color = "rojo";
        this.fichasRestantes = 0;
        this.setColor();
    }
    getNombre() {
        return this.nombre;
    }
    getTurnoActivo() {
        return this.turnoActivo;
    }
    getFichas() {
        return this.fichasAgregadas;
    }

    addFicha(x, y) {
        let ficha = new Ficha(x, y, this.color);
        this.fichasAgregadas.push(ficha);
        let cant = this.fichasRestantes - 1;
        this.setFichasRestantes(cant);
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setTurnoActivo(activo) {
        this.turnoActivo = activo;
            this.indicarTurno();
        
    }

    indicarTurno(){
        if(this.turnoActivo){
            this.labelNombre.classList.add("jugador-activo");
        }else {
            this.labelNombre.classList.remove("jugador-activo");
        }
    }
    
    getColor() {
        return this.color;
    }

    setColor() {
        switch (this.jugadorNumero) {
            case 1:
                this.color = "rojo";
                break;
            case 2:
                this.color = "azul";
                break;
        }
    }

    getFichasRestantes() {
        return this.fichasRestantes;
    }
    setFichasRestantes(cant) {
        this.fichasRestantes = cant;
        this.mostrarCantRestante();
    }

    mostrarCantRestante() {
        let mensaje = "Restantes: ";
        switch (this.jugadorNumero) {
            case 1:
                let label = document.querySelector("#fichas-jugador1");
                mensaje += this.fichasRestantes;
                label.textContent = mensaje;
                break;
            case 2:
                let label2 = document.querySelector("#fichas-jugador2");
                mensaje += this.fichasRestantes;
                label2.textContent = mensaje;
                break;
        }
    }

}