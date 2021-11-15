export class FormValidator {
  constructor(validationConfig, form) {
    this._config = validationConfig;
    this._form = form;
    this._inputsList = form.querySelectorAll(validationConfig.inputSelector);
    this._submitButton = form.querySelector(validationConfig.submitButtonSelector);

  };

  _showError (inputElement, errorElement) {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  };

  _hideError (inputElement, errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  };

  _checkInputValidity (inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    if(isInputNotValid) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    };
  };

  _toggleButtonState (button, isActive) {
    if(isActive) {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = true;
    };
  };

  _setEventListeners () {
    Array.from(this._inputsList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isFormValid = this._form.checkValidity();
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._submitButton, isFormValid);
      });
    });

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  };

  enableValidation () {
    this._setEventListeners();
  };

  resetValidation() {
    const isFormValid = this._form.checkValidity();
    this._toggleButtonState(this._submitButton, isFormValid);
    this._inputsList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      this._hideError(inputElement, errorElement);
      inputElement.value = "";
    });
  }
};

