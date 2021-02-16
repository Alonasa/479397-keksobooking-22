import { getRandomNumber } from './utils.js';
import { getRandomArrayItem } from './utils.js';
//prettier-ignore
import {
  MIN_GUESTS,
  MAX_GUESTS,
  MIN_PRICE,
  MAX_PRICE,
  LINK,
  Y_MIN,
  Y_MAX,
  X_MIN,
  X_MAX,
  TYPES_OF_RENT,
  ROOMS_QUANTITY,
  CHECK_HOURS,
  FEATURES_LIST,
  PHOTOS_LIST
} from './const.js'

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

export { getOfferInitialData };
