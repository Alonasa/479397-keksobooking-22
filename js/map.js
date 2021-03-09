import { formActivation } from './user-form.js';
import { generateOffer } from './generate-simmilar-elements.js';

const CENTER_LAT = 35.4137;
const CENTER_LNG = 139.41502;
const address = document.querySelector('#address');

//prettier-ignore
const map = L.map('map-canvas')
  .on('load', () => {
    formActivation();
    address.value = CENTER_LAT.toFixed(5) + ', ' + CENTER_LNG.toFixed(5);
  })
  .setView(
    {
      lat: CENTER_LAT,
      lng: CENTER_LNG,
    },
    10,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const pinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

//prettier-ignore

const marker = L.marker(
  {
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  {
    draggable: true,
    icon: pinIcon,
  },
);

map.on('move', function () {
  marker.setLatLng(map.getCenter());
});

marker.on('move', function (e) {
  const position = marker.getLatLng(e);
  let lat = Number(position['lat']).toFixed(5);
  let lng = Number(position['lng']).toFixed(5);
  address.value = lat + ', ' + lng;
  address.setAttribute('readonly', 'true');
});

marker.addTo(map);
