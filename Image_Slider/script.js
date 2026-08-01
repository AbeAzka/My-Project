const slides=document.querySelectorAll(".slide");
const dotsContainer=document.querySelector(".dots");

let index=0;

/* Membuat bentuk bullet untuk menu dibawah */
slides.forEach((slide,i)=>{
    const dot=document.createElement("div");
    dot.classList.add("dot");
    if(i==0) dot.classList.add("active");
    dot.addEventListener("click",()=>{
    index=i;
    showSlide(index);
    });
    dotsContainer.appendChild(dot);
});

const dots=document.querySelectorAll(".dot");

function showSlide(i){
    slides.forEach(slide=>slide.classList.remove("active"));
    dots.forEach(dot=>dot.classList.remove("active"));
    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

document.querySelector(".next").onclick=()=>{
    index++;
    if(index>=slides.length) index=0;
    showSlide(index);
}

document.querySelector(".prev").onclick=()=>{
    index--;
    if(index<0) index=slides.length-1;
    showSlide(index);
}

setInterval(()=>{
    index++;
    if(index>=slides.length) index=0;
    showSlide(index);
},5000);

document.addEventListener("keydown",(e)=>{
    if(e.key=="ArrowRight"){
        index++;
        if(index>=slides.length) index=0;
        showSlide(index);
    }

    if(e.key=="ArrowLeft"){
        index--;
        if(index<0) index=slides.length-1;
        showSlide(index);
    }

});