/**
 * Bharat-Mitra NLP Engine
 * Handles language detection and intent mapping for CLIL assignment.
 */

type Language = 'hi' | 'gu' | 'mr' | 'ta' | 'en';

export const detectLanguage = (text: string): Language => {
  const hindiRegex = /[\u0900-\u097F]/;
  const gujaratiRegex = /[\u0a80-\u0aff]/;
  const tamilRegex = /[\u0b80-\u0bff]/;

  if (gujaratiRegex.test(text)) return 'gu';
  if (tamilRegex.test(text)) return 'ta';
  if (hindiRegex.test(text)) {
    // Marathi and Hindi both use Devanagari. 
    // We'll check for specific Marathi common words.
    const marathiKeywords = ['आहे', 'नाही', 'काय', 'कुठे', 'कसे'];
    if (marathiKeywords.some(kw => text.includes(kw))) return 'mr';
    return 'hi';
  }
  
  return 'en';
};

const responses: Record<string, Record<Language, string>> = {
  greeting: {
    en: "Hello! I am Bharat-Mitra, your academic assistant for CLIL. How can I help with your subjects today?",
    hi: "नमस्ते! मैं भारत-मित्र हूँ, आपका शैक्षणिक सहायक। आज मैं आपके विषयों में कैसे मदद कर सकता हूँ?",
    gu: "નમસ્તે! હું ભારત-મિત્ર છું, તમારો શૈક્ષણિક સહાયક. આજે હું તમારા વિષયોમાં કેવી રીતે મદદ કરી શકું?",
    mr: "नमस्ते! मी भारत-मित्र आहे, तुमचा शैक्षणिक सहाय્યક. आज मी तुमच्या विषयांमध्ये कशी मदत करू शकतो?",
    ta: "வணக்கம்! நான் பாரத-மித்ரா, உங்கள் கல்வி உதவியாளர். இன்று உங்கள் பாடங்களுக்கு நான் எப்படி உதவ முடியும்?"
  },
  clil_info: {
    en: "CLIL stands for Content and Language Integrated Learning. It's a method where you learn a subject (like Science) through a second language.",
    hi: "CLIL का अर्थ है 'विषय और भाषा एकीकृत शिक्षण'। यह एक ऐसी पद्धति है जहाँ आप दूसरी भाषा के माध्यम से विज्ञान या इतिहास जैसे विषय सीखते हैं।",
    gu: "CLIL એટલે 'વિષય અને ભાષા સંકલિત શિક્ષણ'. આ એક એવી પદ્ધતિ છે જ્યાં તમે બીજી ભાષા દ્વારા વિજ્ઞાન કે ઈતિહાસ જેવા વિષયો શીખો છો.",
    mr: "CLIL म्हणजे 'विषय आणि भाषा एकात्मिक शिक्षण'. ही एक अशी पद्धત आहे जिथे तुम्ही दुसऱ्या भाषेद्वારે विज्ञान किंवा इतिहास यांसारखे विषय शिकता.",
    ta: "CLIL என்பது 'உள்ளடக்கம் மற்றும் மொழி ஒருங்கிணைந்த கற்றல்' என்று பொருள்படும். இது ஒரு இரண்டாம் மொழியின் மூலம் அறிவியல் போன்ற பாடத்தைக் கற்கும் முறையாகும்."
  },
  help: {
    en: "I can explain CLIL concepts, translate educational terms, or help you with regional language queries.",
    hi: "मैं CLIL अवधारणाओं को समझा सकता हूँ, शैक्षिक शब्दों का अनुवाद कर सकता हूँ, या क्षेत्रीय भाषा संबंधी प्रश्नों में आपकी मदद कर सकता हूँ।",
    gu: "હું CLIL વિભાવનાઓ સમજાવી શકું છું, શૈક્ષણિક શબ્દોનો અનુવાદ કરી શકું છું અથવા પ્રાદેશિક ભાષાના પ્રશ્નોમાં તમને મદદ કરી શકું છું.",
    mr: "मी CLIL संकल्पना समजावून सांगू शकतो, शैक्षणिक शब्दांचे भाषांतर करू शकतो किंवा प्रादेशિક भाषेतील प्रश्नांमध्ये तुम्हाला मदत करू शकतो.",
    ta: "நான் CLIL கருத்துக்களை விளக்க முடியும், கல்விச் சொற்களை மொழிபெயர்க்க முடியும் அல்லது பிராந்திய மொழி வினவல்களுக்கு உங்களுக்கு உதவ முடியும்."
  },
  default: {
    en: "That's an interesting question! For CLIL, we combine subject knowledge with language skills. Can you tell me more?",
    hi: "यह एक दिलचस्प सवाल है! CLIL के लिए, हम विषय ज्ञान को भाषा कौशल के साथ जोड़ते हैं। क्या आप मुझे और बता सकते हैं?",
    gu: "આ એક રસપ્રદ પ્રશ્ન છે! CLIL માટે, અમે ભાષા કૌશલ્ય સાથે વિષયના જ્ઞાનને જોડીએ છીએ. શું તમે મને વધુ કહી શકો?",
    mr: "हा एक मनोरंजक प्रश्न आहे! CLIL साठी, आम्ही भाषा कौशल्यांसह विषय ज्ञान एकत्र करतो. तुम्ही मला अधिक सांगू शकता का?",
    ta: "இது ஒரு சுவாரஸ்யமான கேள்வி! CLIL க்காக, நாங்கள் பாட அறிவை மொழித் திறனுடன் இணைக்கிறோம். எனக்கு இன்னும் சொல்ல முடியுமா?"
  }
};

export const getResponse = (input: string, lang: Language): string => {
  const query = input.toLowerCase();
  
  if (query.includes('hello') || query.includes('hi') || query.includes('namaste') || query.includes('नमस्ते') || query.includes('નમસ્તે')) {
    return responses.greeting[lang];
  }
  
  if (query.includes('clil')) {
    return responses.clil_info[lang];
  }
  
  if (query.includes('help') || query.includes('madad') || query.includes('મદદ') || query.includes('உதவி')) {
    return responses.help[lang];
  }
  
  return responses.default[lang];
};
