const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameOver = false;

const player = {
    x: 180,
    y: 440,
    width: 40,
    height: 40,
    speed: 5
};

let enemies = [];
let bullets = [];
let enemySpeed = 1.2;
let score = 0;
let keys = {};

const shootSound = new Audio("https://www.soundjay.com/mechanical/sounds/mechanical-clonk-1.mp3");
const hitSound = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");

function createEnemies() {
  enemies = [];

  for (let i = 0; i < 10; i++) {
    enemies.push({
      x: Math.random() * (canvas.width - 30), // posisi X random
      y: Math.random() * 150, // posisi Y random (bagian atas layar)
      width: 30,
      height: 20
    });
  }
}
// Draw player
function drawPlayer() {
  // Body roket
  ctx.fillStyle = "white";
  ctx.fillRect(player.x + 10, player.y, 20, 30);

  // Kepala roket (segitiga)
  ctx.beginPath();
  ctx.moveTo(player.x + 10, player.y);
  ctx.lineTo(player.x + 20, player.y - 15);
  ctx.lineTo(player.x + 30, player.y);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();

  // Sayap kiri
  ctx.beginPath();
  ctx.moveTo(player.x + 10, player.y + 20);
  ctx.lineTo(player.x, player.y + 30);
  ctx.lineTo(player.x + 10, player.y + 30);
  ctx.closePath();
  ctx.fillStyle = "blue";
  ctx.fill();

  // Sayap kanan
  ctx.beginPath();
  ctx.moveTo(player.x + 30, player.y + 20);
  ctx.lineTo(player.x + 40, player.y + 30);
  ctx.lineTo(player.x + 30, player.y + 30);
  ctx.closePath();
  ctx.fillStyle = "blue";
  ctx.fill();

  // Api roket
  ctx.beginPath();
  ctx.moveTo(player.x + 15, player.y + 30);
  ctx.lineTo(player.x + 20, player.y + 40);
  ctx.lineTo(player.x + 25, player.y + 30);
  ctx.closePath();
  ctx.fillStyle = "orange";
  ctx.fill();
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach((b, index) => {
    b.y -= b.speed;
    ctx.fillRect(b.x, b.y, b.width, b.height);

    // Remove if off screen
    if (b.y < 0) bullets.splice(index, 1);
  });
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach((e) => {
	e.y += enemySpeed;
    ctx.fillRect(e.x, e.y, e.width, e.height);
  });
}

function update() {
  // Jika game over, gambar tulisan dan BERHENTI (return)
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 90, 250);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 160, 290);
    ctx.fillText("Refresh untuk main lagi", 100, 330);
    return; // Baris ini yang menghentikan loop game
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePlayer();
  drawPlayer();
  drawBullets();
  drawEnemies();
  detectCollision();
  detectPlayerHit(); // Mengecek jika roket tertabrak musuh
  drawScore();

  // Memunculkan musuh baru secara random
  if (Math.random() < 0.02) {
    enemies.push({
      x: Math.random() * (canvas.width - 30),
      y: 0,
      width: 30,
      height: 20
    });
  }
  
  requestAnimationFrame(update);
}


document.addEventListener("keydown", (e) => {
  keys[e.code] = true;

  if (e.code === "Space") {
    bullets.push({
      x: player.x + player.width / 2 - 2,
      y: player.y,
      width: 4,
      height: 10,
      speed: 7
    });

    // Reset suara ke awal agar bisa 'spam' tembakan
    shootSound.currentTime = 0; 
    shootSound.play().catch(error => console.log("Audio diblokir browser: " + error));
  }
});

function movePlayer() {
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
}

function detectCollision() {
  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (
        b.x < e.x + e.width &&
        b.x + b.width > e.x &&
        b.y < e.y + e.height &&
        b.y + b.height > e.y
      ) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score += 10;

        // hitSound.currentTime = 0;
        // hitSound.play();
      }
	  
    });
  });
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 20);
}

function detectPlayerHit() {
  enemies.forEach((e) => {
    if (
      player.x < e.x + e.width &&
      player.x + player.width > e.x &&
      player.y < e.y + e.height &&
      player.y + player.height > e.y
    ) {
      gameOver = true;
    }
  });
}

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

createEnemies();
update();