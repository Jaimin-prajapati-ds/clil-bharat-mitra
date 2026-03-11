import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Bharat-Mitra - REAL WORKING GEMINI EDITION
 * Deep Knowledge | Human Simplicity | Universal Heritage
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

export const uiTranslations: Record<Exclude<Language, 'auto'>, Record<string, string>> = {
  en: {
    title: "Bharat-Mitra",
    subtitle: "Your AI Regional Heritage Guide",
    sidebarTitle: "Heritage Vault",
    sidebarResource1: "Ancient Wisdom",
    sidebarResource2: "Modern Science",
    sidebarResource3: "Literary Gems",
    placeholder: "Ask anything in any language...",
    clearChat: "New Session",
    typing: "Mitra is searching...",
    intelligence: "Gemini Intelligence",
    copy: "Copy text",
    summary: "Discover unthinkable depth through real-time AI."
  },
  hi: {
    title: "भारत-मित्र",
    subtitle: "आपका AI क्षेत्रीय विरासत मार्गदर्शक",
    sidebarTitle: "विरासत खजाना",
    sidebarResource1: "प्राचीन ज्ञान",
    sidebarResource2: "आधुनिक विज्ञान",
    sidebarResource3: "साहित्यिक रत्न",
    placeholder: "कुछ भी पूछें...",
    clearChat: "नया सत्र",
    typing: "मित्र खोज रहा है...",
    intelligence: "जेमिनी इंटेलिजेंस",
    copy: "कॉपी करें",
    summary: "असली AI के साथ अकल्पनीय गहराई खोजें।"
  },
  gu: {
    title: "ભારત-મિત્ર",
    subtitle: "તમારા AI પ્રાદેશિક વારસા માર્ગદર્શક",
    sidebarTitle: "વારસાની તિજોરી",
    sidebarResource1: "પ્રાચીન જ્ઞાન",
    sidebarResource2: "આધુનિક વિજ્ઞાન",
    sidebarResource3: "સાહિત્યિક રત્નો",
    placeholder: "કંઈપણ પૂછો...",
    clearChat: "નવું સત્ર",
    typing: "મિત્ર શોધી રહ્યો છે...",
    intelligence: "જેમિની ઇન્ટેલિજન્સ",
    copy: "નકલ કરો",
    summary: "રિયલ-ટાઇમ AI દ્વારા અકલ્પનીય ઊંડાણ શોધો."
  },
  mr: {
    title: "भारत-मित्र",
    subtitle: "तुमचा AI प्रादेशिक वारसा मार्गदर्शक",
    sidebarTitle: "वारसाvault",
    sidebarResource1: "प्राचीन ज्ञान",
    sidebarResource2: "आधुनिक विज्ञान",
    sidebarResource3: "साहित्यिक रत्ने",
    placeholder: "काहीही विचारा...",
    clearChat: "नवीन सत्र",
    typing: "मित्र शोधत आहे...",
    intelligence: "जेमिनी इंटेलिजन्स",
    copy: "कॉपी करा",
    summary: "रिअल-टाइम AI सह अकल्पनीय खोली अनुभवा."
  },
  ta: {
    title: "பாரத-மித்ரா",
    subtitle: "உங்கள் AI பிராந்திய பாரம்பரிய வழிகாட்டி",
    sidebarTitle: "பாரம்பரிய பெட்டகம்",
    sidebarResource1: "பண்டைய அறிவு",
    sidebarResource2: "நவீன அறிவியல்",
    sidebarResource3: "இலக்கிய ரத்தினங்கள்",
    placeholder: "எது வேண்டுமானாலும் கேளுங்கள்...",
    clearChat: "புதிய அமர்வு",
    typing: "மித்ரா தேடுகிறது...",
    intelligence: "ஜெமினி இன்டெலிஜென்ஸ்",
    copy: "நகலெடு",
    summary: "நிகழ்நேர AI மூலம் நம்பமுடியாத ஆழத்தைக் கண்டறியவும்."
  }
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `You are "Bharat-Mitra", a premium, human-centric regional heritage guide for India.
  Your goal is to explain complex topics (Ancient Science, History, Culture, Modern Achievements) in EXTREMELY SIMPLE, WARM, and UNDERSTANDABLE language.
  
  CORE RULES:
  1. DO NOT use AI jargon, version numbers, or technical terms.
  2. Speak like a wise and friendly guide (a "Mitra").
  3. If the user asks in Hindi, Gujarati, Marathi, or Tamil, respond in THAT language.
  4. Always use Markdown for formatting.
  5. Keep responses concise but deep in knowledge.
  6. Focus on regional pride and cultural heritage.
  7. Use simple analogies for scientific concepts.
  8. NO emojis in the body text (keep it premium), but you can use simple headings.`,
});

export const detectLanguage = (text: string): Exclude<Language, 'auto'> => {
  const hindiRegex = /[\u0900-\u097F]/;
  const gujaratiRegex = /[\u0a80-\u0aff]/;
  const tamilRegex = /[\u0b80-\u0bff]/;

  if (gujaratiRegex.test(text)) return 'gu';
  if (tamilRegex.test(text)) return 'ta';
  if (hindiRegex.test(text)) {
    const marathiKeywords = ['आहे', 'नाही', 'काय', 'कुठे', 'कसे', 'आणि', 'पण', 'मराठी'];
    if (marathiKeywords.some(kw => text.includes(kw))) return 'mr';
    return 'hi';
  }
  return 'en';
};

export const getResponse = async (input: string, lang: Exclude<Language, 'auto'>): Promise<string> => {
  try {
    const prompt = `User language: ${langLabels[lang]}. \nUser query: ${input}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    const fallbacks = {
      en: "I am sorry, I am having trouble reaching the knowledge vault. Please check your connection.",
      hi: "क्षमा करें, मुझे ज्ञान भंडार तक पहुँचने में समस्या हो रही है। कृपया अपना कनेक्शन जांचें।",
      gu: "ક્ષમા કરશો, મને જ્ઞાન તિજોરી સુધી પહોંચવામાં સમસ્યા થઈ રહી છે. કૃપા કરીને તમારું કનેક્શન તપાસો.",
      mr: "क्षमस्व, मला ज्ञान भांडारापर्यंत पोहोचण्यात अडचण येत आहे. कृपया तुमचे कनेक्शन तपासा.",
      ta: "மன்னிக்கவும், அறிவு பெட்டகத்தை அடைவதில் எனக்கு சிக்கல் உள்ளது. உங்கள் இணைப்பைச் சரிபார்க்கவும்."
    };
    return fallbacks[lang] || fallbacks.en;
  }
};

export const getSuggestedQuestions = (lang: Language): string[] => {
  const code = lang === 'auto' ? 'en' : (lang as Exclude<Language, 'auto'>);
  const questions: Record<Exclude<Language, 'auto'>, string[]> = {
    en: ["Who invented Zero?", "Tell me about Kabir", "ISRO's latest mission", "Tamil Literature depth"],
    hi: ["शून्य का आविष्कार किसने किया?", "कबीर के बारे में बताएं", "इसरो का मिशन", "प्राचीन भारत का विज्ञान"],
    gu: ["શૂન્યની શોધ કોણે કરી?", "નરસિંહ મહેતા વિશે જણાવો", "આયુર્વેદ શું છે?", "ભારતીય વિજ્ઞાન"],
    mr: ["शून्याचा शोध कोणी लावला?", "संत तुकाराम बद्दल सांगा", "गड-किल्ल्यांचा इतिहास", "भारताचे प्राचीन ज्ञान"],
    ta: ["பூஜ்யத்தை கண்டுபிடித்தது யார்?", "திருவள்ளுவர் பற்றிச் சொல்", "காவிரி நதியின் வரலாறு", "தமிழ் இலக்கியம்"]
  };
  return questions[code] || questions.en;
};
