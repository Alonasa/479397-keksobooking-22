import { PROPERTY_TYPES_MIN_PRICES, MAX_PRICE } from './const.js';
const getAdvertiseForm = document.querySelector('.ad-form');
const getFiltersForm = document.querySelectorAll('.map__filter');
const getFeatures = document.querySelector('.map__features');
const adTitle = getAdvertiseForm.querySelector('#title');

const formDeactivation = () => {
  getAdvertiseForm.classList.add('ad-form--disabled');
  getFiltersForm.forEach((element) => element.setAttribute('disabled', ''));
  getFeatures.setAttribute('disabled', '');
};
formDeactivation();

const formActivation = () => {
  getAdvertiseForm.classList.remove('ad-form--disabled');
  getFiltersForm.forEach((element) => (element.disabled = false));
  getFeatures.disabled = false;
};

const getTypeRent = getAdvertiseForm.querySelector('#type');
const getPriceRent = getAdvertiseForm.querySelector('#price');
const getTime = getAdvertiseForm.querySelector('.ad-form__element--time');
const getTimeIn = getTime.querySelector('#timein');
const getTimeOut = getTime.querySelector('#timeout');

const typeRentValue = () => {
  const getMinPrice = PROPERTY_TYPES_MIN_PRICES[getTypeRent.value];
  getPriceRent.type = 'number';
  getPriceRent.min = getMinPrice;
  getPriceRent.max = MAX_PRICE;
  getPriceRent.value = getMinPrice;
};

getTypeRent.addEventListener('change', typeRentValue);

const timeSync = (time1, time2) => {
  time1.addEventListener('change', function () {
    time2.value = time1.value;
  });
};

timeSync(getTimeIn, getTimeOut);
timeSync(getTimeOut, getTimeIn);

adTitle.addEventListener('invalid', () => {
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity(
      'Заголовок должен состоять минимум из 30-ти символов'
    );
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Обязательное поле');
  } else {
    adTitle.setCustomValidity('');
  }
});

export { formActivation };
