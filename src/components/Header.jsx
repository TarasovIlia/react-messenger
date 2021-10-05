import React from 'react';
import { Link } from 'react-router-dom'
import { setModal } from '../modal/createModal'
import { useDispatch } from 'react-redux';

export default function Header() {
    const dispatch = useDispatch()

    return (
        <header className='header'>
            <div className='navigation-container'>
                <Link to='/'><p>Home</p></Link>
                <Link to='/all'><p>All questions</p></Link>
                <Link to='/addnew'><p>Add new</p></Link>
                <button
                onClick={() => dispatch(setModal())}
                className='button'
                >Sign up</button>
                 <button
                onClick={() => dispatch(setModal())}
                className='button'
                >Sign in</button>
            </div>
        </header>
    )
}