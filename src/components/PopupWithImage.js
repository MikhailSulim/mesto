/*
  Класс PopupWithImage, наследуется от Popup.
  Класс перезаписывает родительский метод open.
  В методе open класса PopupWithImage вставляет в попап картинку с src изображения и подписью к картинке.
*/

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupTitle = this._popup.querySelector(".popup__image-caption");
  }

  open(name, link, description) {
    this._popupImage.src = link;
    this._popupImage.alt = description;
    this._popupTitle.textContent = name;
    super.open();
  }
}
