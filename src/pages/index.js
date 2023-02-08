// импорт констант и классов
import Api from "../components/api.js";
import { cohort, token } from "./../utils/authorizationConfig.js";
// import { initialCards } from "../utils/content.js";
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
  popupDelConfirm,
  popupDelConfirmCloseBtn,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import "./index.css";

/*------------------ создание экземпляров класса ------------------*/
const api = new Api({
  serverUrl: `https://mesto.nomoreparties.co/v1/${cohort}`, // класс API
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

const cardContainer = new Section(createNewCard, cardElements);
const userInfo = new UserInfo(docNameElement, docSubtitleElement, avatarImg);
const popupShowImage = new PopupWithImage(popupImage);

const popupAddNewCard = new PopupWithForm(popupAddCard, (newPlace) => {
  popupAddNewCard.setSubmitBtnText("Сохранение...");
  api
    .createCard(newPlace)
    .then((res) => {
      // console.log("response =>", res);
      cardContainer.addItem(createNewCard(newPlace), "prepend");
    })
    .finally(() => {
      popupAddNewCard.setSubmitBtnText("Создать");
      popupAddNewCard.close();
    });
});
// const popupAddNewCard = new PopupWithForm(popupAddCard, (newPlace) => {
//   cardContainer.addItem(createNewCard(newPlace), "prepend");
//   popupAddNewCard.close();
// });

const popupUserProfile = new PopupWithForm(popupDescription, (userValue) => {
  popupUserProfile.setSubmitBtnText("Сохранение...");
  api.setUserInfo(userValue)
  .then(res => {
    console.log("response =>", res);
    // res.name = userValue.name;
    // res.about = userValue.about;
    userInfo.setUserInfo(userValue);
  })
  .finally(() => {
    popupUserProfile.setSubmitBtnText("Сохранить");
    popupUserProfile.close();
  })
});

const popupNewAvatar = new PopupWithForm(popupAvatar, (userValue) => {
  popupNewAvatar.setSubmitBtnText("Сохранение...");
  api.setUserAvatar(userValue)
  .then(res => {
    console.log("newAvatar", res, userValue);
    userInfo.setUserAvatar(userValue);
  })
  .finally(() => {
    popupNewAvatar.setSubmitBtnText("Сохранение...");
    popupNewAvatar.close();
  })

  // userInfo.setUserAvatar(userValue);
});

const popupDeleteCardConfirm = new PopupWithForm(popupDelConfirm);

/*------------------ функции ------------------*/
function createNewCard(place) {
  // функция создания новой карточки
  if (!("description" in place)) place.description = `На фото - ${place.name}`;

  const newCard = new Card({
    place: place,
    config: cardConfig,
    template: cardTemplate,
    handleCardClick: handleCardClick,
    handleCardDelete: handleCardDelete,
  });
  return newCard.generateCard();
}

function handleCardClick(imgName, imgLink, imgDescription) {
  // функция открытия попапа при клике по фото
  popupShowImage.open(imgName, imgLink, imgDescription);
}

function handleCardDelete(event) {
  // функция открытия попапа подтверждения удаления карточки
  console.log(event);
  popupDeleteCardConfirm.open();
  event.target.closest(".element").remove();
}

/*------------------ наполнение страницы контентом ------------------*/
// cardContainer.renderItems(initialCards);
api.getCard().then((res) => { // получение карточек с сервера и вставка их в страницу
  cardContainer.renderItems(res);
  console.log(res);
});

api.getUserInfo()
  .then((res) => { // получение имени и описания пользователя и вставка их в страницу
    // console.log("response =>", res);
    userInfo.setUserInfo({name: res.name, about: res.about});
    userInfo.setUserAvatar({avatar: res.avatar});
    // userInfo.setUserAvatar({avatar: res.avatar});
  });


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
popupDeleteCardConfirm.setEventListeners();

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
