import { offersList } from './utils.js';
import { PROPERTY_TYPES } from './const.js';

const similarCardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');
const similarListFragment = document.createDocumentFragment();

const createFeature = function (feature) {
  const fragment = document.createDocumentFragment();
  const listItem = document.createElement('li');
  listItem.classList.add('popup__feature');
  listItem.classList.add(`popup__feature--${feature}`);
  fragment.appendChild(listItem);
  return fragment;
};

const createPhoto = function (photo) {
  const fragment = document.createDocumentFragment();
  const listItem = document.createElement('img');
  listItem.classList.add('popup__photo');
  listItem.src = photo;
  listItem.width = 45;
  listItem.height = 40;
  listItem.alt = 'Фотография жилья';
  fragment.appendChild(listItem);
  return fragment;
};

const oldElementRemove = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

//prettier-ignore
const generateOffer = function () {
  const offerElement = similarCardTemplate.cloneNode(true);
  offerElement.classList.add('map__card');
  offerElement.querySelector('.popup__title')
    .textContent = offersList[0].offer.title;
  offerElement.querySelector('.popup__text--address')
    .textContent = offersList[0].offer.address;
  offerElement.querySelector('.popup__text--price')
    .textContent = `${offersList[0].offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type')
    .textContent = PROPERTY_TYPES[offersList[0].offer.type];
  offerElement.querySelector('.popup__text--capacity')
    .textContent = `${offersList[0].offer.rooms} комнаты для
    ${offersList[0].offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time')
    .textContent = `Заезд после ${offersList[0].offer.checkin},
    выезд до ${offersList[0].offer.checkout}`;
  const features = offerElement.querySelector('.popup__features');
  oldElementRemove(features);
  offersList[0].offer.features.forEach((feature) => {
    const currentFeature = createFeature(feature);
    features.appendChild(currentFeature);
  });
  offerElement.querySelector('.popup__description')
    .textContent = offersList[0].offer.description;
  const photos = offerElement.querySelector('.popup__photos')
  oldElementRemove(photos);
  offersList[0].offer.photos.forEach((photo) => {
    const currentPhoto = createPhoto(photo);
    photos.appendChild(currentPhoto);
  });
  offerElement.querySelector('.popup__avatar')
    .src = offersList[0].author.avatar;
  similarListFragment.appendChild(offerElement);
  return offerElement;
};

export { generateOffer, mapCanvas, similarListFragment };
