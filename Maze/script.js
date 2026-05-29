const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const infoText = document.getElementById("c");
const timerEl = document.getElementById("timerEl");

const tileSize = 40;

const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const player = {
    x: 1,
    y: 1,
    color: "blue"
};

const endPoint = {
    x: 11,
    y: 11
};

let timeLeft = 30;
let gameOver = false;

function drawMaze() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let row = 0; row < maze.length; row++) {

        for(let col = 0; col < maze[row].length; col++) {

            if(maze[row][col] === 1) {

                ctx.fillStyle = "darkgreen";
                ctx.fillRect(
                    col * tileSize,
                    row * tileSize,
                    tileSize,
                    tileSize
                );

            } else {

                ctx.fillStyle = "#dfffd6";
                ctx.fillRect(
                    col * tileSize,
                    row * tileSize,
                    tileSize,
                    tileSize
                );
            }

            ctx.strokeStyle = "black";
            ctx.strokeRect(
                col * tileSize,
                row * tileSize,
                tileSize,
                tileSize
            );
        }
    }

    // Finish Point
    ctx.fillStyle = "gold";
    ctx.fillRect(
        endPoint.x * tileSize,
        endPoint.y * tileSize,
        tileSize,
        tileSize
    );

    // Player
    ctx.fillStyle = player.color;

    ctx.beginPath();
    ctx.arc(
        player.x * tileSize + tileSize / 2,
        player.y * tileSize + tileSize / 2,
        tileSize / 3,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

function movePlayer(dx, dy) {

    if(gameOver) return;

    const newX = player.x + dx;
    const newY = player.y + dy;

    if(maze[newY][newX] !== 1) {

        player.x = newX;
        player.y = newY;

        drawMaze();

        checkWin();
    }
}

document.addEventListener("keydown", function(e){

    switch(e.key) {

        case "ArrowUp":
            movePlayer(0, -1);
            break;

        case "ArrowDown":
            movePlayer(0, 1);
            break;

        case "ArrowLeft":
            movePlayer(-1, 0);
            break;

        case "ArrowRight":
            movePlayer(1, 0);
            break;
    }
});

function checkWin() {

    if(player.x === endPoint.x && player.y === endPoint.y) {

        gameOver = true;

        infoText.innerHTML = "YOU WIN!";
        infoText.style.color = "green";

        clearInterval(timerInterval);
    }
}

function updateTimer() {

    if(gameOver) return;

    timeLeft--;

    let seconds = timeLeft < 10 ? "0" + timeLeft : timeLeft;

    timerEl.innerHTML = `Time Left: 00:${seconds}`;

    if(timeLeft <= 0) {

        gameOver = true;

        clearInterval(timerInterval);

        infoText.innerHTML = "GAME OVER!";
        infoText.style.color = "red";
    }
}

const timerInterval = setInterval(updateTimer, 1000);

drawMaze();