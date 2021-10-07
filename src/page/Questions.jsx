import React, { useState, useCallback, useEffect, Suspense} from 'react';
import { API } from '../axios/axios.jsx';
import QuestionsCard from '../components/QuestionsCard';
import RadioTabs from '../components/RadioTabs.jsx'

export default function Questions() {
    const [topic, setTopic] = useState('')
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(1)

    const sendLimit = () => {
        setLimit(limit+1)
    }

    const handleTopic = topic => {
        setTopic(topic)
    }

    const getData = useCallback( async (limit, topic) => {
        try {
            await API.get(`/api/question/page?limit=${limit}&topic=${topic}`)
                .then(response => setData(response.data))
        } catch (error) {
            console.log(error)
        }
    })
    
    useEffect(() => {
        getData(limit, topic)
    },[limit, topic])

    const questionCard = data.map(data => <QuestionsCard question={data.question} id={data._id} topic={data.topic} key={data._id} />)
    
    return (
        <div>
            <RadioTabs handleTopic={handleTopic} />
            <section className='dispalay'>
                {questionCard}
            </section>
            {(data.length < 11) ||
            <div className='centre'>
                <button className='button add-new' onClick={() => sendLimit()}>
                    Load more
                </button>
            </div>}
        </div>
    )
}