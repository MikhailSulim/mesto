export default class Api {
  constructor({ serverUrl, headers }) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  }

  // TODO удаление карточки
  // TODO счетчик лайков

  _checkResponse(res) {
    // функция проверки статуса запроса с сервера
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  getCard() {
    // функция получения массива карточек с сервера
    return (
      fetch(`${this._serverUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      })
        .then(this._checkResponse) // получение с сервера
        // .then((result) => {
        //   // второй then нужен потому что res.json тоже асинхронный и его надо дождаться
        // })
        .catch((err) => console.log(err))
    );
  }

  createCard(place) {
    return fetch(`${this._serverUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place.name,
        link: place.link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    // функция получения данных о залогиненном пользователе с сервера
    return fetch(`${this._serverUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  setUserInfo(userData) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  setUserAvatar(newAvatar) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar.avatar,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
}
