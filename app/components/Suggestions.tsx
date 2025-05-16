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
}

export const Suggestions: React.FC<SuggestionsProps> = ({ 
  suggestions, 
  acceptedResponses, 
  onAccept 
}) => {
  return (
    <section className="right-section">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="response-item">
          <div className="response-content">
            <div>
              <p><strong>Suggestion:</strong> {suggestion.text}</p>
              <p><strong>Sentiment:</strong> {suggestion.sentiment}</p>
              <div className="message-timestamp">
                {suggestion.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
            <button
              className={`accept-button ${acceptedResponses.has(index) ? 'accepted' : ''}`}
              onClick={() => onAccept(index)}
              disabled={acceptedResponses.has(index)}
            >
              {acceptedResponses.has(index) ? '✓' : 'Accept'}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};