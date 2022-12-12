import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './ProposedMeetings.css';
import Back from './Back';


const Meeting = (props) => (
  <tr>
    <td className='tableCol'>{props.meeting.id}</td>

    <td className='tableCol'>{props.meeting.title}</td>
    
    <td className='tableCol'>{props.meeting.createdAt}</td> 

    <td className='tableCol'>
      &emsp; &emsp;
     <Link className="btn btn-link edit" to={`/edit/${props.meeting._id}`}>Edit</Link>  
     &emsp;
     <button className="btn btn-link delete"
       onClick={() => {
         props.deleteMeeting(props.meeting._id);
       }}
     >
       Delete
     </button>
    </td>
    
  </tr>
);




const ProposedMeetings = ({username}) => {

  console.log(username);

  const [meetings, setMeetings] = useState([]);  

  // This method fetches the meetings from the database.
  useEffect(() => {
    async function getMeetings() {
      const response = await fetch(`http://localhost:5000/meeting/proposed`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const meetings = await response.json();
      setMeetings(meetings);

      console.log(meetings);
      console.log(meetings.host);
    }

    getMeetings();

    return;
  }, [meetings.length]);


  // This method will delete a meeting
  async function deleteMeeting(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newMeetings = meetings.filter((el) => el._id !== id);
    setMeetings(newMeetings);
  }

  // This method will map out the meetings on the table
  function meetingsList() {
    return meetings.map((meeting) => {
      if(meeting.host == username) {
        return (
          <Meeting
            meeting={meeting}
            // handleClick={() => handleClick(meeting._id)}
            deleteMeeting={() => deleteMeeting(meeting._id)}
            key={meeting._id}
            // title={meeting.title}
          />
        );
      }
      
    });
  }




  return (
    <div className='interfacePage'>
    <div className='proposedMeetings'>

      <div className='input0'>
          <p>Proposed Meetings</p>
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

export default ProposedMeetings