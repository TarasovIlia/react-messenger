import React from 'react';

export default function Radio(props) {

    return (
        <div className="radio-form">
            <input className='radio' type='radio' name='topic' id={props.topic}/>
            <label onClick={() => props.handlerTopic(props.topic)} className='radio-label' htmlFor={props.topic}><p>{props.topic}</p></label>
        </div>
    )
}