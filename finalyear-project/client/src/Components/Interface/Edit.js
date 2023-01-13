import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import Back from './Back';
import InviteParticipants from './InviteParticipants';


const ListItem = (props) => {

    return (
      <>
      <tr>
        <td className='participantName' ><li>{props.participantName}</li></td>
        &emsp; &emsp; &emsp; &emsp; &emsp;
        {/* <td><li> {props.datesSelected} </li></td> */}
        <td className='selectedDates' >
          {props.datesSelected.map((dates, index) => (
               <tr key={index} > <input className='dates' value={dates} disabled /> </tr>
          ))}

        </td>
    
      </tr>
      <br/>
      </>
    );
}




const Edit = ({username}) => {

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
        feedbackParticipant:{},
        feedbacksList:[],
        meetings: [],
      });
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
          console.log("meeting:", meeting.datesSelected);
          // const datesSelected = meeting.datesSelected;
          if (!meeting) {
            window.alert(`Meeting with id ${id} not found`);
            navigate("/interface/proposedMeetings");
            return;
          }
      
          setForm(meeting);
        }
      
        fetchData();
      
        return;
      }, [params.id, navigate]);
      
      // console.log("datesSelected: ", datesSelected);
      
      // These methods will update the state properties.
      const updateForm = (e) => {
        // console.log(e);
        const {name, value} = e.target;
        
        form.status = "Confirmed";
        form.updatedAt = updatedAt;
        // form.participant = [ ...form.participant, ...participant];
        console.log("form.participants:", form.participants);

        setForm((preval) => {
            return{
                ...preval,
                [name]: value
            }
        })
      }


      // Current Date
      const date = new Date();
      const updatedAt = date.toLocaleString();

      
      async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
          id: form.id,
          title: form.title,
          description: form.description,
          start_time: form.start_time,
          duration: form.duration,
          status: form.status,
          location: form.location,
          password: form.password,
          dates: form.dates,
          datesSelected: form.datesSelected,
          selectDate: form.selectDate,
          createdAt: form.createdAt,
          updatedAt: form.updatedAt,
          host: form.host,
          participants: form.participants,
          participantsList: form.participantsList,
          feedbackParticipant: form.feedbackParticipant,
          feedbacksList: form.feedbacksList
        };
      
        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
          method: "POST",
          body: JSON.stringify(editedPerson),
          headers: {
            'Content-Type': 'application/json'
          },
        });
      
        alert("Meeting Fixed!");
        navigate("/interface/proposedMeetings");
      }


    // Invitations  
    // let [invite, setInvite] = useState(false);
    let [participant, setParticipant] = useState([]);
    let [validd, setValidd] = useState(false);
    let listValid = false;
    console.log("participant in update: ", participant);
    console.log("participantsList:", form.participantsList);
    console.log("validd:", validd);
    console.log("listValid:", listValid);
    

    useEffect(() => {

    //     // setParticipant(participant);
        form.participants = participant;
    //     console.log(participant);
    //     console.log("participant updated");
    //     onUpdate();

        const participantsListForm = form.participantsList;

        participant.map((item) => {
            let check = participantsListForm.includes(item);
          
            if(!check) {
                form.participantsList.push(item);
                listValid = true;
            }
        })
        console.log("participantsList:", form.participantsList);

        // console.log(validd);
        if((listValid) == true) {
          onUpdate();
        }


    }, [participant]);



    async function onUpdate(e) {
        
        const editedPerson = {
          id: form.id,
          title: form.title,
          description: form.description,
          start_time: form.start_time,
          duration: form.duration,
          status: form.status,
          location: form.location,
          password: form.password,
          dates: form.dates,
          datesSelected: form.datesSelected,
          selectDate: form.selectDate,
          createdAt: form.createdAt,
          updatedAt: form.updatedAt,
          host: form.host,
          participants: form.participants,
          participantsList: form.participantsList,
          feedbackParticipant: form.feedbackParticipant,
          feedbacksList: form.feedbacksList
        };
      
        console.log(participant.length);

        if(participant.length > 0) {

            // This will send a post request to update the data in the database.
            await fetch(`http://localhost:5000/update/${params.id}`, {
              method: "POST",
              body: JSON.stringify(editedPerson),
              headers: {
                'Content-Type': 'application/json'
              },
            });

            console.log("PARAMS.ID", params.id);
            // console.log(editedPerson.participants);
            console.log("Participants Invited!");
        }
        

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


  // Participants
  const participantsDates = form.datesSelected;
  console.log("participantsDates in update:", participantsDates);


  const listItems = participantsDates.map((number) => 
      
    <ListItem 
        key={number.toString()} 
        participantName={number[0].participant}
        datesSelected={number[0].dateselected }
           
    /> 
      
  );


  //     for(let i=0; i<participants.length; i++) {
  //       console.log("form.datesSelected: ", form.datesSelected[i]);
  //       console.log("form.datesSelected[i]: ", form.datesSelected[i][0].participant);
    
  //       const participantName = participants[i][0].participant;
  //       content.push(<li key={participantName.i} >{participantName.participant}</li> )       
  //     }

 




  return (
    <div className='interfacePage'>
    <div className='newMeeting' style={ logout ? { display: "none" } : {} } >
        <div className='input0'>
            <p>Meeting</p>
            <Back/>
        </div>
        
        <div className='newMeetingForm'>

        <form onSubmit={onSubmit} >
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
                disabled
            />
            </div>
            <div className='input2'>
            <label htmlFor='id'>Meeting ID</label>
            <br/>
            <input 
                type={"text"}
                value={form.id}
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
                name='host'
                value={form.host}
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
                value={form.createdAt}
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
            <div className='input6'>
            <label htmlFor='createdAt' >Updated at</label>
            <br/>
            <input 
                type={'text'} 
                id={'createdAt'} 
                name={'createdAt'}
                value={updatedAt}
                disabled
                onChange={updateForm}
            />
            </div>
            <br/>

            <div className='input14'>

              <tr>
                <th>Participant Name</th>
                &emsp; &emsp; &emsp; &emsp;
                <th>Selected Dates</th>
              </tr>
              <hr className='participantHr'/>
              
              <ul>
                  {listItems}
              </ul>

            </div>

            <br/>
            <div className='input11'>
            <label htmlFor='start_time' ><b>Final Date</b></label>
            
            <input 
                type={'datetime-local'} 
                id={'start_time'} 
                name={'start_time'}
                title={'Please select a final date to fix meeting.'}
                required
                value={form.start_time}
                onChange={updateForm}
            />
            </div>

            <br/> <br/>
            <div className='input13'>

            {/* <InviteParticipants setParticipant={setParticipant} username={username} /> */}

            <button className='savebtn'>Fix Meeting</button>
            </div>

          </form>


          
          <div className='invitediv row'>
              
               <InviteParticipants 
                  setParticipant={setParticipant} setValidd={setValidd} 
                  username={username} onClick={onUpdate} />
             
          </div>
          


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

export default Edit