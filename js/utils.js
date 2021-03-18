const ALERT_SHOW_TIME = 5000;

const getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomNumber = function (min, max, decimalPoints) {
  const findRandom = Math.random() * (max - min) + min;
  return +findRandom.toFixed(decimalPoints);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 20 + '%';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvt = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

//prettier-ignore
export {
  getRandomArrayItem,
  getRandomNumber,
  showAlert,
  isEscEvt
};
