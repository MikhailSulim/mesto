// импорт констант и классов
import { initialCards } from "./../components/content.js";
import {
  validationConfig,
  cardTemplate,
  cardConfig,
  popupDescription,
  popupOpenDescriptionBtn,
  popupFieldName,
  docNameElement,
  popupFieldSubtitle,
  docSubtitleElement,
  popupAddCard,
  popupOpenAddCardBtn,
  popupFieldPlace,
  popupFieldLink,
  popupImage,
  cardElements,
} from "./../components/constants.js";
import Card from "./../components/Card.js";
import FormValidator from "./../components/FormValidator.js";
import Section from "./../components/Section.js";
import UserInfo from "./../components/UserInfo.js";
import PopupWithImage from "./../components/PopupWithImage.js";
import PopupWithForm from "./../components/PopupWithForm.js";

import "./../pages/index.css";

// создание экземпляров класса //
const cardContainer = new Section(createNewCard, cardElements);
const userInfo = new UserInfo(docNameElement, docSubtitleElement);
const popupShowImage = new PopupWithImage(popupImage);
const popupAddNewCard = new PopupWithForm(popupAddCard, () => {
  const newPlace = {
    name: popupFieldPlace.value,
    link: popupFieldLink.value,
    description: `На фото - ${popupFieldPlace.value}`,
  };
  cardContainer.addItem(createNewCard(newPlace), "prepend");
  popupAddNewCard.close();
});

const popupUserProfile = new PopupWithForm(popupDescription, () => {
  userInfo.setUserInfo({
    name: popupFieldName.value,
    about: popupFieldSubtitle.value,
  });
  popupUserProfile.close();
});

// функции //
function createNewCard(place) {
  // функция создания новой карточки
  const newCard = new Card({
    place: place,
    config: cardConfig,
    template: cardTemplate,
    handleCardClick: handleCardClick,
  });
  return newCard.generateCard();
}

function handleCardClick(imgName, imgLink, imgDescription) {
  popupShowImage.open(imgName, imgLink, imgDescription);
}

// наполнение страницы контентом //
cardContainer.renderItems(initialCards);

//   валидация   //
// добавление валидации на попап редактирования профиля
const validatorPopupDescription = new FormValidator(
  validationConfig,
  popupDescription
);
validatorPopupDescription.enableValidation();

// добавление валидации на попап добавления новой карточки
const validatorPopupAdd = new FormValidator(validationConfig, popupAddCard);
validatorPopupAdd.enableValidation();

// обработчики событий //
// навешивание слушателей для созданных классов
popupAddNewCard.setEventListeners();
popupUserProfile.setEventListeners();
popupShowImage.setEventListeners();

popupOpenDescriptionBtn.addEventListener("click", () => {
  // открытие попапа редактирования профиля
  const { name: userName, about: userAbout } = userInfo.getUserInfo();

  popupFieldName.value = userName;
  popupFieldSubtitle.value = userAbout;
  validatorPopupDescription.clearErrors();
  popupUserProfile.open();
});

popupOpenAddCardBtn.addEventListener("click", () => {
  // открытие попапа добавления карточки
  validatorPopupAdd.clearErrors();
  popupAddNewCard.open();
});