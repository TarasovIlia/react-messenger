import React, { useState, useCallback, useEffect} from 'react';
import { Link } from 'react-router-dom'
import QuestionsCard from './QuestionsCard';
import RadioTabs from './RadioTabs.jsx';
import { API } from '../axios/axios.jsx';

export default function Questions() {
    const [filter, setFilter] = useState('')
    const [data, setData] = useState([])

    const handelTopic = topic => setFilter(topic)

    const getData = useCallback( async () => {
        try {
            const response = await API.get('https://back-test1.herokuapp.com/api/question')
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    })
    
    useEffect(() => {
        getData()
    },[getData])

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