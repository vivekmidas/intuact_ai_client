import React from 'react';

interface HistoryMessage {
  user_message: string;
  bot_response: string;
  sentiment: string;
  timestamp: string;
}

interface Conversation {
  session_id: string;
  created_at: string;
  history: HistoryMessage[];
}

interface ConversationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversations?: Conversation[];
}

export const ConversationHistoryModal: React.FC<ConversationHistoryModalProps> = ({
  isOpen,
  onClose,
  conversations = []
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Conversation History</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {conversations.length === 0 ? (
            <p className="no-history">No conversation history available</p>
          ) : (
            conversations.map((session) => (
              <div key={session.session_id} className="history-session">
                <h3>Session from {new Date(session.created_at).toLocaleDateString()}</h3>
                {session.history.map((msg, index) => (
                  <div key={index} className="history-message">
                    <div className="user-message">
                      <p className="message-header">User</p>
                      <p>{msg.user_message}</p>
                      <span className="timestamp">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="bot-message">
                      <p className="message-header">Assistant</p>
                      <p>{msg.bot_response}</p>
                      <div className="message-footer">
                        <span className="timestamp">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="sentiment">Sentiment: {msg.sentiment}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};