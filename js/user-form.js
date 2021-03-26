import { PROPERTY_TYPES_MIN_PRICES, MAX_PRICE } from './const.js';
import { isEscEvt } from './utils.js';
import { sendFormData } from './api.js';
import { setDefaultAddress } from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const advertiseForm = document.querySelector('.ad-form');
const filtersForm = document.querySelectorAll('.map__filter');
const advertiseFeatures = document.querySelector('.map__features');
const adTitle = advertiseForm.querySelector('#title');
const typeRent = advertiseForm.querySelector('#type');
const priceRent = advertiseForm.querySelector('#price');
const time = advertiseForm.querySelector('.ad-form__element--time');
const timeIn = time.querySelector('#timein');
const timeOut = time.querySelector('#timeout');
const roomsQuantity = document.querySelector('#room_number');
const guestsQuantity = document.querySelector('#capacity');
const resetButton = document.querySelector('.ad-form__reset');

const formDeactivation = () => {
  advertiseForm.classList.add('ad-form--disabled');
  filtersForm.forEach((element) => element.setAttribute('disabled', ''));
  advertiseFeatures.setAttribute('disabled', '');
};
formDeactivation();

const formActivation = () => {
  advertiseForm.classList.remove('ad-form--disabled');
};

const filterActivation = () => {
  filtersForm.forEach((element) => element.removeAttribute('disabled'));
  advertiseFeatures.disabled = false;
};

const typeRentValue = () => {
  const minPriceValue = PROPERTY_TYPES_MIN_PRICES[typeRent.value];
  priceRent.type = 'number';
  priceRent.min = minPriceValue;
  priceRent.max = MAX_PRICE;
  priceRent.placeholder = minPriceValue;
};

typeRentValue();

typeRent.addEventListener('change', typeRentValue);

const timeSync = (time1, time2) => {
  time1.addEventListener('change', function () {
    time2.value = time1.value;
  });
};

timeSync(timeIn, timeOut);
timeSync(timeOut, timeIn);

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
  if (
    (roomsQuantity.value === '100' && guestsQuantity.value !== '0') ||
    (guestsQuantity.value === '0' && roomsQuantity.value !== '100')
  ) {
    //prettier-ignore
    roomsQuantity.setCustomValidity(
      'Вариант размещения не предназначен для гостей. Проверьте поле количество мест',
    );
  } else if (guestsQuantity.value > roomsQuantity.value) {
    //prettier-ignore
    roomsQuantity.setCustomValidity(
      'Количество гостей не должно превышать количество комнат.',
    ),
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
roomCapacity();

const onMessageEscKeydown = (evt) => {
  if (isEscEvt) {
    evt.preventDefault();
    document.querySelector('main').lastChild.remove();
    document.removeEventListener('click', onMessageClick, { once: true });
  }
};

const onMessageClick = () => {
  document.querySelector('main').lastChild.remove();
  document.removeEventListener('keydown', onMessageEscKeydown, { once: true });
};

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content;
  const successMessage = successTemplate
    .querySelector('.success')
    .cloneNode(true);
  document.querySelector('main').appendChild(successMessage);
  document.addEventListener('keydown', onMessageEscKeydown, { once: true });
  document.addEventListener('click', onMessageClick, { once: true });
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorMessage = errorTemplate.querySelector('.error').cloneNode(true);
  document.querySelector('main').appendChild(errorMessage);
  document.addEventListener('keydown', onMessageEscKeydown, { once: true });
  document.addEventListener('click', onMessageClick, { once: true });
};

const resetFormData = () => {
  advertiseForm.reset();
  typeRentValue();
  setDefaultAddress();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormData();
});

advertiseForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //prettier-ignore
  sendFormData(
    () => {
      showSuccessMessage();
      resetFormData();
    },
    () => showErrorMessage(),
    new FormData(evt.target),
  );
});

export { formActivation, filterActivation };
