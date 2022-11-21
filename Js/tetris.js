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



const color1= "rgb(153,153,153)"; // Define the colors for all de tokens
const color2= "rgb(255,255,255)";
const color3= "rgb(255,255,0)";
const color4= "rgb(255,0,255)";
const color5= "rgb(255,0,0)";
const color6= "rgb(0,0,255)";
const color7= "rgb(0,255,0)";


const colors = [ // This is a variable to define the colors, it is used in the array draw matriz 
    null, //We want make this value null because we want to start from 1 and not from 0  
    color1,
    color2, 
    color3,
    color4, 
    color5, 
    color6,
    color7 
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
    while (height--){/*height is 20, remember that the numbers always will be a TRUE boolean operator if there is only an unic parameter inside of the conditional will be executed */
        matriz.push(new Array (width).fill(0));
    }
    console.table(matriz) /*A .table is printed showing the array from the start that has been modified by the while  */
    return matriz; /*The array is returned in the form of a table ⏫ */
}
/*receives the grid by the matrix and the player has the matrix of the tile */


//function for collisions between the piece and the lower limets of the board
function collide (grid, player){ 

    const matriz = player.matriz; //Variable defined to get the shortcut path to the list of the object
    const offset = player.pos; // Variable defined to get the shortcut path to the list of the object

    for (let y =0; y < matriz.length; ++y) {//Repeats 3 times 
// runs through the vertical and horizontal piece looking for the positions 
        for (let x=0; x < matriz[y].length; ++x ) { 

            if (matriz[y][x] !==0 && (grid[y + offset.y] && grid[y + offset.y][x+offset.x]) !==0) {//comprobar colisiones en el grid 
                return true;//returns what collided
            }
        }
    }
    return false; //returns that there is no collision
}
//function for collisions between the token and another token
function merge (grid,player) { //function created so that a tile does not pass over another but rather they are grouped
    player.matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value!==0) {
                grid [y + player.pos.y][x + player.pos.x] = value;               
            }
        });
    });      
}
//draw the matrix, to display it on the canvas
function drawMatriz (matriz, offset) {/*This function works with the parameters defined inside the draw function*/
    /*array function It works to shorten the declaration of a function and not to put the reserved words of the functions like the function or the return*/
    matriz.forEach((row, y) => { /* The first for each receives two momentarily created parameters in charge of:  (row| is responsible for storing the elements of the matrix list [0,0,0],[1,1,1],[0,1,0]) (y| it is responsible for storing the position of the element within the list:  # 0 -posicion- [0,0,0], # 1 [1,1,1], #2 [0,1,0]) */

        row.forEach((value, x) => { /* NOw we take row| which has already stored the elements of the matrix array, therefore, this .foreach opens each list and goes through the specific element of each list, that is, it directly accesses the numbers */

            if(value!==0){/*once inside the numbers, apply the conditional and if it is different from 0 ⏬ */

                CONTEXT.fillStyle = colors[value];/*defines the colors depending on the colors variable at the beginning ⏫. Whit the fillstyle method, it is given a value that it will subtract from the list of colors and apply  */

                CONTEXT.fillRect (x + offset.x, y + offset.y, 0.9, 0.9 ); /*The  fill rect () method  of canvas recives parameters, the first and the second are in charge of defining the position where it is going to be painted in the linzo or canvas and the second two are in charge of the sizes in axis x and axis y. Let's remember that the positions e were defined in a 10x20 grid, so we are going to move along the x and y axis to paint them*/
            }
        });
    });
}  

function drawMatrizNext (matriz, offset) {//function to draw the small array of the next tile
    contextNext.fillStyle =  "#000" , //TODO
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
        
function draw () { /*Create the draw function that will be called inside update so as not to clutter the update function with too much information*/
    CONTEXT.fillStyle ="#000";    

    CONTEXT.fillRect(0, 0, CANVAS.width , CANVAS.height);
    drawMatriz (grid, {x:0, y:0});    
    drawMatriz (player.matriz, player.pos);

    drawMatrizNext(player.next, {x:1, y:1});
}

function gridSweep () {//Function that removes completed lines
    
    
    outer: for (let y = grid.length -1; y >0; --y){

            for (let x = 0; x < grid [y].length; ++x){
                
                if (grid [y][x]===0){
                    continue outer; //label for cycles, it works to constantly loop through a position
                }                
            }
            const row = grid.splice(y,1)[0].fill(0); // splice is a method of arrays to check all the positions of Y in 1, then .fill takes care of changing those 1 in 0
            grid.unshift(row);//once the position is at 0, unshift deletes the entire row or corresponding row 
            ++y;// as the row is deleted, another one must be created above it
            player.score += 1*10; // and each time it is cleared, the counter *10 is operated
            
            player.lines ++;

           /*  rowCount *= 2; */ //todo revisar el uso de esta variable 
            
            if (player.lines % 3===0){
                player.level++;
            }              
        }
}
//Update the score
function updateScore () {
    document.getElementById("score").innerHTML = player.score;
    document.getElementById("level").innerHTML = player.level;
    document.getElementById("lines").innerHTML = player.lines;
}





function update(time = 0) {/* Create a function that runs to initialize the game */

    const deltaTime = time - lastTime;/* declare a constant variable that plays with the input parameters of update and declare a global variable lasttime⏫*/
    lastTime = time;  

    /*¿How to move a token? */
    dropCounter += deltaTime; //after defining the dropcounter variable above, an operation is generated that will be repeated forever due to the request animation below⏬

    if (dropCounter > dropInterval) { //¿how works this if ? because dropcounter is never greater than dropinterval and always keeps running
        playerDrop(); //Function that contains the operation to make the tetramino go down every time interval for the request animation
    }
    draw();
    requestAnimationFrame(update); /*Por medio de la funcion animation se vuelve a llamar update y el valor de time varia */
}


function playerDrop(){
    player.pos.y++; //increase y position in the y axis 
    if (collide(grid, player)){
        player.pos.y--; //counter in negative so that the tab goes down automatically.
        merge(grid, player); //call function with the position parameters of the player and token
        
        playerReset(); //function created to launch a new token
        gridSweep ();
        updateScore();      
    }

    dropCounter =0; // it is formatted to zero so that it advances only one cell, if we left the variable without redefining, the counter would advance storing the variable
}

function playerReset () { //function created to send a new token when the previous one collides

    const pieces = 'IJLOSZT';

    dropInterval = 1000 - (player.level*100); //change the time interval every time you level up
    if (player.next === null){

        player.matriz = createPiece(pieces [Math.floor(Math.random() * 6)])
    } else {
        player.matriz = player.next;
    }

    player.next = createPiece(pieces [Math.floor(Math.random() * 7)]); //random token generated by functions. At the end it is multiplied by 6 since it is the number of tiles that the list contains
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

