import React, { useState, useCallback, useEffect } from 'react';
import Radio from './Radio.jsx'
import { useHttp } from '../hooks/http.hook.js';

export default function AddNewQuestion() {
    const [sendConfirm, SetSendConfirm] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const {loading, request} = useHttp()
    const [formQuestion, setFormQuestion] = useState({
        question: '', topic: ''
    })
    const [formTopic, setFormTopic] = useState({
        topic : '', level : '1'
    })
    const handelTopic = (topic) => setFormQuestion({topic: topic})
    console.log(formQuestion.topic)

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
                setError(!error)
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
                setError(!error)
            }
        } catch (err) {}
    }

    const fetchTopic = useCallback(async () => {
        try {
          const fetched = await request('http://localhost:3000/api/question/topic/get', 'GET', null)
          setData(fetched)
        } catch (e) {
            console.log(e.message)
        }
    }, [request])
    
    useEffect(() => {
        fetchTopic()
    }, [fetchTopic])

    const radio = data.map(data => <Radio handelTopic={handelTopic} key={data._id} topic={data.topic} />)

    return (
        <div className="form">
            {sendConfirm && 
            <div className='success-message'>
                <p>Created successfully</p>
            </div>}
            {error && 
            <div className='error-messsage'>
                <p>pleace, enter all require data and choose topic</p>
                <button className='button-error' onClick={() => setError(!error)}>ok</button>
            </div>}
            <div className='input-container'>
                <div className='radio-container'>
                    {radio}
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
        </div>
    )
}