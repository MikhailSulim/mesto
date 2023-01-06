// константы для валидации форм
export const validationConfig = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};


// селекторы
export const cardTemplate = "#card-template";  // селктор карточки

// попап открытия фото крупнее
// открытие фотографии на весь размер
export const popupShowImage = document.querySelector(".popup_type_image"); // попап показа полноразмерного выбранного изображения
export const popupShowImageCloseBtn = popupShowImage.querySelector(".popup__close"); // кнопка закрытия
export const popupImage = popupShowImage.querySelector(".popup__image"); // само фото
export const popupImageCaption = popupShowImage.querySelector(".popup__image-caption"); // подпись к фото

