import '../../pages/index.css';
import { popupEditBtn, popupEditFormElement,
  nameInput, jobInput, profileTitle, profileSubtitle,
  cardsContainer, popupCardOpenBtn, popupAddFormElement,
  validationConfig, profileAvatar,
  profileAvatarContainer, popupEditAvatarElement, avatarInput,
  elementTemplate, popupConfig } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit';

const api = new Api( {
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: '1ce755b3-dc11-43ff-ae56-cdb55c7d6042',
    "content-type": "application/json"
  }
});

//объявила в глобальной области видимости, чтобы была возможность использовать в других функциях
let cardsList;

//объявила в глобально области юзер id
let userId;

//попап с картинкой
const popupImage = new PopupWithImage(popupConfig.popupImage);

const userInfoData = new UserInfo(profileTitle, profileSubtitle);


//получаем данные о юзере с сервера и записываем в переменные
//подгружаем карточки с сервера
Promise.all([
  api.getUserData(),
  api.getCards()
])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;
    userId = user._id;

    cardsList = new Section({
      items: cards,
      renderer: (cardItem) => {
        const newCard = createCard(cardItem, elementTemplate);
        const newCardElement = newCard.createCard();
        cardsList.addItemAppend(newCardElement);
      },
    }, cardsContainer);

    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


//попап подтверждения удаления карточки
const popupWithSubmitDelete = new PopupWithSubmit({
  handleFormSubmit: (card, id) => {
    api.deleteCard(id)
    .then(() => {
      card.target.closest('.element').remove();
      popupWithSubmitDelete.close()
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }
}, popupConfig.popupSubmit);



//переключем активное и неактивное состояние лайка на сервере и проставляем количество
const handleLikeActive = (id, renderLikesCallback) => {
  api
    .putLike(id)
    .then((res) => { console.log(res)
      renderLikesCallback(res.likes.length) })
    .catch((err) => { console.log(err); })
}
const handleLikeDeactive = (id, renderLikesCallback) => {
  api
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
    handleDeleteIconClick,
    }, elementTemplate, userId, );

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
    api.patchAvatar(avatarData)
    .then((res) => {
      updateAvatar(res.avatar);
      userAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      userAvatarPopup.renderLoading(false);
    })
  }
}, popupConfig.popupAvatar);


//попап с информацией о юзере
const userInfoPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfoPopup.renderLoading(true);
    api.patchUserData(data)
    .then((res) => {
      userInfoData.setUserInfo(res);
      userInfoPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      userInfoPopup.renderLoading(false);
    })
  }
}, popupConfig.popupEdit);

//попап добавления карточек
const popupAddCard = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true);
    const infoCard = {name: '', link: ''};
    infoCard.name = data.description;
    infoCard.link = data.link;
    const postCard = api.postCard(infoCard);
    postCard.
    then((res)  => {
      const newCard = createCard(res, elementTemplate);
      const cardElement = newCard.createCard();
      cardsList.addItemPrepend(cardElement);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
  }
}, popupConfig.popupNewCard);


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
});

