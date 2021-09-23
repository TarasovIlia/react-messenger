import React from 'react';

export default function Radio(props) {
    const handelChange = () => {
        props.handelTopic(props.topic)
    }
    return (
        <div className="radio-form">
            <input onClick={handelChange} className='radio' type='radio' name='topic' id={props.topic}/>
            <label className='radio-label' htmlFor={props.topic}><p>{props.topic}</p></label>
        </div>
    )
}
