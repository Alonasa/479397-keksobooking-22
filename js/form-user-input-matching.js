import { PROPERTY_TYPES_MIN_PRICES, MAX_PRICE } from './const.js';
const getAdvertiseForm = document.querySelector('.ad-form');

const getTypeRent = getAdvertiseForm.querySelector('#type');
let getPriceRent = getAdvertiseForm.querySelector('#price');

const typeRentValue = function () {
  const getMinPrice = PROPERTY_TYPES_MIN_PRICES[getTypeRent.value];
  getPriceRent.type = 'number';
  getPriceRent.min = getMinPrice;
  getPriceRent.max = MAX_PRICE;
  getPriceRent.value = getMinPrice;
};

getTypeRent.addEventListener('change', typeRentValue);

export { getTypeRent };
