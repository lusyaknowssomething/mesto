import Popup from './Popup.js';
import { fullSizePhoto, photoName } from '../utils/constants.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    fullSizePhoto.src = evt.target.src;
    photoName.textContent = evt.target.alt;
    fullSizePhoto.alt = evt.target.alt;
    super.open();
  }
}
