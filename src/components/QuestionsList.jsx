import Questions from './Questions.jsx';
import React, { useState, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.js';

export default function QuestionsList() {
    const [ind, setInd] = useState(0)
    const [data, setData] = useState([])
    const {loading, request} = useHttp()

    const fetchQuestion = useCallback(async () => {
        try {
          const fetched = await request('http://localhost:3000/api/question', 'GET', null)
          setData(fetched)
        } catch (e) {
            console.log(e.message)
        }
    }, [request])
    
    useEffect(() => {
        fetchQuestion()
    }, [fetchQuestion])

    const questionList = data.map(data => <Questions key={data.key} question={data.question} topic={data.topic} resolved={data.resolved}/>)


    function randomInd()  {
        let nextInd = (Math.floor(Math.random() * 10)) % data.length
        if (nextInd === (data.length - 1)) return nextInd-=1
        else return nextInd
    }

    function nextQuestion() {
        if (data.length != 1) {
            const nextInd = randomInd()
            if ((data.length-1) === 2 && nextInd === 0) {
                setInd(0)
            }
            else if (nextInd != ind) {
                data.splice(ind, 1)
                setInd(nextInd)
            }
            else nextQuestion()
        }
        else setInd(0)
    }

    const disable = data.length === 1
    const color = {color : disable && 'green'}

    return (
        <div className='list'>
            <section className='question'>
                {questionList[ind]}
            </section>
            <button className='button button-next' style={color} onClick={nextQuestion}>{disable ? 'done' : 'next'}</button>
        </div>
    )
}