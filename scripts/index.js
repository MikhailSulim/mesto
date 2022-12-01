// объявления констант и переменных //
const popupElement = document.querySelector(".popup"); // весь попап
// const popupAddElement = document.querySelector(".popup_add");
const popupOpenButtonElement = document.querySelector(".profile__edit-button"); // кнопка открытия
const popupCloseButtonElement = popupElement.querySelector(".popup__close"); // кнопка закрытия
const popupNameElement = popupElement.querySelector(".popup__input_field_name"); // поле ввода имени в попапе
const docNameElement = document.querySelector(".profile__name"); // поле отображения имени в профиле
const popupSubtitleElement = popupElement.querySelector(
  ".popup__input_field_subtitle"
); // поле ввода имени описания в попапе
const docSubtitleElement = document.querySelector(".profile__subtitle"); // поле отображения описания в профиле
const formElement = popupElement.querySelector(".popup__content"); // часть попапа с контентом
// const popupAddOPenButtonElement = docNameElement.querySelector(".add-button");

// функции //
const openPopup = function () {
  // функция открытия попапа
  popupElement.classList.add("popup_is-opened");
  popupNameElement.value = docNameElement.textContent;
  popupSubtitleElement.value = docSubtitleElement.textContent;
};

// const openAddPopup = function () {
//   popupAddElement.classList.add("popup_is-opened");

// }

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
// popupAddOPenButtonElement.addEventListener("click", openAddPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

const initialCards = [
  {
    name: "Лобня",
    link: "https://live.staticflickr.com/5508/11602145884_f8625acaa5_o.jpg",
    description:
      "Изображение Спасской церкви в районе Киово в городе Лобня в ясный зимний день",
  },
  {
    name: "Новгород Великий",
    link: "https://live.staticflickr.com/7388/11736284475_c400ebe472_o.jpg",
    description:
      "Изображение панорамы на реку Волхов и стену новгородского кремля с одной из его башен",
  },
  {
    name: "Павловск",
    link: "https://live.staticflickr.com/3794/11737267794_0d60b94473_o.jpg",
    description: "Изображение скульптуры музы Эвтерпы из Павловского парка",
  },
  {
    name: "Дмитров",
    link: "https://live.staticflickr.com/3672/11755853735_ba32452dd1_o.jpg",
    description:
      "Изображение памятника Юрию Долгорукому на фоне Успенсокго собора в Дмитрове",
  },
  {
    name: "Санкт-Петербург",
    link: "https://live.staticflickr.com/5528/11692734935_8d6a9ed03c_o.jpg",
    description:
      "Изображение Исаакиевского собора в Санкт-Петербурге с высоты птичьего полёта",
  },
  {
    name: "Эспоо",
    link: "https://live.staticflickr.com/1679/24570757004_3b93335705_o.jpg",
    description:
      "Изображение вечерней лыжной трассы при свете фонарей в центральном парке Эспоо, Финляндия",
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


  return newCard;
}

initialCards.forEach(function (item) {
  const card = createCard(item);
  cardElements.append(card);
});
