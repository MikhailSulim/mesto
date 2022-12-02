// объявления констант и переменных //
// const popupElement = document.querySelector(".popup"); //////////////// весь попап

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
  popupPlaceElement.value = "";
  popupLinkElement.value = "";
};

const closeDescriptionPopup = function () {
  // функция закрытия попапа редактирования профиля
  popupDescriptionElement.classList.remove("popup_is-opened");
};

const closeAddCardPopup = function () {
  // функция закрытия попапа добавления карточки
  popupAddCardElement.classList.remove("popup_is-opened");
};

const closeShowImagePopup = function () {
  // функция закрытия полноразмерного фото
  popupShowImage.classList.remove("popup_is-opened");
};

function formDescriptionSubmitHandler(evt) {
  // функция отправки введённых значений из попапа в профиль
  evt.preventDefault(); // отмена стандартной отправки формы.
  docNameElement.textContent = popupNameElement.value;
  docSubtitleElement.textContent = popupSubtitleElement.value;
  closeDescriptionPopup();
}

function formAddSubmitHandler(event) {
  // функция отправки новой карточки через попап
  event.preventDefault();
  const newPlace = {name: popupPlaceElement.value, link: popupLinkElement.value};
  const newCard = createCard(newPlace);
  console.log(newPlace);
  cardElements.prepend(newCard);
  closeAddCardPopup();
}

// обработчики событий //
popupOpenButtonElement.addEventListener("click", openPopupDescription); // открытие попапа редактирования профиля
popupOpenButtonAddCard.addEventListener("click", openPopupAddCard); // открытие попапа добавления карточки
popupDescriptionCloseButtonElement.addEventListener("click", closeDescriptionPopup); // закрытие попапа редактирования профиля
popupAddCardCloseButtonElement.addEventListener("click", closeAddCardPopup);
formElementDescription.addEventListener("submit", formDescriptionSubmitHandler);
formElementAddCard.addEventListener("submit", formAddSubmitHandler);

popupShowImageCloseButton.addEventListener("click", closeShowImagePopup);

const initialCards = [
  {
    name: "Лобня",
    link: "https://live.staticflickr.com/5508/11602145884_f8625acaa5_o.jpg",
    // description:
    //   "Изображение Спасской церкви в районе Киово в городе Лобня в ясный зимний день",
  },
  {
    name: "Новгород Великий",
    link: "https://live.staticflickr.com/7388/11736284475_c400ebe472_o.jpg",
    // description:
    //   "Изображение панорамы на реку Волхов и стену новгородского кремля с одной из его башен",
  },
  {
    name: "Павловск",
    link: "https://live.staticflickr.com/3794/11737267794_0d60b94473_o.jpg",
    // description: "Изображение скульптуры музы Эвтерпы из Павловского парка",
  },
  {
    name: "Дмитров",
    link: "https://live.staticflickr.com/3672/11755853735_ba32452dd1_o.jpg",
    // description:
    //   "Изображение памятника Юрию Долгорукому на фоне Успенсокго собора в Дмитрове",
  },
  {
    name: "Санкт-Петербург",
    link: "https://live.staticflickr.com/5528/11692734935_8d6a9ed03c_o.jpg",
    // description:
    //   "Изображение Исаакиевского собора в Санкт-Петербурге с высоты птичьего полёта",
  },
  {
    name: "Эспоо",
    link: "https://live.staticflickr.com/1679/24570757004_3b93335705_o.jpg",
    // description:
    //   "Изображение вечерней лыжной трассы при свете фонарей в центральном парке Эспоо, Финляндия",
  },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardElements = document.querySelector(".elements__container");

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
  // console.log(event.target.closest(".element"));
  popupShowImage.classList.add("popup_is-opened");

}


const newCardButtonElement = document.querySelector(".add-button");
newCardButtonElement.addEventListener("click", openPopupAddCard);

function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector(".element__title");
  cardTitle.textContent = item.name;
  const cardImageLink = newCard.querySelector(".element__img");
  cardImageLink.src = item.link;
  // cardImageLink.alt = item.description;

  const likeButton = newCard.querySelector(".element__like");
  likeButton.addEventListener("click", handleLike);

  const deleteButton = newCard.querySelector(".element__delete");
  deleteButton.addEventListener("click", handleDeleteCard);

  cardImageLink.addEventListener("click", handleShowImage);

  return newCard;
}

initialCards.forEach(function (item) {
  const card = createCard(item);
  cardElements.append(card);
});
