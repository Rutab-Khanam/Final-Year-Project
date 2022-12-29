import React, { useState, useEffect} from 'react'
import Participants from './Participants';
import UsersList from './UsersList';
import './InviteParticipants.css';



const InviteParticipants = ({username, setParticipant}) => {

    let [invite, setInvite] = useState(false);

    const [participants, setparticipants] = useState(["Unknown"]);



    useEffect(() => {

        setParticipant(participants);
        console.log("participants in InviteParticipants: ", participants);

    });


    return (
        <div>

            <div>
            <button className='invitebtn' onClick={() => setInvite(true)} >Invite Participants</button>
            </div>

            {/* Prompt for invite participants */}
            <Participants trigger={invite} setTrigger={setInvite} participantsListt={participants} setParticipant={setParticipant}
        
            content={
                <>
            
                <p>Select Participants</p> 
                <UsersList username={username} setParticipants={setparticipants}  />
                {participants}
                <br/>
            
                </>
            }

            >
            </Participants>
            
        </div>
    )
}

export default InviteParticipants