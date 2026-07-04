const quotes = [
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        quote: "Your future is created by what you do today, not tomorrow.",
        author: "Robert Kiyosaki"
    },
    {
        quote: "Dream big and dare to fail.",
        author: "Norman Vaughan"
    },
    {
        quote: "Happiness depends upon ourselves.",
        author: "Aristotle"
    },
    {
        quote: "Everything you can imagine is real.",
        author: "Pablo Picasso"
    },
    {
        quote: "Do one thing every day that scares you.",
        author: "Eleanor Roosevelt"
    },
    {
        quote: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        quote: "Small steps every day lead to big results.",
        author: "Unknown"
    },
    {
        quote: "Stay positive, work hard, make it happen.",
        author: "Unknown"
    },
    {
        quote: "Never give up because great things take time.",
        author: "Unknown"
    },
    {
        quote: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde"
    },
    {
        quote: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius"
    },
    {
        quote: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
    },
    {
        quote: "Opportunities don't happen. You create them.",
        author: "Chris Grosser"
    },
    {
        quote: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        quote: "Every day is a new beginning. Take a deep breath and start again.",
        author: "Unknown"
    },
    {
        quote: "Difficult roads often lead to beautiful destinations.",
        author: "Unknown"
    }
];

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const dateTimeElement = document.getElementById("datetime");

let lastIndex = -1;

function generateQuote() {

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;

    quoteElement.style.opacity = 0;
    authorElement.style.opacity = 0;

    setTimeout(() => {
        quoteElement.innerHTML = `"${quotes[randomIndex].quote}"`;
        authorElement.innerHTML = `— ${quotes[randomIndex].author}`;

        quoteElement.style.opacity = 1;
        authorElement.style.opacity = 1;
    }, 250);
}

function updateDateTime() {

    const now = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const date = now.toLocaleDateString("en-US", options);
    const time = now.toLocaleTimeString("en-US");

    dateTimeElement.innerHTML = `${date}<br>${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

function toggleMusic() {

    // if (!music.src || music.querySelector("source").src === "") {
    //     alert("Silakan isi file musik pada tag <source src='music.mp3'> terlebih dahulu.");
    //     return;
    // }

    if (isPlaying) {
        music.pause();
        musicBtn.innerHTML = "Music";
    } else {
        music.play();
        musicBtn.innerHTML = "Pause";
    }

    isPlaying = !isPlaying;
}

generateQuote();