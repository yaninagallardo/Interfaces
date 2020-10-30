
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
    }, 3000);

    function toggleHiddenContent(content) {
        if (content) {
            content.classList.toggle("hidden");
        }
    }
    function toggleScroll(content) {
        content.classList.toggle("overflow");
    }
    let acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
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