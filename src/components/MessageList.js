import React from 'react'
import Message from './Message'
import '../App.css'

const MessageList = (props) => {
	console.log(props.messages)
	return (
		props.messages.map((message, idx) =>
			<Message
				key={idx}
				message={message.subject}
				/>
		)
	)
}




export default MessageList