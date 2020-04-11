import * as React from 'react'
import './Information.css';


function Information(props) {
    return (
        <section className="information">
        <div className="information__text">Погода в городе: {props.city}</div>
        <div className="information__text">За окном: {props.weather}</div>
        <div className="information__text">Температура: {props.temp}&deg;</div>
        <div className="information__text">Влажность: {props.humidity}%</div>    
        <div className="information__text">Ветер: {props.wind} м/с</div>
        </section>
    );
}

export default Information;