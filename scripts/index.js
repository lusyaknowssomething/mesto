
import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { openPopup, closePopup } from './utils.js';
import { FormValidator } from './FormValidator.js';

//Находим попапы
const popups = document.querySelectorAll('.popup');

//Находим попап редактирования, кнопку редактирования и закрытия
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupEditBtn = document.querySelector('.profile__edit-button');

// Находим форму в DOM
const popupEditFormElement = popupEditProfile.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = popupEditFormElement.querySelector('.popup__input_profile_name');
const jobInput = popupEditFormElement.querySelector('.popup__input_profile_job');

// Находим title и subtitle в DOM (сюда вставляются значения из формы редактирования)
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements'); //находим контейнер для карточек

//добавление новых карточек
const newCardPopup = document.querySelector('.popup_type_new-card'); //находим попап создания карточки
const popupCardOpenBtn = document.querySelector('.profile__add-button'); //находим кнопку открытия формы для добавления карточек
const popupAddFormElement = newCardPopup.querySelector('.popup__form');

//находим value для описания и ссылки на картинку
const cardDescription = document.querySelector('.popup__input_element_description');
const cardLink = document.querySelector('.popup__input_element_link');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


function openEditProfile () {
  openPopup(popupEditProfile);
  validatorEditProfile.resetValidation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

}

// Обработчик «отправки» формы редактирования
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки
  profileTitle.textContent = nameInput.value; //вставляем значение из формы в title
  profileSubtitle.textContent = jobInput.value; //вставляем значение из формы в subtitle
  closePopup(popupEditProfile); //вызываем функцию редактирования попапа
};

const createCard = (data) => {
  const newCard =  new Card(data, '.element__template');
  const newCardElement = newCard.createCard()
  return newCardElement;
}

//функция добавления карточек
const addCard = (item) => {
  const card = createCard(item);
  cardsContainer.prepend(card);
}

//добавлем карточки из массива на страничку
initialCards.forEach((item) => {
  addCard(item);
});


// Обработчик «отправки» формы добавления карточки
function handlerNewCardSubmit(evt) {
  evt.preventDefault();
  const cardDescriptionValue = cardDescription.value;
  const cardLinkValue = cardLink.value;

  addCard({
    name: cardDescriptionValue,
    link: cardLinkValue,
  });

  closePopup(newCardPopup);
  evt.target.reset();
}

const validatorEditProfile = new FormValidator(validationConfig, popupEditFormElement);
const validatorAddCard = new FormValidator(validationConfig, popupAddFormElement);

const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
}

enableValidation();

//слушатель по кнопке редактирования
popupEditBtn.addEventListener('click', openEditProfile);

//слушатель по кнопке "сохранить" в попапе редактирования
popupEditFormElement.addEventListener('submit', handleProfileFormSubmit);

//слушатель по по кнопке открытия попапа добавления карточек
popupCardOpenBtn.addEventListener('click', () => {
  openPopup(newCardPopup);
  validatorAddCard.resetValidation();
});


//слушатель по кнопке создать новую карточку
newCardPopup.addEventListener('submit', handlerNewCardSubmit);

//слушатели по кнопке закрытия попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

