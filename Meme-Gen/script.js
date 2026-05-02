const imageInput = document.getElementById('imageInput');
const topText = document.getElementById('topText');
const bottomText = document.getElementById('bottomText');
const fontSize = document.getElementById('fontSize');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();

imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

img.onload = function () {
    // We keep the canvas at 600x600, or you can set it 
    // to match the image's aspect ratio. Let's keep 600x600 for now.
    canvas.width = 600;
    canvas.height = 600;
    drawMeme();
};

function drawMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img.src) {
        // Calculate scaling to fit the image inside the canvas (Aspect Ratio)
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio); // Use "Math.max" for 'cover' effect
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

    // --- Text Styling ---
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    ctx.font = fontSize.value + "px Impact";

    // Top Text
    ctx.textBaseline = "top"; 
    ctx.fillText(topText.value, canvas.width / 2, 20);
    ctx.strokeText(topText.value, canvas.width / 2, 20);

    // Bottom Text
    ctx.textBaseline = "bottom";
    ctx.fillText(bottomText.value, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText.value, canvas.width / 2, canvas.height - 20);
}

topText.addEventListener("input", drawMeme);
bottomText.addEventListener("input", drawMeme);
fontSize.addEventListener("input", drawMeme);


function downloadMeme() {
    const link = document.createElement("a");
    link.download = "meme-" + Date.now() + ".png";
    link.href = canvas.toDataURL();
    link.click();
}