'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let isSuccess = true;

const form = document.querySelector(".form");
const inputFulfilled = document.querySelector('[value="fulfilled"]');

form.addEventListener('submit', e => {
    e.preventDefault();

    const delay = form.elements.delay.value;
    if (delay <= 0 ) {
        iziToast.warning({ position: 'topRight', message: "Invalid value delay" });
        return;
    };
   
    isSuccess = inputFulfilled.checked ? true : false;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(`Fulfilled promise in ${delay}ms`);
            }
            else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
        
    promise
        .then(value => iziToast.success({ position: 'topRight', title: "OK", message: value }))
        .catch(error => iziToast.error({ position: 'topRight', title: "Error", message: error }))
        .finally(() => iziToast.info({ position: 'topRight', title: "Informing", message: "Promise settled" })); 
});