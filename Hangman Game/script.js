const daftarKata = [
  { kata: "ALGORITHM", kategori: "Programming" },
  { kata: "VARIABLE", kategori: "Programming" },
  { kata: "ARRAY", kategori: "Programming" },
  { kata: "DATABASE", kategori: "Technology" },
  { kata: "FRONTEND", kategori: "Web Dev" },
  { kata: "BACKEND", kategori: "Web Dev" },
  { kata: "PYTHON", kategori: "Language" },
  { kata: "JAVASCRIPT", kategori: "Language" }
];

let kataRahasia="";
let kategori = "";
let tebakan = [];
let live = 6;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function startGame() {
  const random = daftarKata[Math.floor(Math.random() * daftarKata.length)];
  kataRahasia = random.kata;
  kategori = random.kategori;

  tebakan = Array(kataRahasia.length).fill("_");
  live = 6;

  document.getElementById("hasil").textContent = "";
  document.getElementById("live").textContent = "Kesempatan: " + live;
  document.getElementById("kategori").textContent = "Kategori: " + kategori;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tampilkanKata();
  buatTombolHuruf();
}

function tampilkanKata() {
  document.getElementById("kata").textContent = tebakan.join(" ");
}

function buatTombolHuruf() {
  const hurufDiv = document.getElementById("huruf");
  hurufDiv.innerHTML = "";

  for (let i = 65; i <= 90; i++) {
    const tombol = document.createElement("button");
    tombol.textContent = String.fromCharCode(i);

    tombol.onclick = function () {
      cekHuruf(tombol);
    };

    hurufDiv.appendChild(tombol);
  }
}

function cekHuruf(tombol) {
  const huruf = tombol.textContent;
  let benar = false;

  for (let i = 0; i < kataRahasia.length; i++) {
    if (kataRahasia[i] === huruf) {
      tebakan[i] = huruf;
      benar = true;
    }
  }

  if (benar) {
    tombol.style.backgroundColor = "green";
    //document.getElementById("benarSound").play();
  } else {
    tombol.style.backgroundColor = "red";
    live--;
    gambarHangman();
    //document.getElementById("salahSound").play();
  }

  tombol.disabled = true;

  tampilkanKata();
  document.getElementById("live").textContent = "Kesempatan: " + live;

  cekGame();
}

function gambarHangman() {
  ctx.lineWidth = 2;
  ctx.fillStyle = "white"; 
  switch (live) {
    case 5:
      // tiang
      ctx.moveTo(10, 190);
      ctx.lineTo(150, 190);
      
      ctx.stroke();
      break;
    case 4:
      ctx.moveTo(30, 190);
      ctx.lineTo(30, 20);
      ctx.lineTo(100, 20);
      ctx.lineTo(100, 40);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.arc(100, 60, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 2:
      ctx.moveTo(100, 80);
      ctx.lineTo(100, 140);
      ctx.stroke();
      break;
    case 1:
      ctx.moveTo(100, 100);
      ctx.lineTo(80, 120);
      ctx.moveTo(100, 100);
      ctx.lineTo(120, 120);
      ctx.stroke();
      break;
    case 0:
      ctx.moveTo(100, 140);
      ctx.lineTo(80, 170);
      ctx.moveTo(100, 140);
      ctx.lineTo(120, 170);
      ctx.stroke();
      break;
  }
}

function cekGame() {
  if (!tebakan.includes("_")) {
    document.getElementById("hasil").textContent = "🎉 Kamu Menang!";
    nonaktifkanSemua();
  } else if (live <= 0) {
    document.getElementById("hasil").textContent =
      "Kamu Kalah! Kata: " + kataRahasia;
    nonaktifkanSemua();
  }
}

function nonaktifkanSemua() {
  const tombol = document.querySelectorAll("#huruf button");
  tombol.forEach(btn => (btn.disabled = true));
}

startGame();