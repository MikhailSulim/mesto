// импорт
import { initialCards } from "./content.js";
import { validationConfig, cardTemplate } from "./constants.js";
// import { clearErrors, disableSubmitBtn } from "./validate.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// объявления констант и переменных //
// редактирование профиля
const popupDescription = document.querySelector(".popup_type_description"); // попап редактирования профиля
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

// добавление новой карточки
const popupAddCard = document.querySelector(".popup_type_add-card"); // попап добавления новой карточки
const popupOpenAddCardBtn = document.querySelector(".add-button"); // кнопка открытия попапа добавления новой карточки
const popupAddCardCloseBtn = popupAddCard.querySelector(".popup__close"); // кнопка закрытия
const popupAddCardSubmitBtn = popupAddCard.querySelector(".popup__save"); // кнопка отправки
const popupFieldPlace = popupAddCard.querySelector(".popup__input_field_place"); // поле ввода названия места
const popupFieldLink = popupAddCard.querySelector(".popup__input_field_link"); // поле ввода ссылки на фото
const formElementAddCard = popupAddCard.querySelector(".popup__content"); // часть попапа добавления карточки

const cardElements = document.querySelector(".elements__container");

// функции //
// function validateForms (formSelectors) {
//   const formElements = Array.from(document.querySelectorAll(formSelectors.formSelector));
//   formElements.forEach(formElement => {
//     const form = new FormValidator(formSelectors, formElement);
//     formValidators[formElement.getAttribute('name')] = form;
//     form.enableValidation();
//   });
// }


function openPopup(currentPopup) {
  // функция открытия текущего попапа
  currentPopup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByPressEsc);
  currentPopup.addEventListener("mousedown", closePopupByClickOverlay);
}

function closePopup(currentPopup) {
  // функция закрытия текущего попапа
  currentPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByPressEsc);
  currentPopup.removeEventListener("mousedown", closePopupByClickOverlay);
}

function closePopupByPressEsc(event) {
  // функция закрытия попапа кнопкой esc
  if (event.key === "Escape") {
    const currentOpenPopup = document.querySelector(".popup_is-opened");
    closePopup(currentOpenPopup);
  }
}

function closePopupByClickOverlay(event) {
  // функция закрытия попапа нажатием вне его формы
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function sendDescriptionForm(event) {
  // функция отправки введённых значений из попапа в профиль
  event.preventDefault(); // отмена стандартной отправки формы.
  docNameElement.textContent = popupFieldName.value;
  docSubtitleElement.textContent = popupFieldSubtitle.value;
  closePopup(popupDescription);
}

function sendAddNewCardForm(event) {
  // функция отправки новой карточки через попап
  event.preventDefault();
  const newPlace = {
    name: popupFieldPlace.value,
    link: popupFieldLink.value,
    description: `На фото - ${popupFieldPlace.value}`,
  };

  const newCard = new Card(newPlace, cardTemplate);
  newCard.generateCard(cardElements, false);

  closePopup(popupAddCard);
}

// наполнение страницы контентом //
initialCards.forEach((item) => {
  const card = new Card(item, cardTemplate);
  card.generateCard(cardElements, true);
});

const validatorPopupDescription = new FormValidator(validationConfig, popupDescription);
validatorPopupDescription.enableValidation();

// обработчики событий //
popupOpenDescriptionBtn.addEventListener("click", () => {
  // открытие попапа редактирования профиля
  popupFieldName.value = docNameElement.textContent;
  popupFieldSubtitle.value = docSubtitleElement.textContent;
  validatorPopupDescription.clearErrors();
  openPopup(popupDescription);
});

const validatorPopupAdd = new FormValidator(validationConfig, popupAddCard);
validatorPopupAdd.enableValidation();

popupOpenAddCardBtn.addEventListener("click", () => {
  // открытие попапа добавления карточки
  popupFieldPlace.value = "";
  popupFieldLink.value = "";
  validatorPopupAdd.clearErrors();
  openPopup(popupAddCard);
});

formElementDescription.addEventListener("submit", sendDescriptionForm); // отправка данных с попапа редактирования профиля
formElementAddCard.addEventListener("submit", sendAddNewCardForm); // отправка данных с попапа добавления карточки

popupAddCardCloseBtn.addEventListener("click", (evt) => {
  // закрытие попапа добавления карточки
  closePopup(popupAddCard);
});

popupDescriptionCloseBtn.addEventListener("click", () => {
  // закрытие попапа редактирования профиля
  closePopup(popupDescription);
});
