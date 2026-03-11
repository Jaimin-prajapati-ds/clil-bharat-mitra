import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Globe, Trash2, 
  MessageSquare, Copy, ChevronLeft, ChevronRight, 
  Lightbulb, BookOpen, Handshake, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  detectLanguage, getResponse, getSuggestedQuestions, 
  langLabels, uiTranslations
} from './utils/nlpEngine';
import type { Language } from './utils/nlpEngine';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  language?: Exclude<Language, 'auto'>;
}

const STORAGE_KEY = 'bharat_mitra_v5_simple_messages';
const LANG_KEY = 'bharat_mitra_v5_simple_lang';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        text: '### Welcome to Bharat-Mitra V5.0\nI am your **Simple Regional Assistant**. I can help you understand many things in your own language. \n\n*Please type something or choose a language to start.*',
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
  const [activeLang, setActiveLang] = useState<Exclude<Language, 'auto'>>('en');

  useEffect(() => {
    if (currentLang !== 'auto') {
      setActiveLang(currentLang);
    }
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, currentLang);
  }, [currentLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const t = uiTranslations[activeLang];

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const detected = detectLanguage(textToSend);
    if (currentLang === 'auto') {
      setActiveLang(detected);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const finalLang = currentLang === 'auto' ? detected : (currentLang as Exclude<Language, 'auto'>);
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
    if (window.confirm(t.clearChat + "?")) {
      setMessages([{
        id: '1',
        text: '---',
        sender: 'bot',
        language: activeLang
      }]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="app-shell">
      {/* SIMPLE & PREMIUM V5 SIDEBAR */}
      <aside className="sidebar" style={{ width: sidebarOpen ? 'var(--sidebar-width)' : '0', padding: sidebarOpen ? '24px' : '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--accent-blue)', padding: '2px', borderRadius: '12px', overflow: 'hidden', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(56,189,248,0.3)' }}>
            <img src="/logo.png" alt="Bharat-Mitra Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700, color: 'white' }}>{t.sidebarTitle}</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <button className="chip" style={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', width: '100%' }}>
            <Lightbulb size={18} className="gradient-text" /> {t.sidebarResource1}
          </button>
          <button className="chip" style={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', width: '100%' }}>
            <BookOpen size={18} className="gradient-text" /> {t.sidebarResource2}
          </button>
          <button className="chip" style={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', width: '100%' }}>
            <Handshake size={18} className="gradient-text" /> {t.sidebarResource3}
          </button>
        </nav>

        <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(255,255,255,0.05)', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
             <Sparkles size={14} color="var(--accent-blue)" />
             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>V5.0 SIMPLE PRO</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {t.summary}
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="main-content">
        <header className="input-header" style={{ borderBottom: '1px solid var(--border-light)', background: 'rgba(10,10,12,0.8)', backdropFilter: 'blur(20px)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn-icon">
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          
          <div style={{ flex: 1 }}>
            <h1 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 0 }}>
              {t.title} 
            </h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>{t.subtitle}</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="chip"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '30px', borderColor: currentLang !== 'auto' ? 'var(--accent-blue)' : 'var(--border-light)' }}
              >
                <Globe size={14} />
                <span style={{ fontWeight: 600 }}>{langLabels[currentLang]}</span>
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    style={{ position: 'absolute', top: '120%', right: 0, zIndex: 100, width: '180px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  >
                    {Object.entries(langLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => { setCurrentLang(code as Language); setShowLangMenu(false); }}
                        style={{ width: '100%', padding: '10px 12px', background: currentLang === code ? 'rgba(56,189,248,0.1)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: currentLang === code ? 'var(--accent-blue)' : 'rgba(255,255,255,0.2)' }} />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={clearChat} className="btn-icon" style={{ color: '#ef4444' }}><Trash2 size={18} /></button>
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
                  <div className="avatar" style={{ border: '2px solid rgba(56,189,248,0.2)' }}>
                    <img src="/logo.png" alt="Bot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                )}
                <div className={`bubble ${msg.sender}`}>
                  {msg.sender === 'bot' && msg.language && (
                    <span className="lang-indicator">{uiTranslations[msg.language].intelligence}</span>
                  )}
                  <div className="markdown-content">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                  {msg.sender === 'bot' && (
                    <button 
                      onClick={() => copyToClipboard(msg.text)} 
                      title={t.copy}
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
                <div className="avatar" style={{ border: '2px solid rgba(56,189,248,0.2)' }}>
                    <img src="/logo.png" alt="Bot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="bubble bot" style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{t.typing}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </section>

        <div className="input-container-v2">
          {/* SIMPLE SUGGESTED QUESTIONS */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
            {getSuggestedQuestions(currentLang === 'auto' ? activeLang : currentLang).map((q, i) => (
              <button key={i} onClick={() => handleSend(q)} className="chip">{q}</button>
            ))}
          </div>

          <div className="input-box-wrapper" style={{ border: '2px solid rgba(255,255,255,0.05)' }}>
            <MessageSquare size={18} color="var(--accent-blue)" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="input-field"
            />
            <button onClick={() => handleSend()} className="btn-icon btn-send">
              <Send size={20} />
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '1px', fontWeight: 600 }}>
            BHARAT-MITRA V5.0 SIMPLE PRO | DESIGNED FOR EVERYONE
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
