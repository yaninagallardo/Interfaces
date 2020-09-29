class Cronometro {
    constructor() {
        this.cronometro = null;
        this.s = document.getElementById("segundos");
        this.m = document.getElementById("minutos");
        this.m.innerHTML = '00';
        this.s.innerHTML = '00';
        this.timerOn = false;
    }

    getTiempo() {
        return 'Tiempo: ' + this.m.innerHTML + ':' + this.s.innerHTML;
    }

    pararCronometro() {
        console.log(this.cronometro);
        clearInterval(this.cronometro);
        this.timerOn = false;
    }

    reiniciarTiempo() {
        this.m.innerHTML = '00';
        this.s.innerHTML = '00';
    }

    iniciarTiempo() {
        this.pararCronometro();
        let contador_s = 0;
        let contador_m = 0;
        let m = this.m;
        let s = this.s;
        if (!this.timerOn) {
            this.cronometro = setInterval(
                function () {
                    this.timerOn = true;
                    console.log('fint', this.cronometro);
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
                console.log('init ', this.cronometro);
        }
    }
}