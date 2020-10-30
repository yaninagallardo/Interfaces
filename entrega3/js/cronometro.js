class Cronometro {
    intervalo;

    constructor() {
        this.labelDays = document.querySelector("#dias");
        this.labelHours = document.querySelector("#horas");
        this.labelMinutes = document.querySelector("#minutos");
        this.labelSeconds = document.querySelector("#segundos");

        this.clock = new Date("2021-12-16 9:00:00 PM");
        // 16 de diciembre de 2021
    }

    startClock() {
        setInterval(() => {
            this.mostrar_hora()
        }, 1000);
    }

    mostrar_hora() {
        var now = new Date();
        // Inserta la hora almacenada en clock en el span con id hora
        let dias = this.clock - now;
        this.labelDays.innerHTML = Math.round(dias/(1000*60*60));
        this.labelHours.innerHTML = this.clock.getHours() - now.getHours();
        // Inserta los minutos almacenados en this.clock en el span con id minuto
        this.labelMinutes.innerHTML = this.clock.getMinutes() + 60 - now.getMinutes();

        // Inserta los segundos almacenados en this.clock en el span con id segundo
        this.labelSeconds.innerHTML = "0" + this.clock.getSeconds() + 60 - now.getSeconds();
    }
}