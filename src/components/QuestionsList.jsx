import Card from './Card.jsx';
import Radio from './Radio'
import React, { useState, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.js';

export default function QuestionsList() {
    const [topic, setTopic] = useState([])
    const [filter, setFilter] = useState('')
    const [ind, setInd] = useState(0)
    const [questions, setQuestions] = useState([])
    const {loading, request} = useHttp()

    const handelTopic = filter => setFilter(filter)

    const resetFilter = () => {
        setFilter('')
    }

    const fetchQuestion = useCallback(async () => {
        try {
          const fetched = await request('http://localhost:3000/api/question', 'GET', null)
          setQuestions(fetched)
        } catch (e) {
            console.log(e.message)
        }
    }, [request])
    
    useEffect(() => {
        fetchQuestion()
    }, [fetchQuestion])

    const fetchTopic = useCallback(async () => {
        try {
          const fetched = await request('http://localhost:3000/api/question/topic/get', 'GET', null)
          setTopic(fetched)
        } catch (e) {
            console.log(e.message)
        }
    }, [request])
    
    useEffect(() => {
        fetchTopic()
    }, [fetchTopic])

    const data = filter ?  questions.filter(question => question.topic === filter) : questions

    const questionList = data.map(data => <Card key={data.key} question={data.question} topic={data.topic} resolved={data.resolved}/>)
    const radoiFilter = topic.map(data => <Radio handelTopic={handelTopic} topic={data.topic} key={data._id} />)

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
            console.table(randomInd(), data.length)
        }
    }

    const disable = data.length < 1
    const done = data.length === 1
    const className = done ? 'button button-next done' : 'button button-next'

    return (
        <div className='list'>
            {radoiFilter}
            <div>
                {filter && <button onClick={resetFilter} className='button'>All topic</button>}
            </div>
            {!disable ? 
            <section className='question'>
                {questionList[data.length === 1 ? 0 : ind]}
            </section>
            :
            <h1 style={{ marginTop : '120px' }}>No more qustions</h1>
            }
            {disable || <button 
            disabled={disable} 
            className={className}
            onClick={nextQuestion}
            >{done ? 'done' : 'next'}</button>}
        </div>
    )
}