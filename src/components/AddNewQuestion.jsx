import React, { useState } from 'react';
import RadioTabs from './RadioTabs.jsx'
import { useHttp } from '../hooks/http.hook.js';

export default function AddNewQuestion() {
    const [sendConfirm, SetSendConfirm] = useState(false)
    const [error, setError] = useState(false)
    const {loading, request} = useHttp()
    const [formQuestion, setFormQuestion] = useState({
        question: '', topic: ''
    })
    const [formTopic, setFormTopic] = useState({
        topic : '', level : '1'
    })

    const handelTopic = selectedTopic => setFormQuestion({topic: selectedTopic})

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
                const data = await request('http://localhost:3000/api/question/send', 'POST', {...formQuestion})
                setFormQuestion({ question: ''})
                SetSendConfirm(true)
            }
            else {
                setError(true)
            }
        } catch (err) {}
    }

    const pushNewTopic = async () => {
        try {
            if (formTopic.topic.length > 0) {
                const data = await request('http://localhost:3000/api/question/topic', 'POST', {...formTopic})
                setFormTopic({ topic : '', level : '1' })
                SetSendConfirm(true)
            }
            else {
                setError(true)
            }
        } catch (err) {}
    }

    return (
        <div className="form">
            <div className='input-container'>
                <div className='radio-container'>
                    <RadioTabs handelTopic={handelTopic} />
                </div>
                <label className='label-form' htmlFor="question"><p>question</p></label>
                <input 
                onChange={changeFormQuestion} 
                value={formQuestion.question} 
                type="text" 
                disabled={loading}
                className="input question-input"
                name="question"
                id="question"
                />
                <button 
                onClick={pushNewQuestion} 
                disabled={loading}
                className="button question-button"
                >create new questions</button>
            </div>
            <div className='input-container'>
                <label className='label-form' htmlFor="topic"><p>topic</p></label>
                <input 
                onChange={changeFormTopic} 
                value={formTopic.topic} 
                type="text" 
                disabled={loading}
                className="input question-input"
                name="topic"
                id="topic"
                />
                <button 
                onClick={pushNewTopic} 
                disabled={loading}
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