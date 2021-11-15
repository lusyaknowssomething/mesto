import { openPicture } from './utils.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    //копируем template-элемент с содержимым
    const newCard = document.querySelector(this._cardSelector).content.cloneNode(true);

    return newCard;
  };

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name; //находим заголовок и вставляем имя из массива

    this._elementPicture = this._element.querySelector('.element__picture');

    this._elementPicture.src = this._link; //находим src картинки и вставляем ссылку из массива
    this._elementPicture.alt = this._name; //находим alt картинки и вставляем имя из массива

    this._setEventListeners();

    return this._element;
  };

  _handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  };

  _deleteCard(evt) {
    evt.target.closest('.element').remove();
  };

  _setEventListeners() {
    // лайк на карточку
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLike(evt);
    });

    //слушатель кнопки удаления карточек
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
      this._deleteCard(evt)
    });

    this._element.querySelector('.element__pic-container').addEventListener('click', openPicture);
  };
};
