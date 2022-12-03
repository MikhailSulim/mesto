// объявления констант и переменных //
// редактирование профиля
const popupDescriptionElement = document.querySelector(".popup_type_description"); // попап редактирования профиля
const popupOpenButtonElement = document.querySelector(".profile__edit-button"); // кнопка открытия попапа редактирования профиля
const popupNameElement = popupDescriptionElement.querySelector(".popup__input_field_name"); // поле ввода имени в попапе
const docNameElement = document.querySelector(".profile__name"); // поле отображения имени в профиле
const popupSubtitleElement = popupDescriptionElement.querySelector(".popup__input_field_subtitle"); // поле ввода имени описания в попапе
const docSubtitleElement = document.querySelector(".profile__subtitle"); // поле отображения описания в профиле
const popupDescriptionCloseButtonElement = popupDescriptionElement.querySelector(".popup__close"); // кнопка закрытия
const formElementDescription = popupDescriptionElement.querySelector(".popup__content"); // часть попапа редактирования профиля с контентом

// добавление новой карточки
const popupAddCardElement = document.querySelector(".popup_type_add-card"); // попап добавления новой карточки
const popupOpenButtonAddCard = document.querySelector(".add-button"); // кнопка открытия попапа добавления новой карточки
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector(".popup__close"); // кнопка закрытия
const formElementAddCard = popupAddCardElement.querySelector(".popup__content");  // часть попапа добавления карточки
const popupPlaceElement = popupAddCardElement.querySelector(".popup__input_field_place");   // поле ввода названия места
const popupLinkElement = popupAddCardElement.querySelector(".popup__input_field_link");  // поле ввода ссылки на фото

// открытие фотографии на весь размер
const popupShowImage = document.querySelector(".popup_type_image");  // попап показа полноразмерного выбранного изображения
const popupShowImageCloseButton = popupShowImage.querySelector(".popup__close"); // кнопка закрытия
const popupImageLink = popupShowImage.querySelector(".popup__image"); // само фото
const popupImageCaption = popupShowImage.querySelector(".popup__image-caption"); // подпись к фото

// контент страницы
const initialCards = [
  {
    name: "Лобня",
    link: "https://live.staticflickr.com/5508/11602145884_f8625acaa5_o.jpg",
    description: "Изображение Спасской церкви в микрорайоне Киово в городе Лобня зимним солнечным днём"
  },
  {
    name: "Новгород Великий",
    link: "https://live.staticflickr.com/7388/11736284475_c400ebe472_o.jpg",
    description: "Изображение панорамы на реку Волхов и стену Новгородского кремля с одной из его башен"
  },
  {
    name: "Хельсинки",
    link: "https://live.staticflickr.com/7567/15073871604_8a4324dc49_o.jpg",
    description: "Изображение Олимпийского стадиона и его башни в Хельсинки"
  },
  {
    name: "Дмитров",
    link: "https://live.staticflickr.com/3672/11755853735_ba32452dd1_o.jpg",
    description: "Изображение памятника Юрию Долгорукому на фоне собора дмитровского кремля"
  },
  {
    name: "Санкт-Петербург",
    link: "https://live.staticflickr.com/5528/11692734935_8d6a9ed03c_o.jpg",
    description: "Изображение Исаакиевского собора в Санкт-Петербурге с высоты птичьего полёта"
  },
  {
    name: "Эспоо",
    link: "https://live.staticflickr.com/1629/24574611523_4369cff19a_o.jpg",
    description: "Вечернее изображение лыжни в свете фонарей в центральном парке города Эспоо"
  },
];

// заполнение страницы контентом
const cardTemplate = document.querySelector("#card-template").content;
const cardElements = document.querySelector(".elements__container");



// функции //
const openPopupDescription = function () {
  // функция открытия попапа редактирования профиля
  popupDescriptionElement.classList.add("popup_is-opened");
  popupNameElement.value = docNameElement.textContent;
  popupSubtitleElement.value = docSubtitleElement.textContent;
};

const openPopupAddCard = function () {
  // функция открытия попапа добавления карточки
  popupAddCardElement.classList.add("popup_is-opened");
  popupPlaceElement.value = "";  // очистка полей для повторного использования
  popupLinkElement.value = "";
};

function closePopup(event) {
  // функция закрытия текущего попапа
  event.target.closest(".popup").classList.remove("popup_is-opened");
}

function formDescriptionSubmitHandler(event) {
  // функция отправки введённых значений из попапа в профиль
  event.preventDefault(); // отмена стандартной отправки формы.
  docNameElement.textContent = popupNameElement.value;
  docSubtitleElement.textContent = popupSubtitleElement.value;
  closePopup(event);
}

function formAddSubmitHandler(event) {
  // функция отправки новой карточки через попап
  event.preventDefault();
  const newPlace = {name: popupPlaceElement.value, link: popupLinkElement.value, description: "Картинка добавлена пользователем, если вы это читаете - ссылка битая"};
  const newCard = createCard(newPlace);
  cardElements.prepend(newCard);
  closePopup(event);
}

function handleLike(event) {
  event.target.closest(".element__like").classList.toggle("element__like_is-liked");
}

function handleDeleteCard(event) {
  event.target.closest(".element").remove();
}

function handleShowImage(event) {
  // функция открытия попапа добавления карточки
  const currentCard = event.target.closest(".element");
  const currentImageLink = currentCard.querySelector(".element__img");
  const currentTitle = currentCard.querySelector(".element__title");

  popupImageLink.src = currentImageLink.src;
  popupImageCaption.textContent = currentTitle.textContent;
  popupShowImage.classList.add("popup_is-opened");

}

function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector(".element__title");
  cardTitle.textContent = item.name;
  const cardImageLink = newCard.querySelector(".element__img");
  cardImageLink.src = item.link;
  cardImageLink.alt = item.description;
  const likeButton = newCard.querySelector(".element__like");
  likeButton.addEventListener("click", handleLike);
  const deleteButton = newCard.querySelector(".element__delete");
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImageLink.addEventListener("click", handleShowImage);
  return newCard;
}

// наполнение страницы контентом //
initialCards.forEach(function (item) {
  const card = createCard(item);
  cardElements.append(card);
});

// обработчики событий //
popupOpenButtonElement.addEventListener("click", openPopupDescription); // открытие попапа редактирования профиля
popupOpenButtonAddCard.addEventListener("click", openPopupAddCard); // открытие попапа добавления карточки
formElementDescription.addEventListener("submit", formDescriptionSubmitHandler); // отправка данных с попапа редактирования профиля
formElementAddCard.addEventListener("submit", formAddSubmitHandler); // отправка данных с попапа добавления карточки
popupShowImageCloseButton.addEventListener("click", closePopup); // закрытие попапа просмотра фото
popupAddCardCloseButtonElement.addEventListener("click", closePopup); // закрытие попапа добавления карточки
popupDescriptionCloseButtonElement.addEventListener("click", closePopup); // закрытие попапа редактирования профиля
