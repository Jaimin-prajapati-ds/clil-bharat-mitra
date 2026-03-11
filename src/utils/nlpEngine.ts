/**
 * Bharat-Mitra NLP Engine V5 - Simple & Deep Regional Intelligence
 * Refined for maximum clarity and simplified language.
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
    title: "Bharat-Mitra AI",
    subtitle: "Simple & Powerful Regional Assistant",
    sidebarTitle: "Knowledge Box",
    sidebarResource1: "Cultural Facts",
    sidebarResource2: "Science Info",
    sidebarResource3: "Language Help",
    placeholder: "Ask anything in simple words...",
    clearChat: "Clear Session",
    typing: "Thinking simply...",
    intelligence: "English Mode",
    copy: "Copy text",
    summary: "Advanced AI that speaks your language in a simple way."
  },
  hi: {
    title: "भारत-मित्र एआई",
    subtitle: "सरल और शक्तिशाली क्षेत्रीय सहायक",
    sidebarTitle: "ज्ञान का पिटारा",
    sidebarResource1: "सांस्कृतिक तथ्य",
    sidebarResource2: "विज्ञान की जानकारी",
    sidebarResource3: "भाषा सहायता",
    placeholder: "सरल शब्दों में कुछ भी पूछें...",
    clearChat: "चैट साफ़ करें",
    typing: "सोच रहा हूँ...",
    intelligence: "हिंदी मोड",
    copy: "कॉपी करें",
    summary: "उन्नत एआई जो आपकी भाषा को सरल तरीके से बोलता है।"
  },
  gu: {
    title: "ભારત-મિત્ર AI",
    subtitle: "સરળ અને શક્તિશાળી પ્રાદેશિક સહાયક",
    sidebarTitle: "જ્ઞાનની પેટી",
    sidebarResource1: "સાંસ્કૃતિક તથ્યો",
    sidebarResource2: "વિજ્ઞાનની માહિતી",
    sidebarResource3: "ભાષા સહાય",
    placeholder: "સરળ શબ્દોમાં કંઈપણ પૂછો...",
    clearChat: "ચેટ સાફ કરો",
    typing: "વિચારી રહ્યો છું...",
    intelligence: "ગુજરાતી મોડ",
    copy: "નકલ કરો",
    summary: "અદ્યતન AI જે તમારી ભાષાને સરળ રીતે બોલે છે."
  },
  mr: {
    title: "भारत-मित्र एआय",
    subtitle: "सोपा आणि शक्तिशाली प्रादेशिक सहाय्यक",
    sidebarTitle: "ज्ञान पेटी",
    sidebarResource1: "सांस्कृतिक तथ्ये",
    sidebarResource2: "विज्ञानाची माहिती",
    sidebarResource3: "भाषा मदत",
    placeholder: "सोप्या शब्दात काहीही विचारा...",
    clearChat: "चॅट साफ करा",
    typing: "विचार करत आहे...",
    intelligence: "मराठी मोड",
    copy: "कॉपी करा",
    summary: "प्रगत AI जे तुमची भाषा सोप्या पद्धतीने बोलते."
  },
  ta: {
    title: "பாரத-மித்ரா AI",
    subtitle: "எளிமையான மற்றும் சக்திவாய்ந்த உதவியாளர்",
    sidebarTitle: "அறிவுப் பெட்டி",
    sidebarResource1: "கலாச்சார உண்மைகள்",
    sidebarResource2: "அறிவியல் தகவல்",
    sidebarResource3: "மொழி உதவி",
    placeholder: "எளிமையான சொற்களில் எதையும் கேளுங்கள்...",
    clearChat: "அமர்வை அழி",
    typing: "யோசிக்கிறேன்...",
    intelligence: "தமிழ் பயன்முறை",
    copy: "நகலெடு",
    summary: "உங்கள் மொழியை எளிமையான முறையில் பேசும் மேம்பட்ட AI."
  }
};

export const detectLanguage = (text: string): Exclude<Language, 'auto'> => {
  const hindiRegex = /[\u0900-\u097F]/;
  const gujaratiRegex = /[\u0a80-\u0aff]/;
  const tamilRegex = /[\u0b80-\u0bff]/;

  if (gujaratiRegex.test(text)) return 'gu';
  if (tamilRegex.test(text)) return 'ta';
  if (hindiRegex.test(text)) {
    const marathiKeywords = ['आहे', 'नाही', 'काय', 'कुठे', 'कसे', 'आणि', 'पण'];
    if (marathiKeywords.some(kw => text.includes(kw))) return 'mr';
    return 'hi';
  }
  return 'en';
};

interface ResponseSet {
  [key: string]: Record<Exclude<Language, 'auto'>, string>;
}

const responses: ResponseSet = {
  intro: {
    en: "### Namaste! I am Bharat-Mitra\nI can help you with many things in a **simple way**:\n- **General Knowledge**: Facts about India and the world.\n- **Science**: Simple explanations of how things work.\n- **Language**: Moving between your native tongue and English.\n\nWhat do you want to talk about?",
    hi: "### नमस्ते! मैं भारत-मित्र हूँ\nमैं आपकी बहुत सी चीजों में **सरल तरीके** से मदद कर सकता हूँ:\n- **सामान्य ज्ञान**: भारत और दुनिया के बारे में तथ्य।\n- **विज्ञान**: चीजें कैसे काम करती हैं, इसका सरल विवरण।\n- **भाषा**: अपनी मातृभाषा और अंग्रेजी के बीच अनुवाद।\n\nआप किस बारे में बात करना चाहते हैं?",
    gu: "### નમસ્તે! હું ભારત-મિત્ર છું\nહું તમને ઘણી બાબતોમાં **સરળ રીતે** મદદ કરી શકું છું:\n- **સામાન્ય જ્ઞાન**: ભારત અને વિશ્વ વિશેના તથ્યો.\n- **વિજ્ઞાન**: વસ્તુઓ કેવી રીતે કામ કરે છે તેની સરળ સમજૂતી.\n- **ભાષા**: તમારી માતૃભાષા અને અંગ્રેજી વચ્ચે અનુવાદ.\n\nતમે શેના વિશે વાત કરવા માંગો છો?",
    mr: "### नमस्कार! मी भारत-मित्र आहे\nमी तुम्हाला अनेक गोष्टींमध्ये **सोप्या पद्धतीने** मदत करू शकतो:\n- **सामान्य ज्ञान**: भारत आणि जगाबद्दलची तथ्ये.\n- **विज्ञान**: गोष्टी कशा काम करतात याचे सोपे स्पष्टीकरण.\n- **भाषा**: तुमची मातृभाषा आणि इंग्रजीमधील भाषांतर.\n\nतुम्हाला कशाबद्दल बोलायचे आहे?",
    ta: "### வணக்கம்! நான் பாரத-மித்ரா\nநான் உங்களுக்கு பல விஷயங்களில் **எளிமையான முறையில்** உதவ முடியும்:\n- **பொது அறிவு**: இந்தியா மற்றும் உலகத்தைப் பற்றிய உண்மைகள்.\n- **அறிவியல்**: விஷயங்கள் எவ்வாறு செயல்படுகின்றன என்பதற்கான எளிய விளக்கங்கள்.\n- **மொழி**: உங்கள் தாய்மொழிக்கும் ஆங்கிலத்திற்கும் இடையே மொழிபெயர்ப்பு.\n\nநீங்கள் எதைப் பற்றி பேச விரும்புகிறீர்கள்?"
  },
  isro: {
    en: "### About ISRO\nISRO is India's space team. They do amazing things like sending rockets to the Moon and Mars.\n- **Moon Mission**: India reached the South Pole of the moon first.\n- **Mars Mission**: India reached Mars in the very first try.\nISRO makes every Indian proud!",
    hi: "### इसरो (ISRO) के बारे में\nइसरो भारत की अंतरिक्ष टीम है। वे चंद्रमा और मंगल पर रॉकेट भेजने जैसे अद्भुत काम करते हैं।\n- **चंद्रयान**: भारत चंद्रमा के दक्षिणी ध्रुव पर पहुंचने वाला पहला देश बना।\n- **मंगलयान**: भारत पहले ही प्रयास में मंगल पर पहुंच गया।\nइसरो हर भारतीय को गौरवान्वित करता है!",
    gu: "### ISRO વિશે\nISRO ભારતની અંતરિક્ષ ટીમ છે. તેઓ ચંદ્ર અને મંગળ પર રોકેટ મોકલવા જેવા અદ્ભુત કામો કરે છે.\n- **ચંદ્રયાન**: ભારત ચંદ્રના દક્ષિણ ધ્રુવ પર પહોંચનાર પ્રથમ દેશ બન્યો.\n- **મંગળયાન**: ભારત તેના પ્રથમ પ્રયાસમાં જ મંગળ પર પહોંચી ગયું.\nISRO દરેક ભારતીયને ગૌરવ અપાવે છે!",
    mr: "### इस्रो (ISRO) बद्दल\nइस्रो ही भारताची अंतराळ टीम आहे. ते चंद्र आणि मंगळावर रॉकेट पाठवण्यासारखी आश्चर्यकारक कामे करतात.\n- **चांद्रयान**: चंद्राच्या दक्षिण ध्रुवावर पोहोचणारा भारत पहिला देश ठरला.\n- **मंगलयान**: पहिल्याच प्रयत्नात भारत मंगळावर पोहोचला.\nइस्रो प्रत्येक भारतीयाचा अभिमान वाढवते!",
    ta: "### ISRO பற்றி\nISRO என்பது இந்தியாவின் விண்வெளி குழு. அவர்கள் நிலவு மற்றும் செவ்வாய் கிரகத்திற்கு ராக்கெட்டுகளை அனுப்புவது போன்ற அற்புதமான காரியங்களைச் செய்கிறார்கள்.\n- **நிலவு பயணம்**: நிலவின் தென் துருவத்தை முதலில் அடைந்த நாடு இந்தியா.\n- **செவ்வாய் பயணம்**: இந்தியா முதல் முயற்சியிலேயே செவ்வாய் கிரகத்தை அடைந்தது.\nISRO ஒவ்வொரு இந்தியரையும் பெருமைப்படுத்துகிறது!"
  },
  culture_simple: {
    en: "### Indian Festivals\nIndia is a land of many festivals. Each region has its own beauty:\n- **Diwali**: The festival of lights.\n- **Holi**: The festival of colors.\n- **Pongal/Bihu/Navratri**: Celebrating nature and harvests.\nThese festivals bring everyone together!",
    hi: "### भारतीय त्यौहार\nभारत कई त्यौहारों की भूमि है। हर क्षेत्र की अपनी सुंदरता है:\n- **दीवाली**: रोशनी का त्यौहार।\n- **होली**: रंगों का त्यौहार।\n- **पोंगल/बिहू/नवरात्रि**: प्रकृति और फसल का उत्सव।\nये त्यौहार सबको एक साथ लाते हैं!",
    gu: "### ભારતીય તહેવારો\nભારત અનેક તહેવારોની ભૂમિ છે. દરેક પ્રદેશની પોતાની સુંદરતા છે:\n- **દિવાળી**: રોશનીનો તહેવાર.\n- **હોળી**: રંગોનો તહેવાર.\n- **પોંગલ/બિહુ/નવરાત્રી**: પ્રકૃતિ અને લણણીની ઉજવણી.\nઆ તહેવારો સૌને સાથે લાવે છે!",
    mr: "### भारतीय सण\nभारत ही अनेक सणांची भूमी आहे. प्रत्येक प्रदेशाचे स्वतःचे सौंदर्य आहे:\n- **दिवाळी**: दिव्यांचा सण.\n- **होळी**: रंगांचा सण.\n- **पोंगल/बिहू/नवरात्री**: निसर्ग आणि पिकांचा उत्सव.\nहे सण सर्वांना एकत्र आणतात!",
    ta: "### இந்திய பண்டிகைகள்\nஇந்தியா பல பண்டிகைகளின் நிலம். ஒவ்வொரு பிராந்தியத்திற்கும் அதன் சொந்த அழகு உண்டு:\n- **தீபாவளி**: ஒளி திருவிழா.\n- **ஹோலி**: வண்ணங்களின் திருவிழா.\n- **பொங்கல்/பிஹு/நவராத்திரி**: இயற்கை மற்றும் அறுவடையை கொண்டாடுதல்.\nஇந்த பண்டிகைகள் அனைவரையும் ஒன்றிணைக்கின்றன!"
  }
};

export const getResponse = (input: string, lang: Exclude<Language, 'auto'>): string => {
  const query = input.toLowerCase();
  
  if (/hi|hello|hey|namaste|नमस्ते|નમસ્તે/.test(query)) return responses.intro[lang];
  if (/isro|space|moon|mars|rocket|चंद्र|मंगल|અંતરિક્ષ|விண்வெளி/.test(query)) return responses.isro[lang];
  if (/festival|culture|india|harvest|त्यौहार|सण|તહેવાર|பண்டிகை/.test(query)) return responses.culture_simple[lang];
  
  return responses.intro[lang];
};

export const getSuggestedQuestions = (lang: Language): string[] => {
  const code = lang === 'auto' ? 'en' : (lang as Exclude<Language, 'auto'>);
  const questions: Record<Exclude<Language, 'auto'>, string[]> = {
    en: ["Tell me about ISRO", "Indian Festivals", "How to use this?", "Fact about India"],
    hi: ["इसरो के बारे में बताएं", "भारतीय त्यौहार", "इसका उपयोग कैसे करें?", "भारत के बारे में तथ्य"],
    gu: ["ISRO વિશે જણાવો", "ભારતીય તહેવારો", "આનો ઉપયોગ કેવી રીતે કરવો?", "ભારત વિશે હકીકત"],
    mr: ["इस्रोबद्दल सांगा", "भारतीय सण", "हे कसे वापरायचे?", "भारताबद्दल तथ्य"],
    ta: ["ISRO பற்றிச் சொல்", "இந்திய பண்டிகைகள்", "இதை எப்படி பயன்படுத்துவது?", "இந்தியா பற்றிய உண்மை"]
  };
  return questions[code] || questions.en;
};
