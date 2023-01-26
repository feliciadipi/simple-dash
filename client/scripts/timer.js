class Timer {
  constructor(display) {
    this.display = display;
    this.timestamp = undefined;
  }

  start(duration) {
  
    let min = duration-1;
    let sec = 59;
    let timer = setInterval(() => {
      if (sec > 9) {
        this.display.innerText = min+':'+sec;
      } else {
        this.display.innerText = min+':0'+sec;
      }
      --sec;
      if (sec <= 0) {
        if (min <= 0) {
          clearInterval(timer);
          this.display.innerText = '0:00';
        } else {
          sec = 59;
          --min;
        }
      }
    }, 1000);
  }

  pause() {

  }

  resume() {

  }
}

function renderInput(element) {
  element.innerHTML = '';
  
}

function renderCountdown(element, duration) {
  element.innerHTML = '';
  
  // div: displays remaining time (mm:ss)
  const timer = document.createElement('div');
  timer.id = 'timer';
  timer.classList.add('mt-5');
  timer.innerText = duration+':00';

  const t = new Timer(timer);

  // div: container for controls/buttons
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

  });

  // pause button
  const pauseButton = document.createElement('a');
  playButton.id = 'pause-btn';
  playButton.classList.add('btn', 'mx-1');
  playButton.href = '#';
  playButton.innerText = '⏸';
  controls.appendChild(pauseButton);

  pauseButton.addEventListener('click', () => {

  });

  // reset button
  const resetButton = document.createElement('a');
  resetButton.id = 'reset-btn'; 
  resetButton.classList.add('btn', 'mx-1');
  resetButton.href = '#';
  resetButton.innerText = '↺';
  controls.appendChild(resetButton);

  resetButton.addEventListener('click', () => {

  });

  // append time and controls to document
  element.appendChild(timer);
  element.appendChild(controls);

  // start the timer
  t.start(duration);
}

function renderTimer(element) {
  element.innerHTML = '';

}

export default renderTimer;