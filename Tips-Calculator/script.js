const jenisLayanan = document.getElementById("jenis");
const tipInfo = document.getElementById("tipInfo");
const selectedOption = document.getElementById("selectedOption");

jenisLayanan.addEventListener("change", function () {
    const rekomendasi = this.value;

    tipInfo.style.display = "block";
    selectedOption.textContent =
        `Rekomendasi tip untuk ${this.options[this.selectedIndex].text}: ${rekomendasi}`;
});

function hitungTip() {
    const tagihan = parseFloat(document.getElementById("jmlTagihan").value);
    const persenTip = parseFloat(document.getElementById("persentaseTip").value);
    const jumlahOrang = parseInt(document.getElementById("jmlOrang").value) || 1;

    if (isNaN(tagihan) || tagihan <= 0) {
        alert("Masukkan jumlah tagihan yang valid!");
        return;
    }

    if (isNaN(persenTip) || persenTip < 0) {
        alert("Masukkan persentase tip yang valid!");
        return;
    }



    const tip = tagihan * (persenTip / 100);
    const total = tagihan + tip;
    const perOrang = total / jumlahOrang;

    const $ = (id) => document.getElementById(id);

    const rupiah = (angka) => {
        return "Rp " + angka.toLocaleString("id-ID");
    };

    document.getElementById("totalAmount").textContent = rupiah(tip);
    document.getElementById("totalPay").textContent = rupiah(total);
    document.getElementById("perPerson").textContent = rupiah(perOrang);


    /*
    document.getElementById("hasil").innerHTML = `
        <h3>Hasil Perhitungan</h3>
        <p>Jumlah Tagihan : <b>Rp ${tagihan.toLocaleString("id-ID")}</b></p>
        <p>Tip (${persenTip}%) : <b>Rp ${tip.toLocaleString("id-ID")}</b></p>
        <p>Total Bayar : <b>Rp ${total.toLocaleString("id-ID")}</b></p>
        <p>Per Orang (${jumlahOrang} orang) : 
        <b>Rp ${perOrang.toLocaleString("id-ID")}</b></p>
    `;
    */
}