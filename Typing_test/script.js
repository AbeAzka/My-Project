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
let timeInterval;