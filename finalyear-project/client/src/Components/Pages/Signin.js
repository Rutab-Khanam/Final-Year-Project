import React, { useState, useEffect, createContext } from 'react'
import './Signin.css'
import { useNavigate } from 'react-router-dom'



const Signin = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const UserContext = createContext();


//  const useLogin = () => {

//   const [users, setUsers] = useState([]);  

//   // This method fetches the meetings from the database.
//   useEffect(() => {
//     async function getUsers() {
//       const response = await fetch(`http://localhost:5000/record/validate`);

//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const users = await response.json();
//       setUsers(users);

//       if (!users) {
//             window.alert(`Please check your login information.`);
//             console.log(users);
//             // console.log(email);
//             console.log(response);
//             navigate("/signin");
//             return;
//       } else {
//             navigate("/interface");
//       }
//     }

//     getUsers();

//     return;
//   }, [users.length]);

// }

  // async function clickLogin() {

  //     getUsers();
  // }
  

   
  // working
  useEffect(() => {
      const found = JSON.parse(localStorage.getItem('user-info'));
      if (found) {
          console.log("email: ", email);
      } else {
        console.log("No email");
      }
    }, []);
  
    
      async function clickLogin(e) {
        e.preventDefault(e);
        // console.warn(email, password);
  
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
              navigate("/interface"); 
              console.log("email: ", email);
              console.log("Result:", result);
              console.log("Result Stringify:", JSON.stringify(result));
              // let finalResult = JSON.stringify(result);
              // console.log(typeof(finalResult));
              // const username = result.username;
              // console.log("user _id:", username);
        }
        
      }

 

  // Try Method
    // async function clickLogin(e) {
    //   e.preventDefault(e);
      
    //   const response = await fetch(`http://localhost:5000/record/validate`);
  
    //   if (!response.ok) {
    //     const message = `An error has occurred: ${response.statusText}`;
    //     window.alert(message);
    //     // console.log(email);
    //     // console.log(password);
    //     return;
    //   }
  
    //   const record = await response.json();
    //   if (!record) {
    //     window.alert(`Please check your login information.`);
    //     console.log(record);
    //     // console.log(email);
    //     console.log(response);
    //     navigate("/signin");
    //     return;
    //   } else {
    //     navigate("/interface");
    //   }
      
    // }

    
  // // This method will map out the meetings on the table
  // function usersList() {
  //   return users.map((user => {
  //     return (
  //       <User
  //         user={user}
  //         // handleClick={() => handleClick(meeting._id)}
  //         key={user._id}
  //         // title={meeting.title}
  //       />
  //     );
  //   });
  // }

   


  return (
    <UserContext.Provider value={email}>
    <div className='page'>
    <div className='signin-form '>
        <form onSubmit={clickLogin}>
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
                // pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
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
    </UserContext.Provider>
  )
}

export default Signin