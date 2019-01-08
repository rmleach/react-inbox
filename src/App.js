import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import './App.css';
import Toolbar from './components/Toolbar.js';
import ComposeForm from './components/ComposeForm.js'
import MessageList from './components/MessageList.js';

const apiUrl = 'http://localhost:8082/api/messages'


class App extends Component {

	constructor(props) {
		super(props) 
		this.state={
			messages: [
				
			]
		}
	}
  
  fetchMessages = () => {
		return fetch(apiUrl)
			.then(res => res.json())
			.then(messages => {
				this.setState({messages: messages})
				return messages
			})
    }

  componentDidMount(){
			this.fetchMessages()
				.catch(err => console.error(err))
	}
  
  render() {
    return (
      <div className="App">
        <Toolbar></Toolbar>
        <ComposeForm></ComposeForm>
				<MessageList 	
					messages={this.state.messages}
				>
				</MessageList>
        {/* <div>{this.state.messages ? this.fetchMessages() :<Loader type="Grid" color="red" height={80} width={80} /> }</div> */}
      </div>
    );
  }
}


export default App;
// 