import React, { useState } from 'react'

export default function QuestionsCard(props) {

    return (
        <div className="simple-card">
            <p className='topic'>{props.topic}</p>
            <p>{props.question}</p>
        </div>
    )
}