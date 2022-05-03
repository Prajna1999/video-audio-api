const media=document.querySelector("video");

const playBtn=document.querySelector(".play");
const stopBtn=document.querySelector(".stop");
const rwd=document.querySelector(".rwd");
const fwd=document.querySelector(".fwd");
const controls=document.querySelector(".controls");
const timeWrapper=document.querySelector(".timer");
const timer=timeWrapper.querySelector("span");

// the timer slider.
const timerBar=timeWrapper.querySelector("div");

// make the menubar go away.
media.removeAttribute("controls");
controls.classList.add("show");

function playPauseEventHandler(){
  if(media.paused){
    playBtn.setAttribute("data-icon","u");
    media.play();
  }else{
    playBtn.setAttribute("data-icon", "P");
    media.pause();
  }
}

function stopMedia(){
  media.pause();
  media.currentTime=0;
  playBtn.setAttribute("data-icon", "P");
}

// playing and pausing video.
playBtn.addEventListener("click",playPauseEventHandler);

// stop button and resetting video.
stopBtn.addEventListener("click", stopMedia);
media.addEventListener("click", stopMedia);

