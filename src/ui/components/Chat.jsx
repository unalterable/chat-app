import React from 'react';
import socketIO from 'socket.io-client';
import ChatWindow from './ChatWindow.jsx';

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chatId: '',
    };
  }

  login() {
    const socket = socketIO('ws://localhost:3000/');
    socket.on('chat-message', msg => this.handleNewMessage(msg));
    this.setState({
      socket,
      messages: [],
    });
  }

  handleNewMessage(message) {
    this.setState({ messages: this.state.messages.concat(message) });
  }

  render () {
    return (
      <div style={{ height: '300px', width: '300px', border: '1px solid #000' }}>
        {this.state.socket
         ? (
           <ChatWindow
             chatId={this.state.chatId}
             messages={this.state.messages}
             sendMessage={message => {
                 this.state.socket.emit('chat-message', { text: message, sender: this.state.chatId });
             }}
           />
         )
         : (
           <form>
             <input
               style={{ width: '240px' }}
               value={this.state.chatId}
               onChange={e => this.setState({ chatId: e.target.value })}
             />
             <button onClick={e => {this.login(); e.preventDefault();}} >
               Send
             </button>
           </form>
         )}
      </div>
    );
  }
}

export default Chat;
