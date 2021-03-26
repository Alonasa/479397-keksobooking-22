/* global L:readonly */
import { formActivation, filterActivation } from './user-form.js';
import { getMapData } from './api.js';
import { QUANTITY } from './const.js';
import { onFiltersChange } from './filters.js';

import { generateOffer } from './generate-simmilar-elements.js';

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

const markers = [];

const createPopup = (offer) => {
  const popupItem = generateOffer(offer);
  return popupItem;
};
//prettier-ignore

const setOffers = (offersList) => {
  offersList.slice(0, QUANTITY).forEach((offer) => {
    const { lat, lng } = offer.location;
    const marker = L.marker(
      {
        lat: lat.toFixed(5),
        lng: lng.toFixed(5),
      },
      {
        icon: pinIcon,
      },
    )
    marker
      .addTo(map)
      .bindPopup(() => createPopup(offer), {
        keepInView: true,
      });
    markers.push(marker);
  });
};

const removeAddsMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
  markers.length = 0;
};

//prettier-ignore
getMapData((adds) => {
  setOffers(adds);
  filterActivation();
  onFiltersChange(adds);
});

export { setOffers, setDefaultAddress, removeAddsMarkers };
