// 1. Mengambil elemen DOM berdasarkan ID
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');
const statusMessage = document.getElementById('statusMessage');
const checkbox = document.getElementById('terms');
const checkboxError = document.getElementById('termsError');


contactForm.addEventListener('submit', function (event) {
    // Mencegah reloading halaman bawaan browser
    event.preventDefault();

    // Reset teks error sebelumnya
    resetErrors();

    // Mengambil nilai input dan menghapus spasi ekstra di awal/akhir
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const messageValue = messageInput.value.trim();

    let isValid = true;

    // --- VALIDASI NAMA ---
    if (nameValue === '') {
        nameError.textContent = 'Nama lengkap wajib diisi.';
        isValid = false;
    }

    // --- VALIDASI EMAIL (Menggunakan Regular Expression) ---
    // Format standar email: username@domain.extension
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        emailError.textContent = 'Alamat email wajib diisi.';
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Format email tidak valid (contoh: nama@email.com).';
        isValid = false;
    }

    // --- VALIDASI NOMOR TELEPON (Regex Tepat 10 Digit Angka) ---
    const phoneRegex = /^\d{10}$/;
    if (phoneValue === '') {
        phoneError.textContent = 'Nomor telepon wajib diisi.';
        isValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
        phoneError.textContent = 'Nomor telepon harus persis 10 digit angka.';
        isValid = false;
    }

    if (!checkbox.checked) {
        checkboxError.textContent = 'Anda harus menyetujui syarat dan ketentuan.';
        isValid = false;
    }

    // --- VALIDASI PESAN ---
    if (messageValue === '') {
        messageError.textContent = 'Pesan tidak boleh kosong.';
        isValid = false;
    }

    // --- PENANGANAN HASIL VALIDASI ---
    if (isValid) {
        statusMessage.textContent = 'Terima kasih! Pesan Anda berhasil dikirim.';
        statusMessage.className = 'status-message success';
        
        // Reset isi formulir setelah berhasil
        contactForm.reset();
    } else {
        statusMessage.textContent = 'Mohon periksa kembali bidang yang belum diisi dengan benar.';
        statusMessage.className = 'status-message error';
    }
});

function resetErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    phoneError.textContent = '';
    messageError.textContent = '';
    statusMessage.className = 'status-message';
    statusMessage.textContent = '';
}