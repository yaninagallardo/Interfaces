"use strict"

window.addEventListener('DOMContentLoaded', () => {
    const canvas = new ImageCanvas('#imageInput', '#imageCropper', '#canvas', 600, 400);

    eventsCanvas(canvas);
    eventImage(canvas);
    eventButtons(canvas);
    eventFilterButtons(canvas);
});

function eventsCanvas(canvas) {
    // Canvas
    canvas.canvas.addEventListener("mousedown",function(event){
        canvas.empezarDibujo(event);
    }, false);
    canvas.canvas.addEventListener("mouseup", function(){
        canvas.noDibujar();
    }, false);
    canvas.canvas.addEventListener("mouseout", function(){
        canvas.noDibujar();
    }, false);
    canvas.canvas.addEventListener("mousemove", function(event){
        canvas.dibujandoLinea(event);
    }, false);
}

function eventImage(image){
    // Image 
    image.image.addEventListener('change', function(event){
        image.setImage(event);
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

    document.querySelector("#descargar").addEventListener('click', function(){
        canvas.descargarImagen();
    });
}

function eventFilterButtons(imagenData){
    document.querySelector("#filtro-negativo").addEventListener('click', function(){
        imagenData.negativo();
    });
    document.querySelector("#filtro-sepia").addEventListener('click', function(){
        imagenData.sepia();
    });
    document.querySelector("#filtro-byn").addEventListener('click', function(){
        imagenData.blanconegro();
    });
    document.querySelector("#filtro-blur").addEventListener('click', function(){
        imagenData.desenfoque();
    });
    
    
}




