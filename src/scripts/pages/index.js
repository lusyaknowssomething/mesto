import '../../pages/index.css';
import { popupEditBtn, popupEditFormElement, nameInput, jobInput, cardsContainer, popupCardOpenBtn, popupAddFormElement, validationConfig, imagePopup } from '../utils/constants.js';
import { initialCards } from '../utils/initial-сards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


//рендер карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
  const newCard =  new Card({
    data: cardItem,
    handleCardClick: (evt) => {
      const openPicture = new PopupWithImage(imagePopup);
      openPicture.open(evt);
     }
  }, '.element__template');
    const newCardElement = newCard.createCard()
    cardsList.addItem(newCardElement);
  },
}, cardsContainer);

cardsList.renderItems();

const userInfoPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    const userInfoData = new UserInfo(data);
    userInfoData.setUserInfo(data);
  }
}, '.popup_type_edit');


const addNewCardPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    const infoCard = {name: '', link: ''};
    infoCard.name = data.description;
    infoCard.link = data.link;

    const newCard = new Card({ data: infoCard }, '.element__template')
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

//слушатель по кнопке редактирования профиля
popupEditBtn.addEventListener('click', (evt) => {


  userInfoPopup.open(evt);
  validatorEditProfile.resetValidation();

  const UserArray = { name: nameInput, job: jobInput }
  const userInfoData = new UserInfo(UserArray);
  userInfoData.getUserInfo();

});


//слушатель по кнопке добавления карточек
popupCardOpenBtn.addEventListener('click', (evt) => {
  addNewCardPopup.open();
  validatorAddCard.resetValidation();
});

