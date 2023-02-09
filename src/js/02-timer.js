import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
refs.start.disabled = true;


let selectedDate;

function dateIsValid() {
  return selectedDate && (selectedDate - new Date() > 999);
}

function stopCountdown() {
  clearInterval(intervalId);
  intervalId = null;
  viewOfTimer(convertMs(0));
  updateButtonState();
}

refs.start.addEventListener('click', () => {
  if (!canStartCountdown()) return;

  intervalId = setInterval(() => {
    
    const differenceInTime = selectedDate - new Date();

    if (differenceInTime < 1000) {
      stopCountdown();
    }
    const result = convertMs(differenceInTime);
    viewOfTimer(result);
  }, 1000);

  updateButtonState();
});

function canStartCountdown() {
  return !intervalId && dateIsValid();
}

function updateButtonState() {
  refs.start.disabled = !canStartCountdown(); 
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);

    updateButtonState();
    
    if (!dateIsValid()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      stopCountdown();
    }
  },
};

flatpickr('#datetime-picker', options);



function viewOfTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}