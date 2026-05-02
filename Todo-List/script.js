function Tugas(){
    let input = document.getElementById("text-input");
    let tugasBaru = input.value;

    if(tugasBaru.trim() == ""){
        alert("Isikan tugas yang akan dikerjakan..");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
    <span>${tugasBaru}</span>
    <button class="delete-btn" onclick="hapusTugas(this)">Hapus</button>
	`;
    let list = document.getElementById("daftarTugas");
    list.prepend(li);
    input.value = "";
}

function hapusTugas(elementButton){
    elementButton.parentElement.opacity = "0";
    setTimeout(() => {
        elementButton.parentElement.remove();
    }, 300);
}