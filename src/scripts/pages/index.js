import '../../pages/index.css';
import { popupEditBtn, popupEditFormElement,
  nameInput, jobInput, profileTitle, profileSubtitle,
  cardsContainer, popupCardOpenBtn, popupAddFormElement,
  validationConfig, imagePopup, profileAvatar,
  profileAvatarContainer, popupEditAvatarElement, avatarInput } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit';


const apiUserData = new Api( {
  url: 'https://mesto.nomoreparties.co/v1/cohort-33/users/me',
  headers: {
    authorization: '1ce755b3-dc11-43ff-ae56-cdb55c7d6042',
    "content-type": "application/json"
  }
});

const apiCards = new Api( {
  url: 'https://mesto.nomoreparties.co/v1/cohort-33/cards',
  headers: {
    authorization: '1ce755b3-dc11-43ff-ae56-cdb55c7d6042',
    "content-type": "application/json"
  }
});

//объявила в глобальной области видимости, чтобы была возможность использовать в других функциях
let cardsList;

//попап с картинкой
const popupImage = new PopupWithImage(imagePopup);

const userInfoData = new UserInfo(profileTitle, profileSubtitle);

//попап подтверждения удаления карточки
const popupWithSubmitDelete = new PopupWithSubmit({
  handleFormSubmit: (card, id) => {
    apiCards.deleteCard(id)
    .then(() => {
      card.target.closest('.element').remove();
      popupWithSubmitDelete.close()
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }
},'.popup_type_submit');


//получаем данные о юзере с сервера и записываем в переменные
const userData = apiUserData.getUserData();
userData.then((data) => {
  profileTitle.textContent = data.name;
  profileSubtitle.textContent = data.about;
  profileAvatar.src = data.avatar;
}).catch((err) => {
  console.log(err); // выведем ошибку в консоль
});


//подгружаем карточки с сервера
const cards = apiCards.getCards();
cards.then((data) => {
  cardsList = new Section({
    items: data,
    renderer: (cardItem) => {
      const newCard = createCard(cardItem, '.element__template');
      const newCardElement = newCard.createCard();
      cardsList.addItem(newCardElement);
    },
  }, cardsContainer);
  cardsList.renderItems();
}).catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

//добавляем лайки к карточкам с сервера
function setLike(card) {
  const cardID = card._id;
  apiCards
    .getCards()
    .then((data) => {
      const item = Object.keys(data).filter(item => data[item]._id === cardID).map(item => data[item]);
      const itemLength = item[0].likes.length;
      card.updateLikes(itemLength);
      card.renderLikes(itemLength);
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

//переключем активное и неактивное состояние лайка на сервере и проставляем количество
const handleLikeActive = (id, renderLikesCallback) => {
  apiCards
    .putLike(id)
    .then((res) => { renderLikesCallback(res.likes.length) })
    .catch((err) => { console.log(err); })
}
const handleLikeDeactive = (id, renderLikesCallback) => {
  apiCards
    .deleteLike(id)
    .then((res) => { renderLikesCallback(res.likes.length) })
    .catch((err) => { console.log(err); })
}

//
const handleDeleteIconClick = (card, id) => {
  popupWithSubmitDelete.open(card, id)
}

//функция создания карточки
function createCard(cardItem, elementTemplate) {
  const cardElement = new Card({
    data: cardItem,
    handleCardClick: (evt) => {
      popupImage.open(evt);
    },
    handleLikeActive,
    handleLikeDeactive,
    handleDeleteIconClick
  }, elementTemplate, '491866fecd16a31ee7212780');
  setLike(cardElement);

  return cardElement;
}

//функция обновления аватара
const updateAvatar = (link) => {
  profileAvatar.src = link;
}

//попап редактирования аватара
const userAvatarPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    userAvatarPopup.renderLoading(true);
    const avatarData = {avatar:''};
    avatarData.avatar = data.link;
    apiUserData.patchAvatar(avatarData)
    .then((res) => {
      updateAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      userAvatarPopup.close();
      userAvatarPopup.renderLoading(false);
    })
  }
}, '.popup_type_avatar');


//попап с информацией о юзере
const userInfoPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfoPopup.renderLoading(true);
    apiUserData.patchUserData(data)
    .then((res) => {
      userInfoData.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      userInfoPopup.close();
      userInfoPopup.renderLoading(false);
    })
  }
}, '.popup_type_edit');

//попап добавления карточек
const popupAddCard = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true);
    const infoCard = {name: '', link: ''};
    infoCard.name = data.description;
    infoCard.link = data.link;
    const postCard = apiCards.postCard(infoCard);
    postCard.
    then((res)  => {
      const newCard = createCard(res, '.element__template');
      const cardElement = newCard.createCard();
      cardsList.addItem(cardElement);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAddCard.close();
      popupAddCard.renderLoading(false);
    });
  }
}, '.popup_type_new-card');


//валидация форм
const validatorEditProfile = new FormValidator(validationConfig, popupEditFormElement);
const validatorAddCard = new FormValidator(validationConfig, popupAddFormElement);
const validatorEditAvatar = new FormValidator(validationConfig, popupEditAvatarElement);

const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
  validatorEditAvatar.enableValidation();
}

enableValidation();

//навешивание слушателей событий на попапы
popupImage.setEventListeners();
userInfoPopup.setEventListeners();
popupAddCard.setEventListeners();
popupWithSubmitDelete.setEventListeners();
userAvatarPopup.setEventListeners();

//слушатель по кнопке редактирования профиля
popupEditBtn.addEventListener('click', (evt) => {

  userInfoPopup.open(evt);
  validatorEditProfile.resetValidation();

  const userData = userInfoData.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;

});


//слушатель по кнопке добавления карточек
popupCardOpenBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupAddCard.open();
  validatorAddCard.resetValidation();
});

//слушатель по кнопке редактирования аватара
profileAvatarContainer.addEventListener('click', (evt) => {
  userAvatarPopup.open(evt);
  validatorEditAvatar.resetValidation();
  avatarInput.value = profileAvatar.src;
});

