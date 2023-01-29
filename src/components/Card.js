/*
Класс Card, создаёт карточку с текстом и ссылкой на изображение:
  принимает в конструктор её данные и селектор её template-элемента;
  содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  содержит приватные методы для каждого обработчика;
  содержит один публичный метод generateCard, который возвращает полностью работоспособный и наполненный данными элемент карточки.
*/

// класс создания карточки с фото и описанием
export default class Card {
  constructor({ place, config, template, handleCardClick }) {
    this._name = place.name; // название карточки
    this._link = place.link; // ссылка на фотографию
    this._description = place.description; // описание фотографии

    this._cardSelector = template; // 'селектор' заготовки карточки

    this._cardTitleSelector = config.cardTitle; // селектор элемента названия карточки
    this._cardImgLinkSelector = config.cardImageLink; // селектор элемета фото карточки
    this._likeBtnSelector = config.likeButton; // селектор кнопки лайка
    this._deleteBtnSelector = config.deleteButton; // селектор кнопки удаления

    this._handleCardClick = handleCardClick; // функция клика по карточке
  }

  _getTemplate() {
    // получить разметку заготовки карточки
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.children[0].cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    // слушатели карточки
    // обработчик нажатия на кнопку лайка
    this._likeBtn.addEventListener("click", () => {
      this._likeBtn.classList.toggle("element__like_is-liked");
    });

    // обработчик нажатия на кнопку удаления
    this._deleteBtn.addEventListener("click", () => {
      this._element.closest(".element").remove();
    });

    // обработчик нажатия на фото для появления попапа с полноразмерной версией
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link, this._description);
    });
  }

  generateCard() {
    // функция создания карточки
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(this._likeBtnSelector);
    this._deleteBtn = this._element.querySelector(this._deleteBtnSelector);

    this._image = this._element.querySelector(this._cardImgLinkSelector);
    this._element.querySelector(this._cardTitleSelector).textContent =
      this._name;

    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._description;

    return this._element;
  }
}
