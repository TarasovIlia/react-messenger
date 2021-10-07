import React, { useState } from 'react';
import { API } from '../axios/axios';
import { useDispatch, useSelector } from 'react-redux';


export default function QuestionsCard(props) {
    const user = useSelector((state) =>  state.user.value.currentUser)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [responce, setResponce] = useState(false)
    const [modal, setModal] = useState(false)
    const [formQuestion, setFormQuestion] = useState({
        question : '', id : ''
    })

    const deleteQuestions = async () => {
      API.post('/api/question/delete', {...formQuestion})
      .then(responce => {
          setResponce(responce.data.message)
          //setModal(!modal)
      })
      .catch (err => {
          console.log(err)
      })
    }

    const handlerModal = () => {
        setModal(!modal)
        setFormQuestion({
            question : props.question, id : props.id
        })
    }
    if (responce) {
        return (
            <div className='card'>
                <p style={{color : 'red'}}>{responce}</p>
            </div>
        )
    }

    return (
        <div 
        onMouseEnter={() => setShowDeleteButton(!showDeleteButton)}
        onMouseLeave={() => setShowDeleteButton(!showDeleteButton)}
        className='card'>
            {user.admin && <button 
            onClick={handlerModal} 
            className={showDeleteButton ? 'button-delete' : 'hide button-delete'} 
            style={{color : 'red'}}
            >Delete</button>}
            {modal &&
            <div className='modal-cart-menu'>
                <p className='topic'>delete selected questions?</p>
                <div className='row'>
                    <button 
                    onClick={() => deleteQuestions()} 
                    className='button-error' 
                    style={{color : 'red'}}
                    >Yes</button>
                    <button 
                    onClick={() => setModal(!modal)} 
                    className='button-error' 
                    style={{color : 'green'}}
                    >No</button>
                </div>
            </div>}
            <p className='topic'>{props.topic}</p>
            <p>{props.question}</p>
        </div>
    )
}