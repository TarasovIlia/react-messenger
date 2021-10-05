import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../modal/createModal'
import { API } from '../../axios/axios'
import ErrorModal from './ErrorModal'

export default function ModalWindow() {
  const [disable, setDisable] = useState(true)
  const [response, setResponce] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch();
  const [formUser, setFormUser] = useState({
    email: '', password: ''
  });

  const fillForm = event => {
    setFormUser({...formUser, [event.target.name] : event.target.value})
    checkForm()
    setError(false)
  }

  const checkForm = () => {
    if (formUser.email.length > 7 && formUser.password.length > 5) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  const sendForm = () => {
    if (!disable) {
      API.post('/api/auth/register', {...formUser})
        .then(response => setResponce(response.data))
        .catch(err => {
          setError(err.response.data.message)
        })
        setFormUser({
          email: '', password: ''
        }),
        setDisable(true)
    }
  }

  const message = <div className='input-from'><h1 style={{textAlign: 'center', color: 'blue'}}>{response.message}</h1></div>

  return (
    <div className='modal-window-main-wrapper'>
      <div className='window'>
        <div className='centre'>
        <h2>TEST</h2>
          {error && <ErrorModal message={error} />}
        </div>
        <button
        onClick={() => dispatch(setModal())}
        className='button close-btn'
        >close</button>
        {response ? 
        message
        :
        <form className='input-from'>
          <label className='topic' htmlFor="email">email</label>
          <input
          onChange={fillForm}
          value={formUser.email}
          className='question-input' 
          type='email'
          name='email'
          id="email" />
          <label className='topic' htmlFor="password">password</label>
          <input
          onChange={fillForm} 
          value={formUser.password}
          className='question-input' 
          type='password'
          name='password' 
          id='password' />
        </form>}
        <div className='centre'>
          {response ?
          <button
          className='button sign-in-button'
          onClick={() => dispatch(setModal())}
          >proceed</button>
          :
          <button
          disabled={disable}
          onClick={sendForm} 
          className={!disable ? 'button sign-in-button' : 'button sign-in-button disable'}
          >sign up</button>}
        </div>
      </div>
    </div>
  )
}