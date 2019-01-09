import React, { Component } from 'react';
// import Loader from 'react-loader-spinner'
import './App.css';
import Toolbar from './components/Toolbar.js';
import ComposeForm from './components/ComposeForm.js'
import MessageList from './components/MessageList.js';

const apiUrl = 'http://localhost:8082/api/messages'


class App extends Component {

	constructor(props) {
		super(props) 
		this.state={
			messages: []
		}
	}
  
  fetchMessages = () => {
		return fetch(apiUrl)
			.then(res => res.json())
			.then(messages => {
				this.setState(
					{messages: messages})
			})
    }

  componentDidMount(){
			this.fetchMessages()
				.catch(err => console.error(err))
	} 

	messageRead= async (id) => {
		let message= {
			"messageIds": [id],
			"command": "read",
			"read": true
	}
	const updateMessage = await fetch(apiUrl, {
		method: 'PATCH',
		body: JSON.stringify(message),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})

		const updatedMessages= this.state.messages.map(message => {
			if(message.id===id){
				message.read = !message.read
			}
			return message
		})
		
		this.setState({
			messages: updatedMessages,
		})
	}

		messageSelect= (selected) => {
		const selectedMessages= this.state.messages.map(message => {
			if(message.id===selected){
				message.selected = !message.selected
			}
			return message
		})
		
		this.setState({
			messages: selectedMessages,
		})
	}

		messageStar= (starred)=> {
			const starredMessages= this.state.messages.map(message=> {
				if(message.id===starred){
					message.starred = !message.starred
				}
				return message
			})
			this.setState({
				messages: starredMessages
			})
		}

  
  render(){
    return (
      <div className="App">
        <Toolbar/>
        <ComposeForm/>
				<MessageList 	
					messages={this.state.messages}
					messageLabel={this.labelDisplay}
					messageRead={this.messageRead}
					messageSelect={this.messageSelect}
					messageStar={this.messageStar}
				/>
      </div>
    );
  }
}


export default App;

