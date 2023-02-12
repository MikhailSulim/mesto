const validationConfig = {
  // селекторы для валидации форм
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
};

const cardTemplate = "#card-template"; // селктор карточки

const cardConfig = {
  cardTitle: ".element__title", // название фото
  cardImageLink: ".element__img", // ссылка на фото
  likeButton: ".element__like", // кнопка лайка
  likeCount: ".element__like-count", // текст счётчика лайков
  deleteButton: ".element__delete", // кнопка удаления
};

// редактирование профиля
const popupDescriptionSelector = ".popup_type_description"; // селектор попапа редактирования профиля
const popupDescription = document.querySelector(popupDescriptionSelector); // попап редактирования профиля
const popupOpenDescriptionBtn = document.querySelector(".profile__edit-button"); // кнопка открытия попапа редактирования профиля
const popupFieldName = popupDescription.querySelector(
  ".popup__input_field_name"
); // поле ввода имени в попапе
const docNameElement = document.querySelector(".profile__name"); // поле отображения имени в профиле
const popupFieldSubtitle = popupDescription.querySelector(
  ".popup__input_field_subtitle"
); // поле ввода имени описания в попапе
const docSubtitleElement = document.querySelector(".profile__subtitle"); // поле отображения описания в профиле
const popupDescriptionCloseBtn =
  popupDescription.querySelector(".popup__close"); // кнопка закрытия
const formElementDescription =
  popupDescription.querySelector(".popup__content"); // часть попапа редактирования профиля с контентом

// редактирование аватара в профиле пользователя
const popupAvatarSelector = ".popup_type_new-avatar"; // селектор попапа смены аватара в профиле
const popupAvatar = document.querySelector(popupAvatarSelector); // попап смены аватара в профиле
const popupOpenAvatarBtn = document.querySelector(".profile__avatar-btn"); // кнопка открытия попапа смены аватара в профиле
const avatarImg = document.querySelector(".profile__avatar-img"); // картинка на аватаре пользователя
const popupFieldLinkAvatar = popupAvatar.querySelector(
  ".popup__input_field_link-avatar"
); // поле ввода ссылки на новый аватар
const popupAvatarCloseBtn = popupAvatar.querySelector(".popup__close"); // кнопка закрытия попапа смены аватара
const formElementAvatar = popupAvatar.querySelector(".popup__content"); // форма попапа смены аватара

// добавление новой карточки
const popupAddCardSelector = ".popup_type_add-card"; // селектор попапа добавления новой карточки
const popupAddCard = document.querySelector(popupAddCardSelector); // попап добавления новой карточки
const popupOpenAddCardBtn = document.querySelector(".add-button"); // кнопка открытия попапа добавления новой карточки
const popupAddCardCloseBtn = popupAddCard.querySelector(".popup__close"); // кнопка закрытия
const popupFieldPlace = popupAddCard.querySelector(".popup__input_field_place"); // поле ввода названия места
const popupFieldLink = popupAddCard.querySelector(".popup__input_field_link"); // поле ввода ссылки на фото
const formElementAddCard = popupAddCard.querySelector(".popup__content"); // часть попапа добавления карточки

// подтверждение удаления карточки
const popupDelConfirmSelector = ".popup_type_delete-photo"; // селектор попапа подтверждения удаления карточки
const popupDelConfirm = document.querySelector(popupDelConfirmSelector); // попап подтверждения удаления карточки
const popupDelConfirmCloseBtn = popupDelConfirm.querySelector(".popup__close"); // кнопка закрытия попапа

const popupImageSelector = ".popup_type_image";
const popupImage = document.querySelector(popupImageSelector);
const popupImageLink = popupImage.querySelector(".popup__image");
const popupImageDescription = popupImage.querySelector(".popup__image-caption");
const popupImageCloseBtn = popupImage.querySelector(".popup__close_type_image");

const cardElements = document.querySelector(".elements__container");

export {
  validationConfig,
  cardTemplate,
  cardConfig,
  popupDescriptionSelector,
  popupDescription,
  popupOpenDescriptionBtn,
  popupFieldName,
  docNameElement,
  popupFieldSubtitle,
  docSubtitleElement,
  popupDescriptionCloseBtn,
  formElementDescription,
  popupAddCardSelector,
  popupAddCard,
  popupOpenAddCardBtn,
  popupAddCardCloseBtn,
  popupFieldPlace,
  popupFieldLink,
  formElementAddCard,
  popupImageSelector,
  popupImage,
  popupImageLink,
  popupImageDescription,
  popupImageCloseBtn,
  cardElements,
  popupAvatarSelector,
  popupAvatar,
  popupOpenAvatarBtn,
  avatarImg,
  popupFieldLinkAvatar,
  popupAvatarCloseBtn,
  formElementAvatar,
  popupDelConfirmSelector,
  popupDelConfirm,
  popupDelConfirmCloseBtn,
};
