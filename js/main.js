import './const.js';
import './utils.js';
import './data.js';
//prettier-ignore
import { generateOffer, mapCanvas, similarListFragment }
  from './generate-simmilar-elements.js';

generateOffer();
mapCanvas.appendChild(similarListFragment);
