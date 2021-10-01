import React, { useState, useEffect, useCallback } from 'react';
import { API } from '../axios/axios';

export default function RadioTabs(props) {
    //const [selected, setSeleced] = useState('')
    const [data, setData] = useState([])

    let host = window.location.pathname.split("/")[1] === 'addnew'

    const getData = useCallback( async () => {
        try {
            const response = await API.get('https://back-test1.herokuapp.com/api/question/topic/get')
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    })
    
    useEffect(() => {
        getData()
    },[getData])
    
    
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
