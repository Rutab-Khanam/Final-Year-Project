import React from 'react'
import { Link } from 'react-router-dom'
import './Invitations.css'
import Back from './Back'


const Invitations = () => {
  return (
    <div className='interfacePage'>
    <div className='invitations'>

      <div className='input0'>
          <p>Invitations</p>
          <Back/>
      </div>
      <div className='meetingForm'>
      <form>
          <h2>Invitations in process...</h2>
      </form>
      </div>
    </div>
    </div>
      
    
  )
}

export default Invitations