import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './NewMeeting.css';
import Back from './Back';
import InviteParticipants from './InviteParticipants';

var random = require('random-string-alphanumeric-generator');


const NewMeeting = ({username}) => {

    const [form, setForm] = useState({
        id:"",
        title:"",
        description:"",
        start_time:"",
        duration:"",
        status:"",
        location:"",
        password:"",
        dates:[],
        datesSelected:[],
        selectDate: [],
        createdAt:"",
        updatedAt:"",
        host:"",
        participants:[],
        participantsList:[],
        feedbackParticipant:[],
        feedbacksList:[]
    });

    const navigate = useNavigate(); 

    const updateForm = (e) => {
        console.log(e);
        const {name, value} = e.target;

        form.id = meetingid;
        form.status = "Proposed";
        form.createdAt = createdAt;
        // form.dates = dates;
        form.dates = (Object.values(dates));
        console.log("form.dates: ", form.dates);
        form.host = username;
        form.participants = participant;
        console.log("form.participants: ", form.participants);

        setForm((preval) => {
            return{
                ...preval,
                [name]: value
            }
        })
    }

    
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
  
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newMeeting = { ...form };
  
        await fetch("http://localhost:5000/meeting/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeeting),
        })
        .catch(error => {
        window.alert(error);
        return;
        });
  
        setForm({ id:"", title:"", description:"", start_time:"", duration:"",
                    status:"", location:"", password:"", dates:[], datesSelected:[],
                    selectDate:[], createdAt:"", updatedAt:"", host:"", participants:[], 
                    participantsList:[], feedbackParticipant:[], feedbacksList:[] });
        
        
        alert("New Meeting Created Successfully!");
        
        navigate("/interface");

    }



    // Available Dates
    const [dates, setDates] = useState({
        datetime1:"",
        datetime2:"",
        datetime3:"",
        datetime4:""
    });

    let newParticipants = [];
    const [participant, setParticipant] = useState([]);
    let participantCheck = false;
    console.log("participant:", participant);

    for(let i=0; i<form.participantsList.length; i++){
            
        for(let j=0; j<participant.length; j++){
            console.log("participant[j]:", participant[j]);
            if(participant[j] !== form.participantsList[i]) {
                // participantCheck = true;
                // newParticipants.push(participant[j]);
                console.log("newParticipants:", newParticipants);
            }  
        }
        
    }
    console.log("newParticipants:", newParticipants);

    // useEffect(() => {
    //     form.dates = dates;
    //     form.participants = participant;
    //     console.log("form.participants:", form.participants);
    // });
    

    useEffect(() => {
        
        form.dates = dates;
        form.participants = participant;
        console.log("form.participants:", form.participants);
        console.log("participants:", participant);
        console.log("participant data type:", Array.isArray(participant));
        console.log("feedbacksList:", form.feedbacksList);

        const participantsListForm = form.participantsList;

        participant.map((item) => {
            let check = participantsListForm.includes(item);
              
              if(!check) {
                form.participantsList.push(item);
            }
        })
        console.log("participantsList:", form.participantsList);
        // if((participantCheck == false) ) {
        //     form.participantsList.push(...participant);
        // }
        
    }, [participant]);


    const updateDates = (e) => {
        const {name, value} = e.target;

        setDates((preval) => {
            return{
                ...preval,
                [name]: value
            }
        })
    }

    // Current Date
    const date = new Date();
    const createdAt = date.toLocaleString();

    // Random Meeting id
    const meetingid = random.randomAlphanumeric(10, "lowercase");

    // Invitations  
    // let [invite, setInvite] = useState(false);

    // const [participants, setparticipants] = useState(["Unknown"]);

    // console.log("participants in new meeting: ", participants);

    


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
    <div className='newMeeting container' style={ logout ? { display: "none" } : {} } >
        <div className='input0'>
            <p>New Meeting</p>
            <Back/>
        </div>
        
        <div className='newMeetingForm container'>

        <form onSubmit={onSubmit} className='row'>
            

            <div className='input1'>
            <label htmlFor='title'>Title</label>
            <br/>
            <input 
                type={"text"}
                placeholder={'Title'}
                size={'50'}
                id={'title'}
                name={'title'} 
                required
                defaultValue={form.title}
                onChange={updateForm}
            />
            </div>
            <div className='input2'>
            <label htmlFor='id'>Meeting ID</label>
            <br/>
            <input 
                type={"text"}
                value={meetingid}
                size={'15'}
                id={'id'}
                name={'id'}
                disabled
                onChange={updateForm}
            />
            </div>
            <br/> <br/>
            <div className='input11'>
            <label htmlFor='description'>Description</label>
            <br/>
            <textarea 
                rows={4} cols={50}
                id={'description'} 
                placeholder={'Enter description of meeting...'} 
                required
                name='description'
                value={form.description}
                onChange={updateForm}
            />
            </div>
            <br/>
            <div className='input3'>
            <label htmlFor='host'>Host</label>
            <br/>
            <input 
                type={'text'} 
                // placeholder={'username'} 
                size={'40'} 
                id={'host'} 
                name={'host'}
                value={username}
                disabled 
            />
            </div>
            <div className='input4'>
            <label htmlFor='status'>Status</label>
            <br/>
            <input 
                type={'text'} 
                value={'Proposed'}
                size={'20'} 
                id={'status'} 
                name={'status'}
                disabled 
                onChange={updateForm}
            />
            </div>
            <div className='input5'>
            <label htmlFor='location' >Location</label>
            <br/>
            <select 
                id='location' 
                name='location' 
                value={form.location}                
                onChange={updateForm}
                required
                >
                <option>Select Location</option>
                <option value={"Online"} selected>Online</option>
                <option value={"Onsite"} >Onsite</option>
            </select>
            <br/>
            </div>
            <div className='input6'>
            <label htmlFor='createdAt' >Created at</label>
            <br/>
            <input 
                type={'text'} 
                id={'createdAt'} 
                name={'createdAt'}
                value={createdAt}
                disabled
                onChange={updateForm}
            />
            </div>
            <div className='input10'>
            <label htmlFor='password' >Password</label>
            <br/>
            <input 
                type={'text'} 
                id={'password'}
                name={'password'} 
                placeholder={'password'}
                required    
                value={form.password}
                onChange={updateForm}
            />
            </div>
            <div className='input7'>
            <label htmlFor='duration' >Duration (minutes)</label>
            <br/>
            <input 
                type={'number'} 
                id={'duration'}
                name={'duration'} 
                min={'15'} max={'240'} 
                placeholder={'minutes'}
                required
                value={form.duration}
                onChange={updateForm}
             />
            </div>
            <br/>
            <div className='input8'>
            <label htmlFor='dates' >Dates Available</label>
            <br/>
            <input 
                type={'datetime-local'}
                id={'dates'}
                name={"datetime1"}
                value={dates.datetime1}
                onChange={updateDates}
            />
            <input 
                type={'datetime-local'}
                id={'dates'}
                name={"datetime2"}
                value={dates.datetime2}
                onChange={updateDates}
            />
            <br/>
            <input 
                type={'datetime-local'}
                id={'dates'}
                name={"datetime3"}
                value={dates.datetime3}
                onChange={updateDates}
            />
            <input 
                type={'datetime-local'}
                id={'dates'}
                name={'datetime4'}
                value={dates.datetime4}
                onChange={updateDates}
            />
            </div>
            <br/> <br/>

            


            <div className='input9'>

            {/* <button className='invitebtn' onClick={() => setInvite(true)} >Invite Participants</button> */}

            <button className='savebtn'>Save</button>
            </div>
            
            
        </form>

        

        <div className='invitediv row'>
        {/* <button className='invitebtn' onClick={() => setInvite(true)} >Invite Participants</button> */}

            <InviteParticipants setParticipant={setParticipant} username={username} />
        </div>


        </div>
        

        {/* Prompt for invite participants
        <Participants trigger={invite} setTrigger={setInvite} participantsListt={participants} 
        
            content={
                <>
                
                <p>Select Participants</p> 
                <UsersList username={username} setParticipants={setparticipants}  />
                {participants}
                <br/>
                
                </>
            }
    
        >
        </Participants> */}

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

export default NewMeeting