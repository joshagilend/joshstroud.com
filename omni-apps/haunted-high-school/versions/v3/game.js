// Initialize the canvas and context
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the main character Tommy the Ghoul Gourmet
const tommy = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    color: 'purple',
    speed: 5,
    originalX: 50,
    originalY: 50,
    isFlashing: false,
    flashCounter: 0,
    slimeCollected: 0
};

// Define enemy properties
const enemies = [];
const enemyCount = 30;
for (let i = 0; i < enemyCount; i++) {
    enemies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 50,
        height: 50,
        color: i === 0 ? 'gold' : 'red', // The first enemy is the "king" enemy
        speed: 3,
        direction: Math.random() < 0.5 ? 'down' : 'up',
        isKing: i === 0 // Mark the king enemy
    });
}

let specialActionTriggered = false;
let specialActionCounter = 0;

// Player controls
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        tommy.y -= tommy.speed;
    } else if (event.key === 'ArrowDown') {
        tommy.y += tommy.speed;
    } else if (event.key === 'ArrowLeft') {
        tommy.x -= tommy.speed;
    } else if (event.key === 'ArrowRight') {
        tommy.x += tommy.speed;
    } else if (event.key === 'q' || event.key === 'Q') {
        specialActionTriggered = true;
        specialActionCounter = 0;
    }
});

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

// Function to update enemies' positions
function updateEnemies() {
    enemies.forEach(enemy => {
        if (enemy.direction === 'down') {
            enemy.y += enemy.speed - (tommy.slimeCollected ? 1 : 0); // Slower if slime collected
            if (enemy.y + enemy.height > canvas.height) {
                enemy.direction = 'up';
            }
        } else {
            enemy.y -= enemy.speed - (tommy.slimeCollected ? 1 : 0); // Slower if slime collected
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
            if (enemy.isKing) {
                alert('You win!');
                window.location.reload();
            } else {
                tommy.isFlashing = true;
                tommy.flashCounter = 0;
                tommy.x = tommy.originalX;
                tommy.y = tommy.originalY;
                tommy.slimeCollected++;
            }
        }
    });
}

// Function to handle special action
function handleSpecialAction() {
    if (specialActionTriggered) {
        specialActionCounter++;
        if (specialActionCounter < 100) {
            enemies.forEach(enemy => {
                if (specialActionCounter % 20 < 10) {
                    enemy.color = 'blue';
                } else {
                    enemy.color = 'red';
                }
            });
        } else {
            specialActionTriggered = false;
        }
    }
}

// Main game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateEnemies();
    drawTommy();
    drawEnemies();
    handleCollision();
    handleSpecialAction();
    
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