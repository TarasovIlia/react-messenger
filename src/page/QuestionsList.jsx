import Card from '../components/Card.jsx';
import React, { useState, useCallback, useEffect } from 'react';
import { API } from '../axios/axios.jsx';

export default function QuestionsList(props) {
    const [ind, setInd] = useState(0)
    const [data, setData] = useState([])
    const [done, setDone] = useState(false)

    const getData = useCallback( async (topic) => {
        try {
            API.get(`/api/question?topic=${topic}`)
                .then(response => setData(response.data))
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(()=>{
        getData(props.topic)
    }, [props.topic])
    
    const questionList = data.map(data => <Card key={data.key} question={data.question} topic={data.topic} resolved={data.resolved}/>)
    
    function randomInd()  {
        return (Math.floor(Math.random() * 100)) % data.length
    }
    
    function nextQuestion() {
        if (data.length != 1) {
            let nextInd = randomInd()
            if ( nextInd != ind ) {
                setInd(nextInd)
                data.splice(ind, 1)
            } else {
                nextQuestion()
            }
        } else {
            props.handleDone(true)
            setDone(true)
        }
    }

    const className = done ? 'button button-next done' : 'button button-next'

    if (done) {
        return (
            <div className='list'>
                <h1 style={{ color : 'blue' }}>Well done!</h1>
            </div>
        )
    }

    return (
        <div className='list'>
            {!done ? 
            <section className='question'>
                {questionList[data.length === 1 ? 0 : ind]}
            </section>
            :
            <h1 style={{ marginTop : '120px' }}>No question</h1>
        }
            {done || <button 
            disabled={done} 
            className={className}
            onClick={nextQuestion}
            >Done</button>}
        </div>
    )
}