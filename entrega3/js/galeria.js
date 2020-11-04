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
    


}