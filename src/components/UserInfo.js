/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
Этот класс:
  Принимает в конструктор объект с селекторами двух элементов:
    элемента имени пользователя и элемента информации о себе.
  Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
  Этот метод необходим для подстановки данных пользователя в форму при открытии.
  Содержит публичные методы setUserInfo и setUserAvatar, которые принимают новые данные пользователя и добавляют их на страницу.
*/

export default class UserInfo {
  constructor(profileNameElement, profileSubtitleElement, avatarElement) {
    this._profileNameElement = profileNameElement;
    this._profileSubtitleElement = profileSubtitleElement;
    this._avatarElement = avatarElement;
  }

  setUserInfo({name, about, avatar, userId}) {
    // метод получения новых данных профиля - вставляет их в элементы на странице
    this._profileNameElement.textContent = name;
    this._profileSubtitleElement.textContent = about;
    this._avatarElement.src = avatar;
    this._profileId = userId;
  }

  getUserInfo() {
    // метод возвращения данных пользователя - читает их с элементов на странице
    return {
      name: this._profileNameElement.textContent,
      about: this._profileSubtitleElement.textContent,
      // avatar: this._avatarElement.src,
    };
  }

  getUserId() { // получить идентификатор пользователя
    // console.log("this._profileId =>", this._profileId)
    return this._profileId;
  }

  setUserAvatar({avatar}) {
    // метод получения ссылки на новый аватар
    // console.log(avatar);
    this._avatarElement.src = avatar;
  }
}
