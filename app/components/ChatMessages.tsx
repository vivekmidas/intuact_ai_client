import React, { useState } from 'react';

type Message = {
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  sentiment?: string;
};

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => (
  <div className="conversation-container">
    <div className="messages">
      {messages.map((message, index) => (
        <div
          key={`message-${index}`}
          className={message.type === 'user' ? 'user-message' : 'bot-message'}
        >
          <div className={`message-bubble ${message.type}`}>
            <div className="message-content">
              <span>{message.text}</span>
            </div>
          </div>

          <div className="message-timestamp">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </div>
          {/* Sentiment pill for any message with sentiment */}
          {message.sentiment && (
            <div className={`sentiment-pill sentiment-${message.sentiment.toLowerCase()}`}>
              {message.sentiment}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleBotResponse = (response: { data: { response: { content: string }; sentiment: string } }) => {
    setMessages(prev => [
      ...prev,
      {
        type: 'bot',
        text: response.data.response.content,
        timestamp: new Date(),
        sentiment: response.data.sentiment,
      },
    ]);
  };

  return <ChatMessages messages={messages} />;
};