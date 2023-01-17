import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import GiveFeedback from './GiveFeedback';
import Feedbacks from './Feedbacks';
import Update from './UpdateButton';




const Meeting = (props) => {

    const currentUser = props.username;
    const hostName = props.meeting.host;
  
    let [feedbacks, setFeedbacks] = useState("");
    console.log("feedbacks:", feedbacks);
    console.log("title:", props.meeting.title);

    // feedback of participant (Give Feedback)
    const [feedbackParticipant, setFeedbackParticipant] = useState({
      participant: "",
      feedback: ""
    });

    console.log("feedbackParticipant:", feedbackParticipant);

    let feedbackSent = false;
    

    useEffect(() => {

      setFeedbacks(feedbacks);
      setFeedbackParticipant({
        participant: props.username,
        feedback: feedbacks
      })

      console.log("feedback inside:", feedbacks);
      feedbackParticipant.feedback = feedbacks;

      console.log(feedbackParticipant);
      console.log("feedback updated!");
      
      props.meeting.feedbackParticipant = feedbackParticipant;
    
      console.log("feedbackOfParticipant:", props.meeting.feedbackParticipant); 


      if(props.meeting.feedbacksList == undefined) {
        props.meeting.feedbacksList = [];
      }
    
      let feedbackGet = props.meeting.feedbackParticipant; 
      const feedbackLst = props.meeting.feedbacksList;

      console.log("feedbackGet:", feedbackGet);
      console.log("data type of feedbackLst:", typeof(feedbackLst)); 
      console.log(Array.isArray(feedbackLst));   


      let check = false;
      let feedbackValue = false;

      if(feedbackGet.feedback !== '') {

        feedbackValue = true;
      }

      for(let i=0; i<feedbackLst.length; i++) {

        console.log("form.feedbacksList: ", props.meeting.feedbacksList[i]);
        console.log("form.feedbacksList[i]: ", props.meeting.feedbacksList[i].participant);
        console.log("form.feedbackParticipant[i]: ", feedbackGet.participant);
        console.log("feedbackGet.feedback:", feedbackGet.feedback);

        if((props.meeting.feedbacksList[i].participant === feedbackGet.participant)) {
            check = true;
        }
         
      }

      console.log("check:", check);
      console.log("feedbackGet:", feedbackGet);
      console.log("feedbackLst:", feedbackLst);

      if(feedbackValue == true) {

        if(check == false) {
                
            props.meeting.feedbacksList = [...feedbackLst, feedbackGet];
          
            console.log("Feedbacks list updated!");
            console.log("Feedbacks list:", props.meeting.feedbacksList);

            feedbackSent = true;
        
        } else {
            console.log("Feedback is already sent!");
        }

      } 

      onSubmitFeedback();


    }, [feedbacks]);



    async function onSubmitFeedback(e) {

      const editedPerson = {
        id: props.meeting.id,
        title: props.meeting.title,
        description: props.meeting.description,
        start_time: props.meeting.start_time,
        duration: props.meeting.duration,
        status: props.meeting.status,
        location: props.meeting.location,
        password: props.meeting.password,
        dates: props.meeting.dates,
        datesSelected: props.meeting.datesSelected,
        selectDate: props.meeting.selectDate,
        createdAt: props.meeting.createdAt,
        updatedAt: props.meeting.updatedAt,
        host: props.meeting.host,
        participants: props.meeting.participants,
        participantsList: props.meeting.participantsList,
        feedbackParticipant: props.meeting.feedbackParticipant,
        feedbacksList: props.meeting.feedbacksList
      };
    
      // console.log("params.id", props.meeting._id);
      // console.log("editedPerson.title:", editedPerson.title);
      // console.log("feedbackParticipant:", editedPerson.feedbackParticipant);
      // console.log("feedbackLength:", feedbackParticipant.feedback);
      // console.log("participant name:", props.meeting.participant);
      let feedbackLength = feedbackParticipant.feedback;
      console.log(feedbackLength.length);


      if(currentUser !== hostName) {

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${props.meeting._id}`, {
          method: "POST",
          body: JSON.stringify(editedPerson),
          headers: {
            'Content-Type': 'application/json'
          },
        });

        console.log(props.meeting.feedbacksList);

        if(feedbackSent == true) {
          console.log("feedback sent!");
        } else {
          console.log("feedback already sent.");
        }
        
          
      }
      
    }

    



    
    return(
    <tr>
      {/* <td className='tableCol'>{props.meeting.id}</td> */}
      <td className='tableCol'>{props.meeting.title}</td>
      <td className='tableCol'>{props.meeting.start_time}</td>
      <td className='tableCol'>
        &emsp;
      <span style={ !(currentUser == hostName) ? { display: "none" } : {} } >
          <Feedbacks username={props.username} allFeedbacks={props.meeting.feedbacksList} />
      </span>
        &emsp;
       <Link className="btn btn-link feedback" to={`/view/${props.meeting._id}`}
              style={ (currentUser == hostName) ? { display: "none" } : {} }
            >View</Link>
       &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
       <Link className="btn btn-link update" to={`/update/${props.meeting._id}`}
              style={ !(currentUser == hostName) ? { display: "none" } : {} }
            >Update</Link>
       <span style={ (currentUser == hostName) ? { display: "none" } : {} }>
          <GiveFeedback setFeedbacks={setFeedbacks} username={props.username} onClick={onSubmitFeedback} />
        </span>     
       
       {/* <Link className="btn btn-link update" to={``} 
              style={ (currentUser == hostName) ? { display: "none" } : {} }
            >Give Feedback</Link> */}
       &emsp;
       <button className='btn btn-link start' style={ !(currentUser == hostName) ? { display: "none" } : {} } >
          Start Meeting
       </button>
       <button className='btn btn-link join' style={ (currentUser == hostName) ? { display: "none" } : {} }>
          Join Meeting
       </button>
       
      </td>
    </tr>
    
  )
};

export default Meeting