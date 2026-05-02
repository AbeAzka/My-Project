function hitungNilai() {
    const nTugas=document.getElementById("tugas").value;
    const nQuiz=document.getElementById("quiz").value;   
    const nUts=document.getElementById("uts").value;
    const nUas=document.getElementById("uas").value;
    const nAbsensi=document.getElementById("absensi").value;

    const nilaiAkhir = (nTugas * 0.1) + (nQuiz * 0.15) + (nUts * 0.3) + (nUas * 0.35) + (nAbsensi * 0.1);
    
    let keterangan = "";
    let warnaLatar = "";

    if (nilaiAkhir >= 75) {
        keterangan = "Lulus";
        warnaLatar = "#A9E5BB";
    } else if (nilaiAkhir >= 50) {
        keterangan = "Remedial";
        warnaLatar = "#FCE6B1";
    } else {
        keterangan = "Tidak Lulus";
        warnaLatar = "#E3170A";
    }

    const resultArea = document.getElementById("resultArea");
    const displayNilai = document.getElementById("displayNilai");
    const displayStatus = document.getElementById("displayStatus");
 
    resultArea.style.display = "block";
    displayNilai.innerText = nilaiAkhir.toFixed(2);
    displayStatus.innerText = keterangan;
    displayStatus.style.backgroundColor = warnaLatar;
}