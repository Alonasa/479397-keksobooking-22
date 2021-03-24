//prettier-ignore
const getMapData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data/')
    .then((response) => response.json())
    .then((adds) => {
      onSuccess(adds);
    })
    .catch(() =>
      onFail(),
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
