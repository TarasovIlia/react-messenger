import React, { useEffect, useState } from 'react';
import RadioTabs from '../components/RadioTabs';
import QuestionsList from './QuestionsList';

export default function Home () {
    const [topic, setTopic] = useState('')
    const [showTabs, setShowTabs] = useState(false)
    const [showQuestions, setShowQuestions] = useState(false)

    const handelTopic = topic => {
        setTopic(topic)
    }

    return (
        <div>
            {showTabs && <RadioTabs handelTopic={handelTopic} />}
            {showTabs && <button onClick={() => setShowQuestions(!showQuestions)} className='button'>Confirm</button>}
            <button onClick={() => setShowTabs(!showTabs)} className='button'>{showTabs? 'Back' : 'Start'}</button>
            {showQuestions && <QuestionsList topic={topic} />}
        </div>
    )
}