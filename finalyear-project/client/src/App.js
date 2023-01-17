import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Pages/Home';
import Signin from './Components/Pages/Signin';
import Signup from './Components/Pages/Signup';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer';
import Interface from './Components/Interface/Interface';
import NewMeeting from './Components/Interface/NewMeeting';
import ProposedMeetings from './Components/Interface/ProposedMeetings';
import ConfirmedMeetings from './Components/Interface/ConfirmedMeetings';
import AllMeetings from './Components/Interface/AllMeetings';
import Invitations from './Components/Interface/Invitations';
import View from './Components/Interface/View';
import CheckInvitation from './Components/Interface/CheckInvitation';
import Edit from './Components/Interface/Edit';
import UpdateButton from './Components/Interface/UpdateButton';
import ManageProfile from './Components/Interface/ManageProfile';



function App() {

  const [username, setUsername] = useState('Unknown');

  

  return (
    
    <div className="App container">
      
          <Navbar username={username} />

          <Routes>

              <Route exact path="/" element={<Home />}  />
              <Route path="/signin" element={<Signin setUsername={setUsername} />}  />
              <Route path="/signup" element={<Signup />}  />

              <Route path='/interface' element={<Interface username={username} />} />
                <Route path='/interface/newMeeting' element={<NewMeeting username={username} />} />
                <Route path='/interface/proposedMeetings' element={<ProposedMeetings username={username} />} />
                <Route path='/interface/confirmedMeetings' element={<ConfirmedMeetings username={username} />} />
                <Route path='/interface/allMeetings' element={<AllMeetings username={username} />} />
                <Route path='/interface/invitations' element={<Invitations username={username} />} />

                <Route path="/edit/:id" element={<Edit username={username} />} />
                <Route path="/invitation/:id" element={<CheckInvitation username={username} />} />
                <Route path="/update/:id" element={<UpdateButton username={username} />} />
                <Route path="/view/:id" element={<View username={username} />} />

                <Route path='interface/manageProfile' element={<ManageProfile username={username} />} />
             
          </Routes>

          <Footer />
             
    </div>
    
  );
}

export default App;
