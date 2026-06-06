const guessInput = document.getElementById("guess");
const guessBtn = document.getElementById("check-btn");
const restartBtn = document.getElementById("restart");
const hint = document.getElementById("hint");

const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");

let secretNumber;
let score = 0;
let attemptsLeft;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 6;

    attemptsDisplay.textContent = `Kesempatan: ${attemptsLeft}`;
    hint.textContent = "";

    guessInput.disabled = false;
    guessBtn.disabled = false;

    guessInput.value = "";

    guessInput.focus();
}


guessBtn.addEventListener("click", () => {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 100) {
        hint.textContent = "Masukkan angka 1 - 100!";
        guessInput.focus();
        return;
    }

    attemptsLeft--;
    attemptsDisplay.textContent = `Kesempatan: ${attemptsLeft}`;

    if (guess === secretNumber) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;

        hint.textContent = `Selamat! Angka yang benar adalah ${secretNumber}`;

        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    }

    if (guess < secretNumber) {
        hint.textContent = "⬆️ Terlalu kecil!";
    } else {
        hint.textContent = "⬇️ Terlalu besar!";
    }

    if (attemptsLeft === 0) {
        hint.textContent = `GAME OVER! Angka yang benar adalah ${secretNumber}`;

        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    }

    guessInput.value = "";
    guessInput.focus();
});

// Tombol restart
restartBtn.addEventListener("click", startGame);

guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !guessBtn.disabled) {
        guessBtn.click();
    }
});

scoreDisplay.textContent = "Score: 0";
startGame();