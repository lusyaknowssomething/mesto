import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._fullSizePhoto = this._popup.querySelector('.popup__picture');
    this._photoName = this._popup.querySelector('.popup__name');

  }

  open(evt) {
    this._fullSizePhoto.src = evt.target.src;
    this._photoName.textContent = evt.target.alt;
    this._fullSizePhoto.alt = evt.target.alt;
    super.open();
  }
}
