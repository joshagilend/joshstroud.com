// Initialize the canvas and context
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Define the main character Tommy the Ghoul Gourmet
const tommy = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    color: 'purple',
    speed: 5,
    direction: 'right',
    originalX: 50,
    originalY: 50,
    isFlashing: false,
    flashCounter: 0
};

// Define enemy properties
const enemies = [
    { x: 200, y: 100, width: 50, height: 50, color: 'red', speed: 3, direction: 'down' },
    { x: 400, y: 200, width: 50, height: 50, color: 'red', speed: 2, direction: 'up' },
    { x: 600, y: 300, width: 50, height: 50, color: 'red', speed: 4, direction: 'down' }
];

// Function to draw Tommy
function drawTommy() {
    if (!tommy.isFlashing || tommy.flashCounter % 10 < 5) {
        context.fillStyle = tommy.color;
        context.fillRect(tommy.x, tommy.y, tommy.width, tommy.height);
    }
}

// Function to draw enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        context.fillStyle = enemy.color;
        context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Function to update Tommy's position
function updateTommy() {
    if (tommy.direction === 'right') {
        tommy.x += tommy.speed;
        if (tommy.x + tommy.width > canvas.width) {
            tommy.direction = 'left';
        }
    } else {
        tommy.x -= tommy.speed;
        if (tommy.x < 0) {
            tommy.direction = 'right';
        }
    }
}

// Function to update enemies' positions
function updateEnemies() {
    enemies.forEach(enemy => {
        if (enemy.direction === 'down') {
            enemy.y += enemy.speed;
            if (enemy.y + enemy.height > canvas.height) {
                enemy.direction = 'up';
            }
        } else {
            enemy.y -= enemy.speed;
            if (enemy.y < 0) {
                enemy.direction = 'down';
            }
        }
    });
}

// Function to check collision
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Function to handle collision
function handleCollision() {
    enemies.forEach(enemy => {
        if (checkCollision(tommy, enemy)) {
            tommy.isFlashing = true;
            tommy.flashCounter = 0;
            tommy.x = tommy.originalX;
            tommy.y = tommy.originalY;
        }
    });
}

// Main game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateTommy();
    updateEnemies();
    drawTommy();
    drawEnemies();
    handleCollision();
    
    if (tommy.isFlashing) {
        tommy.flashCounter++;
        if (tommy.flashCounter > 30) {
            tommy.isFlashing = false;
        }
    }

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();