import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Invitations.css';
import Back from './Back';


const Meeting = (props) => (
  <tr>
    <td className='tableCol'>{props.meeting.title}</td>

    <td className='tableCol'>{props.meeting.host}</td>
    
    <td className='tableCol'>{props.meeting.createdAt}</td> 

    <td className='tableCol'>
      &emsp; &emsp; &emsp; &emsp;
     <Link className="btn btn-link edit" to={`/invitation/${props.meeting._id}`}>Check Invitation</Link>  
     &emsp;
     
    </td>
    
  </tr>
);




const Invitations = ({username}) => {

  console.log(username);

  const [meetings, setMeetings] = useState([]);  

  // This method fetches the meetings from the database.
  useEffect(() => {
    async function getMeetings() {
      const response = await fetch(`http://localhost:5000/meeting`);

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


  

  // This method will map out the meetings on the table
  function meetingsList() {
    return meetings.map((meeting, index) => {
      console.log("meeting.participant: ", meeting.participant);
      console.log("meetings index: ", (index));
      let meetingParticipants = meeting.participant;
      console.log("meetingParticipants: ", meetingParticipants);
      console.log(meetingParticipants);
      if(meeting.participant) {
        console.log(meetingParticipants.length);
        console.log(meetingParticipants[0]);
        const part = [];
        for(let i=0; i<meetingParticipants.length; i++) {
          if(meetingParticipants[i] == username) {
            console.log("participant", i, meetingParticipants[i]);
              part.push(meetingParticipants[i]);

              return (
                <Meeting
                  meeting={meeting}
                  // handleClick={() => handleClick(meeting._id)}
                  key={meeting._id}
                  // title={meeting.title}
                />
              );

          }
        }
        // console.log("part", part);
        // if(part) {
            
        // }
        
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
    <div className='proposedMeetings'  >

      <div className='input0'>
          <p>Invitations</p>
          <Back/>
      </div>
      <div className='meetingForm'>
      <form>
        <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
        <tr className='tableHead'>
          <th>Meeting Title</th>
          <th>Meeting Host</th>
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

    <div style={ !logout ? { display: "none" } : {} } >

          <h3>You have been logged out! 
             <br/> Sign in again to access the interface...</h3>

          <br/>
          <Link to={"/signin"} className="btn btn-link">Sign in</Link>

      </div>


    </div>
  )
}

export default Invitations