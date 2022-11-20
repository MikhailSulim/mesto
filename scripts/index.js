// объявления констант и переменных //
const popupElement = document.querySelector(".popup"); // весь попап
const popupOpenButtonElement = document.querySelector(".profile__edit-button"); // кнопка открытия
const popupCloseButtonElement = popupElement.querySelector(".popup__close"); // кнопка закрытия
const popupNameElement = popupElement.querySelector(".popup__input_field_name"); // поле ввода имени в попапе
const docNameElement = document.querySelector(".profile__name"); // поле отображения имени в профиле
const popupSubtitleElement = popupElement.querySelector(".popup__input_field_subtitle"); // поле ввода имени описания в попапе
const docSubtitleElement = document.querySelector(".profile__subtitle"); // поле отображения описания в профиле
const formElement = popupElement.querySelector(".popup__content"); // часть попапа с контентом

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

// обработчики событий //
popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
