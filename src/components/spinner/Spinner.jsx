import React from 'react';

export default function Spinner() {
  return (
    <div className='sinner-container'>
      <div className='spinner-wrapper'>
        <div className='rotate'>
          <figure className='spinner position-1'></figure>
          <figure className='spinner position-2'></figure>
          <figure className='spinner position-3'></figure>
          <figure className='spinner position-2'></figure>
          <figure className='spinner position-3'></figure>
          <figure className='spinner position-4'></figure>
          <figure className='spinner position-3'></figure>
          <figure className='spinner position-4'></figure>
          <figure className='spinner position-5'></figure>
        </div>
      </div>
    </div>
  )
}