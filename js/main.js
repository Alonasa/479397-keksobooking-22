let getRandomNumber = function (min, max, decimalPoints) {
  let findRandom = Math.random() * (max - min) + min;
  return +findRandom.toFixed(decimalPoints);
};

getRandomNumber(3, 7, 0);

/*
Нашли рандомное число
1. https://learn.javascript.ru/task/random-int-min-max


Число с заданым количеством символов после запятой + перевод его в численный формат
2.https://learn.javascript.ru/number#netochnye-vychisleniya
*/
