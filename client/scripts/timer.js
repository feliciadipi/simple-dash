/*---------- Timer Class ----------*/

class Timer {
  constructor(element, duration) {

    const display = element;
    const time = {min: duration-1, sec: 59};
    let paused = true;
    let interval = undefined;

    const countdown = () => {
      if (time.sec > 9) {
        display.innerText = time.min+':'+time.sec;
      } else {
        display.innerText = time.min+':0'+time.sec;
      }
      --time.sec;
      if (time.sec <= 0) {
        if (time.min <= 0) {
          clearInterval(interval);
          display.innerText = '0:00';
        } else {
          time.sec = 59;
          --time.min;
        }
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

  let input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '20:00';
  input.classList.add('form-control', 'm-2');

  let btn = document.createElement('button');
  btn.classList.add('btn');
  btn.addEventListener('click', () => {
    let duration = input.value;
    renderCountdown(element, duration);
  });
}

/*---------- Countdown View ----------*/

function renderCountdown(element, duration) {
  element.innerHTML = '';
  
  // timer div: displays remaining time in (mm:ss) format
  const timer = document.createElement('div');
  timer.id = 'timer';
  timer.classList.add('mt-5');
  timer.innerText = duration+':00';

  // timer object: manages timer operations and countdown
  const t = new Timer(timer, duration);

  // constrols div: flex container for buttons
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

  // cancels the running timer and brings up menu again
  resetButton.addEventListener('click', () => {
    t.pause();
    renderInput(element);
  });

  // append divs to document, start timer
  element.appendChild(timer);
  element.appendChild(controls);
  t.start();
}

function renderTimer(element) {
  element.innerHTML = '';
  renderCountdown(element, 1);
}

export default renderTimer;