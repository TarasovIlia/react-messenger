import React from 'react'

export default function QuestionsCard(props) {
    return (
        <div className="card">
            <p className='topic'>{props.topic}</p>
            <p>{props.question}</p>
        </div>
    )
}