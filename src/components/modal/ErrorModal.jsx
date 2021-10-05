import React from 'react';

export default function ErrorModal(props) {
  return(
    <div className='message-error'>
      <p>{props.message}</p>
    </div>
  )
}