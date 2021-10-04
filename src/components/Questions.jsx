import React, { useState, useCallback, useEffect, Suspense} from 'react';
import { API } from '../axios/axios.jsx';
import QuestionsCard from './QuestionsCard';
import RadioTabs from './RadioTabs.jsx'

export default function Questions() {
    const [filter, setFilter] = useState('')
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(1)

    const sendLimit = async () => {
        setLimit(limit+1)
    }

    const handelTopic = topic => setFilter(topic)

    const getData = useCallback( async limit => {
        try {
            await API.get(`/api/question/page?limit=${limit}`)
                .then(response => setData(response.data))
        } catch (error) {
            console.log(error)
        }
    })
    
    useEffect(() => {
        getData(limit)
    },[limit])

    const filterResult = filter ? data.filter(data => data.topic === filter) : data
    const questionCard = filterResult.map(data => <QuestionsCard question={data.question} id={data._id} topic={data.topic} key={data._id} />)
    
    return (
        <div>
            <RadioTabs handelTopic={handelTopic} />
            <section className='dispalay'>
                {questionCard}
                <div className='card add-new' onClick={() => sendLimit()}>
                    <p>Load more</p>
                </div>
            </section>
        </div>
    )
}