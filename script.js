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
    rwd.classList.remove("active");
  fwd.classList.remove("active");
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
  
  if(media.paused){
    playBtn.setAttribute("data-icon","u");
    media.play();
  }else{
    playBtn.setAttribute("data-icon", "P");
    media.pause();
  }
}

function stopMedia(){
  rwd.classList.remove("active");
  fwd.classList.remove("active");
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
  media.pause();
  media.currentTime=0;
  playBtn.setAttribute("data-icon", "P");
}
let intervalFwd;
let intervalRwd;

function windBackward(){
  if(media.currentTime<3){
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    stopMedia();
  }else{
    media.currentTime=-3;
  }
}

function windForward(){
  if(media.currentTime>=media.duration-3){
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    stopMedia();
  }else{
    media.currentTime+=3;
  }
}
function mediaForward(){
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if(fwd.classList.contains("active")){
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  }else{
    fwd.classList.add("active");
    media.pause();
    intervalFwd=setInterval(windForward, 200)
  }
}

function mediaBackward(){
  clearInterval(intervalFwd);
  fwd.classList.remove("active");

  if(rwd.classList.contains("active")){
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    media.play();
  }else{
    rwd.classList.add("active");
    media.pause();
    intervalRwd=setInterval(windBackward,200)
  }
}


// playing and pausing video.
playBtn.addEventListener("click",playPauseEventHandler);

// stop button and resetting video.
stopBtn.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);
media.addEventListener("timeupdate", setTime);
// add event listener to the rwd and fwd buttons.
rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);

function setTime(){
  const minutes=Math.floor(media.currentTime/60);
  const seconds=Math.floor(media.currentTime-minutes*60);

  const minuteValue=minutes.toString().padStart(2,'0');
  const secondValue=seconds.toString().padStart(2,"0");

  const mediaTime=`${minuteValue}:${secondValue}`;
  timer.textContent=mediaTime;

  const barLength=timeWrapper.clientWidth*(media.currentTime/media.duration);
  timerBar.style.width=`${barLength}px`;
}
