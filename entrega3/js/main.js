
document.addEventListener("DOMContentLoaded", startPage());

function startPage() {
    let audioLoading = document.querySelector("#audio-loading");
    let loading = document.querySelector("#loading");
    let pageScroll = document.querySelector("#page-scroll");


    setInterval(() => {
        let cronometro = new Cronometro();
    cronometro.startClock();
    
}, 1000);
    console.log(pageScroll);
    // setTimeout(() => {
    //     hiddenContent(loading);
    //     visibleContent(pageScroll);
    //     audioLoading.pause();
    // }, 6000);
}


/**
* Visibilizar / Esconder elementos HTML
*/
function hiddenContent(content) {
    content.classList.add("hidden");
}
function visibleContent(content) {
    content.classList.remove("hidden");
}