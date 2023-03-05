let locked = 1;
let currentScore = 0;
let array = [];
let no_cells;
let coordinatesX = [];
let coordinatesY = [];
let right_bound;
let lower_bound;
let word;
let headX;
let headY;
let direction = "uninitialized";
let flag = 0;
// Add event listener on keydown

    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

        // Alert the key name and key code on keydown
        // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
        if(!locked) {
            switch(event.key) {
                case("ArrowUp"):
                    if(direction != "up" && direction != "down") {
                        direction = "up";
                    }
                    // moveSnakeUp();
                    break;
                case("ArrowDown"):
                if(direction != "up" && direction != "down") {
                    direction = "down";
                    }
                    // moveSnakeDown();
                    break;
                case("ArrowLeft"):
                if(direction != "left" && direction != "right") {
                    direction = "left";
                    }
                    // moveSnakeLeft();
                    break;
                case("ArrowRight"):
                if(direction != "left" && direction != "right") {
                    direction = "right";
                }
                    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
                    // moveSnakeRight();
                    break;
                default:
                    break;
            }
        }
    }, false);

function generateTable() {
    let cell = 0;
    generateInnerArray();
    if(!locked) {
        let noRow = 0;
        document.getElementById("startButton").onclick = null;
        for(let i = 0; i < array.length; i++) {   
            document.getElementById("table").innerHTML += `
            <tr id="row${noRow}">
            `;
            word = "row" + i;
            for(let j = 0; j < array.length; j++) {
                document.getElementById(word).innerHTML += `
                <td><div class="square" id="${cell}"> </div> </td>
                `;
                cell++;
            }
            document.getElementById("table").innerHTML += `
            </tr>
            `;
            noRow++;   
        }
        setInitialPosition();
        generateFood();
        updateView();
    }
}

var intervalId = window.setInterval(function() {
    switch(direction) {
        case("left"):
            moveSnakeLeft();
            break;
        case("right"):
            moveSnakeRight();
            break;
        case("up"):
            moveSnakeUp();
            break;
        case("down"):
            moveSnakeDown();
            break;
        default:
            break;
    }
}, 600);

function moveSnakeDown() {
    headX++;
    if(headX < lower_bound && array[headX][headY] != 1) {
        coordinatesX.push(headX);
        coordinatesY.push(headY);
        if(array[headX][headY] == -1) {
            array[headX][headY] = 1;
            flag = 1;
            updateScore();
        }        
        else {
            array[coordinatesX.shift()][coordinatesY.shift()] = 7;
        }
        for(i = 0; i < coordinatesX.length; i++) {
            array[coordinatesX[i]][coordinatesY[i]] = 1;
        }
        if(flag) {
            generateFood();
            flag = 0;
        }
        updateView();
    }
    else {
        gameLost();
    }
}

function moveSnakeUp() {
    headX--;
    if(headX >= 0 && array[headX][headY] != 1) {
        coordinatesX.push(headX);
        coordinatesY.push(headY);
        if(array[headX][headY] == -1) {
            array[headX][headY] = 1;
            flag = 1;
            updateScore();
        }
        else {
            array[coordinatesX.shift()][coordinatesY.shift()] = 7;
        }
        for(i = 0; i < coordinatesX.length; i++) {
            array[coordinatesX[i]][coordinatesY[i]] = 1;
        }
        if(flag) {
            generateFood();
            flag = 0;
        }
        updateView();
    }
    else {
        gameLost();
    }
}
function moveSnakeLeft() {
    headY--;
    if(headY >= 0 && array[headX][headY] != 1) {
        coordinatesX.push(headX);
        coordinatesY.push(headY);
        if(array[headX][headY] == -1) {
            array[headX][headY] = 1;
            flag = 1;
            updateScore();
        }
        else {
            array[coordinatesX.shift()][coordinatesY.shift()] = 7;
        }
        for(i = 0; i < coordinatesX.length; i++) {
            array[coordinatesX[i]][coordinatesY[i]] = 1;
        }
        if(flag) {
            generateFood();
            flag = 0;
        }
        updateView();
    }
    else {
        gameLost();
    }
}

function moveSnakeRight() {
    headY++;
    if(headY < right_bound && array[headX][headY] != 1) {
        coordinatesX.push(headX);
        coordinatesY.push(headY);
        if(array[headX][headY] == -1) {
            array[headX][headY] = 1;
            flag = 1;
            updateScore();
        }   
        else {
            array[coordinatesX.shift()][coordinatesY.shift()] = 7;
        }
        for(i = 0; i < coordinatesX.length; i++) {
            array[coordinatesX[i]][coordinatesY[i]] = 1;
        }
        if(flag) {
            generateFood();
            flag = 0;
        }
        updateView();
    }
    else {
        gameLost();
    }
}

function setInitialPosition() {
    headX = 2;
    headY = 2;
    array[headX][headY] = 1;
    coordinatesX.push(headX);
    coordinatesY.push(headY);
}

/* update the movement of the Snake*/
function updateView() {
    let index;

    for(let i = 0; i < no_cells; i++) {
        for(let j = 0; j < no_cells; j++) {
            index = i * no_cells + j;
            if(array[i][j] == 1) {
                document.getElementById(index).style.background = "red";
            }
            else {
                document.getElementById(index).style.background = "antiquewhite";
            }
            if(array[i][j] == -1) {
                document.getElementById(index).style.background = "blue";
            }
        }
    }
}

function generateFood() {
    let foodX = getRandomInt(no_cells);
    let foodY = getRandomInt(no_cells);

    while((array[foodX][foodY] == -1) || array[foodX][foodY] == 1) {
        foodX = getRandomInt(no_cells);
        foodY = getRandomInt(no_cells);
    }
    array[foodX][foodY] = -1;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateScore() {
    currentScore++;
    document.getElementById("score").innerHTML = "Score:" + currentScore;
    if(currentScore + 1 == no_cells * no_cells) {
        document.getElementById("startButton").style.display = "block";
        document.getElementById("startButton").innerHTML="YOU WIN! RESTART GAME";
        document.getElementById("startButton").setAttribute("onclick","restartGame()");
        flag = 0;
        locked = 1;
    }
}

/* Debugging purpose */
// function printArray()
// {
//     for(let i = 0; i < no_cells; i++)
//     {
//         for(let j = 0; j < no_cells; j++)
//         {
//             console.log("index " + i + "-" + j +":" + array[i][j] + " ");
//         }
//     }
// }

function generateInnerArray() {
    /* Take input from user and generate array */
    no_cells = (Number)(document.getElementById("cellsInput").value);
    if(4 <= no_cells && no_cells <= 30) {
        locked = 0;
        right_bound = no_cells;
        lower_bound = no_cells;
        for(let i = 0; i < no_cells; i++) {
            array[i] = [];
            for(let j = 0; j < no_cells; j++) {
                array[i][j] = 7;
            }
        }
        document.getElementById("settingsCells").style.display = "none";
        document.getElementById("startButton").style.display = "none";
    }
    else {
        alert("Enter a number between 4 and 30");
    }
    
}

function gameLost() {
    clearInterval(intervalId);
    document.getElementById("startButton").style.display = "block";
    document.getElementById("startButton").innerHTML="YOU LOSE! RESTART GAME";
    document.getElementById("startButton").setAttribute("onclick","restartGame()")
    locked = 1;
}

function restartGame() {
    location.reload();
}