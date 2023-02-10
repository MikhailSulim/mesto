/* Класс Popup, отвечает за открытие и закрытие попапа.
  Принимает в конструктор единственный параметр — селектор попапа.
  Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
  Модальное окно также закрывается при клике на затемнённую область вокруг формы.
*/

export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._popupCloseBtn = this._popup.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // функция открытия модального окна
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // функция закрытия модального окна
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    // функция закрытия модального окна при нажатии кнопки Esc
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // слушатели
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
