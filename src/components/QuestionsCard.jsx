import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook.js';

export default function QuestionsCard(props) {
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [modal, setModal] = useState(false)
    const {loading, request} = useHttp()
    const [formQuestion, setFormQuestion] = useState({
        question : '', id : ''
    })


    async function deleteQuestions() {
        try {
            const data = await request('http://localhost:3000/api/question/delete', 'DELETE', {...formQuestion})
            setModal(!modal)
        } catch (err) {}
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
                <p>delete selected questions</p>
                <div className='row'>
                    <button 
                    onClick={() => deleteQuestions()} 
                    className='button button-error' 
                    style={{color : 'red'}}
                    >Yes</button>
                    <button 
                    onClick={() => setModal(!modal)} 
                    className='button button-error' 
                    style={{color : 'green'}}
                    >No</button>
                </div>
            </div>}
            <p className='topic'>{props.topic}</p>
            <p>{props.question}</p>
        </div>
    )
}