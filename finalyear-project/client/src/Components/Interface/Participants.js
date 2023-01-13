import React, { useEffect, useState } from 'react'
import './Participants.css'
// import UsersList from './UsersList';



const Participants = (props) => {

  
    // const [participantsList, setParticipantsList] = useState(['']);

    // // form validation
    // const [showErrorMessage, setShowErrorMessage] = useState(false);
    // const [isValid, setValid] = useState(false);

    // const validity = (e) => {
      
    //   if(props.participantsListt.length > 0) {
        
    //       setShowErrorMessage(false);
    //       setValid(true);

    //   } else {
    //       setShowErrorMessage(true);
    //       setValid(false);
    //   }
    // }

    // useEffect(() => {

    //     validity();

    // }, [props.participantsListt]);


    // // invite button
    // const inviteClick = () => {
    //     console.log("props.participantsListt: ", props.participantsListt);
    //     // setParticipantsList(props.participantsListt);
    //     // console.log("participantsList in participants: ", participantsList);
    //     // console.log(participantsList.length);
    //     // console.log(Object.keys(participantsList));

    //     // if(participantsList.length > 1){
            
    //     //     props.setTrigger(false);
 
    //     // } 
                
    // }
  
  

  return (props.trigger) ? (
        <div className='participants' >
            <div className='participantsInner' >
                {/* <button className='close-btn' onClick={() => props.setTrigger(false)}>Close</button> */}
                <i className='fa fa-times' onClick={() => props.setTrigger(false) } />
                {/* {props.children} */}
                {props.content}

                {/* {showErrorMessage ? <div className='passError' > Please select participants. </div> : ''} */}
                
                {/* <button className='invitebtnn' onClick={inviteClick} disabled={!isValid} >Invite</button> */}
            </div>
            {/* <UsersList/> */}
        </div>
  ) : "";
}

export default Participants