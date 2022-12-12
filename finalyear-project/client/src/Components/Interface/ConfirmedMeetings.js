import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './ConfirmedMeetings.css'
import Back from './Back';


const Meeting = (props) => {  

  return(
  <tr>
    {/* <td className='tableCol'>{props.meeting.id}</td> */}
    <td className='tableCol'>{props.meeting.title}</td>
    <td className='tableCol'>{props.meeting.start_time}</td>
    <td className='tableCol'>
      &emsp;
     <Link className="btn btn-link feedback" to={``} 
            style={ !props.meeting.host ? { display: "none" } : {} } 
          >Feedbacks</Link>
     <Link className="btn btn-link feedback" to={``}
            style={ props.meeting.host ? { display: "none" } : {} }
          >View</Link>
     &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
     <Link className="btn btn-link update" to={``}
            style={ !props.meeting.host ? { display: "none" } : {} }
          >Update</Link>
     <Link className="btn btn-link update" to={``} 
            style={ props.meeting.host ? { display: "none" } : {} }
          >Give Feedback</Link>
     &emsp;
     <button className='btn btn-link start' style={ !props.meeting.host ? { display: "none" } : {} } >
        Start Meeting
     </button>
     <button className='btn btn-link start' style={ props.meeting.host ? { display: "none" } : {} }>
        Join Meeting
     </button>
     
    </td>
  </tr>
  
)
    };



const ConfirmedMeetings = ({username}) => {

  console.log("username:", username);

  const [meetings, setMeetings] = useState([]);

  // This method fetches the meetings from the database.
  useEffect(() => {
    async function getMeetings() {
      const response = await fetch(`http://localhost:5000/meeting/confirmed`);

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
      return (
        <Meeting
          meeting={meeting}
          
          key={meeting._id}
        />
      );
    });
  }


  




  return (
    <div className='interfacePage'>
    <div className='confirmedMeetings'>

      <div className='input0'>
          <p>Confirmed Meetings</p>
          <Back/>
      </div>
      <div className='meetingForm'>
      <form>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
          <tr className='tableHead'>
            {/* <th>Meeting ID</th> */}
            <th>Meeting Title</th>
            <th>Start Time</th>
            <th>Action</th>
          </tr>
          <hr/>
          </thead>
          <tbody>{meetingsList()}</tbody>
        </table>
      </form>
      </div>
    </div>
    </div>
  )
}

export default ConfirmedMeetings