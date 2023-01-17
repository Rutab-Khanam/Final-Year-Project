import React, { useEffect, useState } from 'react'
import { Menulist } from './Menulist'
import './Navbar.css';
import image from "./logo4.jpg";
import avatar from "./avatar.jpg";
import { Link, NavLink } from 'react-router-dom';




const Navbar = ({username}) => {

    
    const menulist = Menulist.map(({ url, title }, index) => {
        return(
            <li key={index}>
                <NavLink exact to={url} activeclassname="active"> 
                    {title} 
                </NavLink>
            </li>
        );
    });
    
    const [clicked, setClicked] = useState(false)
    const HandleClick = () => {
        setClicked(!clicked);
    };
    
    
    // To check current path
    const [change, setChange] = useState(false);

    useEffect(() => {
        const HandleNavbar = () => {

            const currentPath = window.location.pathname;
    
            const path = [ "/interface", "/interface/newMeeting", "/interface/proposedMeetings", 
                            "/interface/confirmedMeetings", "/interface/invitations", 
                            "/interface/allMeetings", "/edit/:id", "/view/:id" ];
    
            for (let i = 0; i < path.length; i++) {
                if(path[i] === currentPath) {
    
                    setChange(true);
                    console.log("change:", change);    
                }
            }  

            return;
        };
        HandleNavbar();

        return;
    });

   
    console.log("Username: ", username);

  // To check current User
  const [logout, setLogout] = useState(false);


  useEffect(() => {
      const HandleChange = () => {

          const currentUser = username;
  
          const user = "Unknown";
  
          if(user === currentUser) {
              setLogout(true);
              console.log("logout: ", logout);
              setChange(false);
              console.log("change in logout:", change);  
          } 
          else if (user != currentUser) {
              // navigate("/signin");
          }
          
          return;
      };

      HandleChange();

      return;
  });

	  


  // User dropdown
  const [userdrop, setUserdrop] = useState(false)
  const HandleUserDropdown = () => {
        setUserdrop(!userdrop);
  };

  

  // Logout Button
  const HandleLogout = () => {

		window.location.reload(false);
		
  }

   


    return (
        <header>
        <nav className="navbar">
            <Link to={'/interface'}>
            <img className="navbar-brand logo" alt="logo"
                    src={image} height={72} width={185}   
            /> 
            </Link>

            <div className='navChoice'>
                <div className='navHome' style={ change ? { display: "none" } : {} } >    
                <div className='menu-icon' onClick={HandleClick}>
                    <i className={clicked ? "fa fa-times" : "fa fa-bars fa-lg" }></i>
                </div>
            
                <ul className={clicked ? "menu-list" : "menu-list close"}> {menulist} </ul>
                </div>
                
                <div className='navInterface' style={ (!change ) ?  { display: "none" } : {} }>
                    <i className='fa fa-cog fa-lg' ></i>
                    <img className='profileimg' src={avatar} alt={'avatar'} height={75} width={75}
                        onClick={HandleUserDropdown}
                    />

                    

                    {userdrop ? 
                    
                        <div className='userDropdown' float="right" >
                            <br/>
							<Link to={'/interface/manageProfile'} >
                            	<a>Manage Profile</a>
							</Link>
                            <br/> <br/> <br/>
                            	<a onClick={HandleLogout} className={'logoutBtn'} >Logout</a>
                            
                        </div>
                        
                        : ''    
                    }
                </div>
            
            </div>
        </nav>
        </header>

    )
}

export default Navbar