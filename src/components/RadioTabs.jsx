import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';

export default function RadioTabs(props) {
    //const [selected, setSeleced] = useState('')
    const [data, setData] = useState([])
    const { loading, request} = useHttp()

    let host = window.location.pathname.split("/")[1] === 'addnew'
    
    const fetchData = useCallback(async () => {
        try {
            const fetched = await request('/api/question/topic/get', 'GET', null)
            setData(fetched)
        } catch (e) {
            console.log(e.message)
        }
    }, [request])
    
    
    useEffect(() => {
        fetchData()
    }, [fetchData])
    
    const radioTabs = data.map(data => 
        <div key={data._id} className="radio-form">
            <input onClick={() => props.handelTopic(data.topic)} className='radio' type='radio' name='topic' id={data.topic}/>
            <label className='radio-label' htmlFor={ data.topic}><p>{ data.topic}</p></label>
        </div>
    )
    
    return (
        <div>
            {host || <div className="radio-form">
                <input defaultChecked onClick={() => props.handelTopic('')} className='radio' type='radio' name='topic' id='all'/>
                <label htmlFor='all' className='radio-label'><p>All topic</p></label>
            </div>}
            {radioTabs}
        </div>
    )
}
