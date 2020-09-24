"use strict"
document.addEventListener("DOMContentLoaded", () => {

    let canvas = document.querySelector("#canvas");
    // let canvasPosicion;
    canvas.width = 500;
    canvas.height = 300;
    let ctx = canvas.getContext('2d');
    const juego = new Juego(canvas, ctx);

    const emiter = new EventEmitter();
    const totalFichas = (data) => {};
    // emiter.on('testEvent', tableroCargado);
    


    // var mouse = false;
    // var columnas = [];
    // var filas = [];
    // document.querySelector(".ficha").addEventListener("mouseup", function (event) {
    //     console.log('strat ', event);

    //     //  canvasPosicion = canvas.getBoundingClientRect();
    // }, false);
    // document.querySelector(".ficha").addEventListener("mousedown", function (e) {
    //     console.log('move ', e);

    // }, false);
    // document.querySelector(".ficha").addEventListener("drag", function (e) {
    //     console.log('move ', e);

    // }, false);
    // document.querySelector(".ficha").addEventListener("mousedown", function (e) {
    //     console.log('end ', e);
    //     let obj = { //objeto
    //         x: Math.round(e.offsetX),
    //         y: Math.round(e.offsetY)
    //     }
    //   tablero.dibujarFicha(obj.x, obj.y);

    // }, false);
    // document.querySelector(".ficha").addEventListener("mouseup", function (e) {
    //     console.log('up');
    // let obj = { //objeto
    //     x: Math.round(e.layerX),
    //     y: Math.round(e.layerY)
    // }
    // tablero.ocuparCelda(obj.x, obj.y);
    // }, false);
    // document.querySelector(".ficha").addEventListener("dragend", function (e) {
    //     console.log('down' , e);
    //     let obj = { //objeto
    //         x: Math.round(e.layerX),
    //         y: Math.round(e.layerY)
    //     }
    //     tablero.ocuparCelda(obj.x, obj.y);
    // }, false);


    // /**click */
    canvas.onmousedown = function (e) {
        let obj = { //objeto
            x: Math.round(e.layerX),
            y: Math.round(e.layerY)
        }
        juego.ubicarFicha(obj.x, obj.y);
        // emiter.emit('testEvent', 'hi'); // Was fired: hi
    }




});