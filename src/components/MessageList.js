import React from 'react'
import Message from './Message'
import '../App.css'

const MessageList = (props) => {
	return (
		props.messages.map((message, idx) => 
			<Message
				key={idx}
				message={message}
			/>
		)
	)
}




export default MessageList