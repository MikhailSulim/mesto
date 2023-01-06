import {
  popupShowImage,
  popupShowImageCloseBtn,
  popupImage,
  popupImageCaption,
} from "./constants.js";

export default class Card {
  static selectors = {
    cardTitle: ".element__title",
    cardImageLink: ".element__img",
    likeButton: ".element__like",
    deleteButton: ".element__delete",
  };

  constructor({ name, link, description }, cardSelector) {
    this._name = name;
    this._link = link;
    this._description = description;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.children[0].cloneNode(true);
    return cardTemplate;
  }

  _openPopup() {
    popupShowImage.classList.add("popup_is-opened");
    document.addEventListener("keydown", (evt) => {
      this._closePopupByPressEsc(evt);
    });
    popupShowImage.addEventListener("mousedown", (evt) => {
      this._closePopupByClickOverlay(evt);
    });
  }

  _closePopup() {
    popupShowImage.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", (evt) => {
      this._closePopupByPressEsc(evt);
    });
    popupShowImage.removeEventListener("mousedown", (evt) => {
      this._closePopupByClickOverlay(evt);
    });
  }

  _closePopupByPressEsc(event) {
    if (event.key === "Escape") {
      this._closePopup();
    }
  }

  _closePopupByClickOverlay(event) {
    if (event.target === event.currentTarget) {
      this._closePopup();
    }
  }

  _setEventListeners() {
    // обработчик закрытия попапа на кнопке
    popupShowImageCloseBtn.addEventListener("click", () => {
      this._closePopup();
    });

    // обработчик нажатия на кнопку лайка
    this._element
      .querySelector(Card.selectors.likeButton)
      .addEventListener("click", () => {
        this._element
          .querySelector(Card.selectors.likeButton)
          .classList.toggle("element__like_is-liked");
      });

    // обработчик нажатия на кнопку удаления
    this._element
      .querySelector(Card.selectors.deleteButton)
      .addEventListener("click", () => {
        this._element.closest(".element").remove();
      });

    // обработчик нажатия на фото для появления попапа с полноразмерной версией
    this._element
      .querySelector(Card.selectors.cardImageLink)
      .addEventListener("click", () => {
        popupImage.src = this._link;
        popupImage.alt = this._description;
        popupImageCaption.textContent = this._name;
        this._openPopup();
      });
  }

  generateCard(where, isAppend) {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(Card.selectors.cardTitle).textContent =
      this._name;
    this._element.querySelector(Card.selectors.cardImageLink).src = this._link;
    this._element.querySelector(Card.selectors.cardImageLink).alt =
      this._description;

    isAppend ? where.append(this._element) : where.prepend(this._element);
    return this._element;
  }
}
