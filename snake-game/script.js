const gameContainer = document.getElementById("game-container");
const snakeElement = document.getElementById("snake");
const foodElement = document.getElementById("food");

let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let snakeLength = 1;
let snakeTrail = [];
let gridSize = 20;
let tileCount = 20;
let xVelocity = 1;
let yVelocity = 0;
let gameRunning = false;
let gameSpeed = 150; // Adjust this value to control the game speed (lower value means faster)

function updateGame() {
    if (!gameRunning) {
        // Start the game only if it's not already running
        gameRunning = true;
        moveSnake();
    }

    snakeX += xVelocity * gridSize;
    snakeY += yVelocity * gridSize;

    // Check for collisions with the edges of the game container
    if (snakeX < 0 || snakeX >= gridSize * tileCount || snakeY < 0 || snakeY >= gridSize * tileCount) {
        gameOver();
        return;
    }

    // Check for collisions with the food
    if (snakeX === foodX && snakeY === foodY) {
        snakeLength++;
        foodX = Math.floor(Math.random() * tileCount) * gridSize;
        foodY = Math.floor(Math.random() * tileCount) * gridSize;
    }

    // Update the snake trail
    snakeTrail.push({ x: snakeX, y: snakeY });
    if (snakeTrail.length > snakeLength) {
        snakeTrail.shift();
    }

    // Check for collisions with the tail
    for (let i = 0; i < snakeTrail.length - 1; i++) {
        if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
            gameOver();
            return;
        }
    }

    // Update the game display
    snakeElement.style.left = snakeX + "px";
    snakeElement.style.top = snakeY + "px";
    foodElement.style.left = foodX + "px";
    foodElement.style.top = foodY + "px";

    // Repeat the game update loop with a delay
    setTimeout(updateGame, gameSpeed);
}

function moveSnake() {
    document.addEventListener("keydown", function(event) {
        if (gameRunning) {
            switch (event.key) {
                case "ArrowLeft":
                    xVelocity = -1;
                    yVelocity = 0;
                    break;
                case "ArrowRight":
                    xVelocity = 1;
                    yVelocity = 0;
                    break;
                case "ArrowUp":
                    xVelocity = 0;
                    yVelocity = -1;
                    break;
                case "ArrowDown":
                    xVelocity = 0;
                    yVelocity = 1;
                    break;
            }
        }
    });
}

function gameOver() {
    alert("Game Over!");
    // Perform any additional actions to reset the game state
    snakeX = 0;
    snakeY = 0;
    snakeLength = 1;
    snakeTrail = [];
    xVelocity = 1;
    yVelocity = 0;
    foodX = Math.floor(Math.random() * tileCount) * gridSize;
    foodY = Math.floor(Math.random() * tileCount) * gridSize;
    gameRunning = false;
}

// Initial setup
foodX = Math.floor(Math.random() * tileCount) * gridSize;
foodY = Math.floor(Math.random() * tileCount) * gridSize;
