import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import Back from './Back';
import "./CheckInvitation.css";


const CheckInvitation = ({username}) => {

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
        
        const participantDates = form.datesSelected;
        // const select = form.selectDate; 

        form.selectDate = selectedDates;
        
        console.log("form.datesSelected:", participantDates);

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

        const select = form.selectDate;
        const participantDates = form.datesSelected;

        if(check == false) {
                
            form.datesSelected = [...participantDates, select];
            console.log("Dates have been selected!");
            alert("Dates have been selected!");
            navigate("/interface/invitations");

        } else {
            console.log("Dates are already selected!");
            alert("Dates are already selected!");
            navigate("/interface");
        }
                
        // form.datesSelected = [...participantDates, select];

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
          createdAt: form.createdAt,
          updatedAt: form.updatedAt,
          host: form.host,
          dates: form.dates,
          datesSelected: form.datesSelected,
          selectDate: form.selectDate,
          participants: form.participants,
          participantsList: form.participantsList
        };
      
        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
          method: "POST",
          body: JSON.stringify(editedPerson),
          headers: {
            'Content-Type': 'application/json'
          },
        });
      
        
                
    }


    // Selected Dates
    const [datesSelected, setDatesSelected] = useState({
        participant: username,
        dateselected: [],
        response: []
    }, );

    const selectedDates = [];
    const participantDates = form.datesSelected;
    // const select = form.selectDate;
        

    useEffect(() => {  
        selectedDates.push(datesSelected);
        form.selectDate = selectedDates;
        console.log("selectedDates[0]", selectedDates[0]);
        // console.log("form.selectDate: ", form.selectDate[0].participant);
        // console.log("form.datesSelected: ", form.datesSelected);
        // console.log("form.datesSelected: ", form.datesSelected[1][0].participant);
        
    }, [datesSelected]);


    let check = false;


    for(let i=0; i<participantDates.length; i++) {

        console.log("form.datesSelected: ", form.datesSelected[i]);
        console.log("form.datesSelected[i]: ", form.datesSelected[i][0].participant);

        if(form.datesSelected[i][0].participant === form.selectDate[0].participant) {
            check = true;
        }
           
    }
    
    // form validation
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isValid, setValid] = useState(false);


    const updateDatesSelected = (e) => {
        const {value, checked} = e.target;
        const {dateselected} = datesSelected;

        console.log(`${value} is ${checked}`);

        // form validation
        if(checked) {
            setShowErrorMessage(false);
            setValid(true);
            
        } else {
            setShowErrorMessage(true);
            setValid(false);
        }
     

        // Case 1 : The user checks the box
        if (checked) {
        setDatesSelected({
            participant: username,
            dateselected: [...dateselected, value],
            response: [...dateselected, value],
        });

        }
  
        // Case 2  : The user unchecks the box
        else {
            setDatesSelected({
                participant: username,
                dateselected: dateselected.filter((e) => e !== value),
                response: dateselected.filter((e) => e !== value),
            });
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





  return (
    <div className='interfacePage'>
    <div className='newMeeting' style={ logout ? { display: "none" } : {} } >
        <div className='input0'>
            <p>Invitation</p>
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
            {/* <div className='input6'>
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
            </div> */}
            <br/> <br/>

            

            <div className='check'>

            {showErrorMessage ? <div className='passError' > Please select atleast one option. </div> : ''}
            
            </div>

            <br/> 
            <div className='input6 availableDates'>
                {/* <fieldset> */}
                <br/>
                <label htmlFor='dates' ><b>Dates Available</b></label>
                <br/> <br/> &emsp;
                <input 
                    type={'checkbox'}
                    id={'dateselected1'}
                    name={"dateselected"}
                    value={form.dates.datetime1}
                    onChange={updateDatesSelected}
                    
                />
                &emsp;
                <input 
                    type={'datetime-local'}
                    id={'dateselected1'}
                    name={"dateselected"}
                    value={form.dates.datetime1}
                    onChange={updateDatesSelected}
                    disabled
                />
                &emsp; &emsp;
                <input 
                    type={'checkbox'}
                    id={'dateselected2'}
                    name={"dateselected"}
                    value={form.dates.datetime2}
                    onChange={updateDatesSelected}
                />
                &emsp;
                <input 
                    type={'datetime-local'}
                    id={'dateselected2'}
                    name={"dateselected"}
                    value={form.dates.datetime2}
                    onChange={updateDatesSelected}
                    disabled
                />
                <br/> &emsp;
                <input 
                    type={'checkbox'}
                    id={'dateselected3'}
                    name={"dateselected"}
                    value={form.dates.datetime3}
                    onChange={updateDatesSelected}
                />
                &emsp;
                <input 
                    type={'datetime-local'}
                    id={'dateselected3'}
                    name={"dateselected"}
                    value={form.dates.datetime3}
                    onChange={updateDatesSelected}
                    disabled
                />
                &emsp; &emsp;
                <input 
                    type={'checkbox'}
                    id={'dateselected4'}
                    name={"dateselected"}
                    value={form.dates.datetime4}
                    onChange={updateDatesSelected}
                />
                &emsp;
                <input 
                    type={'datetime-local'}
                    id={'dateselected4'}
                    name={"dateselected"}
                    value={form.dates.datetime4}
                    onChange={updateDatesSelected}
                    disabled
                />
                <br/>
                {/* </fieldset> */}
            </div>

            <br/> <br/>
            <div className='input12'>
            <br/> <br/>
            <p className='note'>Note: &emsp; Please choose the possible dates for participation in the meeting from the given <br/>
                                &emsp; &emsp; &emsp; available dates to confirm your meeting participation.</p>

            <button  className={"confirmbtn"} disabled={!isValid} >Confirm</button>

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

export default CheckInvitation