// объявления констант и переменных //
const popupElement = document.querySelector(".popup"); // весь попап
const popupOpenButtonElement = document.querySelector(".profile__edit-button"); // кнопка открытия
const popupCloseButtonElement = popupElement.querySelector(".popup__close"); // кнопка закрытия
let popupNameElement = popupElement.querySelector(".popup__name"); // поле ввода имени в попапе
let docNameElement = document.querySelector(".profile__name"); // поле отображения имени в профиле
let popupSubtitleElement = popupElement.querySelector(".popup__subtitle"); // поле ввода имени описания в попапе
let docSubtitleElement = document.querySelector(".profile__subtitle"); // поле отображения описания в профиле
let formElement = popupElement.querySelector(".popup__content"); // часть попапа с контентом

// функции //
const openPopup = function () {
  // функция открытия попапа
  popupElement.classList.add("popup_is-opened");
  popupNameElement.value = docNameElement.textContent;
  popupSubtitleElement.value = docSubtitleElement.textContent;
};

const closePopup = function () {
  // функция закрытия попапа
  popupElement.classList.remove("popup_is-opened");
};

function formSubmitHandler(evt) {
  // функция отправки введённых значений из попапа в профиль
  evt.preventDefault(); // отмена стандартной отправки формы.
  docNameElement.textContent = popupNameElement.value;
  docSubtitleElement.textContent = popupSubtitleElement.value;
  closePopup();
}

const closePopupByClickOverlay = function (event) {
  // функция закрытия попапа при клике вне формы редактирования
  if (event.target === event.currentTarget) closePopup();
};

// обработчики событий //
popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupByClickOverlay);
formElement.addEventListener("submit", formSubmitHandler);
