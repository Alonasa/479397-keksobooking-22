import { PROPERTY_TYPES_MIN_PRICES, MAX_PRICE } from './const.js';
const getAdvertiseForm = document.querySelector('.ad-form');
const getFiltersForm = document.querySelectorAll('.map__filter');
const getFeatures = document.querySelector('.map__features');
const adTitle = getAdvertiseForm.querySelector('#title');
const getTypeRent = getAdvertiseForm.querySelector('#type');
const getPriceRent = getAdvertiseForm.querySelector('#price');
const getTime = getAdvertiseForm.querySelector('.ad-form__element--time');
const getTimeIn = getTime.querySelector('#timein');
const getTimeOut = getTime.querySelector('#timeout');
const roomsQuantity = document.querySelector('#room_number');
const guestsQuantity = document.querySelector('#capacity');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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

const typeRentValue = () => {
  const getMinPrice = PROPERTY_TYPES_MIN_PRICES[getTypeRent.value];
  getPriceRent.type = 'number';
  getPriceRent.min = getMinPrice;
  getPriceRent.max = MAX_PRICE;
  getPriceRent.value = getMinPrice;
};

typeRentValue();

getTypeRent.addEventListener('change', typeRentValue);

const timeSync = (time1, time2) => {
  time1.addEventListener('change', function () {
    time2.value = time1.value;
  });
};

timeSync(getTimeIn, getTimeOut);
timeSync(getTimeOut, getTimeIn);

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    //prettier-ignore
    adTitle.setCustomValidity(
      'Минимальная длина поля ' + MIN_TITLE_LENGTH + ' символов. Добавьте ещё ' +
        (MIN_TITLE_LENGTH - valueLength) +
        ' симв.',
    );
  } else if (valueLength > MAX_TITLE_LENGTH) {
    //prettier-ignore

    adTitle.setCustomValidity(
      'Максимальная длина поля ' + MAX_TITLE_LENGTH + ' Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.',
    );
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

const roomCapacity = () => {
  if (roomsQuantity.value === '100' && guestsQuantity.value != '0') {
    //prettier-ignore

    roomsQuantity.setCustomValidity(
      'Вариант размещения не предназначен для гостей. Проверьте поле количество мест',
    );
  } else if (guestsQuantity.value > roomsQuantity.value) {
    //prettier-ignore
    roomsQuantity.setCustomValidity(
      'Количество гостей не должно превышать количество комнат.',
    );
    //prettier-ignore
    guestsQuantity.setCustomValidity(
      'Количество гостей не должно превышать количество комнат.',
    );
  } else {
    roomsQuantity.setCustomValidity('');
    guestsQuantity.setCustomValidity('');
  }
  roomsQuantity.reportValidity();
  guestsQuantity.reportValidity();
};
roomsQuantity.addEventListener('change', roomCapacity);
guestsQuantity.addEventListener('change', roomCapacity);

export { formActivation };
