let popup = document.querySelector('.popup');
let popupEditBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = popup.querySelector('.popup__close');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_profile_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_profile_job'); // Воспользуйтесь инструментом .querySelector()

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');    // Выберите элементы, куда должны быть вставлены значения полей

function popupToggle () {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent; // Вставьте новые значения с помощью textContent
  }
};

function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggle()
  }
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupToggle();
}

popup.addEventListener('click', clickOverlay);

popupEditBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

