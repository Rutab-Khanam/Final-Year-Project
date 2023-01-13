import React from 'react'
import './FeedbackPrompt.css'

const FeedbackPrompt = (props) => {


    

  return (props.trigger) ? (
        <div className='feedbackPrompt'>
            <div className='feedbackPromptInner'>
                <i className='fa fa-times' onClick={() => props.setTrigger(false) } />
                
                {props.content}

                {/* {showErrorMessage ? <div className='passError2' > Please write feedback. </div> : ''}
                
                <button className='sendBtn' onClick={inviteClick} disabled={!isValid} >Send</button> */}
            </div>
        </div>
  ) : "";
}

export default FeedbackPrompt