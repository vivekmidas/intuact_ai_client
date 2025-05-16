import React from 'react';

interface ChatInputProps {
  inputText: string;
  isLoading: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  inputText, 
  isLoading, 
  onInputChange, 
  onSend 
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={inputText}
        onChange={onInputChange}
        placeholder="Enter your message"
      />
      <button onClick={onSend} disabled={isLoading} className="send-button">
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};