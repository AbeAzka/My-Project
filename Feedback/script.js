// ===============================
// VARIABEL
// ===============================

let rating = 0;

let feedbackData = JSON.parse(
    localStorage.getItem("feedbackData")
) || [];


// ===============================
// RATING BINTANG
// ===============================

const stars = document.querySelectorAll(".star");

stars.forEach(star => {

    star.addEventListener("click", function () {

        rating = parseInt(this.dataset.value);

        updateRating();

    });

});


function updateRating() {

    stars.forEach(star => {

        const value = parseInt(star.dataset.value);

        if (value <= rating) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }

    });


    const ratingText = document.getElementById("ratingText");

    if (rating === 1) {
        ratingText.textContent = "Sangat Buruk";
    }
    else if (rating === 2) {
        ratingText.textContent = "Buruk";
    }
    else if (rating === 3) {
        ratingText.textContent = "Cukup";
    }
    else if (rating === 4) {
        ratingText.textContent = "Baik";
    }
    else if (rating === 5) {
        ratingText.textContent = "Sangat Baik";
    }
    else {
        ratingText.textContent = "Belum ada rating";
    }

}


// ===============================
// KIRIM FEEDBACK
// ===============================

function kirimFeedback() {

    const nama = document.getElementById("name").value.trim();

    const jenisKelas =
        document.getElementById("class-type").value;

    const kategori =
        document.getElementById("category").value;

    const komentar =
        document.getElementById("komentar").value.trim();


    // VALIDASI NAMA

    if (nama === "") {

        alert("Nama harus diisi!");

        return;
    }


    // VALIDASI JENIS KELAS

    if (jenisKelas === "") {

        alert("Silakan pilih jenis kelas!");

        return;
    }


    // VALIDASI KATEGORI

    if (kategori === "") {

        alert("Silakan pilih kategori!");

        return;
    }


    // VALIDASI RATING

    if (rating === 0) {

        alert("Silakan berikan rating!");

        return;
    }


    // VALIDASI KOMENTAR

    if (komentar === "") {

        alert("Komentar harus diisi!");

        return;
    }


    // BUAT DATA FEEDBACK

    const feedback = {
        nama: nama,
        jenisKelas: jenisKelas,
        kategori: kategori,
        rating: rating,
        komentar: komentar,
        tanggal: new Date().toLocaleDateString("id-ID")
    };


    // TAMBAHKAN DATA

    feedbackData.push(feedback);


    // SIMPAN KE LOCAL STORAGE

    localStorage.setItem(
        "feedbackData",
        JSON.stringify(feedbackData)
    );


    alert("Feedback berhasil dikirim!");


    // RESET FORM

    resetForm();


    // TAMPILKAN FEEDBACK

    tampilkanFeedback();

}


// ===============================
// MENAMPILKAN FEEDBACK
// ===============================

function tampilkanFeedback() {

    const container =
        document.getElementById("daftarFeedback");


    if (feedbackData.length === 0) {

        container.innerHTML = `
            <p class="empty">
                Belum ada feedback.
            </p>
        `;

        updateStatistik();

        return;
    }


    container.innerHTML = "";


    // DATA TERBARU DI ATAS

    const dataTerbaru =
        [...feedbackData].reverse();


    dataTerbaru.forEach(data => {

        let starsHTML = "";


        for (let i = 1; i <= 5; i++) {
            if (i <= data.rating) {
                starsHTML += "★";
            } else {
                starsHTML += "☆";
            }
        }


        const item = document.createElement("div");
        item.className = "feedback-item";
        item.innerHTML = `
            <div class="feedback-header">

                <span class="feedback-name">
                    ${data.nama}
                </span>

                <span class="feedback-category">
                ${data.jenisKelas}
                </span>

            </div>

            <div class="feedback-info">
                Kategori: ${data.kategori}
            </div>

            <div class="feedback-rating">
                ${starsHTML}
            </div>

            <p class="feedback-comment">
                ${data.komentar}
            </p>

            <div class="feedback-info">
                ${data.tanggal}
            </div>

        `;
        container.appendChild(item);
    });
    updateStatistik();

}


// ===============================
// STATISTIK
// ===============================

function updateStatistik() {

    const total = feedbackData.length;
    let rataRata = 0;
    if (total > 0) {
        const totalRating = feedbackData.reduce( (jumlah, data) => jumlah + data.rating, 0);
        rataRata = totalRating / total;
    }
    document.getElementById("totalFeedback").textContent = total;
    document.getElementById("rataRating").textContent = rataRata.toFixed(1);
}

// ===============================
// RESET FORM
// ===============================

function resetForm() {
    document.getElementById("nama").value = "";
    document.getElementById("jenisKelas").value = "";
    document.getElementById("kategori").value = "";
    document.getElementById("komentar").value = "";
    rating = 0;
    updateRating();
}

// ===============================
// LOAD DATA
// ===============================

tampilkanFeedback();