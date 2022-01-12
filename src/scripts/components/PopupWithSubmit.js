import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = this._popup.querySelector('.popup__submit')
  };

  _handleSubmit() {
    this._handleFormSubmit(this._card, this._id);
  };

  setEventListeners() {
    this._popup.querySelector('.popup__submit_type_submit').addEventListener('click', (evt) => {
      this._handleSubmit(evt);
  });

    super.setEventListeners();
  };

  open(card, id) {
    super.open();
    this._card = card;
    this._id = id;
  }

}
