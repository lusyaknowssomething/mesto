export default class UserInfo {
  constructor( name, about ) {
    this._name = name;
    this._about = about;
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  };

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._name.textContent = data.name; //вставляем значение из формы в title
    this._about.textContent = data.about; //вставляем значение из формы в subtitle
  }
};

