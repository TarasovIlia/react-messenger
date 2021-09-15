import React, { useState } from 'react';

export default function Message(props) {
    //const [incoming, setIncoming] = useState(false)
    const incoming = props.from === 'me'
    return (
        <div className={incoming ? 'messsage out' : 'messsage in'}>
            <p className='user'>{props.from}</p>
            <p className='user'>{props.date}</p>
            <p>{props.body}</p>
        </div>
    )
}