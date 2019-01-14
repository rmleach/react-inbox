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
		messageIds: id,
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

	messageRead = (id) => {
		const messageRead = this.state.messages.map(message => {
			if(message.id === id){
				message.read = !message.read
				this.updates([message.id], 'read', 'read', message.read)
		}
		return message
		})
		this.setState({
			messages: messageRead
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
			this.updates([starred], 'star', 'star', true)
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

		selectAllButton = () => {
			const allSelected = this.state.messages.every(message => message.selected === true)
			const updateButton = this.state.message.map(message => {
				allSelected ? message.selected = false : message.selected = true
				return message
			})
			this.setState({
				messages: updateButton
			})
		}

		allRead = () => {
			const selectedMessages = this.state.messages.map(message => {
				if(message.selected === true) {
					message.read = true
				} return message
				})
			const ids = this.state.messages.filter(message => message.selected === true).map(message => message.id)
				this.setState({
					messages : selectedMessages
				})
				this.updates(ids, 'read', 'read', true)
		}

		allUnread = (id) => {
			const selectedMessages = this.state.messages.map(message => {
				if (message.selected === true) {
					message.read = false
				}
				return message
			})
			const ids = this.state.messages.filter(message => message.selected === true).map(message => message.id)
			this.setState({
				messages: selectedMessages
			})
			this.updates(ids, 'read', 'read', false)
			}
		
		addLabel = (e) => {
			const selectedMessages = this.state.messages.map(message => {
				if(message.selected === true){
						if(!message.labels.includes(e.target.value)){
							message.labels = [...message.labels, e.target.value]
							this.updates([message.id], 'addLabel', 'label', e.target.value)
						}
				}
				return message
			})
			this.setState({
				messages: selectedMessages
			})
		}

		removeLabel = (e)=> {
			const selectedMessages = this.state.messages.map(message => {
				if(message.selected === true){
					message.labels = message.labels.filter(label => label !== e.target.value)
					this.updates([message.id], 'removeLabel', 'label', e.target.value)
				}
				return message
			})
			this.setState({
				messages: selectedMessages
			})
		}
		
		deleteSelected = () => {
			const savedMessages = this.state.messages.filter(message => !message.selected)
			const ids = this.state.messages.map(message => {
				if(message.selected === true){
					this.updates([message.id], 'delete', 'delete', true)
				}
			return ids
			})
			this.setState({
				messages: savedMessages
			})
		}
		// addMessages(){}
		// composeMessage(){
		// 	console.log('butts')
		// }

  
  render(){
    return (
      <div className="App">
        <Toolbar 
				messages={this.state.messages}
				selectAll={this.selectAll}
				selectAllButton={this.selectAllButton}
				allRead={this.allRead}
				allUnread={this.allUnread}
				deleteSelected={this.deleteSelected}
				addLabel={this.addLabel}
				removeLabel={this.removeLabel}
				/>
        <ComposeForm
					composeMessage={this.state.displayCompose}
				/>
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

