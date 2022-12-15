// объявления констант и переменных //
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
const popupFieldPlace = popupAddCard.querySelector(".popup__input_field_place");   // поле ввода названия места
const popupFieldLink = popupAddCard.querySelector(".popup__input_field_link");  // поле ввода ссылки на фото
const formElementAddCard = popupAddCard.querySelector(".popup__content");  // часть попапа добавления карточки

// открытие фотографии на весь размер
const popupShowImage = document.querySelector(".popup_type_image");  // попап показа полноразмерного выбранного изображения
const popupShowImageCloseBtn = popupShowImage.querySelector(".popup__close"); // кнопка закрытия
const popupImage = popupShowImage.querySelector(".popup__image"); // само фото
const popupImageCaption = popupShowImage.querySelector(".popup__image-caption"); // подпись к фото

// заполнение страницы контентом
const cardTemplate = document.querySelector("#card-template").content;
const cardElements = document.querySelector(".elements__container");


// функции //
function openPopup(currentPopup) {
  // функция открытия текущего попапа
  currentPopup.classList.add("popup_is-opened");
  // currentPopup.addEventListener("input", enableValidation);
  document.addEventListener('keydown', closePopupByPressEsc);
  currentPopup.addEventListener('mousedown', closePopupByClickOverlay);
}

function closePopup(currentPopup) {
  // функция закрытия текущего попапа
  currentPopup.classList.remove("popup_is-opened");
  // currentPopup.removeEventListener("input", enableValidation);
  document.removeEventListener('keydown', closePopupByPressEsc);
  currentPopup.removeEventListener('mousedown', closePopupByClickOverlay);
}

function closePopupByPressEsc(event) {  // функция закрытия попапа кнопкой esc
  const currentOpenPopup = document.querySelector(".popup_is-opened");
  if (event.key === 'Escape') {
    closePopup(currentOpenPopup);
  }
}

function closePopupByClickOverlay(event) { // функция закрытия попапа нажатием вне его формы
  const currentOpenPopup = document.querySelector(".popup_is-opened");
  if (event.target === event.currentTarget) {
    closePopup(currentOpenPopup);
  }
}

function sendDescriptionForm(event) {
  // функция отправки введённых значений из попапа в профиль
  event.preventDefault(); // отмена стандартной отправки формы.
  docNameElement.textContent = popupFieldName.value;
  docSubtitleElement.textContent = popupFieldSubtitle.value;
  closePopup(event.target.closest(".popup"));
}

function sendAddNewCardForm(event) {
  // функция отправки новой карточки через попап
  event.preventDefault();
  const newPlace = {name: popupFieldPlace.value, link: popupFieldLink.value, description: "Картинка добавлена пользователем, если вы это читаете - ссылка битая"};
  const newCard = createCard(newPlace);
  cardElements.prepend(newCard);
  closePopup(event.target.closest(".popup"));

}

function handleLike(event) {
  // функция установки или снятия лайка с фото
  event.target.closest(".element__like").classList.toggle("element__like_is-liked");
}

function handleDeleteCard(event) {
  // функция удаления карточки с фото
  event.target.closest(".element").remove();
}

function createCard(item) {
  // функция создания новой карточки
  const newCard = cardTemplate.cloneNode(true);     // копирование содержимого заготовки template
  const cardTitle = newCard.querySelector(".element__title"); // элемент карточки название
  const cardImageLink = newCard.querySelector(".element__img"); // элемент карточки фотография
  const likeButton = newCard.querySelector(".element__like"); // элемент карточки кнопка лайка
  const deleteButton = newCard.querySelector(".element__delete"); // элемент карточки кнопка удаления

  cardTitle.textContent = item.name;  // присвоить название
  cardImageLink.src = item.link; // присвоить линк фото
  cardImageLink.alt = item.description; // присвоить описание alt

  likeButton.addEventListener("click", handleLike);  // обработчик нажатия на кнопку лайка
  deleteButton.addEventListener("click", handleDeleteCard); // обработчик нажатия на кнопку удаления
  cardImageLink.addEventListener("click", () => {popupImage.src = item.link; popupImageCaption.textContent = item.name; openPopup(popupShowImage) } );// обработчик нажатия на фото для появления попапа с полноразмерной версией
  return newCard;
}

// наполнение страницы контентом //
initialCards.forEach(function (item) {
  const card = createCard(item);
  cardElements.append(card);
});

// обработчики событий //
popupOpenDescriptionBtn.addEventListener("click", () => {popupFieldName.value = docNameElement.textContent;   popupFieldSubtitle.value = docSubtitleElement.textContent;
  clearError(popupDescription); openPopup(popupDescription)}); // открытие попапа редактирования профиля
popupOpenAddCardBtn.addEventListener("click", () => {popupFieldPlace.value = ""; popupFieldLink.value = ""; clearError(popupAddCard); openPopup(popupAddCard)}); // открытие попапа добавления карточки
formElementDescription.addEventListener("submit", sendDescriptionForm); // отправка данных с попапа редактирования профиля
formElementAddCard.addEventListener("submit", sendAddNewCardForm); // отправка данных с попапа добавления карточки
popupShowImageCloseBtn.addEventListener("click", () => {closePopup(popupShowImage)}); // закрытие попапа просмотра фото
popupAddCardCloseBtn.addEventListener("click", () => {closePopup(popupAddCard)}); // закрытие попапа добавления карточки
popupDescriptionCloseBtn.addEventListener("click", () => {closePopup(popupDescription)}); // закрытие попапа редактирования профиля
