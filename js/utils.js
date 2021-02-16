import { QUANTITY, offersList } from './const.js';
import { getOfferInitialData } from './data.js';
const getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomNumber = function (min, max, decimalPoints) {
  const findRandom = Math.random() * (max - min) + min;
  return +findRandom.toFixed(decimalPoints);
};

const generatePropertiesData = function () {
  for (let i = 0; i < QUANTITY; i++) {
    offersList.push(getOfferInitialData(i));
  }
};

generatePropertiesData();

export { getRandomArrayItem };
export { getRandomNumber };
export { generatePropertiesData };
export { offersList };
