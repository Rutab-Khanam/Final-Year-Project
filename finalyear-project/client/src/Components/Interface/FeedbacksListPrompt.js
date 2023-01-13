import React from 'react'
import './FeedbacksListPrompt.css'

const FeedbacksListPrompt = (props) => {


    

  return (props.trigger) ? (
        <div className='feedbacksListPrompt'>
            <div className='feedbacksListPromptInner'>
                <i className='fa fa-times' onClick={() => props.setTrigger(false) } />
                
                {props.content}

                {/* {showErrorMessage ? <div className='passError2' > Please write feedback. </div> : ''}
                
                <button className='sendBtn' onClick={inviteClick} disabled={!isValid} >Send</button> */}
            </div>
        </div>
  ) : "";
}

export default FeedbacksListPrompt