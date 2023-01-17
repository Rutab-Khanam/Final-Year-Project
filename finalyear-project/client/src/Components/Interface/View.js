import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ConfirmedMeetings.css"
import Back from './Back';


const ListItem = (props) => {

  return (
    <>
    <tr>
      <td className='participantName' ><li>{props.participantName}</li></td>
      {/* &emsp; &emsp; &emsp; &emsp; &emsp; */}
  
    </tr>
    <br/>
    </>
  );
}



const View = ({username}) => {

  const [form, setForm] = useState({
    id:"",
    title:"",
    description:"",
    start_time:"",
    duration:"",
    status:"",
    location:"",
    password:"",
    createdAt:"",
    updatedAt: "",
    host: "",
    dates: [],
    datesSelected: [],
    selectDate: [],
    participants: [],
    participantsList: [],
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
      if (!meeting) {
        window.alert(`Meeting with id ${id} not found`);
        navigate("/interface");
        return;
      }
  
      setForm(meeting);
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);
  
  
  // These methods will update the state properties.
  const updateForm = (e) => {
    console.log(e);
    const {name, value} = e.target;
    
    // const participantDates = form.datesSelected;
    // const select = form.selectDate; 

    // form.selectDate = selectedDates;
    
    // console.log("form.datesSelected:", participantDates);

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


  // Participants
  const participantslist = form.participantsList;
  console.log("participantsDates in update:", participantslist);


  const listItems = participantslist.map((number) => 
      
    <ListItem 
        key={number.toString()} 
        participantName={number}       
    /> 
      
  );



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
    <div className='newMeeting' style={ logout ? { display: "none" } : {} } >
      <div className='input0'>
          <p>Meeting</p>
          <Back/>
      </div>
    
      <div className='newMeetingForm'>

      <form >
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
            disabled
        />
        </div>
        <br/>
        <div className='input3'>
        <label htmlFor='host'>Host</label>
        <br/>
        <input 
            type={'text'} 
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
            disabled
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
            disabled
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
            disabled
         />
        </div>
        <br/>  
        <div className='input6'>
        <label htmlFor='start_time' >Start Time</label>
        <br/>
        <input 
            type={'text'} 
            id={'start_time'} 
            name={'start_time'}
            value={form.start_time}
            disabled
            onChange={updateForm}
        />
        </div>

        <br/> <br/>

        <br/> 
        <div className='input6 meetingParticipants'>
            <br/>
            <label htmlFor='dates' ><b>Meeting Participants</b></label>
            &emsp;

            <hr className='participantListHr'/>
              
            <ul>
                {listItems}
            </ul>
            
        </div>

        <br/> <br/>
        <div className='input12'>
        <br/> <br/>
        
        </div>

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

export default View