import React, { useState } from 'react';

export default function Questions(props) {

    return (
        <div className="card">
            <p className='topic'>{props.topic}</p>
            <p>{props.question}</p>
        </div>
    )
}