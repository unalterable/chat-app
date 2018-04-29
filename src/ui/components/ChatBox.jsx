import React from 'react';

class ChatBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = { newMessage: '', messages: [] };
  }

  sendMessage () {
    console.log(this.state.value);
    this.setState({ newMessage: '', messages: this.state.messages.concat(this.state.newMessage) });
  }

  render () {
    return (
      <div style={{ height: '300px', width: '300px', border: '1px solid #000' }}>
        <div style={{ height: '270px', width: '100%', }}>
          { this.state.messages.map(message => (
            <div style={{ width: '100%' }}>{message}</div>
          )) }
        </div>
        <div style={{ height: '30px', width: '100%' }}>
          <input
            style={{ width: '240px' }}
            value={this.state.newMessage}
            onChange={e => this.setState({ newMessage: e.target.value })}/>
          <button onClick={() => this.sendMessage()}>Send</button>
         </div>
       </div>
    );
  }
}

export default ChatBox;
