import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown'


const UsersList = ({username, setParticipants}) => {


  const [users, setUsers] = useState([]);

    
  //This method fetches the users from the database.
  useEffect(() => {
    async function getUsers(callback) {
      const response = await fetch(`http://localhost:5000/user/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const users = await response.json();
      setUsers(users);
      console.log("users:", users);
      console.log("users.username: ", users[0]);
        
    }

    getUsers();

    return;
  }, [users.length]);


  // this method fetches the meeting from the database.
  const [meeting, setMeeting] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
      
      useEffect(() => {
        async function fetchData() {
          const id = params.id.toString();
          const response = await fetch(`http://localhost:5000/meeting/${params.id.toString()}`);
      
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const meeting = await response.json();
          console.log("meeting:", meeting);
          // const datesSelected = meeting.datesSelected;
          if (!meeting) {
            window.alert(`Meeting with id ${id} not found`);
            navigate("/interface/proposedMeetings");
            return;
          }
      
          setMeeting(meeting);
        }
      
        fetchData();
      
        return;
      }, [params.id, navigate]);




    // console.log("users.username outside: ", users[0]);
    console.log("sizeOfArray: ", users.length);

    // picking usernames from userlist
    const usernames = [];

    for(let i=0; i<users.length; i++) {
        console.log("users.username", users[i].username);
        if(users[i].username !== username) {
            usernames.push(users[i].username);
        }
        
    };
    console.log("usernames: ", usernames);

    // if(meeting.participants == undefined) {
    //     meeting.participants = ["Unknown"];
    // }
    console.log("meeting.partiticpant:", meeting.participant);

    // extracting current user from userList
    const userlist = [];
    const participantLength = meeting.participant;

    for(let i=0; i<users.length; i++) {
    
        if(users[i].username !== username  ) {

            userlist.push(users[i]);
        }
            
    };
    console.log("userlist: ", userlist);

        
    const [selectedParticipants, setSelectedParticipants] = useState([]);   
    
    console.log("selectedParticipants: ", selectedParticipants); 

    // let participantsLength = selectedParticipants.length + 1;

    // picking usernames from selectedParticipants
    const selectedUsers = [];
    for(let i=0; i<selectedParticipants.length; i++) {
        // console.log(users[i].username);
        if(selectedParticipants[i].username !== username) {
            selectedUsers.push(selectedParticipants[i].username);
        }
        
    };
    console.log("selectedUsers: ", selectedUsers);   


    
    const participantsSet = (selectedParticipants) => {
        // setParticipants(selectedParticipants);
        console.log("selectedUsers inside: ", selectedUsers);   
        console.log("setParticipants in UsersList: ", setParticipants);
        setParticipants(selectedUsers);

    }

    useEffect(() => {
        participantsSet();
    }, [selectedParticipants]);
        
        


  return (
    <div className='users'>
        
        {/* <pre>{JSON.stringify(selectedParticipants)}</pre> */}
        <Multiselect
            options={userlist}
            displayValue={"username"}
            // displayValue={"email"}
            // value={selectedParticipants}
            // selectedParticipants={selectedParticipants}
            id={"selectedParticipants"}
            name={"selectedParticipants"}
            value={selectedParticipants}
            selectedValues={selectedParticipants}
            
            onSelect={(user) => {
              console.log(user);
              setSelectedParticipants(user);
              participantsSet();
            }}

            onRemove={(user) => {
                console.log(user);
                setSelectedParticipants(user);
                participantsSet();
            }}
            
            showArrow
            className={'userList'}
        />
        {/* <button className='invitebtnn'>Invite</button> */}
             
    </div>
  )
}

export default UsersList