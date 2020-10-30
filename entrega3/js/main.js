
document.addEventListener("DOMContentLoaded", startPage());
const soundClass = "fa-volume";
const muteClass = "fa-volume-mute";
function startPage() {
    let audioLoading = document.querySelector("#audio-loading");
    let audioPage = document.querySelector("#audio-page");
    let loading = document.querySelector("#loading");
    let pageScroll = document.querySelector("#page-scroll");
    let body = document.querySelector("#body");
    let hamburguer = document.querySelector("#hamburguer-button");
    let hamburguerMenu = document.querySelector("#dropdown-hamburguer");

    hamburguer.addEventListener('click', () => {
        console.log('menu ', hamburguerMenu);
        toggleHiddenContent(hamburguerMenu);
    });

    setInterval(() => {
        let cronometro = new Cronometro();
        cronometro.startClock();

    }, 1000);
    setTimeout(() => {
        toggleHiddenContent(loading);
        toggleScroll(body);
        toggleHiddenContent(pageScroll);
        audioLoading.pause();
        audioPage.play();
    }, 3000);

    /**
     * Audio Volumen
     */

    let soundActive = true;

    let icon = document.querySelector("#icon");
    document.querySelector("#button-sound").addEventListener('click', function () {
        console.log(window);
        if (soundActive) {
            desactiveSound();
            audioPage.pause();
            soundActive = false;
        } else {
            activeSound();
            audioPage.play();
            soundActive = true;
        }
    });
    console.log(window);
    let con = document.querySelector(".contador-dias");
    let width = 0;
    window.addEventListener('scroll', function (e) {
        console.log(window.scrollY);
        if (window.scrollY < 652.222 && up(window.scrollY)) {
            if (width < 100) {
                width = width + 3;
            }
        } else if (!up(window.scrollY) && window.scrollY < 653) {
            if (width > 0) {
                width = width - 3;
            }
        }
        left = width.toString() + "%";
        con.style.width = left.toString();
    });

    let lastposition = 0;
    function up(position) {
        if (lastposition < position) {
            lastposition = position;
            return true;
        } else {
            lastposition = position;
            return false;
        }
    }
}






/**
* Visibilizar / Esconder elementos HTML
*/
function toggleScroll(content) {
    content.classList.toggle("overflow");
}
function toggleHiddenContent(content) {
    content.classList.toggle("hidden");
}

function activeSound() {
    icon.classList.remove(muteClass);
    icon.classList.add(soundClass);
}
function desactiveSound() {
    icon.classList.remove(soundClass);
    icon.classList.add(muteClass);
}