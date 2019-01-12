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
			messages: [],
			displayCompose: false,
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

	updates = async (id, command, prop, value) => {
	let message = {
		messageIds: [id],
		command: command,
		[prop]: value
	}
	await fetch(apiUrl, {
		method: "PATCH",
		body: JSON.stringify(message),
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		}
	})
	}	

	messageRead= async (id) => {
		let message= {
			"messageIds": [id],
			"command": "read",
			"read": true
	}
	// const updateMessage = await fetch(apiUrl, {
	// 	method: 'PATCH',
	// 	body: JSON.stringify(message),
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'Accept': 'application/json'
	// 	}
	// })

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
		
		selectAll = () => {
			const allSelected = this.state.messages.filter(message => message.selected === true)
			const select = this.state.messages.map(message => {
				allSelected.length === this.state.messages.length
				? message.selected = false
				: message.selected = true
			return message
			})
			this.setState({ messages: select })
		}

		allRead = () => {
			const selectedMessages = this.state.messages.map(message => {
				if(message.selected === true) {
					message.read = true
				} return message
				})
				this.setState({messages : selectedMessages})
		}

		allUnread = () => {
			const selectedMessages = this.state.messages.map(message => {
				if (message.selected === true) {
					message.read = false
				}
				return message
			})
			this.setState({
				messages: selectedMessages
			})
			}
		
		addLabel = (e) => {
			const selectedMessages = this.state.messages.map(message => {
				if(message.selected === true){
						if(!message.labels.includes(e.target.value)){
							message.labels = [...message.labels, e.target.value]
						}
				}
				return message
			})
			this.setState({
				messages: selectedMessages
			})
		}

		removeLabel = ()=> {
			console.log('hey bish')
		}
		

		
		deleteSelected = () => {
			const deletedMessages = this.state.messages.filter(message => message.selected)
			const ids = deletedMessages.map(message => message.id)
			const test = this.state.messages.filter(message => !message.selected)
			this.setState({
				messages: test
			})
			this.updates(ids, 'delete', 'delete')
		}
		// addMessages(){}
		// composeMessage(){}

  
  render(){
    return (
      <div className="App">
        <Toolbar 
				messages={this.state.messages}
				selectAll={this.selectAll}
				allRead={this.allRead}
				allUnread={this.allUnread}
				deleteSelected={this.deleteSelected}
				addLabel={this.addLabel}
				removeLabel={this.removeLabel}
				/>
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

