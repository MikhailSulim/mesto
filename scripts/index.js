// импорт констант и классов
import { initialCards } from "./content.js";
import  {validationConfig, cardTemplate, cardConfig, popupDescription, popupOpenDescriptionBtn, popupFieldName,
  docNameElement, popupFieldSubtitle, docSubtitleElement, popupDescriptionCloseBtn, formElementDescription, popupAddCard, popupOpenAddCardBtn,
  popupAddCardCloseBtn, popupFieldPlace, popupFieldLink, formElementAddCard, popupImage, popupImageLink,
  popupImageDescription, popupImageCloseBtn, cardElements} from "./constants.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";


// функции //
function createNewCard(place) { // функция создания новой карточки
  const newCard = new Card({
    place: place,
    config: cardConfig,
    template: cardTemplate,
    handleCardClick: (name, link, description) => {
      popupImageLink.src = link;
      popupImageLink.alt = description;
      popupImageDescription.textContent = name;
      openPopup(popupImage);
    },
  });
  return newCard;
}

function insertNewCard(where, card, mode) {  // функция добавления созданной карточки в разметку
  switch(mode) {
    case 'append':
      where.append(card.generateCard());
      break;
    case 'prepend':
      where.prepend(card.generateCard());
      break;
    default:
      where.prepend(card.generateCard());
      break;
  }
}

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
  insertNewCard(cardElements, createNewCard(newPlace), 'prepend');
  closePopup(popupAddCard);
}

// наполнение страницы контентом //
initialCards.forEach((item) => {
  insertNewCard(cardElements, createNewCard(item), 'append');
});


//   валидация   //
// добавление валидации на попап редактирования профиля
const validatorPopupDescription = new FormValidator(validationConfig, popupDescription);
validatorPopupDescription.enableValidation();

// добавление валидации на попап добавления новой карточки
const validatorPopupAdd = new FormValidator(validationConfig, popupAddCard);
validatorPopupAdd.enableValidation();


// обработчики событий //
popupOpenDescriptionBtn.addEventListener("click", () => {
  // открытие попапа редактирования профиля
  popupFieldName.value = docNameElement.textContent;
  popupFieldSubtitle.value = docSubtitleElement.textContent;
  validatorPopupDescription.clearErrors();
  openPopup(popupDescription);
});

popupOpenAddCardBtn.addEventListener("click", () => {
  // открытие попапа добавления карточки
  popupFieldPlace.value = "";
  popupFieldLink.value = "";
  validatorPopupAdd.clearErrors();
  openPopup(popupAddCard);
});

formElementDescription.addEventListener("submit", sendDescriptionForm); // отправка данных с попапа редактирования профиля
formElementAddCard.addEventListener("submit", sendAddNewCardForm); // отправка данных с попапа добавления карточки

popupAddCardCloseBtn.addEventListener("click", () => {
  // закрытие попапа добавления карточки
  closePopup(popupAddCard);
});

popupDescriptionCloseBtn.addEventListener("click", () => {
  // закрытие попапа редактирования профиля
  closePopup(popupDescription);
});

popupImageCloseBtn.addEventListener("click", () => {
  // закрытие попапа просмотра увеличенной фотографии
  closePopup(popupImage);
})
