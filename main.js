var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var vertical=24, horizontal=24;
//Crea la matriz de fondo pedida en los requerimientos
var tamanocuadro = 40;
for(let i=0;i<360;i+=horizontal){
    for(let j=0;j<600;j+=vertical){
        ctx.beginPath();
        ctx.rect(i, j, vertical, horizontal);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.stroke();
        ctx.closePath();
    }
}
//Coordenadas relativas a un cuadro central de una pieza de tetris básica
var pos=[
    [0,0],
    [0,tamanocuadro],
    [-tamanocuadro,0],
    [tamanocuadro,0],
    [-tamanocuadro,-tamanocuadro],
    [0,-tamanocuadro],
    [tamanocuadro,-tamanocuadro],
    [0,-2*tamanocuadro]
];
//Una entrada de este arreglo corresponde a la definición del numero de giros posible (4,3,2,1)
//y el resto de posiciones de cada array de entrada se refiere a cada uno de los bloques 
//que constituyen dicha pieza característica siendo el número una posición de un bloque en el arreglo pos. 
var piezas=[
    [4,0,1,2,3], 
    [4,0,1,5,6],  
    [4,0,1,5,4],
    [2,0,1,5,7],
    [2,0,2,5,6],
    [2,0,3,5,4],
    [1,0,5,6,3]
];
var x=0;
var y=0;
//creación de pieza t hacia abajo
var nRandom;
function getRandomArbitrary() {
    nRandom=Math.floor(Math.random()*7);
};
function dibujarBloque(bloqueRandom){
    for(i=1;i<5;i++){
        ctx.beginPath();
        ctx.rect(pos[piezas[bloqueRandom][i]][0]+tamanocuadro, pos[piezas[bloqueRandom][i]][1]+y, tamanocuadro, tamanocuadro);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "rgba(0,0,0, 1)";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    x+=tamanocuadro;
    y+=tamanocuadro;
}
function dibujar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    getRandomArbitrary();
    dibujarBloque(nRandom);
for(let i=0;i<360;i+=horizontal){
    for(let j=0;j<600;j+=vertical){
        ctx.beginPath();
        ctx.rect(i, j, vertical, horizontal);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.stroke();
        ctx.closePath();
    }
    if(y>=canvas.height)
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    y=y-tamanocuadro*2;
    dibujarBloque(nRandom);
    clearInterval(movimiento);
}
}

}

var movimiento=setInterval(dibujar,1000);
var fichasQuedan=[];



//Un cuadrado-->
//ctx.beginPath();
//ctx.rect(0,0, 40, 40);
//ctx.fillStyle = "#FF0000";
//ctx.fill();
//ctx.closePath();
//Un circulo
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
//Una figura sin rellenar
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();