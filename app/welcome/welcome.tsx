import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Header } from '../components/Header';
import { ChatInput } from '../components/ChatInput';
import { ChatMessages } from '../components/ChatMessages';
import { Suggestions } from '../components/Suggestions';

import { ConversationHistoryModal } from '../components/ConversationHistoryModal';
import '../App.css';

// Define types for your messages and responses
type Message = {
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  sentiment?: string;
};

type BotResponse = {
  type: 'bot';
  text: string;
  timestamp: Date;
  sentiment: string;
};

function App() {
  //const navigate = useNavigate(); // Add this hook
  const [inputText, setInputText] = useState('can you help me with my problem?');
  const [ollamaResponses, setOllamaResponses] = useState<BotResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [acceptedResponses, setAcceptedResponses] = useState(new Set());
  const [latestSentiment, setLatestSentiment] = useState<string | null>(null);

  const [userId] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedUserId = window.localStorage.getItem('userId');
        return savedUserId || uuidv4();
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        return uuidv4();
      }
    }
    return uuidv4();
  });

  const [sessionId, setSessionId] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSessionId = window.sessionStorage.getItem('sessionId');
        return savedSessionId || uuidv4();
      } catch (error) {
        console.error('Error accessing sessionStorage:', error);
        return uuidv4();
      }
    }
    return uuidv4();
  });

  const [conversationHistory, setConversationHistory] = useState([]);
  const responseEndRef = useRef(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     try {
  //       window.localStorage.setItem('userId', userId);
  //       fetchConversationHistory();
  //     } catch (error) {
  //       console.error('Error setting localStorage:', error);
  //     }
  //   }
  // }, [userId]);

  console.log('userId', userId);
  useEffect(() => {
    if (typeof window !== "undefined" && sessionId) {
      try {
        window.sessionStorage.setItem('sessionId', sessionId);
      } catch (error) {
        console.error('Error setting sessionId in sessionStorage:', error);
      }
    }
  }, [sessionId]);
  console.log('sessionId', sessionId);
  const fetchConversationHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/conversations/${userId}`);
      setConversationHistory(response.data.conversations);
    } catch (error) {
      console.error('Error fetching conversation history:', error);
    }
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: inputText,
        user_id: userId,
        session_id: sessionId
      });

      // Use the sentiment from the API response for the user message
      const userMessage = {
        type: 'user',
        text: inputText,
        timestamp: new Date(),
        sentiment: response.data.sentiment
      };
      setMessages(prev => [...prev, userMessage]);

      const botResponse = {
        type: 'bot',
        text: response.data.response.content,
        timestamp: new Date(),
        sentiment: response.data.sentiment
      };

      if (response.data.id) {
        setSessionId(response.data.id);
      }

      setOllamaResponses(prev => [...prev, botResponse]);
      setLatestSentiment(response.data.sentiment);
      setInputText('What else can I help you with?');
    } catch (error) {
      console.error('Error calling Ollama API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptResponse = (index) => {
    const response = ollamaResponses[index];
    setMessages(prev => [...prev, {
      type: 'bot',
      text: response.text,
      timestamp: response.timestamp,
    }]);
    setAcceptedResponses(prev => new Set([...prev, index]));
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
      window.location.href = '/';
    }
  };

  return (
    <div className="app-container">
      <Header
        onHistoryClick={() => setIsHistoryModalOpen(true)}
        onLogout={handleLogout}
      />

      <div className="split-container">
        <section className="left-section">

          <ChatMessages messages={messages} />
          <ChatInput
            inputText={inputText}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSend={handleSend}
          />
        </section>

        <Suggestions
          suggestions={ollamaResponses}
          acceptedResponses={acceptedResponses}
          onAccept={handleAcceptResponse}
        />
      </div>

      <ConversationHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        conversations={conversationHistory}
      />
    </div>
  );
}

export default App;