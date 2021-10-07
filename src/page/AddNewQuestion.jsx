import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../axios/axios';
import RadioTabs from'../components/RadioTabs.jsx';
import { Link } from 'react-router-dom'

export default function AddNewQuestion() {
    const [responce, setResponce] = useState(false)
    const [error, setError] = useState(false)
    const admin  = useSelector(state => state.user.value.currentUser.admin)
    const [formQuestion, setFormQuestion] = useState({
        question: '', topic: ''
    })
    const [formTopic, setFormTopic] = useState({
        topic : '', level : '1'
    })

    const handleTopic = selectedTopic => setFormQuestion({topic: selectedTopic})

    const changeFormQuestion = event => {
        setFormQuestion({ ...formQuestion, [event.target.name] : event.target.value})
        setResponce(false)
    } 
    const changeFormTopic = event => {
        setFormTopic({ ...formTopic, [event.target.name] : event.target.value})
        setResponce(false)
    }

    const pushNewQuestion = async () => {
        API.post('/api/question/send', {...formQuestion})
                .then(responce => {
                    setResponce(responce.data.message)
                    setFormQuestion({ question: '', topic : selectedTopic})
                })
                .catch (err => {
                    setError(err.response.data.message)
                })
    }

    const pushNewTopic = async () => {
        API.post('/api/question/topic', {...formTopic})
            .then(responce => {
                setResponce(responce.data.message)
                setFormTopic({ topic : '', level : '1' })
            })
            .catch (err => {
                setError(err.response.data.message)
            })
    }

    if (!admin) {
        return (
            <div style={{ textAlign: 'center'}}>
                <h1 style={{ color: 'blue'}}>Sorry, you don't have permission for this action</h1>
                <p style={{ marginTop : '44px'}}>Log in like admin to have access</p>
                <Link to='/'><button style={{ marginTop : '35px'}} className='button'>Go to home page</button></Link>
            </div>
        )
    }

    return (
        <div className="form">
            <div className='input-container'>
                <div className='radio-container'>
                    <RadioTabs handleTopic={handleTopic} />
                </div>
                <label className='label-form' htmlFor="question"><p>question</p></label>
                <input 
                onChange={changeFormQuestion} 
                value={formQuestion.question} 
                type="text" 
                className="input question-input"
                name="question"
                id="question"
                />
                <button 
                onClick={pushNewQuestion} 
                className="button question-button"
                >create new questions</button>
            </div>
            <div className='input-container'>
                <label className='label-form' htmlFor="topic"><p>topic</p></label>
                <input 
                onChange={changeFormTopic} 
                value={formTopic.topic} 
                type="text" 
                className="input question-input"
                name="topic"
                id="topic"
                />
                <button 
                onClick={pushNewTopic} 
                className="button question-button"
                >create new topic</button>
            </div>
            {responce && 
            <div className='success-message'>
                <p>{responce}</p>
            </div>
            }
            {error && 
            <div className='error-messsage'>
                <p>{error}</p>
                <button className='button-error' onClick={() => setError(false)}>ok</button>
            </div>
            }
        </div>
    )
}