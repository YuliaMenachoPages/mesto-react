import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="element">
            <button type="button" aria-label="Удалить" className="element__delete element__delete_type_white"></button>
            <div className="element__fallback">
                {/*<button type="button" aria-label="Удалить" className="element__delete element__delete_type_black"></button>*/}
                <img onClick={handleClick} src={props.card.link} className="element__picture" alt="Фото."/>
            </div>
            <div className="element__info">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like">
                    <button type="button" aria-label="Лайк" className="element__icon"></button>
                    <p className="element__counter">{[...props.card.likes].length}</p>
                </div>
            </div>
        </li>

    )
}
export default Card;