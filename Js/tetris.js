let lastTime = 0;/* the created variable is initialized to 0 */

let dropInterval = 1000;//Variable to regulate the drop of the token
let dropCounter= 0; //Variable to regulate the drop of the token


let movLeft = document.getElementById("arrowLeft");
let movRight = document.getElementById("arrowRight");
let movUp = document.getElementById("arrowUp");
let movDown = document.getElementById("arrowDown");

const CANVAS = document.getElementById("tetris"); /* brings the canvas from HTML file */
const CONTEXT = CANVAS.getContext("2d"); /* It creates a variable that alows us stablish the visualization of the canvas in 2d */

const canvasNext = document.getElementById("nextPiece");
const contextNext = canvasNext.getContext("2d");

const grid = createMatriz(10,20);/*Variable // Animated function to create a table of 20 rows for ten columns -- the values 10,20 are used as parameters in the createMatriz */

const color1= "rgb(255,255,0)"; // Define one unic color for all de tokens (TODO give to each token a color) 

const colors = [ // This is a variable to define the colors, it is used in the array draw matriz 
    null, //We want make this value null because we want to start from 1 and not from 0
    color1,
    color1,
    color1,
    color1,
    'purple',
    'orange',
    'pink'
];

const player ={/*The objet "player" have a key and a value named pos that has the position where the tetromino is alocated*/
    pos: {x:0, y:0},
    matriz: null, //at the beginning the piece was created here, but when the others are integrated, they are stored in the createPiece function
    next:null,
    score:0,
    level:0,
    lines:0   
};

CONTEXT.scale(30,30); /*The dimensions of the canvas board are established taking into account the height and weight of the html */

contextNext.scale (40,40); // CAnva's for the visualization of the following token that will come. 


function createPiece (tipo){
    if(tipo==='T') {
        /*array towdimensional array that modifies in  x and y for draw the token*/
        return [ 
                [0,0,0],
                [1,1,1],
                [0,1,0]
             ];
    }else if (tipo==='O'){
        return [ 
            [2,2],
            [2,2],
        ];
    }else if (tipo==='L'){
        return [ 
            [0,3,0],
            [0,3,0],
            [0,3,3]
         ];
    }else if (tipo==='J'){
        return [ 
            [0,4,0],
            [0,4,0],
            [4,4,0]
         ];
    }else if (tipo==='I'){
        return [ 
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
         ];
    }else if (tipo==='S'){
        return [ 
            [0,6,6],
            [6,6,0],
            [0,0,0],            
         ];
    }else if (tipo==='Z'){
        return [ 
            [7,7,0],
            [0,7,7],
            [0,0,0],            
         ];
    }      
}
//Create the canvas  with values of width y height tha will be specified then
function createMatriz (width,height){/*We create a function that brings as parameters the values of the variable definited to the beginning*/
    const matriz = [];/*We create an empty array */
    while (height--){/*height is 20, remember that the numbers always will be a no boolean operator recordar que los numeros siempre van a ser un operador bnoleano  TRUE si se pasan como unico parametro dentro del condicional se va a ejecturar, por ende, 20 veces se imprime un array en la posición width o la fila con #0  */
        matriz.push(new Array (width).fill(0));
    }
    console.table(matriz) /*Se imprime una tabla .table que muestre la matriz del comienzo que se ha modificado por medio del while  */
    return matriz; /*Se devuelve la matriz en forma de tabla ⏫ */
}
/*recibe el grid por l matriz y el player tiene la matriz de lka ficha */


//función para colisiones entre la pieza y los bordes del tablero u otra pieza
function collide (grid, player){ //funcion para limitar los movimientos dentro del canvas para que las figuras no superen los limites INFERIORES

    const matriz = player.matriz; //Variable definida para obtener la ruta de acceso directo a la lisya del objeto
    const offset = player.pos; // Variable definida para obtener la ruta de acceso directo a la lista del objeto

    for (let y =0; y < matriz.length; ++y) {//se repite 3 vveces 
// recorre la pieza vertical y horizontal buscando que las posiciones 
        for (let x=0; x < matriz[y].length; ++x ) { 

            if (matriz[y][x] !==0 && (grid[y + offset.y] && grid[y + offset.y][x+offset.x]) !==0) {//comprobar colisiones en el grid 
                return true;//retorna que colisiono 
            }
        }
    }
    return false; //retorna que no hay colision 
}
//función para colisiones entre la pieza y otra pieza
function merge (grid,player) { //funcion creada para que ua ficha no pase por encima de otra sino que se agrupen
    player.matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value!==0) {
                grid [y + player.pos.y][x + player.pos.x] = value;               
            }
        });
    });      
}
//dibuja la matriz, para mostrarla en el canvas
function drawMatriz (matriz, offset) {/*Esta funcion trabaja con los parametros definidos dentro de la funcion draw  */
    /*array function funciona para abreviar la declaracion de una funcion y no poner las palabras reservadas de de las funciones como el function o el return*/
    matriz.forEach((row, y) => { /* el primer for each recibe dos parametros creados momentaneamente encargados de:  (row| se encarga de alamacenar los elementos de la lista matriz [0,0,0],[1,1,1],[0,1,0]) (y| se encarga de almacenar la posicion del elemento dentro de la lista:  # 0 -posicion- [0,0,0], # 1 [1,1,1], #2 [0,1,0]) */

        row.forEach((value, x) => { /* ahora se toma row| que ya alamcenó los elementos del array matriz, por ende, este .foreach abre cada lista y recorre el elemento en especifico de cada lista, es decir accede directamente a los numeros  */

            if(value!==0){/*una vez dentro de los numeros, aplica el condicional y si es diferente de 0 ⏬ */

                CONTEXT.fillStyle = colors[value];/*define los colores dependiendo la variable de colors al inicio ⏫. Por medio del metodo fillstyle, se le da un valor que va a sustraer de la lista de colores y lo va a aplicar  */

                CONTEXT.fillRect (x + offset.x, y + offset.y, 0.9, 0.9 ); /*se utiliza el metodo fill rect () de canvas que recibe 4 parametros, el primero y el segundo se encargan de definir la posición donde se va a pintar en el linzo o canva y los segundos dos se encargan de los tamaños en eje x y eje y. Recordemos que las posiciones e definieron en una cuadricula de 10x 20 enntonces se va a desplazar por eje x y y para pintarlas */
            }
        });
    });
}  

function drawMatrizNext (matriz, offset) {//funcion para dibujar la matriz pequeña de la ficha siguiente
    contextNext.fillStyle =  "#000" , //todo revisar color 
    contextNext.fillRect(0,0, canvasNext.width, canvasNext.height),

    matriz.forEach((row, y) => { 
        row.forEach((value, x) => { 
            if(value!==0){
                contextNext.fillStyle = colors[value];
                contextNext.fillRect (x + offset.x, y + offset.y, 0.9, 0.9 ); 
            }
        });
    });
}        
        
function draw () { /*Se crea la función draw que va a ser llamada dentro de update para no saturar la función update con demasiada información  */
    CONTEXT.fillStyle ="#000";    

    CONTEXT.fillRect(0, 0, CANVAS.width , CANVAS.height);
    drawMatriz (grid, {x:0, y:0});    
    drawMatriz (player.matriz, player.pos);

    drawMatrizNext(player.next, {x:1, y:1});
}

function gridSweep () {//Funcion que elimina las lineas completadas 
    
    
    outer: for (let y = grid.length -1; y >0; --y){

            for (let x = 0; x < grid [y].length; ++x){
                
                if (grid [y][x]===0){
                    continue outer; //label para ciclos, funciona para recorrer constantemente un posición 
                }                
            }
            const row = grid.splice(y,1)[0].fill(0); // splice es un metodo de los arrays para verificar todas las posiciones de Y en 1, después .fill se encarga de cambiar esos 1 en 0. 
            grid.unshift(row);//una vez la posición este en 0, unshift borra todo el row o fila correspondiente 
            ++y;// como se borra la fila, se debe crear otra encima 
            player.score += 1*10; // y cada vez que se borre, se opera el contador *10 
            
            player.lines ++;

           /*  rowCount *= 2; */ //todo revisar el uso de esta variable 
            
            if (player.lines % 3===0){
                player.level++;
            }              
        }
}
//actualiza el puntaje
function updateScore () {
    document.getElementById("score").innerHTML = player.score;
    document.getElementById("level").innerHTML = player.level;
    document.getElementById("lines").innerHTML = player.lines;
}





function update(time = 0) {/* Se crea una función que se ejecute para inicializar el juego */

    const deltaTime = time - lastTime;/* se declara una variable constante que juegue con los parametros de ingreso de update y se declara una variable global lasttime⏫*/
    lastTime = time;  

    /*¿CÓMO SE MUEVE LA FICHA? */
    dropCounter += deltaTime; //despues de definir la variable dropcounter arriba, se genera una operación que se repetirá siempre debido al request animation de abajo⏬

    if (dropCounter > dropInterval) { //¿cómo funciona este if ? porque dropcounter nunca es mayor que dropinterval y se sigue ejecutando siempre 
        playerDrop(); /*Funcion que  contiene la operacion para hacer que el tetramino baje cada intervalo de tiempo por el request animation */
    }
    draw();
    requestAnimationFrame(update); /*Por medio de la funcion animation se vuelve a llamar update y el valor de time varia */
}


function playerDrop(){
    player.pos.y++; //aumenta la posicion en el eje y 
    if (collide(grid, player)){
        player.pos.y--; //contador en negativo para que la ficha baje automática. 
        merge(grid, player); //llama funcion con los parametros de posicion d ejugador y ficha
        
        playerReset(); //funcion creada para lanzar una nueva ficha
        gridSweep ();
        updateScore();      
    }

    dropCounter =0; // se formatea a cero para que avance solo de a una casilla, si dejaramos sin redefinir la variable, el contador avanzaria alamacenando la variable
}

function playerReset () { //funcion creada para enviar un nueva ficha cuando la anterior colisiona 

    const pieces = 'IJLOSZT';

    dropInterval = 1000 - (player.level*100); //cambio del intervalo de tiempo cada vez que se suba el nivel 
    
    if (player.next === null){

        player.matriz = createPiece(pieces [Math.floor(Math.random() * 6)])
    } else {
        player.matriz = player.next;
    }

    player.next = createPiece(pieces [Math.floor(Math.random() * 7)]); //ficha aleatoria generada por funciones. Al final se multiplica por 6 ya que es el numero de fichas que contiene la lista
    player.pos.x = Math.floor(grid[0].length/3);    

    player.pos.y = 0;

    
    if (collide(grid,player)){//all what functionality is needed to get an alert and select if you want to continue
        //when you loose
        alert ("has perdido");        
        grid.forEach(row => row.fill(0));
        player.score =0;
        player.level = 0;
        player.lines = 0;
        updateScore();      
    }
}




function playerMove (direction){ //the movement is limited
    player.pos.x += direction; // 
    if (collide(grid,player)){ //if it collides
        player.pos.x -= direction;        
    }
}

function playerRotate () {//THis function works for the rotation of the chips
    const pos = player.pos.x; //declare positional constant without updating

    let offset =1;//declare the variable that saves the initial position
    rotate (player.matriz);

    while (collide (grid,player)){// if there is a collision, 1 is added to x which means that it never exceeds the vertical limit of side and side
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1:-1)); //check if the offset is greater than 0, it works for the right limit since it returns the tile if it tries to exceed the border by subtracting one
        if (offset > player.matriz[0].length){//
            rotate(player.matriz);
            player.pos.x = pos;
            return;
        } 
    }
}

function rotate (matriz){ //Change the position of the token
    for(let y =0; y < matriz.length; ++y ){
        for (let x=0; x<y; ++x) {
            [matriz [x][y] , matriz [y][x]] = [matriz [y][x], matriz[x][y]];           
        }
    }
    matriz.forEach (row => row.reverse());
}




//This is how you can to link the movement of the keys whith the game
document.addEventListener("keydown", event => {
    if (event.key==="ArrowDown") { //Through conditions, it will be validated which key the user presses and the position in x and y axis will be changed.
        playerDrop();
    }else if (event.key=== "ArrowLeft"){
        playerMove(-1);
    }else if (event.key=== "ArrowRight"){
        playerMove(1);
    }else if (event.key=== "ArrowUp"){
        playerRotate ();
    }
});

//SElects the buttons that we create for asociate to the wanted movement
movLeft.addEventListener("click", event => {
    playerMove(-1);
});
movRight.addEventListener("click", event => {
    playerMove(1);
});
movUp.addEventListener("click", event => {
    playerRotate ();
});
movDown.addEventListener("click", event => {
    playerDrop();
});





playerReset();
updateScore (); 
update();



