const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config;
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)]; // приведение списка всех найденных инпутов в попапах к массиву
    const button = form.querySelector(submitButtonSelector); // поиск кнопки сохранить на форме

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkFormValid(input, restConfig);
        toggleStyleSubmitBtn(inputs, button, restConfig);
      });
    });
  });
};

function clearErrors(form, config) {
  // функция очистки ошибок валидации в случае, если попап был закрыт без сохранения
  const inputs = form.querySelectorAll(`.${config.inputErrorClass}`);
  const errors = form.querySelectorAll(`.${config.errorClass}`);

  inputs.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });

  errors.forEach((error) => {
    error.textContent = "";
  });
}

function showErrors(input, error, config) { // функция показа стиля ошибок валидации
  error.textContent = input.validationMessage; // добавить подпись ошибки ввода в инпут
  input.classList.add(config.inputErrorClass); // добавить стиль ошибки для инпута
}

function hideErrors(input, error, config) { // функция скрытия стиля ошибок валидации
  error.textContent = "";
  input.classList.remove(config.inputErrorClass); // убрать стиль ошибки для инпута
}

function checkFormValid(input, config) {
  //функция проверки валидности инпутов и установка соответствующих стилей
  const error = document.querySelector(`#${input.id}-error`); //  поиск спан-элемента ошибки для текущего инпута
  // демонстрация ошибки
  if (input.validity.valid) {
    hideErrors(input, error, config);
  } else {
    showErrors(input, error, config);
  }
}

function enableSubmitBtn(button, config) { // функция для активации кнопки отправки
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = "";
}

function disableSubmitBtn(button, config) { // функция деактивации кнопки отправки
  button.classList.add(config.inactiveButtonClass);
  button.disabled = "disabled";
}

function toggleStyleSubmitBtn(inputs, button, config) {
  // функция включения/отключения работоспособности кнопки отправки на форме
  const formValid = inputs.every((input) => {
    return input.validity.valid;
  });
  if (formValid) {
    enableSubmitBtn(button, config);
  } else {
    disableSubmitBtn(button, config);
  }
}

enableValidation(validationConfig);
