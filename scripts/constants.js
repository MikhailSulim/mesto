const validationConfig = {
  // селекторы для валидации форм
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

const cardTemplate = "#card-template"; // селктор карточки

const cardConfig = {
  cardTitle: ".element__title", // название фото
  cardImageLink: ".element__img", // ссылка на фото
  likeButton: ".element__like", // кнопка лайка
  deleteButton: ".element__delete", // кнопка удаления
};

// редактирование профиля
const popupDescription = document.querySelector(".popup_type_description"); // попап редактирования профиля
const popupOpenDescriptionBtn = document.querySelector(".profile__edit-button"); // кнопка открытия попапа редактирования профиля
const popupFieldName = popupDescription.querySelector(".popup__input_field_name"); // поле ввода имени в попапе
const docNameElement = document.querySelector(".profile__name"); // поле отображения имени в профиле
const popupFieldSubtitle = popupDescription.querySelector(".popup__input_field_subtitle"); // поле ввода имени описания в попапе
const docSubtitleElement = document.querySelector(".profile__subtitle"); // поле отображения описания в профиле
const popupDescriptionCloseBtn = popupDescription.querySelector(".popup__close"); // кнопка закрытия
const formElementDescription = popupDescription.querySelector(".popup__content"); // часть попапа редактирования профиля с контентом

// добавление новой карточки
const popupAddCard = document.querySelector(".popup_type_add-card"); // попап добавления новой карточки
const popupOpenAddCardBtn = document.querySelector(".add-button"); // кнопка открытия попапа добавления новой карточки
const popupAddCardCloseBtn = popupAddCard.querySelector(".popup__close"); // кнопка закрытия
const popupFieldPlace = popupAddCard.querySelector(".popup__input_field_place"); // поле ввода названия места
const popupFieldLink = popupAddCard.querySelector(".popup__input_field_link"); // поле ввода ссылки на фото
const formElementAddCard = popupAddCard.querySelector(".popup__content"); // часть попапа добавления карточки

const popupImage = document.querySelector(".popup_type_image");
const popupImageLink = popupImage.querySelector(".popup__image");
const popupImageDescription = popupImage.querySelector(".popup__image-caption");
const popupImageCloseBtn = popupImage.querySelector(".popup__close_type_image");

const cardElements = document.querySelector(".elements__container");

export {validationConfig, cardTemplate, cardConfig, popupDescription, popupOpenDescriptionBtn, popupFieldName, docNameElement, popupFieldSubtitle,
  docSubtitleElement, popupDescriptionCloseBtn, formElementDescription, popupAddCard, popupOpenAddCardBtn,
  popupAddCardCloseBtn, popupFieldPlace, popupFieldLink, formElementAddCard, popupImage, popupImageLink,
  popupImageDescription, popupImageCloseBtn, cardElements}
