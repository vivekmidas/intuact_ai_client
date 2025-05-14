import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css'; // Add this for custom styles

function App() {
  const [inputText, setInputText] = useState('can u help me with my problem?');
  const [ollamaResponses, setOllamaResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]); // Move this here
  const [acceptedResponses, setAcceptedResponses] = useState(new Set());
  const inputRef = useRef(null);
  const responseEndRef = useRef(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };



  // Modify handleSend function
  const handleSend = async () => {
    if (inputText.trim() === '') return;

    // Store the user's message with timestamp
    const userMessage = {
      type: 'user',
      text: inputText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        prompt: inputText,
        message: inputText,
        model: 'vivek-llama-3.2:1',
      });

      // Add bot response with timestamp when accepted
      const botResponse = {
        type: 'bot',
        text: response.data.response.generations[0][0].text,
        timestamp: new Date(),
        sentiment: analyzeSentiment(response.data.response),
        intent: analyzeIntent(response.data.response),
      };

      setOllamaResponses(prev => [...prev, botResponse]);
      setInputText('');
    } catch (error) {
      console.error('Error calling Ollama API:', error);
    } finally {
      setIsLoading(false);
    }
  };


  // Modify handleAcceptResponse to add the response to messages
  const handleAcceptResponse = (index) => {
    const response = ollamaResponses[index];
    setMessages(prev => [...prev, {
      type: 'bot',
      text: response.text,
      timestamp: response.timestamp,
    }]);
    setAcceptedResponses(prev => new Set([...prev, index]));
  };




  const scrollToBottom = () => {
    if (responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [ollamaResponses]);

  const analyzeSentiment = (text) => {
    const randomNumber = Math.random();
    if (randomNumber < 0.33) {
      return 'Negative';
    } else if (randomNumber < 0.66) {
      return 'Neutral';
    } else {
      return 'Positive';
    }
  };

  const analyzeIntent = (text) => {
    const intents = ['Question', 'Statement', 'Request', 'Greeting'];
    const randomIndex = Math.floor(Math.random() * intents.length);
    return intents[randomIndex];
  };

  return (
    <div className="app-container">
      <header className="top-panel">
        <div className="logo">
          <img src="/logo.png" alt="Logo" width={48} height={48} />
        </div>
        <div className="user-profile">
          <div className="dropdown">
            <button className="dropdown-button">
              <img src="/profile-icon.png" alt="Profile" width={36} height={36}/>
            </button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleLogout()}>Logout</a>
              <a href="#" onClick={() => handleHistory()}>Check History</a>
            </div>
          </div>
        </div>
      </header>

      <div className="split-container">
        {/* Left Section */}

        <section className="left-section">
          <div className="conversation-container">
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  key={`message-${index}`}
                  className={message.type === 'user' ? 'user-message' : 'accepted-response'}
                >
                  <div className="message-text">{message.text}</div>
                  <div className="message-timestamp">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter your message"
              ref={inputRef}
              className="input-field"
            />

            <button
              onClick={handleSend}
              disabled={isLoading}
              className="send-button"
            >
              {isLoading ? 'Sending...' : ''}
              <img src="/send-icon.png" alt="Send" className="send-icon" />
            </button>
          </div>
        </section>

        {/* Right Section */}
        {/* Right Section */}
        <section className="right-section">
          {ollamaResponses.map((response, index) => (
            <div key={index} className="response-item">
              <div className="response-content">
                <div>
                  <p>
                    <strong>Suggestion:</strong> {response.text}
                  </p>
                  <div className="message-timestamp">
                    {response.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                </div>
                <button
                  className={`accept-button ${acceptedResponses.has(index) ? 'accepted' : ''}`}
                  onClick={() => handleAcceptResponse(index)}
                  disabled={acceptedResponses.has(index)}
                >
                  {acceptedResponses.has(index) ? '✓' : 'Accept'}
                </button>
              </div>
            </div>
          ))}
          <div ref={responseEndRef} />
        </section>
      </div>
    </div>
  );
}

export default App;