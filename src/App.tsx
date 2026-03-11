import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, User, Globe, Trash2, 
  MessageSquare, Copy, ChevronRight, 
  Compass, Star, Feather, Sparkles
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

const STORAGE_KEY = 'bharat_mitra_ultimate_vault';
const LANG_KEY = 'bharat_mitra_heritage_lang';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        text: '### Namaste! Welcome to Bharat-Mitra\nI am your companion in discovering India\'s unthinkable heritage. From the **invention of Zero** to the wisdom of **Kabir**, I have deep knowledge waiting for you.\n\n*Choose a language and let\'s explore our roots together.*',
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
      if (window.innerWidth <= 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentLang !== 'auto') setActiveLang(currentLang);
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
    if (currentLang === 'auto') setActiveLang(detected);

    const userMessage: Message = { id: Date.now().toString(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    if (window.innerWidth <= 1024) setSidebarOpen(false);

    const finalLang = currentLang === 'auto' ? detected : (currentLang as Exclude<Language, 'auto'>);
    
    try {
      const botResponseText = await getResponse(textToSend, finalLang);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        language: finalLang
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
       console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    if (window.confirm(t.clearChat + "?")) {
      setMessages([{ id: '1', text: '---', sender: 'bot', language: activeLang }]);
    }
  };

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="app-shell">
      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      <aside className="sidebar" style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)', width: 'var(--sidebar-width)', opacity: sidebarOpen ? 1 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
          <div style={{ padding: '2px', borderRadius: '50%', overflow: 'hidden', width: '45px', height: '45px', background: 'var(--bg-card)', border: '2px solid rgba(255,255,255,0.1)' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>{t.title}</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <button onClick={() => handleSend("Who invented Zero?")} className="chip" style={{ justifyContent: 'flex-start', padding: '16px', borderRadius: '16px', width: '100%' }}>
            <Compass size={20} color="var(--accent-blue)" /> {t.sidebarResource1}
          </button>
          <button onClick={() => handleSend("Tell me about Modern Science")} className="chip" style={{ justifyContent: 'flex-start', padding: '16px', borderRadius: '16px', width: '100%' }}>
            <Sparkles size={20} color="#fcd34d" /> {t.sidebarResource2}
          </button>
          <button onClick={() => handleSend("Show me Literary Gems")} className="chip" style={{ justifyContent: 'flex-start', padding: '16px', borderRadius: '16px', width: '100%' }}>
            <Feather size={20} color="var(--accent-purple)" /> {t.sidebarResource3}
          </button>
        </nav>

        <div style={{ padding: '20px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(129,140,248,0.1) 100%)', border: '1px solid rgba(255,255,255,0.08)', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
             <Star size={14} color="#fcd34d" fill="#fcd34d" />
             <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fcd34d', textTransform: 'uppercase', letterSpacing: '1px' }}>ULTIMATE EDITION</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontWeight: 500 }}>
            {t.summary}
          </p>
        </div>
      </aside>

      <div className="main-content">
        <header className="input-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(2, 6, 23, 0.4)', backdropFilter: 'blur(40px)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn-icon">
            <ChevronRight size={24} style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </button>
          
          <div style={{ flex: 1 }}>
            <h1 className="gradient-text" style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2px' }}>{t.title}</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{t.subtitle}</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowLangMenu(!showLangMenu)} className="chip" style={{ padding: '10px 18px', borderRadius: '30px', background: 'rgba(255,255,255,0.04)', fontWeight: 700 }}>
                <Globe size={16} />
                <span className="mobile-hide">{langLabels[currentLang]}</span>
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{ position: 'absolute', top: '120%', right: 0, zIndex: 100, width: '180px', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '8px', boxShadow: '0 25px 50px rgba(0,0,0,0.6)' }}>
                    {Object.entries(langLabels).map(([code, label]) => (
                      <button key={code} onClick={() => { setCurrentLang(code as Language); setShowLangMenu(false); }}
                        style={{ width: '100%', padding: '12px', background: currentLang === code ? 'rgba(56,189,248,0.15)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentLang === code ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)' }} />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={clearChat} className="btn-icon" style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#f87171' }}><Trash2 size={20} /></button>
          </div>
        </header>

        <section className="chat-window">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`message-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="avatar" style={{ border: '2px solid rgba(255,255,255,0.1)', background: 'var(--bg-card)', width: '42px', height: '42px' }}>
                    <img src="/logo.png" alt="Mitra" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                  </div>
                )}
                <div className={`bubble ${msg.sender}`} style={{ border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.06)' : 'none', padding: '20px 24px' }}>
                  {msg.sender === 'bot' && msg.language && (
                    <span className="lang-indicator" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                       {uiTranslations[msg.language].intelligence}
                    </span>
                  )}
                  <div className="markdown-content"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                  {msg.sender === 'bot' && (
                    <button onClick={() => copyToClipboard(msg.text)} className="btn-icon" style={{ position: 'absolute', bottom: '10px', right: '10px', opacity: 0.2 }}>
                      <Copy size={14} />
                    </button>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="avatar" style={{ border: 'none', background: 'linear-gradient(135deg, var(--accent-purple) 0%, #a855f7 100%)', width: '42px', height: '42px', boxShadow: '0 8px 20px rgba(168,85,247,0.3)' }}><User size={22} color="white" /></div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="message-row bot">
                <div className="avatar" style={{ border: '2px solid rgba(255,255,255,0.1)', width: '42px', height: '42px' }}>
                    <img src="/logo.png" alt="Mitra" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </div>
                <div className="bubble bot" style={{ padding: '18px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                      <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                      <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{t.typing}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </section>

        <div className="input-container-v2" style={{ paddingBottom: '40px', background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.8) 100%)' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px', justifyContent: 'center', maxWidth: '900px', margin: '0 auto 30px auto' }}>
            {getSuggestedQuestions(currentLang === 'auto' ? activeLang : currentLang).map((q, i) => (
              <button key={i} onClick={() => handleSend(q)} className="chip" style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', fontWeight: 600 }}>{q}</button>
            ))}
          </div>

          <div className="input-box-wrapper" style={{ maxWidth: '850px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '22px' }}>
            <MessageSquare size={22} color="var(--accent-blue)" />
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t.placeholder} className="input-field" style={{ fontSize: '1.1rem', fontWeight: 500 }} />
            <button onClick={() => handleSend()} className="btn-icon btn-send" style={{ width: '50px', height: '50px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(129,140,248,0.15) 100%)' }}>
              <Send size={24} />
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>BHARAT-MITRA | ULTIMATE KNOWLEDGE EDITION</div>
        </div>
      </div>
      <style>{`@media (max-width: 640px) { .mobile-hide { display: none; } .bubble { max-width: 95% !important; } .chat-window { padding: 25px 15px !important; } }`}</style>
    </div>
  );
};

export default App;
