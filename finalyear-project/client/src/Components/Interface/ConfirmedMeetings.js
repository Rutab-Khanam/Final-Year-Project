import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './ConfirmedMeetings.css'
import Back from './Back';
// import GiveFeedback from './GiveFeedback';
import Meeting from './Meeting';


// const Meeting = (props) => {  

//   const currentUser = props.username;
//   const hostName = props.meeting.host;

//   const [feedback, setFeedback] = useState(["Unknown"]);
  
//   return(
//   <tr>
//     {/* <td className='tableCol'>{props.meeting.id}</td> */}
//     <td className='tableCol'>{props.meeting.title}</td>
//     <td className='tableCol'>{props.meeting.start_time}</td>
//     <td className='tableCol'>
//       &emsp;
//      <Link className="btn btn-link feedback" to={``} 
//             style={ !(currentUser == hostName) ? { display: "none" } : {} } 
//           >Feedbacks</Link>
//           &emsp;
//      <Link className="btn btn-link feedback" to={``}
//             style={ (currentUser == hostName) ? { display: "none" } : {} }
//           >View</Link>
//      &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
//      <Link className="btn btn-link update" to={``}
//             style={ !(currentUser == hostName) ? { display: "none" } : {} }
//           >Update</Link>
//      <span style={ (currentUser == hostName) ? { display: "none" } : {} }>
//         <GiveFeedback setFeedback={setFeedback} username={props.username} />
//       </span>     
     
//      {/* <Link className="btn btn-link update" to={``} 
//             style={ (currentUser == hostName) ? { display: "none" } : {} }
//           >Give Feedback</Link> */}
//      &emsp;
//      <button className='btn btn-link start' style={ !(currentUser == hostName) ? { display: "none" } : {} } >
//         Start Meeting
//      </button>
//      <button className='btn btn-link join' style={ (currentUser == hostName) ? { display: "none" } : {} }>
//         Join Meeting
//      </button>
     
//     </td>
//   </tr>
  
// )
// };



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
      console.log("username:", username);
      let part = false;
      const participantList = meeting.participantsList;
      console.log("meeting.participant:", meeting.participantsList);

      participantList.map((names) => {
        console.log("names:", names);
        console.log("username:", username);
          if(names == username) {
            part = true;
          }
          console.log("part:", part);
          console.log(meeting.host);
      })

      console.log("Checking map");
      console.log(part);

      if((meeting.host == username) || (part == true)) {
        return (
          <Meeting
            meeting={meeting}
            username={username}
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
    <div className='confirmedMeetings' style={ logout ? { display: "none" } : {} } >

      <div className='input0'>
          <p>Confirmed Meetings</p>
          <Back/>
      </div>
      <div className='meetingForm'>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
          <tr className='tableHead'>
            {/* <th>Meeting ID</th> */}
            <th>Meeting Title</th>
            <th>Start Time</th>
            <th>Action</th>
          </tr>
          <hr className='confirmedHr'/>
          </thead>
          <tbody>{meetingsList()}</tbody>
        </table>
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

export default ConfirmedMeetings