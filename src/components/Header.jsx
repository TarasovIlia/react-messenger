import React from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='header'>
            <div className='navigation-container'>
                <Link to='/'>Home</Link>
                <Link to='/questions'>Questions</Link>
                <Link to='/all'>All questions</Link>
                <Link to='/addnew'>Add new</Link>
            </div>
        </header>
    )
}