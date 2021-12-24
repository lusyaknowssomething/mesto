export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  };

  close() {
    this._popup.classList.remove('popup_opened');
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });

  }

}
