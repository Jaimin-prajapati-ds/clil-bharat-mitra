/**
 * Bharat-Mitra NLP Engine - Enhanced Knowledge Base
 */

export type Language = 'hi' | 'gu' | 'mr' | 'ta' | 'en' | 'auto';

export const langLabels: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  gu: 'Gujarati',
  mr: 'Marathi',
  ta: 'Tamil',
  auto: 'Auto Detect'
};

export const detectLanguage = (text: string): Exclude<Language, 'auto'> => {
  const hindiRegex = /[\u0900-\u097F]/;
  const gujaratiRegex = /[\u0a80-\u0aff]/;
  const tamilRegex = /[\u0b80-\u0bff]/;

  if (gujaratiRegex.test(text)) return 'gu';
  if (tamilRegex.test(text)) return 'ta';
  if (hindiRegex.test(text)) {
    const marathiKeywords = ['आहे', 'नाही', 'काय', 'कुठे', 'कसे', 'आणि'];
    if (marathiKeywords.some(kw => text.includes(kw))) return 'mr';
    return 'hi';
  }
  return 'en';
};

interface ResponseSet {
  [key: string]: Record<Exclude<Language, 'auto'>, string>;
}

const responses: ResponseSet = {
  greeting: {
    en: "Namaste! I am Bharat-Mitra, your CLIL academic assistant. Reach out for help with Science, Math, or History in your language!",
    hi: "नमस्ते! मैं भारत-मित्र हूँ। विज्ञान, गणित या इतिहास में अपनी भाषा में सहायता के लिए पूछें!",
    gu: "નમસ્તે! હું ભારત-મિત્ર છું. વિજ્ઞાન, ગણિત અથવા ઈતિહાસમાં તમારી ભાષામાં મદદ માટે પૂછો!",
    mr: "नमस्ते! मी भारत-मित्र आहे. विज्ञान, गणित किंवा इतिहासामध्ये तुमच्या भाषेत मदतीसाठी विचारा!",
    ta: "வணக்கம்! நான் பாரத-மித்ரா. உங்கள் மொழியில் அறிவியல், கணிதம் அல்லது வரலாறு தொடர்பான உதவிக்கு என்னை அணுகவும்!"
  },
  clil_info: {
    en: "CLIL stands for Content and Language Integrated Learning. It's about learning a subject through a non-native language.",
    hi: "CLIL (विषय और भाषा एकीकृत शिक्षण) का अर्थ है किसी विषय को दूसरी भाषा के माध्यम से सीखना।",
    gu: "CLIL (વિષય અને ભાષા સંકલિત શિક્ષણ) એટલે બીજી ભાષા દ્વારા કોઈ વિષય શીખવો.",
    mr: "CLIL (विषय आणि भाषा एकात्मिक शिक्षण) म्हणजे दुसऱ्या भाषेतून एखादा विषय शिकणे.",
    ta: "CLIL (உள்ளடக்கம் மற்றும் மொழி ஒருங்கிணைந்த கற்றல்) என்பது ஒரு மொழியின் மூலம் ஒரு பாடத்தைக் கற்றுக்கொள்வதாகும்."
  },
  science: {
    en: "Science in CLIL focuses on terminology. For example, 'Photosynthesis' is how plants make food using sunlight.",
    hi: "विज्ञान में 'Photosynthesis' (प्रकाश संश्लेषण) वह प्रक्रिया है जिससे पौधे सूर्य के प्रकाश से भोजन बनाते हैं।",
    gu: "વિજ્ઞાનમાં 'Photosynthesis' (પ્રકાશ સંશ્લેષણ) એ પ્રક્રિયા છે જેના દ્વારા વનસ્પતિ સૂર્યપ્રકાશમાંથી ખોરાક બનાવે છે.",
    mr: "विज्ञानामध्ये 'Photosynthesis' (प्रकाश संश्लेषण) ही प्रक्रिया आहे ज्याद्वारे वनस्पती सूर्यप्रकाशापासून अन्न तयार करतात.",
    ta: "அறிவியலில் 'Photosynthesis' (ஒளிச்சேர்க்கை) என்பது தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி உணவைத் தயாரிக்கும் முறையாகும்."
  },
  math: {
    en: "In Mathematics, we focus on symbols and logic. For example, 'Triangle' has three sides and three angles.",
    hi: "गणित में, 'त्रिभुज' (Triangle) की तीन भुजाएं और तीन कोण होते हैं।",
    gu: "ગણિતમાં, 'ત્રિકોણ' (Triangle) ને ત્રણ બાજુઓ અને ત્રણ ખૂણા હોય છે.",
    mr: "गणितात, 'त्रिकोण' (Triangle) ला तीन बाजू आणि तीन कोन असतात.",
    ta: "கணிதத்தில், 'முக்கோணம்' (Triangle) மூன்று பக்கங்களையும் மூன்று கோணங்களையும் கொண்டுள்ளது."
  },
  history: {
    en: "History tells us about the past. For example, India became independent in 1947.",
    hi: "इतिहास हमें अतीत के बारे में बताता है। जैसे, भारत 1947 में स्वतंत्र हुआ।",
    gu: "ઈતિહાસ આપણને ભૂતકાળ વિશે જણાવે છે. જેમ કે, ભારત 1947 માં આઝાદ થયું.",
    mr: "इतिहास आपल्याला भूतकाळाबद्दल सांगतो. उदाहरणार्थ, भारत 1947 मध्ये स्वतंत्र झाला.",
    ta: "வரலாறு நமக்கு கடந்த காலத்தைப் பற்றி சொல்கிறது. உதாரணமாக, இந்தியா 1947 இல் சுதந்திரம் பெற்றது."
  },
  default: {
    en: "I am learning more every day! Ask me about CLIL, Science, History, or Math.",
    hi: "मैं हर दिन और सीख रहा हूँ! मुझसे CLIL, विज्ञान, इतिहास या गणित के बारे में पूछें।",
    gu: "હું દરરોજ વધુ શીખી રહ્યો છું! મને CLIL, વિજ્ઞાન, ઇતિહાસ અથવા ગણિત વિશે પૂછો.",
    mr: "मी दररोज अधिक शिकत आहे! मला CLIL, विज्ञान, इतिहास किंवा गणिताबद्दल विचारा.",
    ta: "நான் ஒவ்வொரு நாளும் அதிகமாகக் கற்றுக்கொள்கிறேன்! CLIL, அறிவியல், வரலாறு அல்லது கணிதம் பற்றி என்னிடம் கேளுங்கள்."
  }
};

export const getResponse = (input: string, lang: Exclude<Language, 'auto'>): string => {
  const query = input.toLowerCase();
  
  if (/hi|hello|hey|namaste|नमस्ते|નમસ્તે/.test(query)) return responses.greeting[lang];
  if (/clil/.test(query)) return responses.clil_info[lang];
  if (/science|vigyan|विज्ञान|વિજ્ઞાન/.test(query)) return responses.science[lang];
  if (/math|ganit|गणित|ગણિત/.test(query)) return responses.math[lang];
  if (/history|itihas|इतिहास|ઈતિહાસ/.test(query)) return responses.history[lang];
  
  return responses.default[lang];
};

export const getSuggestedQuestions = (lang: Language): string[] => {
  const code = lang === 'auto' ? 'en' : (lang as Exclude<Language, 'auto'>);
  const questions: Record<Exclude<Language, 'auto'>, string[]> = {
    en: ["What is CLIL?", "Explain Science", "Math concepts", "Who are you?"],
    hi: ["CLIL क्या है?", "विज्ञान समझाओ", "गणित के बारे में", "आप कौन हैं?"],
    gu: ["CLIL શું છે?", "વિજ્ઞાન સમજાવો", "ગણિત વિશે", "તમે કોણ છો?"],
    mr: ["CLIL काय आहे?", "विज्ञान समजावून सांगा", "गणित संकल्पना", "तुम्ही कोण आहात?"],
    ta: ["CLIL என்றால் என்ன?", "அறிவியல் விளக்கம்", "கணித கருத்துக்கள்", "நீங்கள் யார்?"]
  };
  return questions[code] || questions.en;
};
