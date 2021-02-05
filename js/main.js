'use strict';
const QUANTITY = 10;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const LINK = 'img/avatars/user0';
const Y_MIN = 139.70000;
const Y_MAX = 139.80000;
const X_MIN = 35.65000;
const X_MAX = 35.70000;
const TYPES_OF_RENT = [
  'palace',
  'flat',
  'house',
  'bungalo',
];
const CHECK_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];
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

const getRandomNumber = function (min, max, decimalPoints) {
  const findRandom = Math.random() * (max - min) + min;
  return +findRandom.toFixed(decimalPoints);
};

const getRandomArrayItem = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const offersList = [];

const getOfferInitialData = function () {
  return {
    author: {
      avatar: `${LINK}${getRandomNumber(1, 8, 0)}.png`,
    },

    offer: {
      title: 'Great apartment without toilet. Pack of diapers for free',
      address: `${X_MIN}, ${Y_MIN}`,
      price: getRandomNumber(1000, 100000),
      type: getRandomArrayItem(TYPES_OF_RENT),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(1, 3),
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
  }
}


const generatePropertiesData = function() {
  for(let i = 0; i < QUANTITY; i++) {
    offersList.push(getOfferInitialData(i));
  }
}

generatePropertiesData();





