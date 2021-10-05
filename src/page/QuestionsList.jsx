import Card from '../components/Card.jsx';
import React, { useState, useCallback, useEffect } from 'react';
import { API } from '../axios/axios.jsx';

export default function QuestionsList(props) {
    const [topic, setTopic] = useState('keke')
    const [ind, setInd] = useState(0)
    const [data, setData] = useState([])

    const getData = useCallback( async (topic) => {
        try {
            API.get(`/api/question?topic=${topic}`)
                .then(response => setData(response.data))
        } catch (error) {
            console.log(error)
        }
    })

    console.log(props.topic)

    useEffect(()=>{
        getData(props.topic)
    }, [props.topic])
    
    const questionList = data.map(data => <Card key={data.key} question={data.question} topic={data.topic} resolved={data.resolved}/>)
    
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