const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");
const speed = document.getElementById('speed');
const addBtn = document.getElementById("Btn1");
const firstBtn = document.getElementById("Btn2");
const resetBtn = document.getElementById("Btn3");
const box = document.querySelector(".box");
const addSub = document.querySelector(".btn")
// Music
const songs = [
  {
    path:
      "media/borjAj.mp3",
    displayName: "Borje Aj",
    artist: "Shahrokh",
    cover:
      "images/1.png",
  },
  {
    path: "media/Injaneb.mp3",
    displayName: "Injaneb",
    artist: "Mohammad Reza Shayea",
    cover: "images/3.jpg",
  },
  {
    path:
      "media/khoda.mp3",
    displayName: "Khoda",
    artist: "Putak",
    cover:
      "images/2.jpg",
  },
];



// Check if Playing
let isPlaying = false;

// Play
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

// Play or Pause Event Listener
playBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

speed.addEventListener('click',function(){
  if (music.playbackRate == 1){
  music.playbackRate = 1.5;
  speed.innerHTML = "1.5x"
  }
  else if(music.playbackRate == 1.5){
    music.playbackRate = 2;
    speed.innerHTML = "2x"

  }
  else if(music.playbackRate == 2){
    music.playbackRate = 3;
    speed.innerHTML = "3x"

  }
  else{
      music.playbackRate = 1;
      speed.innerHTML = "1x"

  }
  console.log(music.playbackRate);
  
})
// Update DOM
function loadSong(song) {
  console.log(song);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length-1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);


addBtn.addEventListener("click",function(){
  box.setAttribute("class","boxNext")
  
})



addSub.addEventListener("click", function(){
  box.setAttribute("class","box")
  let MusicName = document.getElementById("inputName").value;
  let MusicUrl = document.getElementById("inputUrl").value;
  if(MusicName.length == 0 || MusicUrl.length == 0){
    alert("Please Fill All Of Box!");
    return false;
  }
  songs[songs.length]={
    path: MusicUrl,
      displayName: MusicName,
      artist: "Unknown",
      cover: "images/4.gif"
  }
  pauseSong()
  songIndex = songs.length-1
  loadSong(songs[songIndex]);
  playSong();
  console.log(songs);
})

firstBtn.addEventListener("click",function () {
  pauseSong()
  songIndex = 0
  loadSong(songs[songIndex]);
  playSong();
})
function loadpage(){
  playSong()
}

resetBtn.addEventListener("click", function(){
  location.reload()
})
