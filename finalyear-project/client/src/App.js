import React from 'react';
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
import Update from './Components/Interface/Update';
import View from './Components/Interface/View';

function App() {
  return (

    <div className="App container">
      
          <Navbar />

          <Routes>
              <Route exact path="/" element={<Home />}  />
              <Route path="/signin" element={<Signin />}  />
              <Route path="/signup" element={<Signup />}  />

              <Route path='/interface' element={<Interface />} />
                <Route path='/interface/newMeeting' element={<NewMeeting />} />
                <Route path='/interface/proposedMeetings' element={<ProposedMeetings />} />
                <Route path='/interface/confirmedMeetings' element={<ConfirmedMeetings />} />
                <Route path='/interface/allMeetings' element={<AllMeetings />} />
                <Route path='/interface/invitations' element={<Invitations />} />

                <Route path="/edit/:id" element={<Update />} />
                <Route path="/view/:id" element={<View />} />
              
          </Routes>

          <Footer />
             
    </div>
  );
}

export default App;
