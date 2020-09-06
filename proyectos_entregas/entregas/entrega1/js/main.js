"use strict"

window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = new Canvas('#canvas', 500, 400);
    const imageCanvas = new ImageCanvas('#imageInput', '#imageCropper');
    imageCanvas.initClass();
    // canvas.eventsMouse();
    events(canvas);
});

function events(canvas) {
    canvas.canvas.addEventListener("mousedown",function(){
        canvas.empezarDibujo(event);
    }, false);
    canvas.canvas.addEventListener("mouseup", function(){
        canvas.noDibujar();
    }, false);
    canvas.canvas.addEventListener("mouseout", function(){
        canvas.noDibujar();
    }, false);
    canvas.canvas.addEventListener("mousemove", function(){
        canvas.dibujandoLinea(event);
    }, false);
}




