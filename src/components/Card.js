/*
Класс Card, создаёт карточку с текстом и ссылкой на изображение:
  принимает в конструктор её данные и селектор её template-элемента;
  содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  содержит приватные методы для каждого обработчика;
  содержит один публичный метод generateCard, который возвращает полностью работоспособный и наполненный данными элемент карточки.
*/

export default class Card {
  constructor({
    cardData,
    config,
    userId,
    template,
    handleCardClick,
    handleCardDelete,
    handleLikeClick,
  }) {
    this._name = cardData.name; // название карточки
    this._link = cardData.link; // ссылка на фотографию
    this._description = cardData.description; // описание фотографии
    this._likes = cardData.likes; // массив лайков карточки
    this._cardId = cardData._id; // идентификатор карточки
    this._userId = userId; // идентификатор пользователя
    this._cardOwner = cardData.owner._id; // идентификатор создателя карточки

    this._cardSelector = template; // 'селектор' заготовки карточки

    this._cardTitleSelector = config.cardTitle; // селектор элемента названия карточки
    this._cardImgLinkSelector = config.cardImageLink; // селектор элемета фото карточки
    this._likeBtnSelector = config.likeButton; // селектор кнопки лайка
    this._deleteBtnSelector = config.deleteButton; // селектор кнопки удаления
    this._likeCount = config.likeCount; // селектор поля для вывода числа лайков

    this._handleCardClick = handleCardClick; // функция клика по карточке
    this._handleCardDelete = handleCardDelete; // функция клика по значку удаления
    this._handleLikeClick = handleLikeClick; // функция клика по значку лайка
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
// console.log(this._userId, this._cardOwner)
    if (this._userId === this._cardOwner) {
      this._deleteBtn.addEventListener("click", (evt) => this._handleCardDelete(evt));
    } else {
      this._deleteBtn.remove();

    }
    // обработчик нажатия на кнопку удаления
    // this._element.closest(".element").remove();

    // if (!this._isUserCard) {
    //   this._cardDelButton.remove();
    //   this._cardDelButton = null;
    // } else {
    //   this._cardElement.querySelector('.card__del-button').addEventListener('click', (event) => {
    //     this._handleRemoveButton(event);
    //   });
    // }

    // обработчик нажатия на фото для появления попапа с полноразмерной версией
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link, this._description);
    });
  }

  // deleteCard() {
  //   // функция удаления карточки из браузера
  //   this._element.closest(".element").remove();
  // }

  generateCard() {
    // функция создания карточки
    this._element = this._getTemplate(); // элемент самой карточки
    this._likeBtn = this._element.querySelector(this._likeBtnSelector); // элемент кнопка лайка
    this._deleteBtn = this._element.querySelector(this._deleteBtnSelector); // элемент кнопка удаления
    this._likeCountElement = this._element.querySelector(this._likeCount); // элемент вывода числа лайков
    this._image = this._element.querySelector(this._cardImgLinkSelector); // элемент изображения на карточке

    this._element.querySelector(this._cardTitleSelector).textContent = this._name;
    this._likeCountElement.textContent = this._likes.length;



    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._description;

    return this._element;
  }
}
