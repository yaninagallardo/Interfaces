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
    document.querySelector("#cargarImagen").addEventListener('click', function(){
        let input = document.querySelector("#imageInput");
        input.click();
        input.onchange = e => {
            image.setImage(e);
        }
    });
    document.querySelector("#limpiarImagen").addEventListener('click', function(){
        image.quitarFiltro();
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
    document.querySelector("#filtro-binario").addEventListener('click', function(){
        imagenData.binario();
    });

    // Filtros por Rango
    let brillo = document.querySelector("#rangeBrillo");
    brillo.value = 0;
    brillo.addEventListener('change', function(){
        imagenData.brillo(brillo.value);
    });
    let contraste = document.querySelector("#rangeContraste");
    contraste.value = 0;
    contraste.addEventListener('change', function(){
        imagenData.contraste(contraste.value);
    });
    let saturacion = document.querySelector("#rangeSaturacion");
    saturacion.value = -100;
    saturacion.addEventListener('change', function(){
        imagenData.saturacion(saturacion.value);
    });
}




