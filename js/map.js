import { formActivation } from './user-form.js';
import { offersList } from './utils.js';
const L = window.L;
//prettier-ignore
import {
  similarListFragment,
  mapCanvas,
  generateOffer
} from './generate-simmilar-elements.js';

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

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

//prettier-ignore

const mainMarker = L.marker(
  {
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

map.on('move', function () {
  mainMarker.setLatLng(map.getCenter());
});

mainMarker.on('move', function (e) {
  const position = mainMarker.getLatLng(e);
  let lat = Number(position['lat']).toFixed(5);
  let lng = Number(position['lng']).toFixed(5);
  address.value = lat + ', ' + lng;
  address.setAttribute('readonly', 'true');
});

mainMarker.addTo(map);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});
//prettier-ignore
const setOffers = () => {
  for (let i = 0; i < offersList.length; i++) {
    const { x = marker.lat, y = marker.lng } = offersList[i].location;
    const marker = L.marker(
      {
        lat: x.toFixed(5),
        lng: y.toFixed(5),
      },
      {
        icon: pinIcon,
      },
    ).bindPopup(mapCanvas.appendChild(similarListFragment));
    marker.addTo(map);
    marker.on('click', function () {
      generateOffer(i);
    })
  }
};

setOffers();
