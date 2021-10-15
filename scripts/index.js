//Находим попап редактирования, кнопку редактирования и закрытия
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupEditBtn = document.querySelector('.profile__edit-button');
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close_type_edit');

// Находим форму в DOM
const popupEditFormElement = popupEditProfile.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = popupEditFormElement.querySelector('.popup__input_profile_name');
const jobInput = popupEditFormElement.querySelector('.popup__input_profile_job');

// Находим title и subtitle в DOM (сюда вставляются значения из формы редактирования)
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements'); //находим контейнер для карточек
const elementTemplate = document.querySelector('.element__template'); //template-элемент с шаблоном карточки

//добавление новых карточек
const newCardPopup = document.querySelector('.popup_type_new-card'); //находим попап создания карточки
const popupCardOpenBtn = document.querySelector('.profile__add-button'); //находим кнопку открытия формы для добавления карточек
const popupCardCloseBtn = newCardPopup.querySelector('.popup__close'); //находим кнопку закрытия попапа добавления карточек

//находим value для описания и ссылки на картинку
const cardDescription = document.querySelector('.popup__input_element_description');
const cardLink = document.querySelector('.popup__input_element_link');

// попап с открытием картинки
const imagePopup = document.querySelector('.popup_type_image');
const fullSizePhoto = document.querySelector('.popup__picture');
const photoName = document.querySelector('.popup__name');
const popupImageCloseBtn = imagePopup.querySelector('.popup__close')

// Функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', clickOverlay);
  document.addEventListener('keydown', pressEsc);
};

// Функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    Array.from(popups).forEach(popupElement => {
      closePopup(popupElement);
    });
  };
};

function pressEsc(event) {
  if (event.key === 'Escape') {
    Array.from(popups).forEach(popupElement => {
      closePopup(popupElement);
    });
  };
};


// Функция для попапа редактирования (меняет класс opened и записывает в value значения из title и subtitle)
function openEditProfile () {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Обработчик «отправки» формы редактирования
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки
  profileTitle.textContent = nameInput.value; //вставляем значение из формы в title
  profileSubtitle.textContent = jobInput.value; //вставляем значение из формы в subtitle
  closePopup(popupEditProfile); //вызываем функцию редактирования попапа
}

// функция по созданию карточки
function createCard(data) {
  const newCard = elementTemplate.content.cloneNode(true); //копируем template-элемент с содержимым
  const elementPicture = newCard.querySelector('.element__picture');
  elementPicture.src = data.link; //находим src картинки и вставляем ссылку из массива
  elementPicture.alt = data.name; //находим alt картинки и вставляем имя из массива
  newCard.querySelector('.element__title').textContent = data.name; //находим заголовок и вставляем имя из массива

  //активный лайк на карточку
  newCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  //слушатель кнопки удаления карточек
  newCard.querySelector('.element__delete').addEventListener('click', handleDeleteCard);

  //слушатель для открытия картинки
  newCard.querySelector('.element__pic-container').addEventListener('click', () => handlerPreviewPicture(data));

  return newCard; //возвращаем собранную карточку
}

//функция удаления карточек
function handleDeleteCard(evt){
  evt.target.closest('.element').remove();
};

//функция добавления карточек
function addCard (cards){
  const newCards = createCard(cards);
  cardsContainer.prepend(newCards);
}

//добавлем карточки из массива на страничку
initialCards.map(addCard);


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

//функция для открытия полного размера картинки
function handlerPreviewPicture(data) {
  fullSizePhoto.src = data.link;
  photoName.textContent = data.name;
  fullSizePhoto.alt = data.name;
  openPopup(imagePopup);
}

popupEditBtn.addEventListener('click', openEditProfile); //слушатель по кнопке редактирования

//слушатель по кнопке закрытия попапа редактирования
popupEditCloseBtn.addEventListener('click', () =>  {
  closePopup(popupEditProfile);
});

popupEditFormElement.addEventListener('submit', handleProfileFormSubmit); //слушатель по кнопке "сохранить" в попапе редактирования

//слушатель по по кнопке открытия попапа добавления карточек
popupCardOpenBtn.addEventListener('click', () => {
  openPopup(newCardPopup);
});

//слушатель по по кнопке закрытия попапа добавления карточек
popupCardCloseBtn.addEventListener('click', () =>  {
  closePopup(newCardPopup);
});

newCardPopup.addEventListener('submit', handlerNewCardSubmit); //слушатель по кнопке создать новую карточку

popupImageCloseBtn.addEventListener('click', () => closePopup(imagePopup)); //слушатель по картинке для закрытия полного размера


