import { profileTitle, profileSubtitle } from '../utils/constants.js';


export default class UserInfo {
  constructor( { name, job }) {
    this.name = name;
    this.job = job;
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    this.name.value = profileTitle.textContent;
    this.job.value = profileSubtitle.textContent;
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    //evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки
    profileTitle.textContent = data.name; //вставляем значение из формы в title
    profileSubtitle.textContent = data.job; //вставляем значение из формы в subtitle
  }
}
