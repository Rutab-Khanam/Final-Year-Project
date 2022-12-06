import React, { useState } from 'react'
import { Menulist } from './Menulist'
import './Navbar.css';
import image from "./logo4.jpg";
import avatar from "./avatar.jpg";
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {

    
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
    const [change, setChange] = useState(false)

    const HandleChange = () => {

        const currentPath = window.location.pathname;

        const path = [ "/interface", "/interface/newMeeting", "/interface/proposedMeetings", 
                        "/interface/confirmedMeetings", "/interface/invitations", 
                        "/interface/allMeetings", "/edit/:id", "/view/:id" ];

        for (let i = 0; i < path.length; i++) {
            if(path[i] === currentPath) {
                setChange(!change);
                
            }
        }
        
        return;
    };



    return (
        <header onLoad={HandleChange}>
        <nav className="navbar">
            <Link to={'/interface'}>
            <img className="navbar-brand logo" alt="logo"
                    src={image} height={72} width={185}   
            /> 
            </Link>

            <div className='navChoice'>
                <div className='navHome' style={ change ? { display: "none" } : {} }>    
                <div className='menu-icon' onClick={HandleClick}>
                    <i className={clicked ? "fa fa-times" : "fa fa-bars fa-lg" }></i>
                </div>
            
                <ul className={clicked ? "menu-list" : "menu-list close"}> {menulist} </ul>
                </div>
                
                <div className='navInterface' style={ !change ? { display: "none" } : {} }>
                    <i className='fa fa-cog fa-lg' ></i>
                    <img className='profileimg' src={avatar} alt={'avatar'} height={75} width={75} />
                
                </div>

            
            </div>
        </nav>
        </header>

    )
}

export default Navbar