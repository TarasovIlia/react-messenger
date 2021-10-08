import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <div className='centre'>
        <h1>Page not found</h1>
      </div>
      <div className='centre'>
        <Link to='/'><p style={{ color : 'blue'}}>Back to home</p></Link>
      </div>
    </div>
  )
}