import React, { useState, useCallback, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook.js';
import QuestionsCard from './QuestionsCard';
import RadioTabs from './RadioTabs.jsx';

export default function Questions() {
    const [filter, setFilter] = useState('')
    const [data, setData] = useState([])
    const {loading, request} = useHttp()

    const handelTopic = topic => setFilter(topic)

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

    const filterResult = filter ? data.filter(data => data.topic === filter) : data
    const questionCard = filterResult.map(data => <QuestionsCard question={data.question} id={data._id} topic={data.topic} key={data._id} />)
    
    return (
        <div>
            <RadioTabs handelTopic={handelTopic} />
            <section className='dispalay'>
                {questionCard}
                <Link to="/addnew">
                    <div className='card add-new'>
                        <p>Add new question</p>
                    </div>
                </Link>
            </section>
        </div>
    )
}