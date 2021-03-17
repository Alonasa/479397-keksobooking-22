const getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomNumber = function (min, max, decimalPoints) {
  const findRandom = Math.random() * (max - min) + min;
  return +findRandom.toFixed(decimalPoints);
};

//prettier-ignore
export {
  getRandomArrayItem,
  getRandomNumber
};
