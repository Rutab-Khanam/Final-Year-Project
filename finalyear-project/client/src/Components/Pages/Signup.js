import React, { useState, useEffect } from 'react'
import './Signup.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

    const [user, setUser] = useState({
        fullname:"",
        username:"",
        email:"",
        country:"",
        password:"",
        timezone:"",
        dateofbirth:"",
        phoneNo:"",
        gender:""
    })

    const handleInputs = (e) => {
        console.log(e);
        const {name, value} = e.target;

        user.phoneNo = phoneNo;
        user.password = password;

        setUser((preval) => {
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
        const newUser = { ...user };
  
        let result = await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        })
        .catch(error => {
        window.alert(error);
        return;
        });
  
        setUser({ fullname:"", username:"", email:"", country:"", password:"",
                  timezone:"", dateofbirth:"", phoneNo:"", gender:"" });
        
        

        result = await result.json();
        console.log("Result: ", result.error);

        
        if (result.error) {
              window.alert(result.error);
              return;
        } 
        else {
              console.log("Result:", result);
              window.alert("Registeration Completed Successfully \n Please check your email for email verification");
        }
        

    }





    //Phone No
    const [phoneNo, setPhoneno] = useState()
    
    //Password Validation
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [cPasswordClass, setCPasswordClass] = useState('form-control');
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);

    useEffect(() => {
        if (isCPasswordDirty) {
            if (password === cPassword) {
                setShowErrorMessage(false);
                setCPasswordClass('form-control is-valid')
            } else {
                setShowErrorMessage(true)
                setCPasswordClass('form-control is-invalid')
            }
        }
    }, [cPassword]);

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setIsCPasswordDirty(true);
    }


    //Success Alert
    // const [status, setStatus] = useState(false);
    // const [type, setType] = useState("");
    // const [title, setTitle] = useState("");





  return (
    <div className='page'>

    <div className='signup-form '>

        <p>Be a part of Liaison. Join Us!</p>
        <hr /> <br/>
        <form onSubmit={onSubmit} >
            <input 
                type={"text"} 
                placeholder={"Full Name"} 
                size={"30"} 
                required pattern='^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$'
                name='fullname'
                value={user.fullname}
                onChange={handleInputs} />
            <input 
                type={"text"} 
                placeholder={"Username"} 
                size={"30"} 
                required
                name='username'
                value={user.username}
                onChange={handleInputs} />
            <br />
            <input 
                type={"text"} 
                placeholder={"Email address"} 
                size={"30"} 
                required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                name='email'
                value={user.email}
                onChange={handleInputs} />
            <input 
                type={"text"} 
                placeholder={"Country"} 
                size={"30"} 
                required
                name='country'
                value={user.country}
                onChange={handleInputs} />      
            <br />     
            
        
            <input 
                type={"password"} 
                placeholder={"New Password"} 
                size={"30"} 
                title={"Password must contain at least 8 characters. including number, uppercase and lowercase letter."} 
                required pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                className={"form-control"}
                value={password}
                onChange={(e) => { setPassword(e.target.value) }} />
            <input 
                type={"password"} 
                placeholder={"Confirm Password"} 
                size={"30"} 
                title={'Must match new password.'}
                required pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                className={cPasswordClass}
                value={cPassword}
                onChange={handleCPassword} />
            <br />

            {showErrorMessage && isCPasswordDirty ? <div className='passError' > Passwords did not match </div> : ''}

            <br />


            <label htmlFor='timezone' className={'timezone'} >Time Zone</label>
            
            <select id='timezone' name='timezone' required value={user.timezone} onChange={handleInputs} >
                <option   disabled >Select timezone</option>
                <option value="UTC−12:00">UTC−12:00</option>
                <option value="UTC−11:00">UTC−11:00</option>
                <option value="UTC−10:00">UTC−10:00</option>
                <option value="UTC−09:30">UTC−09:30</option>
                <option value="UTC−09:00">UTC−09:00</option>
                <option value="UTC−08:00">UTC−08:00</option>
                <option value="UTC−07:00">UTC−07:00</option>
                <option value="UTC−06:00">UTC−06:00</option>
                <option value="UTC−05:00">UTC−05:00</option>
                <option value="UTC−04:00">UTC−04:00</option>
                <option value="UTC−03:30">UTC−03:30</option>
                <option value="UTC−03:00">UTC−03:00</option>
                <option value="UTC−02:00">UTC−02:00</option>
                <option value="UTC−01:00">UTC−01:00</option>
                <option value="UTC±00:00">UTC±00:00</option>
                <option value="UTC+01:00">UTC+01:00</option>
                <option value="UTC+02:00">UTC+02:00</option>
                <option value="UTC+03:00">UTC+03:00</option>
                <option value="UTC+03:30">UTC+03:30</option>
                <option value="UTC+04:00">UTC+04:00</option>
                <option value="UTC+04:30">UTC+04:30</option>
                <option selected value="UTC+05:00">UTC+05:00</option>
                <option value="UTC+05:30">UTC+05:30</option>
                <option value="UTC+05:45">UTC+05:45</option>
                <option value="UTC+06:00">UTC+06:00</option>
                <option value="UTC+06:30">UTC+06:30</option>
                <option value="UTC+07:00">UTC+07:00</option>
                <option value="UTC+08:00">UTC+08:00</option>
                <option value="UTC+08:45">UTC+08:45</option>
                <option value="UTC+09:00">UTC+09:00</option>
                <option value="UTC+09:30">UTC+09:30</option>
                <option value="UTC+10:00">UTC+10:00</option>
                <option value="UTC+10:30">UTC+10:30</option>
                <option value="UTC+11:00">UTC+11:00</option>
                <option value="UTC+12:00">UTC+12:00</option>
                <option value="UTC+12:45">UTC+12:45</option>
                <option value="UTC+13:00">UTC+13:00</option>
                <option value="UTC+14:00">UTC+14:00</option>            
            </select>

            <br/>
            <label htmlFor='dateofbirth' className={'dateofbirth'} >Date of Birth</label>            
            <input 
                type={'date'} 
                id={'dateofbirth'} 
                required
                name='dateofbirth'
                value={user.dateofbirth}
                onChange={handleInputs} />

            
            <PhoneInput 
                placeholder={"+92 310 1234567"}
                value={phoneNo}
                onChange={setPhoneno}
            />
            


            <div className='gender'>
            <label className='genderhead' >Gender</label>
            <br />
            <input 
                type={'radio'} name={'gender'} id={'male'}
                value={"male"}  required
                onChange={handleInputs} ></input>

            <label htmlFor='male' >Male</label>
            <input 
                type={'radio'} name={'gender'} id={'female'} 
                value={"female"}                
                onChange={handleInputs} ></input>
            <label htmlFor='female' >Female</label>
            
            </div>
            <button type='submit' >Sign Up</button>

            <ToastContainer 
            position='top-center' autoClose={5000} hideProgressBar={false}
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            
        </form>


    </div>
        <br/>
    </div>

  )
}

export default Signup;