import { QUANTITY } from './const.js';
import { removeAddsMarkers, setOffers } from './map.js';
import { debounce } from './utils.js';

const HIGH_PRICE_VALUE = 50000;
const MIDDLE_PRICE_VALUE = 10000;
const DEFAULT_ANY_VALUE = 'any';
const RENDER_DELAY = 500;

const propertyType = document.querySelector('#housing-type');
const propertyPrice = document.querySelector('#housing-price');
const propertyRooms = document.querySelector('#housing-rooms');
const propertyCapacity = document.querySelector('#housing-guests');
const formFilters = document.querySelector('.map__filters');

const makePropertyTypeFilter = (offer) => {
  return (
    propertyType.value === DEFAULT_ANY_VALUE ||
    offer.type === propertyType.value
  );
};

//prettier-ignore

const makePropertyPriceFilter = (offer) => {
  return  propertyPrice.value === propertyPrice[0].value ||
      propertyPrice.value === propertyPrice[1].value &&
      offer.price > MIDDLE_PRICE_VALUE &&
      offer.price <= HIGH_PRICE_VALUE ||
      propertyPrice.value === propertyPrice[2].value &&
      offer.price <= MIDDLE_PRICE_VALUE ||
      propertyPrice.value === propertyPrice[3].value &&
      offer.price >= HIGH_PRICE_VALUE
};

const makePropertyRoomsFilter = (offer) => {
  return (
    parseInt(propertyRooms.value) === offer.rooms ||
    propertyRooms.value === DEFAULT_ANY_VALUE
  );
};

const makePropertyCapacityFilter = (offer) => {
  return (
    propertyCapacity.value === DEFAULT_ANY_VALUE ||
    offer.guests === parseInt(propertyCapacity.value)
  );
};

//prettier-ignore
const makePropertyFeaturesFilter = (offer) => {
  const checkedFeatures = formFilters.querySelectorAll(
    '.map__checkbox:checked',
  );
  let i = 0;
  checkedFeatures.forEach((feature) => {
    if (offer.features.includes(feature.value)) {
      i++;
    }
  });
  return i === checkedFeatures.length;
};

//prettier-ignore

const onFiltersChange = (adds) => {
  formFilters.addEventListener(
    'change', debounce(()=> {
      removeAddsMarkers();
      const filteredAdds = [];
      for (let add of adds) {
        if (
          makePropertyTypeFilter(add.offer) &&
          makePropertyPriceFilter(add.offer) &&
          makePropertyRoomsFilter(add.offer) &&
          makePropertyCapacityFilter(add.offer) &&
          makePropertyFeaturesFilter(add.offer)
        ) {
          filteredAdds.push(add);
          if (filteredAdds.length >= QUANTITY) {
            break;
          }
        }
      }
      setOffers(filteredAdds);
    }, RENDER_DELAY))
};

export { onFiltersChange };
