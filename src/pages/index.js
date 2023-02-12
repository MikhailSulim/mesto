// импорт констант и классов
import Api from "../components/Api.js";
import { cohort, token } from "./../utils/authorizationConfig.js";
import {
  validationConfig,
  cardTemplate,
  cardConfig,
  popupDescription,
  popupDescriptionSelector,
  popupOpenDescriptionBtn,
  popupFieldName,
  docNameElement,
  popupFieldSubtitle,
  docSubtitleElement,
  popupAddCard,
  popupAddCardSelector,
  popupOpenAddCardBtn,
  popupImageSelector,
  cardElements,
  popupAvatarSelector,
  popupAvatar,
  popupOpenAvatarBtn,
  avatarImg,
  popupDelConfirmSelector,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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

// классы попапов
const popupShowImage = new PopupWithImage(popupImageSelector);
const popupAddNewCard = new PopupWithForm(popupAddCardSelector, (newCardData) => {
  popupAddNewCard.setSubmitBtnText("Сохранение...");
  api
    .createCard(newCardData)
    .then((newCardData) => {
      cardContainer.addItem(createNewCard(newCardData), "prepend");
      popupAddNewCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddNewCard.setSubmitBtnText("Создать");
    });
});
const popupUserProfile = new PopupWithForm(popupDescriptionSelector, (userValue) => {
  popupUserProfile.setSubmitBtnText("Сохранение...");
  api
    .setUserInfo(userValue)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupUserProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupUserProfile.setSubmitBtnText("Сохранить");
    });
});
const popupNewAvatar = new PopupWithForm(popupAvatarSelector, (userValue) => {
  popupNewAvatar.setSubmitBtnText("Сохранение...");
  api
    .setUserAvatar(userValue)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupNewAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupNewAvatar.setSubmitBtnText("Сохранить");
    });
});
const popupDeleteCardConfirm = new PopupWithConfirmation(popupDelConfirmSelector);

// классы валидации
const validatorPopupDescription = new FormValidator(validationConfig, popupDescription);
const validatorPopupAdd = new FormValidator(validationConfig, popupAddCard);
const validatorPopupAvatar = new FormValidator(validationConfig, popupAvatar);


/*------------------ функции ------------------*/
function createNewCard(cardData) {
  // функция создания новой карточки
  if (!("description" in cardData))
    cardData.description = `На фото - ${cardData.name}`;
  const newCard = new Card({
    cardData: cardData,
    config: cardConfig,
    userId: userInfo.getUserId(),
    template: cardTemplate,
    handleCardClick: () => {
      // колбек открытия попапа при клике по фото
      popupShowImage.open(cardData.name, cardData.link, cardData.description);
    },
    handleCardDelete: () => {
      // колбек удаления карточки
      popupDeleteCardConfirm.open();
      popupDeleteCardConfirm.updateSubmit(() => {
        popupDeleteCardConfirm.setSubmitBtnText("Удаление...");
        api
          .deleteCard(cardData._id)
          .then(() => {
            newCard.deleteCard();
            popupDeleteCardConfirm.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            popupDeleteCardConfirm.setSubmitBtnText("Да");
          });
      });
    },
    handleLikeClick: () => {
      // колбек лайка карточки
      if (newCard.isLiked) {
        api.removeLike(cardData._id).then((cardData) => {
          newCard.removeLikeCard();
          newCard.updLikesCounter(cardData.likes);
        })
        .catch((err) => console.log(err));
      } else {
        api.addLike(cardData._id).then((cardData) => {
          newCard.addLikeCard();
          newCard.updLikesCounter(cardData.likes);
        })
        .catch((err) => console.log(err));
      }
    },
  });
  return newCard.generateCard();
}

/*------------------ наполнение страницы контентом ------------------*/
api
  .getAllData()
  .then((res) => {
    const [initialCards, userData] = res;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      userId: userData._id,
    });
    userInfo.setUserAvatar({ avatar: userData.avatar });
    cardContainer.renderItems(initialCards);
  })
  .catch((err) => console.error(err));

/*------------------ валидация ------------------*/
// добавление валидации на попап редактирования профиля
validatorPopupDescription.enableValidation();

// добавление валидации на попап добавления новой карточки
validatorPopupAdd.enableValidation();

// добавление валидации на попап замены аватара
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
