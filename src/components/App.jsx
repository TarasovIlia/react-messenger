import React, { useState, useCallback, useEffect } from 'react';
import Questions from './Questions.jsx';
import AddNewQuestion from './AddNewQuestion.jsx';
import Header from './Header.jsx';
import QuestionsList from './QuestionsList.jsx';
import { useHttp } from '../hooks/http.hook.js';

export default function App() {
    const [data, setData] = useState([])
    const {loading, request} = useHttp()
    const [switchView, setSwitchView] = useState(false)
    const [start, setStart] = useState(false)

    const handlerSwitchView = () =>  setSwitchView(!switchView)
    const hendlerStart = () =>  setStart(!start)

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
    
    const questionCard = data.map(data => <Questions question={data.question} topic={data.topic} key={data._id} />)

    return (
        <div className='main-wrapper'>
            <Header startOnClick={hendlerStart} switchOnClick={handlerSwitchView}/>
            {start ?
                <QuestionsList/>
                :
                <div className='content'>
                <h2 className='hello'>hello new App</h2>
                {switchView ? 
                <section className='dispalay'>
                    {questionCard} 
                </section>
                :
                <section>
                    <AddNewQuestion topic={data.topic} />
                </section>}
            </div>}
        </div>
    )
}