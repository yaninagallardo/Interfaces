
document.addEventListener("DOMContentLoaded", () => {
    let loading = document.querySelector("#loading");
    let pageScroll = document.querySelector("#pageScroll");
    let body = document.querySelector("#body");
    let audioLoading = document.querySelector("#audio-loading");
    setTimeout(() => {
        toggleHiddenContent(loading);
        toggleScroll(body);
        audioLoading.pause();
        toggleHiddenContent(pageScroll);
        toggleAnimationContent(pageScroll);
    }, 3000);

    function toggleHiddenContent(content) {
        if (content) {
            content.classList.toggle("hidden");
        }
    }
    function toggleAnimationContent(content) {
        if (content) {
            content.classList.toggle("animar-entrada");
        }
    }
    function toggleScroll(content) {
        content.classList.toggle("overflow");
    }
    let acc = document.getElementsByClassName("accordion");
    let i;
    let lasti;
    for (i = 0; i < acc.length; i++) {
        
        acc[i].addEventListener("click", function () {
            if(lasti){
                lasti.classList.remove("active");
            }
            lasti = this;
            this.classList.toggle("active");
            
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});