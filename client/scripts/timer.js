import state from "./state.js";
/*---------- Timer Class ----------*/
class Timer {
  constructor(element, min, sec) {

    const display = element;
    const time = {min: min, sec: sec};
    console.log(time);
    let paused = true;
    let interval = undefined;

    const countdown = () => {
      --time.sec;
      if (time.sec <= 0) {
        if (time.min <= 0) {
          clearInterval(interval);
          display.innerText = '0:00';
          window.alert("Beep beep!")
          if (state.sound) {
            let s= new Audio(); //todo find a sound
            s.play();
          }
        } else {
          time.sec = 59;
          --time.min;
        }
      } 
      if (time.sec > 9) {
        display.innerText = time.min+':'+time.sec;
      } else {
        display.innerText = time.min+':0'+time.sec;
      }
    };

    this.start = function() {
      if (paused) {
        interval = setInterval(countdown, 1000);
        paused = false;
      }
    }

    this.pause = function() {
      if (!paused) {
        clearInterval(interval);
        interval = undefined;
        paused = true;
      }
    }
  }
}

/*---------- Input View ----------*/

function renderInput(element) {
  element.innerHTML = '';

  // container = flex
  // row 1 = button group (disable active button)
  // row 2 = time
  // row 3 = start button
  const container = document.createElement('div');
  container.classList.add('d-inline-flex', 'card', 'w-50', 'position-absolute', 'translate-middle');
  const r1 = document.createElement('div');
  r1.classList.add('p-3', 'btn-group');
  const r2 = document.createElement('div');
  r2.classList.add('d-inline-flex', 'p-3');
  const r3 = document.createElement('div');
  r3.classList.add('p-3');

  const pomo = document.createElement('div');
  pomo.classList.add('btn', 'disabled');
  pomo.innerText = 'pomodoro';
  const short = document.createElement('div');
  short.classList.add('btn');
  short.innerText = 'short break';
  const long = document.createElement('div');
  long.classList.add('btn');
  long.innerText = 'long break';
  let actv = pomo;

  pomo.addEventListener('click', () => {
    pomo.classList.add('disabled');
    actv.classList.remove('disabled');
    actv = pomo;
    time.placeholder = '20:00';
  });

  short.addEventListener('click', () => {
    short.classList.add('disabled');
    actv.classList.remove('disabled');
    actv = short;
    time.placeholder = '5:00';
  });

  long.addEventListener('click', () => {
    long.classList.add('disabled');
    actv.classList.remove('disabled');
    actv = long;
    time.placeholder = '10:00';
  });

  r1.append(pomo, short, long);

  const time = document.createElement('input');
  time.classList.add('card', 'w-50','position-relative', 'start-50', 'translate-middle-x');
  time.style.height = '100px';
  time.style.borderWidth = '0px';
  time.style.fontSize = '84px';
  time.style.textAlign = 'center';
  time.placeholder = '20:00';
  r2.append(time);

  const startBtn = document.createElement('button');
  startBtn.classList.add('btn');
  startBtn.innerText = 'start';
  startBtn.addEventListener('click', () => {
    let dur = time.value ? time.value : time.placeholder;
    console.log(dur);
    renderCountdown(element, dur);
  });
  r3.append(startBtn);

  container.append(r1, r2, r3);
  element.append(container);
}

/*---------- Countdown View ----------*/

function renderCountdown(element, duration) {
  element.innerHTML = '';
  
  // timer container
  const timer = document.createElement('div');
  timer.id = 'timer';
  timer.classList.add('mt-5');
  let dur = duration.split(':');
  let min = dur[0] ? parseInt(dur[0]) : 0;
  let sec = dur[1] ? parseInt(dur[1]) : 0;
  timer.innerText = min + ':' + (sec > 9 ? sec : '00');

  // timer object
  const t = new Timer(timer, min, sec);

  // controls container
  const controls = document.createElement('div');
  controls.id = 'timer-controls';
  controls.classList.add('d-inline-flex', 'flex-row', 'justify-content-center', 'mb-3');

  // play button
  const playButton = document.createElement('a');
  playButton.id = 'play-btn';
  playButton.classList.add('btn', 'mx-1');
  playButton.href = '#';
  playButton.innerText = '▶';
  controls.appendChild(playButton);
  playButton.addEventListener('click', () => {
    t.start();
  });

  // pause button
  const pauseButton = document.createElement('a');
  pauseButton.id = 'pause-btn';
  pauseButton.classList.add('btn', 'mx-1');
  pauseButton.href = '#';
  pauseButton.innerHTML = 'I I';
  controls.appendChild(pauseButton);
  pauseButton.addEventListener('click', () => {
    t.pause();
  });

  // reset button
  const resetButton = document.createElement('a');
  resetButton.id = 'reset-btn'; 
  resetButton.classList.add('btn', 'mx-1');
  resetButton.href = '#';
  resetButton.innerText = '↺';
  controls.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    t.pause();
    renderInput(element);
  });

  // DOM surgery
  element.append(timer, controls);
  if (duration) {
    t.start();
  } else {
    timer.innerText = '00:00';
  }
}

/*---------- Export Function ----------*/

function renderTimer(element) {
  element.innerHTML = '';
  renderInput(element);
}

export default renderTimer;