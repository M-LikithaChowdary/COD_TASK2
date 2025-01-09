import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';

const ChatRoom = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState([]);

  const [user] = useState({
    id: Math.random().toString(36).substr(2, 9),
    name: 'USER'
  });

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(prevMessages => {
          const allMessages = [...prevMessages, ...parsedMessages].reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
              return acc.concat([current]);
            }
            return acc;
          }, []);
          return allMessages.sort((a, b) => a.timestamp - b.timestamp);
        });
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      user: 'USER',
      timestamp: new Date().getTime()
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const clearHistory = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the chat history?');
    if (confirmClear) {
      localStorage.removeItem('chatMessages');
      setMessages([]);
    }
  };

  return (
    <div className="chat-room">
      <ChatHeader onClearHistory={clearHistory} />
      <MessageList messages={messages} currentUser={user} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
