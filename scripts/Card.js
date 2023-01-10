// класс создания карточки с фото и описанием
export default class Card {
  static selectors = {
    // селекторы карточки
    cardTitle: ".element__title", // название фото
    cardImageLink: ".element__img", // ссылка на фото
    likeButton: ".element__like", // кнопка лайка
    deleteButton: ".element__delete", // кнопка удаления

    // селекторы попапа открытия фото
    popup: ".popup_type_image", // сам попап
    popupCloseBtn: ".popup__close", // кнопка закрытия
    popupImg: ".popup__image", // ссылка на изображение
    popupCaption: ".popup__image-caption", // подпись к фото
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
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", (evt) => {
      this._closePopupByPressEsc(evt);
    });
    this._popup.addEventListener("mousedown", (evt) => {
      this._closePopupByClickOverlay(evt);
    });
  }

  _closePopup() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", (evt) => {
      this._closePopupByPressEsc(evt);
    });
    this._popup.removeEventListener("mousedown", (evt) => {
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
    this._popup
      .querySelector(Card.selectors.popupCloseBtn)
      .addEventListener("click", () => {
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
        this._popup.querySelector(Card.selectors.popupImg).src = this._link;
        this._popup.querySelector(Card.selectors.popupImg).alt =
          this._description;
        this._popup.querySelector(Card.selectors.popupCaption).textContent =
          this._name;
        this._openPopup();
      });
  }

  generateCard(where, isAppend) {
    this._element = this._getTemplate();
    this._popup = document.querySelector(Card.selectors.popup);
    this._setEventListeners();
    this._element.querySelector(Card.selectors.cardTitle).textContent = this._name;
    this._element.querySelector(Card.selectors.cardImageLink).src = this._link;
    this._element.querySelector(Card.selectors.cardImageLink).alt = this._description;

    isAppend ? where.append(this._element) : where.prepend(this._element);
    return this._element;
  }
}
