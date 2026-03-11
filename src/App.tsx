import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, User, Globe, Trash2, 
  MessageSquare, Copy, ChevronRight, 
  Compass, Info, Star, MapPin
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

const STORAGE_KEY = 'bharat_mitra_heritage_history';
const LANG_KEY = 'bharat_mitra_heritage_lang';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        text: '### Namaste! Welcome to Bharat-Mitra\nI am your friend and guide for regional heritage. Let me help you explore our culture, language, and the world in a very simple way.\n\n*Choose a language or type a hello below to begin.*',
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
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeLang, setActiveLang] = useState<Exclude<Language, 'auto'>>('en');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    if (window.innerWidth <= 1024) setSidebarOpen(false);

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
      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      />

      {/* PREMIUM HUMAN SIDEBAR */}
      <aside className="sidebar" style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)', width: 'var(--sidebar-width)', opacity: sidebarOpen ? 1 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
          <div style={{ padding: '2px', borderRadius: '50%', overflow: 'hidden', width: '45px', height: '45px', background: 'var(--bg-card)', border: '2px solid rgba(255,255,255,0.1)' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 600, color: 'white' }}>{t.title}</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <button className="chip" style={{ justifyContent: 'flex-start', padding: '16px', borderRadius: '14px', width: '100%' }}>
            <Compass size={18} color="var(--accent-blue)" /> {t.sidebarResource1}
          </button>
          <button className="chip" style={{ justifyContent: 'flex-start', padding: '16px', borderRadius: '14px', width: '100%' }}>
            <MapPin size={18} color="#ef4444" /> {t.sidebarResource2}
          </button>
          <button className="chip" style={{ justifyContent: 'flex-start', padding: '16px', borderRadius: '14px', width: '100%' }}>
            <Info size={18} color="var(--accent-purple)" /> {t.sidebarResource3}
          </button>
        </nav>

        <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
             <Star size={14} color="#fcd34d" />
             <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fcd34d' }}>PREMIUM CHOICE</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {t.summary}
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="main-content">
        <header className="input-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(2, 6, 23, 0.5)', backdropFilter: 'blur(30px)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn-icon">
            <ChevronRight size={22} style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
          </button>
          
          <div style={{ flex: 1 }}>
            <h1 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 0 }}>
              {t.title} 
            </h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>{t.subtitle}</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="chip"
                style={{ padding: '8px 14px', borderRadius: '30px', background: 'rgba(255,255,255,0.03)' }}
              >
                <Globe size={14} />
                <span style={{ fontWeight: 600 }} className="mobile-hide">{langLabels[currentLang]}</span>
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    style={{ position: 'absolute', top: '120%', right: 0, zIndex: 100, width: '160px', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                  >
                    {Object.entries(langLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => { setCurrentLang(code as Language); setShowLangMenu(false); }}
                        style={{ width: '100%', padding: '10px', background: currentLang === code ? 'rgba(56,189,248,0.1)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                      >
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: currentLang === code ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)' }} />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={clearChat} className="btn-icon" style={{ color: '#f87171' }}><Trash2 size={18} /></button>
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
                  <div className="avatar" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>
                    <img src="/logo.png" alt="Mitra" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'absolute', bottom: '8px', right: '8px', opacity: 0.3 }}
                    >
                      <Copy size={12} />
                    </button>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="avatar" style={{ border: 'none', background: 'linear-gradient(135deg, var(--accent-purple) 0%, #a855f7 100%)' }}><User size={18} color="white" /></div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="message-row bot">
                <div className="avatar" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>
                    <img src="/logo.png" alt="Mitra" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="bubble bot">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.typing}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </section>

        <div className="input-container-v2">
          {/* SUGGESTED QUESTIONS */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
            {getSuggestedQuestions(currentLang === 'auto' ? activeLang : currentLang).map((q, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(q)} 
                className="chip"
                style={{ fontSize: '0.75rem', padding: '8px 14px' }}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="input-box-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
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
          
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 500, opacity: 0.5 }}>
            BHARAT-MITRA | OUR SHARED REGIONAL HERITAGE
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mobile-hide { display: none; }
        }
      `}</style>
    </div>
  );
};

export default App;
