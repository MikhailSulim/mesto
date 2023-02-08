/*
  Класс PopupWithForm, наследуется от Popup.
  Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  Перезаписывает родительский метод setEventListeners.
  Метод setEventListeners класса PopupWithForm не только добавляет обработчик клика иконке закрытия,
  но и добавляет обработчик сабмита формы.
  Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
*/

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = popupSelector.querySelector(".popup__content");
    this._submitForm = submitForm;
    this._inputFields = popupSelector.querySelectorAll(".popup__input");
    this._submitBtn = popupSelector.querySelector(".popup__save");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputFields.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setSubmitBtnText(text) {  // функция для уведомления пользователя о процессе загрузки данных на сервер
    this._submitBtn.textContent = text;
  }
  // submit(action) {
  //   this._popup.addEventListener("submit", (event) => {
  //     event.preventDefault();
  //     this._submitForm(action);
  //   })
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
