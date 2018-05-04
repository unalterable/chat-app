import React from 'react';

class ChatWindow extends React.Component {
  constructor (props) {
    super(props)
    this.state = { newMessage: '' };
  }

  render () {
    const Message = ({ text, sender }) => (
      <div style={{ width: '100%' }}>
        <span style={{ width: '20%' }}>
          {sender === this.props.userId ? 'Me: ' : `${sender}: `}
        </span>
        <span style={{ width: '80%' }}>
          {text}
        </span>
      </div>
    );

    return (
      <div style={{ height: '300px', width: '300px', border: '1px solid #000' }}>
        <div style={{ height: '30px', width: '100%' }}>
          User: {this.props.userId}
        </div>
        <div style={{ height: '240px', width: '100%' }}>
          { this.props.messages.map((message, i) => (<Message key={i} { ...message } />)) }
        </div>
        <div style={{ height: '30px', width: '100%' }}>
          <form>
            <input
              style={{ width: '240px' }}
              value={this.state.newMessage}
              onChange={e => this.setState({ newMessage: e.target.value })}
            />
            <button
              onClick={e => {
                  this.props.sendMessage(this.state.newMessage);
                  this.setState({ newMessage: '' });
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

export default ChatWindow;
