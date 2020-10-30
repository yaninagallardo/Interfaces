document.addEventListener("DOMContentLoaded", startPage());

function startPage() {
    let loading = document.querySelector("#loading");
    let pageScroll = document.querySelector("#page-scroll");
    let audioLoading = document.querySelector("#audio-loading");
    setTimeout(() => {
        toggleHiddenContent(loading);
        audioLoading.pause();
        toggleHiddenContent(pageScroll);
    }, 3000);

    function toggleHiddenContent(content) {
        if (content){
            content.classList.toggle("hidden");
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