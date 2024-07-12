const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "Bleach-1",
    displayName: "Shinji Hirako Theme",
    artist: "ProdByAZYN",
  },
  {
    name: "Bleach-2",
    displayName: "Ichigo Kurosaki Theme",
    artist: "Hazel Fernandes",
  },
  {
    name: "DBS",
    displayName: "Goku Ultra Instinct",
    artist: "Geek Music",
  },
  {
    name: "Mashle",
    displayName: "Bling-Bang-Bang-Born",
    artist: "Creepy Nuts",
  },
  {
    name: "Mob",
    displayName: "Explosion of Mob's Feelings",
    artist: "Gabriele Motta",
  },
  {
    name: "One-Piece",
    displayName: "Drums Of Libretion",
    artist: "Pandora Heaven",
  },
];
// Check if Playing
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or pause event listener

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// on Load - select first song
loadSong(songs[songIndex]);

// update Progress bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}
// event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
