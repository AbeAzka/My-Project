const canvas = document.getElementById("pingPongCanvas");
const ctx = canvas.getContext("2d");

let playerScore = 0;
let robotScore = 0;

const paddleWidth = 15;
const paddleHeight = 100;

const player = {
    x: 10,
    y: canvas.height/2 - paddleHeight/2
};


const robot = {
    x: canvas.width - 25,
    y: canvas.height/2 - paddleHeight/2
};

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 6,
    dx: 6,
    dy: 4
}

const scoreSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-changing-tab-206.wav");
const hitSound = document.getElementById("hitSound");

canvas.addEventListener("mousemove", function(e) {
    let rect = canvas.getBoundingClientRect();
    player.y = e.clientY - rect.top - paddleHeight/2;
});

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawNet() {
    for(let i=0; i<canvas.height; i+=30){
        drawRect(canvas.width/2 - 2, i, 4, 20, "white");
    }
}   

function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.dx = -ball.dx;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawNet();
    drawRect(player.x, player.y, paddleWidth, paddleHeight, "cyan");
    drawRect(robot.x, robot.y, paddleWidth, paddleHeight, "cyan");
    drawBall();
}

function game() {
    update();
    draw();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // AI Robot mengikuti bola
    robot.y += (ball.y - (robot.y + paddleHeight/2)) * 0.08;

    // Pantulan atas & bawah
    if(ball.y + ball.radius > canvas.height){
        ball.y = canvas.height - ball.radius;
        ball.dy *= -1;
        hitSound.play();
    }

    if(ball.y - ball.radius < 0){
        ball.y = ball.radius;
        ball.dy *= -1;
        hitSound.play();
    }

    // === Collision Player ===
    if(
        ball.x - ball.radius <= player.x + paddleWidth &&
        ball.x - ball.radius >= player.x &&
        ball.y >= player.y &&
        ball.y <= player.y + paddleHeight
    ){
        ball.x = player.x + paddleWidth + ball.radius;
        ball.dx *= -1;
        hitSound.play();
    }

    // === Collision Robot ===
    if(
        ball.x + ball.radius >= robot.x &&
        ball.x + ball.radius <= robot.x + paddleWidth &&
        ball.y >= robot.y &&
        ball.y <= robot.y + paddleHeight
    ){
        ball.x = robot.x - ball.radius;
        ball.dx *= -1;
        hitSound.play();
    }

    // === Score ===
    if(ball.x + ball.radius < 0){
        robotScore++;
        document.getElementById("robotScore").innerText = robotScore;
        scoreSound.play();
        resetBall();
    }

    if(ball.x - ball.radius > canvas.width){
        playerScore++;
        document.getElementById("playerScore").innerText = playerScore;
        scoreSound.play();
        resetBall();
    }
}

setInterval(game, 1000/60);