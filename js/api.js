import { showAlert } from './utils.js';

//prettier-ignore
const getMapData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data/')
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() =>
      showAlert('Не удалось получить информацию об обьявлениях с сервера. Попробуйте позже'),
    );
};

const sendFormData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};
export { getMapData, sendFormData };
