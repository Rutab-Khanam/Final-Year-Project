import React, { useState, useEffect } from 'react'
import './Signin.css'
import { useNavigate } from 'react-router-dom'


const Signin = ({setUsername}) => {

      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const navigate = useNavigate();

      let setUser = '';

      // working
      useEffect(() => {
          const found = JSON.parse(localStorage.getItem('user-info'));
          if (found) {
              console.log("email: ", email);
          } else {
            console.log("No email");
          }
      }, []);
  


    // onSubmit function
      async function clickLogin(e) {

        e.preventDefault();
      
        let item = {email, password};
  
        let result = await fetch(`http://localhost:5000/record/validate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        });
  
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))

        if (!result) {
              window.alert(`Please check your login information.`);
              console.log(email);
              console.log(result);
              // navigate("/");
              return;
        } else {
              console.log("email: ", email);
              console.log("Result:", result);
              // console.log("Result Stringify:", JSON.stringify(result));
              // let finalResult = JSON.stringify(result);
              // console.log(typeof(finalResult));
              
              const username = result.username;
              console.log("Username: ", username);  
              setUser = username;
              console.log("setUser: ", setUser); 
              onLoad();   
              // navigate("/interface");     
          }
            
    }   

    console.log("setUser2: ", setUser);
     
    const onLoad = () => {
      console.log("setUser3: ", setUser);
      setUsername(setUser);
      navigate('/interface');
    }


  return (
    <div className='page'>
    <div className='signin-form '>
        <form onSubmit={clickLogin} setUser={setUser} >
            <input 
                type={"text"} 
                placeholder={"Email address"} 
                size={"40"} 
                title={"Enter valid email id"} 
                required 
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                name='email' id='email'
                value={email}
                onChange={e => setEmail(e.target.value)} 
                />
            <br />
            <input 
                type={"password"} 
                placeholder={"Password"} 
                size={"40"} 
                title={"Password is required!"} 
                required 
                name='password' id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            <br />
  
            <button type='submit' >Sign In</button>
        </form>

        <span className='psw'><a href="#">Forgot password?</a></span>

    </div>
    </div>
  )
}

export default Signin
