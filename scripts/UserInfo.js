export default class UserInfo {
  // класс, управляющий отображением информации о пользователе на странице
  constructor(infoSelectors, aboutSelectors) {
    this._profileNameElement = infoSelectors;
    this._profileSubtitleElement = aboutSelectors;
  }

  setUserInfo(userData) {
    // метод добавляет новые данные профиля
    const { name: userName, about: userAbout } = userData;
    this._profileNameElement.textContent = userName;
    this._profileSubtitleElement.textContent = userAbout;
  }

  getUserInfo() {
    // метод возвращает данные пользователя
    return {
      name: this._profileNameElement.textContent,
      about: this._profileSubtitleElement.textContent,
    };
  }
}
