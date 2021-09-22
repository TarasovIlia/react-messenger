import React, { useState, useCallback, useEffect} from 'react';
import { useHttp } from '../hooks/http.hook.js';
import QuestionsCard from './QuestionsCard';

export default function Questions() {
    const [data, setData] = useState([])
    const {loading, request} = useHttp()
    //const [switchView, setSwitchView] = useState(false)

    //const handlerSwitchView = () =>  setSwitchView(!switchView)

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

    const questionCard = data.map(data => <QuestionsCard question={data.question} topic={data.topic} key={data._id} />)

    return (
        <section className='dispalay'>
            {questionCard}
        </section>
    )
}