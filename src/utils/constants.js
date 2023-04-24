export {
    popupOnProfile,
    nameInput,
    jobInput,
    popupOnCard,
    popupOnAvatar,
    validationFields,
}

const popupOnProfile = document.querySelector('.profile__edit-button');
// Обработка формы Submit
const nameInput = document.querySelector('.popup__input_type_fullname');
const jobInput = document.querySelector('.popup__input_type_about');

// Переменные для создания карточек

const popupOnCard = document.querySelector('.profile__add-button');// Переменные для создания карточек

// Переменные для изменения аватара

const popupOnAvatar = document.querySelector('.profile__avatar-button');


//Переменные для валидации
const validationFields = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};