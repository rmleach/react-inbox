import React from 'react'
import Message from './Message'
import '../App.css'

const MessageList = (props) => {
	return (
		props.messages.map((message, idx) => 
			<Message
				key={idx}
				labels={props.labelDisplay}
				message={message}
				messageRead={props.messageRead}
				messageSelect={props.messageSelect}
				messageStar={props.messageStar}
			/>
		)
	)
}




export default MessageList