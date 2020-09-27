class Cronometro {
    constructor() {
        this.cronometro = null;
        this.s = document.getElementById("segundos");
        this.m = document.getElementById("minutos");
        this.m.innerHTML = '00';
        this.s.innerHTML = '00';
    }

    getTiempo(){
        return 'Tiempo: ' + this.m.innerHTML + ':' + this.s.innerHTML;
    }

    pararCronometro() {
        clearInterval(this.cronometro);
    }
    
    reiniciarTiempo(){
        this.m.innerHTML = '00';
        this.s.innerHTML = '00';
        this.iniciarTiempo();
    }

    iniciarTiempo() {
        let contador_s = 0;
        let contador_m = 0;
        let m = this.m;
        let s = this.s;
        this.cronometro = setInterval(
            function () {
                if (contador_s == 60) {
                    contador_s = 0;
                    contador_m++;
                    if (contador_m < 10) {
                        m.innerHTML = '0' + contador_m;
                    } else {
                        m.innerHTML = contador_m;
                    }
                    if (contador_m == 60) {
                        contador_m = 0;
                    }
                }
                if (contador_s < 10) {
                    s.innerHTML = '0' + contador_s;
                } else {
                    s.innerHTML = contador_s;
                }
                contador_s++;
            }
            , 1000);
    }
}