import React, {useState} from "react"
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    return (
        <>
            <Header/>
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}

            />
            <Footer/>
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                name='profile-picture'
                title='Обновить аватар'
                onClose={closeAllPopups}>
                <>
                    <input id="profile-picture" className="popup__input popup__input_type_profile-picture"
                           type="url"
                           name="link"
                           placeholder="Ссылка на фото"
                           required/>
                    <span className="popup__error profile-picture-error"></span>
                </>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                name='profile'
                title='Редактировать профиль'
                onClose={closeAllPopups}>
                <>
                    <input id="profile-fullname" className="popup__input popup__input_type_fullname" type="text"
                           name="fullname" required
                           placeholder="Имя"
                           minLength="2"
                           maxLength="40"/>
                    <span className="popup__error profile-fullname-error"></span>
                    <input id="profile-about" className="popup__input popup__input_type_about" type="text"
                           name="about"
                           required
                           placeholder="Занятие"
                           minLength="2"
                           maxLength="200"/>
                    <span className="popup__error profile-about-error"></span>
                </>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                name='card'
                title='Новое место'
                onClose={closeAllPopups}
                submit='Создать'>
                <>
                    <input id="card-landmark" className="popup__input popup__input_type_landmark" type="text"
                           name="landmark"
                           placeholder="Название"
                           required
                           minLength="2"
                           maxLength="30"/>
                    <span className="popup__error card-landmark-error"></span>
                    <input id="card-link" className="popup__input popup__input_type_link" type="url" name="link"
                           placeholder="Ссылка на картинку"
                           required/>
                    <span className="popup__error card-link-error"></span>
                </>
            </PopupWithForm>
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
        </>
    );
}

export default App;
