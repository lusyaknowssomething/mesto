export default class Card {
  constructor( {data, handleCardClick, handleLikeActive, handleLikeDeactive, handleDeleteIconClick }, cardSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this.handleLikeActive = handleLikeActive;
    this.handleLikeDeactive = handleLikeDeactive;
    this.handleDeleteIconClick = handleDeleteIconClick;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._likes = data.likes;
  };

  //копируем template-элемент с содержимым
  _getTemplate() {
    const newCard = document.querySelector(this._cardSelector).content.cloneNode(true);

    return newCard;
  };

  //создаем карточку
  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name; //находим заголовок и вставляем имя из массива

    this._elementPicture = this._element.querySelector('.element__picture');

    this._elementPicture.src = this._link; //находим src картинки и вставляем ссылку из массива
    this._elementPicture.alt = this._name; //находим alt картинки и вставляем имя из массива

    this._cardLike = this._element.querySelector('.element__like-number');
    this._likeBtn = this._element.querySelector('.element__like');
    this._deleteBtn = this._element.querySelector('.element__delete');
    this._setEventListeners();
    this._renderDeleteIconClick();
    this._renderLikes(this._likes.length);

    return this._element;
  };



  //выставляем кнопку удаления своим карточкам
  _renderDeleteIconClick() {
    if (this._ownerId !== this._userId) {
      this._deleteBtn.remove();
    }
  }

  //обновляем число лайков
  updateLikes = (likes) => {
    //console.dir(this)
    this._cardLike.textContent = likes;
  }

  _renderLikes(likes){
    const userIdLike = {_id: this._userId};
    const userLike = this._likes.find(function(element) {
      return element._id === userIdLike._id ;
     });
    if(userLike){
      this.updateLikes(likes);
      this._likeBtn.classList.add('element__like_active');
    } else {
      this.updateLikes(likes);
      this._likeBtn.classList.remove('element__like_active');
    }
  }


  _handleLike(evt) {
    if(evt.target.classList.contains('element__like_active')){
      this.handleLikeDeactive(this._id, this.updateLikes);
      this._likeBtn.classList.remove('element__like_active');
    } else {
      this.handleLikeActive(this._id, this.updateLikes);
      this._likeBtn.classList.add('element__like_active');
    }
  };

  _setEventListeners() {
    // лайк на карточку
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLike(evt);
    });

    //слушатель открытия попапа с картинкой

    this._element.querySelector('.element__pic-container').addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });

    //слушатель кнопки удаления карточек
    if (this._ownerId === this._userId){
      this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
        this.handleDeleteIconClick(evt, this._id);
      });
    }
  };
};
