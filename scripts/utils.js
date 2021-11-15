export { openPopup, closePopup, openPicture };

const fullSizePhoto = document.querySelector('.popup__picture');
const photoName = document.querySelector('.popup__name');
const imagePopup = document.querySelector('.popup_type_image');

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', _clickOverlay);
  document.addEventListener('keydown', _pressEsc);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', _clickOverlay);
  document.removeEventListener('keydown', _pressEsc);
};

const _clickOverlay = function (event) {
  if(event.target === event.currentTarget) {
    closePopup(event.target);
  }
};

const _pressEsc = function (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};


const openPicture = function (data) {
  fullSizePhoto.src = data.target.src;
  photoName.textContent = data.target.alt;
  fullSizePhoto.alt = data.target.alt;
  openPopup(imagePopup);
}



