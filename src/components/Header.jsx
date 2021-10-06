import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setModal } from '../modal/createModal';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
    const [logOut, setLogOut] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) =>  state.user.value.user)

    const logOutUser = () => {
        localStorage.removeItem('user')
    }

    return (
        <header className='header'>
            <div className='navigation-container'>
                <Link to='/'><p>Home</p></Link>
                <Link to='/all'><p>All questions</p></Link>
                {user.admin && <Link to='/addnew'><p>Add new</p></Link>}
                {!user ?
                <div className='authorize-container'>
                    <button
                    onClick={() => dispatch(setModal())}
                    className='button'
                    >Sign up</button>
                    <button
                    onClick={() => dispatch(setModal())}
                    className='button'
                    >Log in</button>
                </div>
                :
                <div className='authorize-container'>
                    <button 
                    className='button log-out-button'
                    onMouseEnter={() => setLogOut('Log out')}
                    onMouseLeave={() => setLogOut(false)}
                    onClick={logOutUser}
                    >{logOut || user.email }</button>
                </div>}
            </div>
        </header>
    )
}