import React, { useState, useCallback, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook.js';
import QuestionsCard from './QuestionsCard';
import Radio from './Radio.jsx';

export default function Questions() {
    const [filter, setFilter] = useState(null)
    const [data, setData] = useState([])
    const [topic, setTopic] = useState([])
    const {loading, request} = useHttp()
    //const [switchView, setSwitchView] = useState(false)

    //const handlerSwitchView = () =>  setSwitchView(!switchView)

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
    
    const resetFilter = () => {
        setFilter(null)
    }

    const filterResult = filter ? data.filter(data => data.topic === filter) : data

    const radoiFilter = topic.map(data => <Radio handelTopic={handelTopic} topic={data.topic} key={data._id} />)
    const questionCard = filterResult.map(data => <QuestionsCard question={data.question} id={data._id} topic={data.topic} key={data._id} />)

    return (
        <div>
            {radoiFilter}
            <div>
                {filter && <button onClick={resetFilter} className='button'>reset filter</button>}
            </div>
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