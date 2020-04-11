import * as React from 'react'
import './Screen.css';

function Screen(props) {
    return (
    <section className="screen">
        {props.children}
    </section>
    );
}

export default Screen;