import { getRandomNumber } from './random-number.js';
import { getRandomArrayItem } from './random-array-item.js';

const QUANTITY = 10;
const MIN_GUESTS = 1;
const MAX_GUESTS = 3;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const LINK = 'img/avatars/user0';
const Y_MIN = 139.7;
const Y_MAX = 139.8;
const X_MIN = 35.65;
const X_MAX = 35.7;
const TYPES_OF_RENT = ['palace', 'flat', 'house', 'bungalo'];
const ROOMS_QUANTITY = [1, 2, 3, 100];
const CHECK_HOURS = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const offersList = [];

const getOfferInitialData = function () {
  return {
    author: {
      avatar: `${LINK}${getRandomNumber(1, 8, 0)}.png`,
    },

    offer: {
      title: 'Great apartment without toilet. Pack of diapers for free',
      address: `${X_MIN}, ${Y_MIN}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayItem(TYPES_OF_RENT),
      rooms: getRandomArrayItem(ROOMS_QUANTITY),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayItem(CHECK_HOURS),
      checkout: getRandomArrayItem(CHECK_HOURS),
      features: FEATURES_LIST,
      description: 'С моим знанием js о Токио только мечтать🤦‍♀️🤦‍♀️🤦‍♀️‍',
      photos: PHOTOS_LIST,
    },

    location: {
      x: getRandomNumber(X_MIN, X_MAX, 5),
      y: getRandomNumber(Y_MIN, Y_MAX, 5),
    },
  };
};

const generatePropertiesData = function () {
  for (let i = 0; i < QUANTITY; i++) {
    offersList.push(getOfferInitialData(i));
  }
};

generatePropertiesData();
