import React, { useState, useEffect } from 'react'
import './Interface.css';
import { Link, useNavigate } from 'react-router-dom';
import Signin from '../Pages/Signin';


function Interface({username}) {

  console.log("Username: ", username);

  // To check current User
  const [logout, setLogout] = useState(false);

  useEffect(() => {
      const HandleChange = () => {

          const currentUser = username;
  
          const user = "Unknown";
  
          if(user === currentUser) {
              setLogout(true);
              console.log("logout: ", logout);  
          } 
                    
          return;
      };
      HandleChange();

      return;
  });




  return (
    <div className='interface'>

      <div className='menus' style={ logout ? { display: "none" } : {} } >

          <p className='quot'>Make Time for What Matters</p>

          <table>
          <tr>
          <Link className='interfacebtn btn1' to={"/interface/newMeeting"} > 
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

      <div style={ !logout ? { display: "none" } : {} } >

          <h3>You have been logged out! 
             <br/> Sign in again to access the interface...</h3>

          <br/>
          <Link to={"/signin"} className="btn btn-link">Sign in</Link>

          {/* <Signin /> */}

      </div>
      

    </div>
  )
}

export default Interface