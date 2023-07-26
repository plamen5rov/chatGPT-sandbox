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

function updateGame() {
    if (!gameRunning) {
        // Start the game only if it's not already running
        gameRunning = true;
        requestAnimationFrame(updateGame);
        return;
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

    // Repeat the game update loop
    requestAnimationFrame(updateGame);
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

// Function to start the game when a key is pressed
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        updateGame();
    }
}

// Attach the 'startGame' function to the 'keydown' event
document.addEventListener("keydown", startGame);

// Initial setup
foodX = Math.floor(Math.random() * tileCount) * gridSize;
foodY = Math.floor(Math.random() * tileCount) * gridSize;
