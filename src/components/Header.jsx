import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='header'>
            <div className='navigation-container'>
                <Link to='/'><p>Home</p></Link>
                <Link to='/questions'><p>Questions</p></Link>
                <Link to='/all'><p>All questions</p></Link>
                <Link to='/addnew'><p>Add new</p></Link>
            </div>
        </header>
    )
}