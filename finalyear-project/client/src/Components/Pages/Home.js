import React from 'react'
import './Home.css'
import signupImg from "./signup.png"
import interfaceImg from "./interface2.png"
import newMeetingImg from "./newMeeting2.png"
import participantImg from "./inviteParticipants.png"
import proposedMeetingImg from "./proposedMeetings2.png"
import fixMeetingImg from "./proposedMeetings3.png"
import invitationImg from "./invitations2.png"
import checkInvitationImg from "./invitation.png"
import confirmedMeetingImg from "./confirmedMeetings2.png"
import feedbacksImg from "./feedbacks.png"
import giveFeedbackImg from "./giveFeedback.png"
import meetingAgendaImg from "./update2.png"
import logoutImg from "./logout.png"



const Home = () => {
  return (
    <div className='homePage'>

        
          <p className='.watch'>I Once ate a Watch. It was Time Consuming.</p>
        
		<br/>
        <div className='createAccount '>
			
			<p className={'account'} ><b>Create an account to become <br/> a user of Liaison</b></p>
		
			<img className={'signupImg'} src={signupImg} alt={'signupImg'} height={411} width={453} />

			<img className={'interfaceImg'} src={interfaceImg} alt={'interfaceImg'} height={492} width={443} />
        </div>

		<br/> <br/>
		<div className='createNewmeetings'>

			<p className='createMeeting'><b>Create New Meetings</b> </p> <br/>

			<p className='createMeetingPara'>Create new meetings to make a <br/> 
					Schedule of your important meetings. <br/> Make it convenient 
				for you to schedule a <br/> meeting and invite participants to join <br/> you in the meeting.</p>
			
			<img className='newMeetingImg' src={newMeetingImg} alt={'newMeetingImg'} height={494} width={517} />

			<img className='participantImg' src={participantImg} alt={'participantImg'} height={294} width={449} />
		</div>

		<br/>
		<div className='fixMeetings'>

			<img className='proposedMeetingImg' src={proposedMeetingImg} alt={'proposedMeetingImg'} height={297} width={666} />

			<img className='fixMeetingImg' src={fixMeetingImg} alt={'fixMeetingImg'} height={579} width={513} />

			<p className='availability' ><b>Check Availability of <br/> Participants in Proposed <br/> Meetings </b> </p>

			<p className='finalDate'><b>Select a final date to <br/> fix meeting </b> </p>
		</div>

		<br/>
		<div className='invitationsCheck'>

			<img className='invitationImg' src={invitationImg} alt={'invitationImg'} height={285} width={848} />

			<img className='checkInvitationImg' src={checkInvitationImg} alt={'checkInvitationImg'} height={571} width={472} />

			<p className='checkInvite'><b>Check Invitations of <br/> Meetings</b></p>

			<p className='possibleDates'><b>Choose Possible dates of your <br/> availability to confirm your <br/> participation</b></p>
		</div>

		<br/>
		<div className='confirmedMeetingsCheck'>

			<img className='confirmedMeetingImg' src={confirmedMeetingImg} alt={'confirmedMeetingImg'} height={384} width={902} />
		</div>

		<br/>
		<div className='feedbacksCheck'>

			<img className='giveFeedbackImg' src={giveFeedbackImg} alt={'giveFeedbacksImg'} height={362} width={685} />

			<img className='feedbacksImg' src={feedbacksImg} alt={'feedbacksImg'} height={377} width={735} />

			<p className='giveFeedbackC'><b>Give Your Feedback</b></p>

			<p className='viewFeedbackC'><b>View Participant's <br/> Feedbacks</b></p>
		</div>

		<br/>
		<div className='uploadAgendaCheck'>

			<img className='meetingAgendaImg' src={meetingAgendaImg} alt={'meetingAgendaImg'} height={573} width={551} />

			<p className='meetingAgendaC'><b>Upload Meeting Agenda <br/> & Minutes</b></p>
		</div>

		<br/>
		<div className='logoutCheck'>

			<p className='logoutC'><b>Click on User Avatar <br/> to Logout <br/> from your interface...</b></p>

			<img className='logoutImg' src={logoutImg} alt={'logoutImg'} height={529} width={546} />
		</div>

		
          

    </div>
  )
}

export default Home