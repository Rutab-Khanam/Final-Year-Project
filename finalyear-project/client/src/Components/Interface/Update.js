import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router";
// import { Link } from 'react-router-dom';
import Back from './Back';

const Update = () => {

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
            navigate("/interface/proposedMeetings");
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
        
        form.status = "Confirmed";
        form.updatedAt = updatedAt;

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
          createdAt: form.createdAt,
          updatedAt: form.updatedAt,
        };
      
        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
          method: "POST",
          body: JSON.stringify(editedPerson),
          headers: {
            'Content-Type': 'application/json'
          },
        });
      
        navigate("/");
      }



  return (
    <div className='interfacePage'>
    <div className='newMeeting'>
        <div className='input0'>
            <p></p>
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
                placeholder={'username'} 
                size={'40'} 
                id={'host'} 
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
            <div className='input9'>

            <button className='invitebtn'>Invite Participants</button>

            <button className='savebtn'>Fix Meeting</button>
            </div>
            
        
        </form>
        </div>
    </div>
    </div>

    
  )
}

export default Update