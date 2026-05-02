let siswa = [];
let no = 1;
function TambahSiswa() {
    let nama = document.getElementById("nama").value;
    let kelas = document.getElementById("kelas").value;
    let umur = document.getElementById("umur").value;
    
    if(nama === "" || kelas === "" || umur === "") {
        alert("Semua field harus diisi!");
        return;
    }

    siswa.push({ no: no++, nama: nama, kelas: kelas, umur: umur });
    TampilkanSiswa();
    document.getElementById("nama").value = "";
    document.getElementById("kelas").value = "";
    document.getElementById("umur").value = "";
}   

function TampilkanSiswa() {
    let tabel = document.getElementById("TabelSiswa");

    tabel.innerHTML = "";
    siswa.forEach((s, index) => {
        tabel.innerHTML += `
            <tr>
                <td>${s.no}</td>
                <td>${s.nama}</td>  
                <td>${s.kelas}</td>
                <td>${s.umur}</td>
                <td><button onclick="HapusSiswa(${index})">Hapus</button></td>
            </tr>
        `;
    });
}

function HapusSiswa(index) {
    siswa.splice(index, 1);
    TampilkanSiswa();
}

function hapusSemua() {
    siswa = [];
    no = 1;
    TampilkanSiswa();
}