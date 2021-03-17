import { setOffers } from './map.js';
import { QUANTITY } from './const.js';

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((adds) => {
    setOffers(adds.slice(0, QUANTITY));
  });
