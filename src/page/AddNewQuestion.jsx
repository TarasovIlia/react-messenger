import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../axios/axios';
import RadioTabs from'../components/RadioTabs.jsx';
import { Link } from 'react-router-dom'

export default function AddNewQuestion() {
    const [sendConfirm, SetSendConfirm] = useState(false)
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
        SetSendConfirm(false)
    } 
    const changeFormTopic = event => {
        setFormTopic({ ...formTopic, [event.target.name] : event.target.value})
        SetSendConfirm(false)
    }

    const pushNewQuestion = async () => {
        try {
            if (formQuestion.question.length > 0 && formQuestion.topic.length > 0) {
                await API.post('/api/question/send', {...formQuestion})
                SetSendConfirm(true)
                setFormQuestion({ question: ''})
            } else {
                setError(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pushNewTopic = async () => {
        try {
            if (formTopic.topic.length > 0) {
                await API.post('/api/question/topic', {...formQuestion})
                setFormTopic({ topic : '', level : '1' })
                SetSendConfirm(true)
            }
            else {
                setError(true)
            }
        } catch (error) {
            console.log(error)
        }
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
            {sendConfirm && 
            <div className='success-message'>
                <p>Created successfully</p>
            </div>
            }
            {error && 
            <div className='error-messsage'>
                <p>pleace, enter all require data and select topic</p>
                <button className='button-error' onClick={() => setError(!error)}>ok</button>
            </div>
            }
        </div>
    )
}