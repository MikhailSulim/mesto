/*
  Класс PopupWithConfirmation, наследуется от Popup.

  Принимает в конструктор только селектор попапа.
  Публичный метод updateSubmit перезаписывает родительский метод, т.к. на модальном окне нет никаких полей.
*/

import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = popupSelector.querySelector(".popup__content");
    this._submitBtn = popupSelector.querySelector(".popup__save");
  }

  updateSubmit(update) {
    // функция замены отправки формы с стандартного класса
    this._handleSubmit = update;
  }

  setEventListeners() {
    // переопределение слушателей
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  setSubmitBtnText(text) {
    // функция замены текста на кнопке для лоадера
    this._submitBtn.textContent = text;
  }
}
