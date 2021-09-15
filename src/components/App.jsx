import React, { useState } from 'react';
import Message from './Message.jsx';
import GET_ALL_MESSAGE from '../API/GET_ALL_MESSAGE.jsx';
import SEND_MESSAGE from '../api/SEND_MESSAGE.jsx';

export default function App() {
    const getMessage = GET_ALL_MESSAGE()
    const [newMessage, setNewMessage] = useState('')
    const nowDate = Date.now()
    const sendDate = ''

    const setMessage = (e) => setNewMessage(e.target.value)
    const pushNewMessage = () => {
        SEND_MESSAGE(newMessage)
    } 
    const SortMessages = getMessage.sort((a,b) => {
        if (a.date > b.date) return -1
        if (a.date < b.date) return 1
        return 0
    })
    const messages = SortMessages.map(data => <Message date={data.date} key={data.id} body={data.body} from={data.from} /> )
    return (
        <div className='main-wrapper'>
            <h2 className='hello'>hello new App</h2>
            <section className='dispalay'>
                {messages}
            </section>
            <input onChange={setMessage} type="text" />
            <button onClick={pushNewMessage}>send</button>
        </div>
    )
}