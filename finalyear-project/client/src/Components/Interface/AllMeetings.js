import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AllMeetings.css'
import Back from './Back';


const Meeting = (props) => (
  <tr>
    <td className='tableCol'>{props.meeting.id}</td>
    <td className='tableCol'>{props.meeting.title}</td>
    <td className='tableCol'>{props.meeting.createdAt}</td> 
    <td className='tableCol'>{props.meeting.start_time}</td>
    <td className='tableCol'>{props.meeting.status}</td> 
  </tr>
);



const AllMeetings = ({username}) => {

  const [meetings, setMeetings] = useState([]);

  // This method fetches the meetings from the database.
  useEffect(() => {
    async function getMeetings() {
      const response = await fetch(`http://localhost:5000/meeting/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const meetings = await response.json();
      setMeetings(meetings);
    }

    getMeetings();

    return;
  }, [meetings.length]);


  // This method will map out the meetings on the table
  function meetingsList() {
    return meetings.map((meeting) => {
      if((meeting.host == username) || (meeting.participant == username)) {
        return (
          <Meeting
            meeting={meeting}
          
            key={meeting._id}
          />
        );
      }
    });
  }


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
    <div className='interfacePage'>
    <div className='allMeetings' style={ logout ? { display: "none" } : {} } >

      <div className='input0'>
          <p>All Meetings</p>
          <Back/>
      </div>
      <div className='meetingForm'>
      <form>
          <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
          <tr className='tableHead'>
            <th>Meeting ID</th>
            <th>Meeting Title</th>
            <th>Created At</th>
            <th>Start Time</th>
            <th>Status</th>
          </tr>   
          <hr/>
          </thead>

          <tbody>{meetingsList()}</tbody>
          </table>
      </form>
      </div>
    </div>

    <div style={ !logout ? { display: "none" } : {} } >

        <h3>You have been logged out! 
        <br/> Sign in again to access the interface...</h3>

        <br/>
        <Link to={"/signin"} className="btn btn-link">Sign in</Link>

    </div>

    </div>
  )
}

export default AllMeetings