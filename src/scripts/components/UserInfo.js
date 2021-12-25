export default class UserInfo {
  constructor( name, job ) {
    this._name = name;
    this._job = job;
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  };

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._name.textContent = data.name; //вставляем значение из формы в title
    this._job.textContent = data.job; //вставляем значение из формы в subtitle
  }
};

