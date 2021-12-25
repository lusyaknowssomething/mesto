import '../../pages/index.css';
import { popupEditBtn, popupEditFormElement,
  nameInput, jobInput, profileTitle, profileSubtitle,
  cardsContainer, popupCardOpenBtn, popupAddFormElement,
  validationConfig, imagePopup } from '../utils/constants.js';
import { initialCards } from '../utils/initial-сards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const openPicture = new PopupWithImage(imagePopup);

const userInfoData = new UserInfo(profileTitle, profileSubtitle);

//функция создания карточки
function createCard(cardItem, elementTemplate) {
  const cardElement = new Card({
    data: cardItem,
    handleCardClick: (evt) => {
      openPicture.open(evt);
      openPicture.setEventListeners();
    }
  }, elementTemplate);
  return cardElement;
}

//рендер карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
  const newCard =  createCard(cardItem, '.element__template');
  const newCardElement = newCard.createCard()
  cardsList.addItem(newCardElement);
  },
}, cardsContainer);


cardsList.renderItems();



const userInfoPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfoData.setUserInfo(data);
  }
}, '.popup_type_edit');


const addNewCardPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    const infoCard = {name: '', link: ''};
    infoCard.name = data.description;
    infoCard.link = data.link;

    const newCard = createCard(infoCard, '.element__template');
    const cardElement = newCard.createCard();
    cardsList.addItem(cardElement);
  }
}, '.popup_type_new-card');


//валидация форм
const validatorEditProfile = new FormValidator(validationConfig, popupEditFormElement);
const validatorAddCard = new FormValidator(validationConfig, popupAddFormElement);

const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
}

enableValidation();

userInfoPopup.setEventListeners();
addNewCardPopup.setEventListeners();

//слушатель по кнопке редактирования профиля
popupEditBtn.addEventListener('click', (evt) => {

  userInfoPopup.open(evt);
  validatorEditProfile.resetValidation();

  const userData = userInfoData.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;

});


//слушатель по кнопке добавления карточек
popupCardOpenBtn.addEventListener('click', (evt) => {
  addNewCardPopup.open();
  validatorAddCard.resetValidation();
});

