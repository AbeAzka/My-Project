const quotes = [
  "Debugging itu seperti menjadi detektif dalam kasus pembunuhan di mana kamu sekaligus pembunuhnya.",
  "Kode yang baik adalah kode yang bisa dipahami oleh manusia, bukan hanya oleh mesin.",
  "Jangan hapal kode, pahami logikanya.",
  "Error bukanlah kegagalan, tapi petunjuk menuju solusi.",
  "Setiap programmer pernah mengalami: kodenya error, padahal belum dijalanin.",
  "Menulis kode itu mudah. Menulis kode yang bisa dirawat selama 5 tahun itu sulit.",
  "Jika debugging adalah proses menghilangkan bug, maka programming adalah proses menciptakan bug.",
  "Konsistensi dalam coding itu seperti oksigen untuk proyek tim.",
  "Sebelum 'run', coba dipikir dulu. Banyak error terjadi karena terburu-buru.",
  "Programmer handal bukan yang tidak pernah error, tapi yang cepat memperbaikinya.",
  "F5 adalah sahabat sekaligus musuh terbesar programmer.",
  "Jadilah programmer yang solutif, bukan sekadar copas dari Stack Overflow.",
  "Kode yang singkat belum tentu efisien, dan kode yang panjang belum tentu rumit.",
  "Tidur itu penting, tapi ngepush sebelum deadline juga penting. Pilih mana?",
  "Komputer tidak pernah salah, yang salah adalah siapa yang ngoding.",
  "Hidup ini seperti while(true) { terus berjuang }.",
  "Bug itu wajar, yang tidak wajar adalah malas mencari solusinya.",
  "Berkolaborasi dengan kode orang lain itu seperti membaca novel tanpa judul dan bab.",
  "Comment pada kode adalah bukti bahwa kamu peduli pada masa depan (termasuk dirimu sendiri).",
  "Jangan jadi programmer yang hanya bisa Copy-Paste. Jadilah programmer yang bisa Create dan Debug."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");

let startTime;
let timerInterval;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function renderQuote() {
    const quote = getRandomQuote();
    quoteEl.innerHTML = "";

    quote.split("").forEach(char => {
      const span = document.createElement("span");
      span.innerText = char;
      quoteEl.appendChild(span);
    });
}
    
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
      const currentTime = Math.floor((new Date() - startTime) / 1000);
      timeEl.innerText = currentTime;
    }, 1000);
}

function startGame(){
    renderQuote();
    inputEl.value = "";
    timeEl.innerText = "0";
    wpmEl.innerText = "0";
    clearInterval(timerInterval);
    startTimer();
}

function calculateWPM() {
    const time = (new Date() - startTime) / 60000; // menit
    const words = inputEl.value.length / 5;
    console.log(`Time: ${time} minutes, Words: ${words}`);
    return Math.round(words / time);
}


inputEl.addEventListener("input", () => {
    const quoteSpans = quoteEl.querySelectorAll("span");
    const inputText = inputEl.value.split("");

    let correct = true;

    quoteSpans.forEach((span, index) => {
      const char = inputText[index];

      if (char == null) {
        span.classList.remove("correct", "incorrect");
        correct = false;
      } else if (char === span.innerText) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
      } else {
        span.classList.add("incorrect");
        span.classList.remove("correct");
        correct = false;
      }
    });
    wpmEl.innerText = calculateWPM();
    if (correct) {
      clearInterval(timerInterval);
      
    }
});

startGame();
