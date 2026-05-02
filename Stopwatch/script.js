let StartBtn = document.getElementById("StartBtn");

let ResetBtn = document.getElementById("ResetBtn");

let hr = 0;
let min = 0;
let sec = 0;
let count = 0;
let timer = false;

StartBtn.addEventListener("click", function() {
    if (!timer) {
        timer = true;
        stopwatch();
        StartBtn.innerHTML = "Stop";
    }else{
        timer = false;
        StartBtn.innerHTML = "Start";
    }
});


ResetBtn.addEventListener("click", function() {
    timer = false;
    hr = 0;
    min = 0;
    sec = 0;
    count = 0;

    document.getElementById("hr").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("count").innerHTML = "00";
});

function stopwatch() {
    if (timer) {
        count++;

        if (count == 100) {
            sec++;
            count = 0;
        }

        if (sec == 60) {
            min++;
            sec = 0;
        }

        if (min == 60) {
            hr++;
            min = 0;
        }
    }

    let hrString = hr < 10? "0" + hr : hr;
    let minString = min < 10? "0" + min : min;
    let secString = sec < 10? "0" + sec : sec;
    let countString = count < 10? "0" + count : count;

    document.getElementById("hr").innerHTML = hrString;
    document.getElementById("min").innerHTML = minString;
    document.getElementById("sec").innerHTML = secString;
    document.getElementById("count").innerHTML = countString;
    setTimeout(stopwatch, 10);
}