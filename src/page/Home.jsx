import React, { useEffect, useState } from 'react';
import RadioTabs from '../components/RadioTabs';
import QuestionsList from './QuestionsList';

export default function Home () {
    const [done, setDone] = useState(false)
    const [topic, setTopic] = useState('')
    const [showTabs, setShowTabs] = useState(false)
    const [showQuestions, setShowQuestions] = useState(false)

    const handleTopic = topic => {
        setTopic(topic)
    }

    const handleDone = done => {
        setDone(done)
    }

    const finishTopic = () => {
        setShowQuestions(!showQuestions)
        setDone(false)
    }

    if(showTabs) {
        return (
            <div>
                <p>{done}</p>
                {showQuestions || <RadioTabs handleTopic={handleTopic} />}
                {showQuestions || <button onClick={() => setShowQuestions(!showQuestions)} className='button button-next'>Confirm</button>}
                {showQuestions && <QuestionsList handleDone={handleDone} topic={topic} />}
                {done && <button onClick={finishTopic} className='button button-next'>Next topic</button>}
            </div>
        )
    }
    
    return (
        <div>
            <button onClick={() => setShowTabs(!showTabs)} className='button'>Start</button>
        </div>
    )
}