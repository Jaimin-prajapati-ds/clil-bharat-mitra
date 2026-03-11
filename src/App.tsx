import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectLanguage, getResponse } from './utils/nlpEngine';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  language?: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! Bharat-Mitra is here. How can I help you with your studies today? (Aap kis bhasha mein baat karna chahenge?)',
      sender: 'bot',
      language: 'en'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // AI Simulation / NLP Engine call
    setTimeout(() => {
      const language = detectLanguage(input);
      const botResponseText = getResponse(input, language);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        language: language
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="chat-container">
      <header className="chat-header glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '10px', borderRadius: '15px' }}>
            <Bot size={32} className="gradient-text" style={{ color: '#3b82f6' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h1 className="gradient-text" style={{ fontSize: '1.8rem', margin: 0 }}>Bharat-Mitra</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Innovative CLIL Regional Assistant</p>
          </div>
        </div>
      </header>

      <main className="messages-area glass-panel">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`message-bubble ${msg.sender}`}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  background: msg.sender === 'bot' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                  padding: '8px',
                  borderRadius: '10px'
                }}>
                  {msg.sender === 'bot' ? <Bot size={18} color="#3b82f6" /> : <User size={18} color="#8b5cf6" />}
                </div>
                <div>
                  {msg.language && (
                    <span className="lang-badge">
                      <Globe size={10} style={{ marginRight: '4px' }} />
                      {msg.language.toUpperCase()}
                    </span>
                  )}
                  <p style={{ fontSize: '1rem', fontWeight: 400 }}>{msg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="message-bubble bot"
            >
              <div className="typing-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      <footer className="input-area glass-panel">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your question in Hindi, Gujarati, Tamil, etc..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'white',
            outline: 'none',
            fontSize: '1rem',
            padding: '10px'
          }}
        />
        <button onClick={handleSend} className="btn-primary">
          <Send size={18} />
          <span>Send</span>
        </button>
      </footer>

      <div style={{ 
        textAlign: 'center', 
        fontSize: '0.8rem', 
        color: 'var(--text-secondary)', 
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}>
        <Sparkles size={12} />
        Built with Power for Innovative CLIL Assignment
      </div>
    </div>
  );
};

export default App;
