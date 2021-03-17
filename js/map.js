import { formActivation } from './user-form.js';
import { getMapData } from './api.js';
import { QUANTITY } from './const.js';

//prettier-ignore
import {
  similarListFragment,
  mapCanvas,
  generateOffer
} from './generate-simmilar-elements.js';
import { showAlert } from './utils.js';

const L = window.L;
const CENTER_LAT = 35.68251;
const CENTER_LNG = 139.75121;
const address = document.querySelector('#address');

const setDefaultAddress = () => {
  return (address.value = CENTER_LAT.toFixed(5) + ', ' + CENTER_LNG.toFixed(5));
};

//prettier-ignore
const map = L.map('map-canvas')
  .on('load', () => {
    formActivation();
    setDefaultAddress();
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
  const lat = Number(position['lat']).toFixed(5);
  const lng = Number(position['lng']).toFixed(5);
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

const setOffers = (offersList) => {
  for (let i = 0; i < offersList.length; i++) {
    const { lat, lng } = offersList[i].location;
    const marker = L.marker(
      {
        lat: lat.toFixed(5),
        lng: lng.toFixed(5),
      },
      {
        icon: pinIcon,
      },
    ).bindPopup(mapCanvas.appendChild(similarListFragment), {
      keepInView: true,
    });
    marker.addTo(map);
    marker.on('click', function () {
      generateOffer(i, offersList);
    });
  }
};

getMapData((adds) => {
  setOffers(adds.slice(0, QUANTITY));
}, showAlert('Не удалось получить информацию об обьявлениях с сервера. Попробуйте позже'));

export { setOffers, setDefaultAddress };
