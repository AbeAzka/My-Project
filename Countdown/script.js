const start_btn = document.querySelector('.btn-start');

start_btn.addEventListener('click', () => {
    const target_time = new Date().getTime() + (24 * 60 * 60*1000); // 24 hours from now
    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = target_time - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('mins').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('secs').innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "WAKTU HABI5";
            start_btn.disabled = false;
            start_btn.innerText = "Start Again";
        }
    }, 1000);
});