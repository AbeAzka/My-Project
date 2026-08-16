const PAUSE_ICON = 'https://img.icons8.com/ios-filled/50/ffffff/pause--v1.png';
const PLAY_ICON = 'https://img.icons8.com/ios-filled/50/ffffff/play--v1.png';

function videoUrl(videoSrc, audioSrc, titleText, descText) {
    const video = document.getElementById('bg-video');
    const audio = document.getElementById('bg-audio');
    const title = document.getElementById('video-title');
    const desc = document.getElementById('video-desc');
    const playImg = document.getElementById('play-img');

    video.src = videoSrc;
    audio.src = audioSrc;

    if (titleText) title.textContent = titleText;
    if (descText) desc.textContent = descText;

    video.play();
    audio.play().catch(e => console.log("Autoplay audio diblokir sampai ada interaksi user:", e));

    playImg.src = PAUSE_ICON;
}

const playBtn = document.getElementById('play-btn');
const bgVideo = document.getElementById('bg-video');
const bgAudio = document.getElementById('bg-audio');
const playImg = document.getElementById('play-img');

playBtn.addEventListener('click', function() {
    if (bgVideo.paused) {
        bgVideo.play();
        bgAudio.play().catch(e => console.log("Audio play error:", e));
        playImg.src = PAUSE_ICON;
    } else {
        bgVideo.pause();
        bgAudio.pause();
        playImg.src = PLAY_ICON;
    }
});