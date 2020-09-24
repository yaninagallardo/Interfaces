class Jugador {
    constructor(nombre, color){
        this.nombre = nombre;
        this.turnoActivo = false;
        this.fichasAgregadas = [];
        this.color = color;
        this.fichasRestantes = 0;
    }
    
    getNombre(){
        return this.nombre;
    }
    getTurnoActivo(){
        return this.turnoActivo;
    }
    getFichas(){
        return this.fichasAgregadas;
    }
    
    addFicha(x, y){
        let ficha = new Ficha(x, y);
        this.fichasAgregadas.push(ficha);
        this.fichasRestantes--;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }
    setTurnoActivo(activo){
        this.turnoActivo = activo;
    }
    getColor(){
        return this.color;
    }
    setColor(color){
        this.color = color;
    }
    getFichasRestantes(){
        return this.fichasRestantes;
    }
    setFichasRestantes(cant){
        this.fichasRestantes = cant;
    }

    

    

}