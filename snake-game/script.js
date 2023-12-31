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
let keyLock = false; // To prevent multiple key presses at once

function updateGame() {
    if (!gameRunning) {
        // Start the game only if it's not already running
        gameRunning = true;
        moveSnake(); // Add event listener for keydown once
        spawnFood(); // Spawn initial food
        requestAnimationFrame(gameLoop);
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
        spawnFood(); // Spawn new food
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

    keyLock = false; // Unlock keys
}

function moveSnake() {
    document.addEventListener("keydown", function(event) {
        if (gameRunning && !keyLock) {
            keyLock = true; // Lock keys to prevent multiple key presses at once
            switch (event.key) {
                case "ArrowLeft":
                    if (xVelocity !== 1) {
                        xVelocity = -1;
                        yVelocity = 0;
                    }
                    break;
                case "ArrowRight":
                    if (xVelocity !== -1) {
                        xVelocity = 1;
                        yVelocity = 0;
                    }
                    break;
                case "ArrowUp":
                    if (yVelocity !== 1) {
                        xVelocity = 0;
                        yVelocity = -1;
                    }
                    break;
                case "ArrowDown":
                    if (yVelocity !== -1) {
                        xVelocity = 0;
                        yVelocity = 1;
                    }
                    break;
            }
        }
    });
}

function spawnFood() {
    // Generate random positions for the food within the game container
    foodX = Math.floor(Math.random() * tileCount) * gridSize;
    foodY = Math.floor(Math.random() * tileCount) * gridSize;

    // Ensure the food does not spawn on the snake
    for (let i = 0; i < snakeTrail.length; i++) {
        if (snakeTrail[i].x === foodX && snakeTrail[i].y === foodY) {
            spawnFood(); // Retry if the food spawns on the snake
            return;
        }
    }

    // Update the food display
    foodElement.style.left = foodX + "px";
    foodElement.style.top = foodY + "px";
}

function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
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
    spawnFood(); // Respawn initial food
    gameRunning = false;
    keyLock = false; // Reset key lock
}

// Attach the 'startGame' function to the 'keydown' event
document.addEventListener("keydown", startGame);
