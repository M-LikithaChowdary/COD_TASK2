import React from 'react';

const ChatHeader = ({ onClearHistory }) => {
  return (
    <div className="chat-header">
      <h2>Chat Room</h2>
      <div className="header-controls">
        <span className="online-status">Online</span>
        <button 
          className="clear-chat-btn"
          onClick={onClearHistory}
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
