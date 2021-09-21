import React from 'react';

export default function Header({switchOnClick, startOnClick}) {
    return (
        <header className='header'>
            <div className='navigation-container'>
                <h2>header</h2>
                <button className='button' onClick={switchOnClick}>add new question</button>
                <button className='button' onClick={startOnClick}>start</button>
            </div>
        </header>
    )
}