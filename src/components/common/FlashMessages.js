import React from 'react';
import Flash from '../../lib/Flash';

class FlashMessages extends React.Component {
  state = {}

  componentDidUpdate() {
    const messages = Flash.getMessages();
    // If there are no Flash messages...
    if(!messages) return false;

    this.setState({ messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({ messages: null }), 3000);
  }

  render() {
    const messages = this.state.messages;
    return (
      <div>
        {messages && messages.map((message, index) =>
          <div className={`notification is-${message.type}`} key={index} >
            {message.content}
          </div>)}
      </div>
    );
  }
}

export default FlashMessages;
