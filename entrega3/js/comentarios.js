document.addEventListener("DOMContentLoaded", startPage());

function startPage() {
    window.scrollTo(0,0);
    let loading = document.querySelector("#loading");
    let pageScroll = document.querySelector("#pageScroll");
    let audioLoading = document.querySelector("#audio-loading");
    setTimeout(() => {
        toggleHiddenContent(loading);
        audioLoading.pause();
        toggleHiddenContent(pageScroll);
        toggleAnimationContent(pageScroll);
    }, 3000);

    function toggleHiddenContent(content) {
        if (content){
            content.classList.toggle("hidden");
        }
    }
    function toggleAnimationContent(content) {
        if (content) {
            content.classList.toggle("animar-entrada");
        }
    }
    let spinner = document.querySelector("#spinner");
    document.querySelector("#button-submit").addEventListener('click', ()=>{
        toggleHiddenContent(spinner);
        setTimeout(()=>{
            console.log('aca');
            window.location = "index.html";
        }, 2000);
    });


}