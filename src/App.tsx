import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Globe, Sparkles, Trash2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectLanguage, getResponse, getSuggestedQuestions, langLabels } from './utils/nlpEngine';
import type { Language } from './utils/nlpEngine';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  language?: Exclude<Language, 'auto'>;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! Bharat-Mitra is here. How can I help you today? (Choose a language or type below)',
      sender: 'bot',
      language: 'en'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('auto');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const detectedLang = detectLanguage(textToSend);
      const finalLang = currentLang === 'auto' ? detectedLang : (currentLang as Exclude<Language, 'auto'>);
      
      const botResponseText = getResponse(textToSend, finalLang);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        language: finalLang
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      text: 'Chat cleared. How can I help you now?',
      sender: 'bot',
      language: currentLang === 'auto' ? 'en' : (currentLang as Exclude<Language, 'auto'>)
    }]);
  };

  return (
    <div className="chat-container">
      <header className="chat-header glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="glass-panel" style={{ padding: '8px', borderRadius: '12px' }}>
              <Bot size={28} color="#3b82f6" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h1 className="gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>Bharat-Mitra</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Innovative CLIL Assistant</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="glass-panel" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid var(--glass-border)', 
                  padding: '6px 12px', 
                  borderRadius: '10px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Globe size={14} />
                {langLabels[currentLang]}
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="glass-panel"
                    style={{ 
                      position: 'absolute', 
                      top: '110%', 
                      right: 0, 
                      zIndex: 100, 
                      width: '140px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    {Object.entries(langLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrentLang(code as Language);
                          setShowLangMenu(false);
                        }}
                        style={{
                          background: currentLang === code ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                          border: 'none',
                          color: 'white',
                          padding: '8px',
                          borderRadius: '6px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={clearChat} className="glass-panel" style={{ 
              background: 'transparent', 
              border: 'none', 
              padding: '8px', 
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="messages-area glass-panel">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`message-bubble ${msg.sender}`}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ 
                  background: msg.sender === 'bot' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                  padding: '6px',
                  borderRadius: '8px'
                }}>
                  {msg.sender === 'bot' ? <Bot size={16} color="#3b82f6" /> : <User size={16} color="#8b5cf6" />}
                </div>
                <div>
                  {msg.language && (
                    <span className="lang-badge">
                      <Globe size={10} style={{ marginRight: '4px' }} />
                      {msg.language.toUpperCase()}
                    </span>
                  )}
                  <p style={{ fontSize: '0.95rem' }}>{msg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="message-bubble bot">
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

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '0 10px' }}>
        {getSuggestedQuestions(currentLang === 'auto' ? 'en' : currentLang).map((q, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend(q)}
            className="glass-panel"
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.8rem', 
              cursor: 'pointer', 
              color: 'var(--text-primary)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--glass-border)',
              borderRadius: '15px'
            }}
          >
            <MessageSquare size={12} style={{ marginRight: '6px', display: 'inline' }} />
            {q}
          </motion.button>
        ))}
      </div>

      <footer className="input-area glass-panel" style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask in Hindi, Gujarati, Tamil..."
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
        <button onClick={() => handleSend()} className="btn-primary" style={{ padding: '10px 18px' }}>
          <Send size={18} />
        </button>
      </footer>

      <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', padding: '8px' }}>
        <Sparkles size={10} style={{ marginRight: '4px' }} />
        Innovative CLIL Assistant Portfolio | Bharat-Mitra
      </div>
    </div>
  );
};

export default App;
