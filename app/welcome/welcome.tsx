import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css'; // Add this for custom styles

function App() {
  const [inputText, setInputText] = useState('can u help me with my problem?');
  const [ollamaResponses, setOllamaResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const responseEndRef = useRef(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return; // Prevent empty input from being sent

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: inputText,
        model: 'vivek-llama-3.2:1', // Replace with the correct model name
      });

      const sentiment = analyzeSentiment(response.data.response);
      const intent = analyzeIntent(response.data.response);

      setOllamaResponses((prevResponses) => [
        ...prevResponses,
        {
          message: response.data.response,
          sentiment,
          intent,
        },
      ]);
      setInputText(''); // Clear the input field after sending
    } catch (error) {
      console.error('Error calling Ollama API:', error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="split-container">
        {/* Left Section */}
        <section className="left-section">
          <div className="input-area">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter your message"
              ref={inputRef}
            />
          </div>
          <div className="send-button-container">
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? 'Sending...' : ''}
              <img src="/send-icon.png" alt="Send" className="send-icon" />
            </button>
          </div>
        </section>

        {/* Right Section */}
        <section className="right-section">
          {ollamaResponses.map((response, index) => (
            <div key={index} className="response-item">
              <p>
                <strong>Suggestion:</strong> {response?.message?.response}
              </p>
            </div>
          ))}
          <div ref={responseEndRef} />
        </section>
      </div>
    </div>
  );
}

export default App;