import React from 'react'
import './Interface.css';
import { Link } from 'react-router-dom';

function Interface() {
  return (
    <div className='interface'>
      <div className='menus'>
          <p className='quot'>Make Time for What Matters</p>

          <table>
          <tr>
          <Link className='interfacebtn btn1' to={"/interface/newMeeting"}> 
              New Meeting
              <i className='fa fa-calendar'></i>
          </Link>
          </tr>
          <br /> <br/>

          <tr>
          <Link className='interfacebtn btn2' to={"/interface/proposedMeetings"}>
              Proposed Meetings 
              <i class="fa fa-edit"></i>  
          </Link>
          </tr>
          <br /> <br/>

          <tr>
          <Link className='interfacebtn btn3' to={"/interface/confirmedMeetings"} >
              Confirmed Meetings 
              <i className='fa fa-list'></i>
          </Link>
          </tr>
          <br /> <br/>

          <tr>
          <Link className='interfacebtn btn4' to={"/interface/invitations"} >
              Invitations 
              <i className='fa fa-bell'></i>
          </Link>
          </tr>
          <br /> <br/>

          <tr>
          <Link className='interfacebtn btn5' to={"/interface/allMeetings"} >
              All Meetings 
              <i className='fa fa-book'></i>
          </Link>
          </tr>
          
          </table>
        
      </div>  

    </div>
  )
}

export default Interface