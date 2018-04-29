import React from 'react';
import socketIO from 'socket.io-client';

class ChatBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newMessage: '',
      messages: [],
    };
  }

  componentDidMount () {
    const socket = socketIO('ws://localhost:3000/');
    this.setState({ socket });
    socket.on('chat-id-assignment', chatId => this.setState({ chatId }));
    socket.on('chat-message', msg => this.setState({ messages: this.state.messages.concat(msg) }));
  }

  render () {
    const Message = ({ text, sender }) => (
      <div style={{ width: '100%' }}>
        <span style={{ width: '20%' }}>
          {sender === this.state.chatId ? 'Me: ' : `${sender.slice(-3)}: `}
        </span>
        <span style={{ width: '80%' }}>
          {text}
        </span>
      </div>
    );

    return (
      <div style={{ height: '300px', width: '300px', border: '1px solid #000' }}>
        <div style={{ height: '270px', width: '100%' }}>
          { this.state.messages.map((message, i) => (<Message key={i} { ...message } />)) }
        </div>
        <div style={{ height: '30px', width: '100%' }}>
          <form>
            <input
              style={{ width: '240px' }}
              value={this.state.newMessage}
              onChange={e => this.setState({ newMessage: e.target.value })}/>
            <button
              onClick={e => {
                  const text = this.state.newMessage;
                  this.setState({ newMessage: '' });
                  this.state.socket.emit('chat-message', { text, sender: this.state.chatId });
                  e.preventDefault();
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatBox;
