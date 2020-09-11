"use strict"

window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = new Canvas('#canvas', 500, 400);
    const imageCanvas = new ImageCanvas('#imageInput', '#imageCropper');
    // canvas.eventsMouse();
    eventsCanvas(canvas);
    eventImage(imageCanvas);
    eventButtons(canvas);
});

function eventsCanvas(canvas) {
    // Canvas
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

function eventImage(image){
    // Image 
    image.imageCropper.addEventListener('change', function(){
        this.image.setImage();
    });
}

function eventButtons(canvas){
    document.querySelector("#lapiz").addEventListener('click', function(){
        canvas.pincelSeleccionado();
    });
    document.querySelector("#borrar").addEventListener('click', function(){
        canvas.borrador();
    });
    document.querySelector("#reset").addEventListener('click', function(){
        canvas.limpiarCanvas();
    });
    let color = document.querySelector("#colorlapiz");
    color.addEventListener('change', function(){
        canvas.setColor(color.value);
    });
}




