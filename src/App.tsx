import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Globe, Trash2, 
  MessageSquare, Copy, ChevronLeft, ChevronRight, 
  Layout, BookOpen, GraduationCap, Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  detectLanguage, getResponse, getSuggestedQuestions, 
  langLabels
} from './utils/nlpEngine';
import type { Language } from './utils/nlpEngine';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  language?: Exclude<Language, 'auto'>;
}

const STORAGE_KEY = 'bharat_mitra_v2_messages';
const LANG_KEY = 'bharat_mitra_v2_lang';

const App: React.FC = () => {
  // Persistence Initialization
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        text: '### Welcome to Bharat-Mitra Professional\nI am your **Academic Assistant** for CLIL. I can provide detailed guidance on subjects in your preferred language.\n\nChoose a topic below or ask any question.',
        sender: 'bot',
        language: 'en'
      }
    ];
  });

  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return (localStorage.getItem(LANG_KEY) as Language) || 'auto';
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persistence Sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, currentLang);
  }, [currentLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    }, 1200);
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear this academic session?")) {
      setMessages([{
        id: '1',
        text: 'Session reset. I am ready for new queries.',
        sender: 'bot',
        language: currentLang === 'auto' ? 'en' : (currentLang as Exclude<Language, 'auto'>)
      }]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple toast could be added here
  };

  return (
    <div className="app-shell">
      {/* PROFESSIONAL SIDEBAR */}
      <aside className="sidebar" style={{ width: sidebarOpen ? 'var(--sidebar-width)' : '0', padding: sidebarOpen ? '24px' : '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--accent-blue)', padding: '8px', borderRadius: '10px' }}>
            <GraduationCap size={24} color="black" />
          </div>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>CLIL Portal</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div className="chip" style={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px' }}>
            <BookOpen size={16} /> Research Files
          </div>
          <div className="chip" style={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px' }}>
            <Layout size={16} /> Subject Taxonomy
          </div>
          <div className="chip" style={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px' }}>
            <Info size={16} /> Assignment Guide
          </div>
        </nav>

        <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(56,189,248,0.05)', marginTop: '20px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            System identifies and translates content across 5 regional languages.
          </p>
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <div className="main-content">
        <header className="input-header" style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-dark)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn-icon">
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          
          <div style={{ flex: 1 }}>
            <h1 className="gradient-text" style={{ fontSize: '1.2rem', marginBottom: 0 }}>Bharat-Mitra <span style={{ fontSize: '0.7rem', opacity: 0.6, verticalAlign: 'middle' }}>V2.0 PRO</span></h1>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="chip"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Globe size={14} />
                {langLabels[currentLang]}
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    style={{ position: 'absolute', top: '110%', right: 0, zIndex: 100, width: '160px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '8px', boxShadow: 'var(--shadow-premium)' }}
                  >
                    {Object.entries(langLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => { setCurrentLang(code as Language); setShowLangMenu(false); }}
                        style={{ width: '100%', padding: '8px', background: currentLang === code ? 'rgba(56,189,248,0.1)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={clearChat} className="btn-icon"><Trash2 size={18} /></button>
          </div>
        </header>

        <section className="chat-window">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`message-row ${msg.sender}`}
              >
                {msg.sender === 'bot' && (
                  <div className="avatar"><Bot size={18} color="var(--accent-blue)" /></div>
                )}
                <div className={`bubble ${msg.sender}`}>
                  {msg.sender === 'bot' && msg.language && (
                    <span className="lang-indicator">{msg.language} intelligence</span>
                  )}
                  <div className="markdown-content">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                  {msg.sender === 'bot' && (
                    <button 
                      onClick={() => copyToClipboard(msg.text)} 
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'absolute', bottom: '8px', right: '8px', opacity: 0.5 }}
                    >
                      <Copy size={12} />
                    </button>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="avatar" style={{ border: 'none', background: 'var(--accent-purple)' }}><User size={18} color="white" /></div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="message-row bot">
                <div className="avatar"><Bot size={18} color="var(--accent-blue)" /></div>
                <div className="bubble bot" style={{ padding: '12px 20px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    <motion.div animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </section>

        <div className="input-container-v2">
          {/* SUGGESTED CHIPS */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {getSuggestedQuestions(currentLang === 'auto' ? 'en' : currentLang).map((q, i) => (
              <button key={i} onClick={() => handleSend(q)} className="chip">{q}</button>
            ))}
          </div>

          <div className="input-box-wrapper">
            <MessageSquare size={18} color="var(--text-secondary)" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask an academic question..."
              className="input-field"
            />
            <button onClick={() => handleSend()} className="btn-icon btn-send">
              <Send size={20} />
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
            ACADEMIC AI ASSISTANT | TECHNOLOGY FOR INNOVATIVE CLIL ASSIGNMENT
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
