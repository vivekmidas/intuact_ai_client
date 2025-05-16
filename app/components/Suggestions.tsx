import React from 'react';

interface Suggestion {
  text: string;
  sentiment: string;
  timestamp: Date;
}

interface SuggestionsProps {
  suggestions: Suggestion[];
  acceptedResponses: Set<number>;
  onAccept: (index: number) => void;
  onReject: (index: number) => void;
}

export const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  acceptedResponses,
  onAccept,
  onReject
}) => {
  return (
    <section className="right-section">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="response-item">
          <div className="response-content">
            <div>
              <p><strong>Suggestion:</strong> {suggestion.text}</p>
              <div className="message-timestamp">
                {suggestion.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`accept-button ${acceptedResponses.has(index) ? 'accepted' : ''}`}
                onClick={() => onAccept(index)}
                disabled={acceptedResponses.has(index)}
              >
                {acceptedResponses.has(index) ? '✓' : 'Accept'}
              </button>
              <button
                className="reject-button"
                onClick={() => onReject(index)}
                disabled={acceptedResponses.has(index)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};