import React, { useState, useEffect} from 'react'
import Participants from './Participants';
import UsersList from './UsersList';
import './InviteParticipants.css';



const InviteParticipants = ({username, setParticipant, setValidd}) => {

    let [invite, setInvite] = useState(false);

    const [participants, setparticipants] = useState(["Unknown"]);

    
    // form validation
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isValid, setValid] = useState(false);

    const validity = (e) => {
      
      if(participants.length > 0) {
        
          setShowErrorMessage(false);
          setValid(true);

      } else {
          setShowErrorMessage(true);
          setValid(false);
      }
    }

    useEffect(() => {

        validity();

    }, [participants]);



    const inviteClick = () => {
        
        if(participants.length > 0) {

            setValid(true);
            setParticipant(participants);
            console.log("participants in InviteParticipants: ", participants);
            setInvite(false);
            
        }
    }


    return (
        <div>

            <div>
            <button className='invitebtn' onClick={() => setInvite(true)} >Invite Participants</button>
            </div>

            {/* Prompt for invite participants */}
            <Participants trigger={invite} setTrigger={setInvite} participantsListt={participants} 
                    setParticipant={setParticipant} 
        
            content={
                <>
            
                <p>Select Participants</p> 
                <UsersList username={username} setParticipants={setparticipants}  />
                {participants}
                <br/>
                {showErrorMessage ? <div className='passError' > Please select participants. </div> : ''}
                <button className='invitebtnn' onClick={inviteClick} disabled={!isValid} >Invite</button>
                </>
            }

            >
            </Participants>
            
        </div>
    )
}

export default InviteParticipants