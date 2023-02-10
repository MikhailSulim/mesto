export default class Api {
  constructor({ serverUrl, headers }) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    // функция проверки статуса запроса с сервера
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  /* ----------- получение данных с сервера --------------- */
  getCards() {
    // функция получения массива данных карточек с сервера
    return (
      fetch(`${this._serverUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      })
        .then(this._checkResponse) // получение с сервера
        //   // второй then нужен потому что res.json тоже асинхронный и его надо дождаться
        .catch((err) => console.log(err))
    );
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

  getAllData() {
    // функция получения всех данных вместе
    return Promise.all([this.getCards(), this.getUserInfo()]);
  }

  /* -------------- отправка данных на сервер --------------------*/
  createCard(place) {
    // функция отправки на сервер данных о новой карточке
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

  setUserInfo(userData) {
    // функция замены данных о пользователе на сервере
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
    // функция замены данных об аватаре пользователя
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

  /* -------------- функционал лайков ----------------*/
  addLike(cardId) {
    // функция отправки на сервер данных о том, что пользователь лайкнул карточку
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  removeLike(cardId) {
    // функция отправки на сервер данных о том, что пользователь отменил свой лайк
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  /* -------------- удаление данных на сервере -------------*/
  deleteCard(cardId) {
    // функция удаления данных выбранной карточки с сервера
    return fetch(`${this._serverUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
}
