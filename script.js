const COLUMNS_SIZE = 51;
const ROWS_SIZE = 51;
const FIELD_SIZE = 15;
const PADDING = 10;
const TRACTORS_NUMBER = 1000;
const playerHeight = 15;
const playerWidth = 15;
var playerX = 10;
var rightPressed = false;
var leftPressed = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);






const canvas = document.getElementById('Canvas');
const context = canvas.getContext('2d');


var x = 0
var y = 0

var dx = 2;
var dx = -2;



const map = createMap();



const tractors = []
setField(0, 0, 'space')
init();
start();
setInterval(draw,10);



function start() {

    requestAnimationFrame(tick)

}

function tick(timestamp) {
    moveTractors()

    clearCanvas();
    drawMap();


    if (!isMaze()) {
        drawTractors()
        requestAnimationFrame(tick)
    }

    drawPlayer();
}

function init() {
    canvas.width = PADDING * 2 + COLUMNS_SIZE * FIELD_SIZE;
    canvas.height = PADDING * 2 + ROWS_SIZE * FIELD_SIZE

    for (let x = 0; x < TRACTORS_NUMBER; x++){
        tractors.push({x: 0, y: 0})
    }
}

function drawMap() {
    for (let x = 0; x < COLUMNS_SIZE; x++){
        for (let y = 0; y < ROWS_SIZE; y++){
            if (getField(x, y) === 'wall') {
                context.fillStyle = 'black'
                context.beginPath()
                context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
                context.fill()
            }
        }
    }
}

function drawTractors() {
    for (const tractor of tractors) {
        context.fillStyle = 'red'
        context.beginPath()
        context.rect(PADDING + tractor.x * FIELD_SIZE, PADDING + tractor.y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
        context.fill()
    }
}
function moveTractors() {
    for (const tractor of tractors) {
        const directs = []

        if (tractor.x > 0) {
            directs.push('left')
        }

        if (tractor.x < COLUMNS_SIZE - 2) {
            directs.push('right')
        }
        if (tractor.y > 0) {
            directs.push('up')
        }
        if (tractor.y < ROWS_SIZE - 2) {
            directs.push('down')
        }

        const direct = getRandomFrom(directs)

        switch (direct) {
            case 'left':
                if (getField(tractor.x - 2, tractor.y) === 'wall') {
                    setField(tractor.x - 1, tractor.y, 'space')
                    setField(tractor.x - 2, tractor.y, 'space')
                }

                tractor.x -= 2
                break

            case 'right':
                if (getField(tractor.x + 2, tractor.y) === 'wall') {
                    setField(tractor.x + 1, tractor.y, 'space')
                    setField(tractor.x + 2, tractor.y, 'space')
                }

                tractor.x += 2
                break

            case 'up':
                if (getField(tractor.x, tractor.y - 2) === 'wall') {
                    setField(tractor.x, tractor.y - 1, 'space')
                    setField(tractor.x, tractor.y - 2, 'space')
                }

                tractor.y -= 2
                break

            case 'down':
                if (getField(tractor.x, tractor.y + 2) === 'wall') {
                    setField(tractor.x, tractor.y + 1, 'space')
                    setField(tractor.x, tractor.y + 2, 'space')
                }

                tractor.y += 2
                break
        }
    }
}

function clearCanvas() {
    context.fillStyle = 'black';
    context.beginPath();
    context.rect(0,0,canvas.width, canvas.height);
    context.fill();
    context.fillStyle = 'white';
    context.beginPath();
    context.rect(PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2);
    context.fill()
}

function createMap(){
    const map =[];

    for(let y = 0; y < ROWS_SIZE; y++){

        const row = [];
            for(let x = 0; x < COLUMNS_SIZE; x++){
             row.push('wall')
         }

         map.push(row)
    }

    return map
}

function getField(x, y){
    if (x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE){
        return null
    }
    return map[y][x]
}

function setField(x, y, value){
    if (x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE){
        return null
    }
    map[y][x] = value
}


function getRandomFrom(array){
    const index = Math.floor(Math.random() * array.length) ;
    return array[index]
}

function isEven(n) {
     return n % 2 === 0
}
function isMaze() {
    for (let x = 0; x < COLUMNS_SIZE; x++){
        for (let y = 0; y < ROWS_SIZE; y++){
            if(isEven(x) && isEven(y) && getField(x, y) === 'wall' ){
                return false
            }
        }
    }
    return true
}

function drawPlayer() {
    context.beginPath();
    context.rect(10, 10, playerWidth, playerHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();

}

function keyDownHandler(e) {
    if (e.key === 39){
        rightPressed = true;
    }
    else if (e.key === 37){
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 39){
        rightPressed = false;
    }
    else if (e.key === 37){
        leftPressed = false;
    }
}

function draw() {
    drawPlayer();

    if(rightPressed){
        playerX += 2;
    }

    else if(leftPressed){
        playerX += -2
    }

}



