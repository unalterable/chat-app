import React from 'react';
import _omit from 'lodash/omit'
import socketIO from 'socket.io-client';
import ChatWindow from './ChatWindow.jsx';

const initialState = { userId: '', roomId: '', messages: [], socket: null };

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialState;
  }

  login() {
    const socket = socketIO('ws://localhost:3000/', {
      query: `roomId=${this.state.roomId}&userId=${this.state.userId}`,
    });
    socket.on('connect', () => {
      if (!this.state.socket){
        this.setState({ socket });
        socket.on('disconnect', () => this.setState(_omit(initialState, 'userId')));
        socket.on('chat-message-to-clients', msg => this.handleNewMessage(msg));
      }
    })
  }

  handleNewMessage(message) {
    console.log('message', message)
    this.setState({ messages: this.state.messages.concat(message) });
  }

  render () {
    return (
      <div style={{ height: '300px', width: '300px', border: '1px solid #000' }}>
        {this.state.socket
         ? (
           <ChatWindow
             userId={this.state.userId}
             messages={this.state.messages}
             sendMessage={message => {
                 this.state.socket.emit('chat-message-to-server', { text: message });
             }}
           />
         )
         : (
           <form>
             <div>
               Enter User Id:
               <input
                 value={this.state.userId}
                 onChange={e => this.setState({ userId: e.target.value })}
               />
             </div>
             <div>
               Enter Room Id:
               <input
                 value={this.state.roomId}
                 onChange={e => this.setState({ roomId: e.target.value })}
               />
             </div>
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
