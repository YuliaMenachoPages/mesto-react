import React, {useState, useEffect} from "react"
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
        console.log(isAddPlacePopupOpen)
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

    useEffect(() => {
        Promise.all([
                api.getUserData(),
                api.getInitialCards()
            ]
        )
            .then(res => {
                setCurrentUser(res[0]);
                setCards([...res[1]])
            })
            .catch((err) => console.log(err));

    }, []);


    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err));
    }

    function handleUpdateUser(userData) {
        api.changeUserData({fullname: userData.name, about: userData.about}).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(userData) {
        api.changeUserAvatar({link: userData.avatar}).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
            .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => setCards((state) => state.filter((c) => c._id !== card._id)
        ))
            .catch((err) => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header/>
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
            />
            <Footer/>
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
