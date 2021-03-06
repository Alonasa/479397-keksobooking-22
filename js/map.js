import { X_MIN, Y_MIN } from './const.js';
import { formActivation } from './user-form.js';

//prettier-ignore
const map = L.map('map-canvas')
  .on('load', () => {
    formActivation();
  })
  .setView(
    {
      lat: X_MIN,
      lng: Y_MIN,
    },
    10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
