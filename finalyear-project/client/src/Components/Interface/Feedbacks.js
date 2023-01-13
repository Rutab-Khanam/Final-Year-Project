import React, {useState} from 'react'
import FeedbacksListPrompt from './FeedbacksListPrompt'
import './ConfirmedMeetings.css'


const ListFeedback = (props) => {

	return (
	  <>
	  <tr>
	    <td className='participantName' >{props.participantName}</td>

	    &emsp; &emsp; &emsp; &emsp; &emsp;
	    
		<td className='selectedDates' >{props.feedbackValue}</td>
	  </tr>
	  <br/>
	  </>
	);
  }




const Feedbacks = ({allFeedbacks}) => {

	let [feedback, setFeedback] = useState(false);

	console.log("allFeedbacks:", allFeedbacks);


	// Feedbacks list
	const feedbackList = allFeedbacks;
	console.log("feedbackList in feedbacks:", feedbackList);
    
	const listFeedback = feedbackList.map((number) => 
	    
	  <ListFeedback 
		key={number.toString()} 
		participantName={number.participant}
		feedbackValue={number.feedback }
		   
	  /> 
	    
	);


  return (
    <>
	
	<button className="btn btn-link giveFeedbackBtn" onClick={() => {setFeedback(true); }} >Feedbacks</button>

	{/* Prompt for feedbacks list */}
	<FeedbacksListPrompt trigger={feedback} setTrigger={setFeedback} allFeedbacks={allFeedbacks}
	
	content={
		<div>
		
		<table className='feedbacksPrompt'>
			<thead>
				<tr>
					<th className='feedbackTh'>Participant Names</th>
					&emsp;
					<th className='feedbackTh'>Feedbacks</th>
				</tr>
			</thead>
			
			<hr className='feedbackHr' />
			
			<tbody>
				{listFeedback}
			</tbody>
			
		</table>

		</div>
	}
	
	
	>
	</FeedbacksListPrompt>


    </>
  )
}

export default Feedbacks
