import React, {useState, useEffect} from 'react'
import FeedbackPrompt from './FeedbackPrompt'
import './ConfirmedMeetings.css'



const GiveFeedback = ({setFeedbacks}) => {

    let [feedback, setFeedback] = useState(false);
    const [feedbackss, setFeedbackss] = useState("");
    console.log("feedbacks:", feedbackss);

    
    // form validation
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isValid, setValid] = useState(false);

    const validity = (e) => {
      
      if(feedbackss.length > 20) {
        
          setShowErrorMessage(false);
          setValid(true);

      } else {
          setShowErrorMessage(true);
          setValid(false);
      }
    }

    useEffect(() => {

        validity();

    }, [feedbackss]);

    

    // invite button
    const inviteClick = () => {

      if(feedbackss.length > 20){
          
          setValid(true);
          setFeedbacks(feedbackss);
          console.log("feedbackss in GiveFeedback: ", feedbackss);
          setFeedback(false);

      }       
    }


      
  return (
    <>

            <button className="btn btn-link giveFeedbackBtn" onClick={() => {setFeedback(true); }} >Give Feedback</button>
            

            {/* Prompt for feedback */}
            <FeedbackPrompt trigger={feedback} setTrigger={setFeedback} participantFeedbackk={feedbackss}
        
            content={
                <>
            
                <p>Feedback</p> 
                <br/>
                <textarea 
                    rows={'5'} 
                    cols={'65'} 
                    placeholder={"Write feedback..."} 
                    name='feedbacks'
                    value={feedbackss}
                    onChange={(e) => setFeedbackss(e.target.value)}
                    required 
                />
                <br/>

                {showErrorMessage ? <div className='passError2' > Please write feedback. </div> : ''}
                
                <button className='sendBtn' onClick={inviteClick} disabled={!isValid} >Send</button>
            
                </>
            }

            >
            </FeedbackPrompt>
            
        </>
  )
}

export default GiveFeedback