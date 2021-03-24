const propertyType = document.querySelector('#housing-type');
const propertyPrice = document.querySelector('#housing-price');
const propertyRooms = document.querySelector('#housing-rooms');
const propertyCapacity = document.querySelector('#housing-guests');

const HIGH_PRICE_VALUE = 50000;
const MIDDLE_PRICE_VALUE = 10000;
const RERENDER_DELAY = 500;

const propertyTypeFilter = (adds) => {
  if (propertyType.value === 'any') {
    return adds;
  } else {
    const filtered = adds.filter((add) => {
      const { offer } = add;
      return offer.type === propertyType.value;
    });
    return filtered;
  }
};

//prettier-ignore

const propertyPriceFilter = (adds) => {
  const filtered = adds.filter((add) => {
    const { offer } = add;
    return  propertyPrice.value === propertyPrice[0].value ||
      propertyPrice.value === propertyPrice[1].value &&
      offer.price > MIDDLE_PRICE_VALUE &&
      offer.price <= HIGH_PRICE_VALUE ||
      propertyPrice.value === propertyPrice[2].value &&
      offer.price <= MIDDLE_PRICE_VALUE ||
      propertyPrice.value === propertyPrice[3].value &&
      offer.price >= HIGH_PRICE_VALUE
  });
  return filtered;
};

export { propertyType, propertyTypeFilter, propertyPriceFilter };
