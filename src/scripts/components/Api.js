export default class Api {
  constructor( config ) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  //получить данные пользователя (GET)
  getUserData() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    }).then(this._errorHandler)
  }

  //заменить данные пользователя (PATCH)
  patchUserData(data) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._errorHandler)
  }

  //получить список всех карточек в виде массива (GET)
  getCards() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    }).then(this._errorHandler)
  }

  //добавить карточку (POST)
  postCard(data) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._errorHandler)
  }

  //удалить карточку (DELETE)
  deleteCard(id) {
    return fetch(`${this._url}/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._errorHandler)
  }

  //поставить лайк
  putLike(id){
    return fetch(`${this._url}/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._errorHandler)
  }

  //удалить лайк
  deleteLike(id){
    return fetch(`${this._url}/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._errorHandler)
  }

  //обновить аватар пользователя (PATCH)
  patchAvatar(data) {
    return fetch(`${this._url}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._errorHandler)
  }
}

