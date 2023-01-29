/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
Этот класс:
  Принимает в конструктор объект с селекторами двух элементов:
    элемента имени пользователя и элемента информации о себе.
  Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
  Этот метод необходим для подстановки данных пользователя в форму при открытии.
  Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

export default class UserInfo {
  constructor(profileNameElement, profileSubtitleElement) {
    this._profileNameElement = profileNameElement;
    this._profileSubtitleElement = profileSubtitleElement;
  }

  setUserInfo({name, about}) {
    // метод получения новых данных профиля
    this._profileNameElement.textContent = name;
    this._profileSubtitleElement.textContent = about;
  }

  getUserInfo() {
    // метод возвращения данных пользователя
    return {
      name: this._profileNameElement.textContent,
      about: this._profileSubtitleElement.textContent,
    };
  }
}
