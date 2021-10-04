import React, { useState } from 'react'
import { API } from '../axios/axios'


export default function QuestionsCard(props) {
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [modal, setModal] = useState(false)
    const [formQuestion, setFormQuestion] = useState({
        question : '', id : ''
    })

    const deleteQuestions = async () => {
        try {
            await API.post('/api/question/delete', {...formQuestion})
            setModal(!modal)
        } catch (error) {
            console.log(error)
        }
    }

    const handlerModal = () => {
        setModal(!modal)
        setFormQuestion({
            question : props.question, id : props.id
        })
    } 

    return (
        <div 
        onMouseEnter={() => setShowDeleteButton(!showDeleteButton)}
        onMouseLeave={() => setShowDeleteButton(!showDeleteButton)}
        className="card"
        >
            <button 
            onClick={handlerModal} 
            className={showDeleteButton ? 'button-delete' : 'hide button-delete'} 
            style={{color : 'red'}}
            >Delete</button>
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