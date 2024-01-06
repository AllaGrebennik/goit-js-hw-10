'use strict';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector("[data-start]");
const inputDate = document.querySelector("#datetime-picker");
const timerDays = document.querySelector("[data-days]");
const timerHours = document.querySelector("[data-hours]");
const timerMinutes = document.querySelector("[data-minutes]");
const timerSeconds = document.querySelector("[data-seconds]");

btnStart.disabled = true;
let userSelectedDate=null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();
        if (userSelectedDate < Date.now()) {
            iziToast.error({ position: 'topRight', title: "Error", message: "Please choose a date in the future!" });
            btnStart.disabled = true;
        }
        else {
            btnStart.disabled = false;
        }
    },
};

const selectedDate = flatpickr("#datetime-picker", options);
btnStart.addEventListener("click", runTimer);

function runTimer() {
    btnStart.disabled = true;
    inputDate.disabled = true;
    const intervalId = setInterval(() => {
        const intervalMs = userSelectedDate - Date.now();
        if (intervalMs >= 0)
        {
            const { days, hours, minutes, seconds } = convertMs(intervalMs);
            timerDays.textContent = addLeadingZero(days);
            timerHours.textContent = addLeadingZero(hours);
            timerMinutes.textContent = addLeadingZero(minutes);
            timerSeconds.textContent = addLeadingZero(seconds);
        }
        else
        {
            clearInterval(intervalId);
            iziToast.success({ position: 'topRight', title: "Success", message: "Timer Finished!" });
            inputDate.disabled = false;
        }
    }, 1000);
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value < 10 ? `${value}`.padStart(2, '0') : value;
}

