import './const.js';
import './utils.js';
import './data.js';
//prettier-ignore
import { generateOffer, mapCanvas, similarListFragment }
  from './generate-simmilar-elements.js';
import './form-user-input-matching.js';

generateOffer();
mapCanvas.appendChild(similarListFragment);
