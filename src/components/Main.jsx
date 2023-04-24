import React, {useState,  useEffect} from "react";
import {api} from '../utils/Api'
import Card from './Card'
function Main(props) {

    const [userName, setUserName] = useState('Загрузка данных...')
    const [userDescription, setUserDescription] = useState('Загрузка данных...')
    const [userAvatar, setUserAvatar] = useState('#')
    const [cards, setCards] = useState([])

    useEffect(() => {
        Promise.all([
        api.getUserData(),
            api.getInitialCards()
                ])
                .then(res => {
                setUserName(res[0].name);
                setUserDescription(res[0].about);
                setUserAvatar(res[0].avatar);
                setCards([...res[1]])

                })
            .catch((err) => console.log(err));

    }, []);

    return (
        <main>
            <section className="profile">
                <button onClick={props.onEditAvatar} type="button" aria-label="Сменить аватар" className="profile__avatar-button">
                    <img src={userAvatar} alt="Фото" className="profile__picture"/>
                </button>
                <div className="profile__info">
                    <div className="profile__edit-info">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button"></button>
                    </div>
                    <h2 className="profile__about">{userDescription}</h2>
                </div>
                <button onClick={props.onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {cards.map((card) => (
                        <Card key={card._id}
                              onCardClick={props.onCardClick}
                              card={card}
                        />
                    ))
                    }
                </ul>
            </section>
        </main>
    )
}
export default Main;