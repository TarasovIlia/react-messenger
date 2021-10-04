import Card from './Card.jsx';
import RadioTabs from './RadioTabs'
import React, { useState, useCallback, useEffect } from 'react';
import { API } from '../axios/axios.jsx';

export default function QuestionsList() {
    const [filter, setFilter] = useState('')
    const [ind, setInd] = useState(0)
    const [questions, setQuestions] = useState([])

    const getData = useCallback( async () => {
        try {
            const response = await API.get('/api/question')
            setQuestions(response.data)
        } catch (error) {
            console.log(error)
        }
    })
    
    useEffect(()=>{
        getData()
    }, [])
    
    
    const data = filter ?  questions.filter(question => question.topic === filter) : questions
    const questionList = data.map(data => <Card key={data.key} question={data.question} topic={data.topic} resolved={data.resolved}/>)
    const handelTopic = filter => setFilter(filter)
    
    function randomInd()  {
        return (Math.floor(Math.random() * 10)) % data.length
    }
    
    function nextQuestion() {
        if (data.length != 1) {
            let nextInd = randomInd()
            if ( nextInd != ind ) {
                setInd(nextInd)
                data.splice(ind, 1)
            }
            else {
                nextQuestion()
            }
        }
    }
    
    const disable = data.length < 1
    const done = data.length === 1
    const className = done ? 'button button-next done' : 'button button-next'

    return (
        <div className='list'>
            <RadioTabs handelTopic={handelTopic} />
            {!disable ? 
            <section className='question'>
                {questionList[data.length === 1 ? 0 : ind]}
            </section>
            :
            <h1 style={{ marginTop : '120px' }}>No more questions</h1>
            }
            {disable || <button 
            disabled={disable} 
            className={className}
            onClick={nextQuestion}
            >{done ? 'done' : 'next'}</button>}
        </div>
    )
}