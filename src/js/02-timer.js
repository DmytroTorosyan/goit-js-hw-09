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

function checkDateValidity() {

  refs.start.disabled = !selectedDate || (selectedDate <= new Date());
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);

  
    checkDateValidity();

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      return;
    }   

    refs.start.addEventListener('click', () => {
      intervalId = setInterval(() => {
        const differenceInTime = selectedDates[0] - new Date();

        if (differenceInTime < 1000) {
          clearInterval(intervalId);
        }
        const result = convertMs(differenceInTime);
        viewOfTimer(result);
      }, 1000);
    });
  },
};

flatpickr('#datetime-picker', options);

setInterval(checkDateValidity, 500);

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