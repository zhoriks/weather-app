import * as React from 'react'
import './error.css';

function Error(props) {
    return (
        <div className="error">
        <div className="error__text">Такой город отыскать не удалось :(</div>
        <button className="error__button" onClick={props.handleReset}>Еще</button>
      </div>
    );
}

export default Error;
