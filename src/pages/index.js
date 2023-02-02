// импорт констант и классов
import { initialCards } from "../utils/content.js";
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
  popupImage,
  cardElements,
  popupAvatar,
  popupOpenAvatarBtn,
  avatarImg,
  popupFieldLinkAvatar,
  popupAvatarCloseBtn,
  formElementAvatar,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import "./index.css";

/*------------------ создание экземпляров класса ------------------*/
const cardContainer = new Section(createNewCard, cardElements);
const userInfo = new UserInfo(docNameElement, docSubtitleElement, avatarImg);
const popupShowImage = new PopupWithImage(popupImage);

const popupAddNewCard = new PopupWithForm(popupAddCard, (newPlace) => {
  cardContainer.addItem(createNewCard(newPlace), "prepend");
  popupAddNewCard.close();
});

const popupUserProfile = new PopupWithForm(popupDescription, (userValue) => {
  userInfo.setUserInfo(userValue);
  popupUserProfile.close();
});

const popupNewAvatar = new PopupWithForm(popupAvatar, (userValue) => {
  userInfo.setUserAvatar(userValue);
  popupNewAvatar.close();
});

/*------------------ функции ------------------*/
function createNewCard(place) {
  // функция создания новой карточки
  if (!("description" in place)) place.description = `На фото - ${place.name}`;

  const newCard = new Card({
    place: place,
    config: cardConfig,
    template: cardTemplate,
    handleCardClick: handleCardClick,
  });
  return newCard.generateCard();
}

function handleCardClick(imgName, imgLink, imgDescription) {
  // функция открытия попапа при клике по фото
  popupShowImage.open(imgName, imgLink, imgDescription);
}

/*------------------ наполнение страницы контентом ------------------*/
cardContainer.renderItems(initialCards);

/*------------------ валидация ------------------*/
// добавление валидации на попап редактирования профиля
const validatorPopupDescription = new FormValidator(
  validationConfig,
  popupDescription
);
validatorPopupDescription.enableValidation();

// добавление валидации на попап добавления новой карточки
const validatorPopupAdd = new FormValidator(validationConfig, popupAddCard);
validatorPopupAdd.enableValidation();

// добавление валидации на попап замены аватара
const validatorPopupAvatar = new FormValidator(validationConfig, popupAvatar);
validatorPopupAvatar.enableValidation();

/*------------------ обработчики событий ------------------*/
// навешивание слушателей для созданных классов
popupAddNewCard.setEventListeners();
popupUserProfile.setEventListeners();
popupShowImage.setEventListeners();
popupNewAvatar.setEventListeners();

popupOpenDescriptionBtn.addEventListener("click", () => {
  // открытие попапа редактирования профиля
  const userData = userInfo.getUserInfo();

  popupFieldName.value = userData.name;
  popupFieldSubtitle.value = userData.about;
  validatorPopupDescription.clearErrors();
  popupUserProfile.open();
});

popupOpenAddCardBtn.addEventListener("click", () => {
  // открытие попапа добавления карточки
  validatorPopupAdd.clearErrors();
  popupAddNewCard.open();
});

popupOpenAvatarBtn.addEventListener("click", () => {
  // открытие попапа смены аватара
  validatorPopupAvatar.clearErrors();
  popupNewAvatar.open();
});
