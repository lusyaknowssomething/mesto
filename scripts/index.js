                //ПОПАП РЕДАКТИРОВАНИЯ

//Находим попап, кнопку редактирования и закрытия
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupEditBtn = document.querySelector('.profile__edit-button');
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close_edit');

// Находим форму в DOM
const formElement = popup.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_profile_name');
const jobInput = formElement.querySelector('.popup__input_profile_job');

// Находим title и subtitle в DOM (сюда вставляются значения из формы редактирования)
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Функция смены класса для попапа
function popupToggle (popup) {
  popup.classList.toggle('popup_opened');
};

// Функция для попапа редактирования (меняет класс opened и записывает в value значения из title и subtitle)
function editProfileToggle () {
  popupToggle(popupEditProfile);
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

// Обработчик «отправки» формы редактирования
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки
  profileTitle.textContent = nameInput.value; //вставляем значение из формы в title
  profileSubtitle.textContent = jobInput.value; //вставляем значение из формы в subtitle
  editProfileToggle(); //вызываем функцию редактирования попапа
}

popupEditBtn.addEventListener('click', editProfileToggle); //слушатель по кнопке редактирования
popupEditCloseBtn.addEventListener('click', editProfileToggle); //слушатель по кнопке закрытия попапа редактирования


// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

              //ПОПАП ДОБАВЛЕНИЯ КАРТОЧЕК

// массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.elements'); //находим контейнер для карточек
const elementTemplate = document.querySelector('.element__template'); //template-элемент с шаблоном карточки

// функция по созданию карточки
function createCard(el) {
  const newCard = elementTemplate.content.cloneNode(true);
  newCard.querySelector('.element__picture').src = el.link;
  newCard.querySelector('.element__picture').alt = el.name;
  newCard.querySelector('.element__title').textContent = el.name;

  //активный лайк на карточку
  newCard.querySelector('.element__like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
  });

  //слушатель кнопки удаления карточек
  newCard.querySelector('.element__delete').addEventListener("click", deleteCard);

  //слушатель для открытия картинки
  newCard.querySelector('.element__pic-container').addEventListener("click", fullSizeToggle);

  return newCard;
}

//функция удаления карточек
function deleteCard(evt){
  const deleteBtn = evt.target.closest('.element');
  deleteBtn.remove();
};

//функция добавления карточек
function renderCards (cards){
  const newCards = createCard(cards);
  cardsContainer.prepend(newCards);
}

initialCards.map(renderCards);  //добавлем карточки из массива на страничку

//добавление новых карточек

const newCardPopup = document.querySelector('.popup_type_new-card'); //находим попап создания карточки
const popupCardOpenBtn = document.querySelector('.profile__add-button');
const popupCardCloseBtn = newCardPopup.querySelector('.popup__close');

function newCardToggle() {
  popupToggle(newCardPopup);
}


// Обработчик «отправки» формы добавления карточки

function newCardSubmitHandler(evt) {
  evt.preventDefault();

  const cardDescriptionValue = evt.currentTarget.querySelector('.popup__input_element_description').value;
  const cardLinkValue = evt.currentTarget.querySelector('.popup__input_element_link').value;

  renderCards({
    name: cardDescriptionValue,
    link: cardLinkValue,
  });

  newCardToggle();
}
popupCardOpenBtn.addEventListener('click', newCardToggle);
popupCardCloseBtn.addEventListener('click', newCardToggle);

newCardPopup.addEventListener('submit', newCardSubmitHandler);

// попап с открытием картинки
const imagePopup = document.querySelector('.popup_type_image');
const fullSizePhoto = document.querySelector('.popup__picture');
const photoName = document.querySelector('.popup__name');
const popupImageCloseBtn = imagePopup.querySelector('.popup__close')

function fullSizeToggle(evt) {
  const link = evt.target.src;
  const title = evt.currentTarget.nextElementSibling.innerText;

  fullSizePhoto.src = link;
  photoName.innerText = title;

  popupToggle(imagePopup);
}

popupImageCloseBtn.addEventListener('click', fullSizeToggle);
