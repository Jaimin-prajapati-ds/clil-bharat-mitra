/**
 * Bharat-Mitra NLP Engine V4 - Universal Regional Intelligence
 * General Purpose Academic & Practical AI
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
    subtitle: "Universal Regional Assistant",
    sidebarTitle: "Discovery Tools",
    sidebarResource1: "Language Learning",
    sidebarResource2: "General Knowledge",
    sidebarResource3: "Technical Support",
    placeholder: "How can I help you today?",
    clearChat: "Reset Session",
    typing: "Thinking...",
    intelligence: "English Intelligence",
    copy: "Copy text",
    summary: "Deep multi-lingual intelligence across Indian regional languages."
  },
  hi: {
    title: "भारत-मित्र एआई",
    subtitle: "सार्वभौमिक क्षेत्रीय सहायक",
    sidebarTitle: "खोज उपकरण",
    sidebarResource1: "भाषा सीखना",
    sidebarResource2: "सामान्य ज्ञान",
    sidebarResource3: "तकनीकी सहायता",
    placeholder: "मैं आज आपकी क्या मदद कर सकता हूँ?",
    clearChat: "सत्र रीसेट करें",
    typing: "सोच रहा है...",
    intelligence: "हिंदी बुद्धिमत्ता",
    copy: "टेक्स्ट कॉपी करें",
    summary: "भारतीय क्षेत्रीय भाषाओं में गहरा बहुभाषी ज्ञान।"
  },
  gu: {
    title: "ભારત-મિત્ર AI",
    subtitle: "સાર્વત્રિક પ્રાદેશિક સહાયક",
    sidebarTitle: "શોધ સાધનો",
    sidebarResource1: "ભાષા શિક્ષણ",
    sidebarResource2: "સામાન્ય જ્ઞાન",
    sidebarResource3: "તકનીકી સહાય",
    placeholder: "હું આજે તમારી કેવી રીતે મદદ કરી શકું?",
    clearChat: "સત્ર રીસેટ કરો",
    typing: "વિચારી રહ્યું છે...",
    intelligence: "ગુજરાતી બુદ્ધિમત્તા",
    copy: "ટેક્સ્ટ નકલ કરો",
    summary: "ભારતીય પ્રાદેશિક ભાષાઓમાં ઉંડું બહુભાષી જ્ઞાન."
  },
  mr: {
    title: "भारत-मित्र एआय",
    subtitle: "सार्वत्रिक प्रादेशिक सहाय्यक",
    sidebarTitle: "शोध साधने",
    sidebarResource1: "भाषा शिक्षण",
    sidebarResource2: "सामान्य ज्ञान",
    sidebarResource3: "तांत्रिक सहाय्य",
    placeholder: "मी आज तुम्हाला कशी मदत करू शकतो?",
    clearChat: "सत्र रीसेट करा",
    typing: "विचार करत आहे...",
    intelligence: "मराठी बुद्धिमत्ता",
    copy: "मजकूर कॉपी करा",
    summary: "भारतीय प्रादेशिक भाषांमधील सखोल बहुभाषिक ज्ञान."
  },
  ta: {
    title: "பாரத-மித்ரா AI",
    subtitle: "உலகளாவிய பிராந்திய உதவியாளர்",
    sidebarTitle: "கண்டுபிடிப்பு கருவிகள்",
    sidebarResource1: "மொழி கற்றல்",
    sidebarResource2: "பொது அறிவு",
    sidebarResource3: "தொழில்நுட்ப ஆதரவு",
    placeholder: "இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    clearChat: "அமர்வை மீட்டமை",
    typing: "யோசிக்கிறது...",
    intelligence: "தமிழ் நுண்ணறிவு",
    copy: "நகலெடு",
    summary: "இந்திய பிராந்திய மொழிகளில் ஆழமான பன்மொழி நுண்ணறிவு."
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
  greeting: {
    en: "### Hello! I am Bharat-Mitra V4\nI am your **Universal Regional AI**. I am designed to assist you with:\n- **Deep General Knowledge**\n- **Regional Language Translation**\n- **Educational Support**\n- **Daily Tasks & Guidance**\n\nWhat would you like to explore today?",
    hi: "### नमस्ते! मैं भारत-मित्र V4 हूँ\nमैं आपका **सार्वभौमिक क्षेत्रीय एआई** हूँ। मैं आपकी सहायता कर सकता हूँ:\n- **गहन सामान्य ज्ञान**\n- **क्षेत्रीय भाषा अनुवाद**\n- **शैक्षणिक सहायता**\n- **दैनिक कार्य और मार्गदर्शन**\n\nआज आप क्या जानना चाहेंगे?",
    gu: "### નમસ્તે! હું ભારત-મિત્ર V4 છું\nહું તમારો **સાર્વત્રિક પ્રાદેશિક AI** છું. હું તમને મદદ કરી શકું છું:\n- **ઊંડું સામાન્ય જ્ઞાન**\n- **પ્રાદેશિક ભાષા અનુવાદ**\n- **શૈક્ષણિક સહાય**\n- **દૈનિક કાર્યો અને માર્ગદર્શન**\n\nઆજે તમે શું જાણવા માંગો છો?",
    mr: "### नमस्कार! मी भारत-मित्र V4 आहे\nमी तुमचा **सार्वत्रिक प्रादेशिक एआय** आहे. मी तुम्हाला खालील गोष्टींमध्ये मदत करू शकतो:\n- **सखोल सामान्य ज्ञान**\n- **प्रादेशिक भाषा भाषांतर**\n- **शैक्षणिक सहाय्य**\n- **दैनंदિન कार्ये आणि मार्गदर्शन**\n\nआज तुम्हाला काय जाणून घ्यायला आवडेल?",
    ta: "### வணக்கம்! நான் பாரத-மித்ரா V4\nநான் உங்கள் **உலகளாவிய பிராந்திய AI**. நான் உங்களுக்கு உதவ முடியும்:\n- **ஆழமான பொது அறிவு**\n- **பிராந்திய மொழி மொழிபெயர்ப்பு**\n- **கல்வி ஆதரவு**\n- **தினசரி பணிகள் மற்றும் வழிகாட்டுதல்**\n\nஇன்று நீங்கள் எதைப் பற்றி அறிய விரும்புகிறீர்கள்?"
  },
  knowledge: {
    en: "### General Knowledge: Digital India\n**Digital India** is a flagship campaign launched by the Government of India to ensure that the Government's services are made available to citizens electronically by improved online infrastructure and by increasing Internet connectivity.\n\n- **Vision:** Digital Infrastructure as a Core Utility to Every Citizen\n- **Pillar:** e-Governance - Reforming Government through Technology",
    hi: "### सामान्य ज्ञान: डिजिटल इंडिया\n**डिजिटल इंडिया** भारत सरकार द्वारा चलाया गया एक प्रमुख अभियान है जिसका उद्देश्य यह सुनिश्चित करना है कि सरकारी सेवाएं नागरिकों को उन्नत ऑनलाइन बुनियादी ढांचे और इंटरनेट कनेक्टिविटी के माध्यम से इलेक्ट्रॉनिक रूप से उपलब्ध कराई जाएं।\n\n- **दृष्टिकोण:** प्रत्येक नागरिक के लिए एक मुख्य उपयोगिता के रूप में डिजिटल बुनियादी ढांचा\n- **स्तंभ:** ई-गवर्नेंस - प्रौद्योगिकी के माध्यम से सरकार में सुधार",
    gu: "### સામાન્ય જ્ઞાન: ડિજિટલ ઇન્ડિયા\n**ડિજિટલ ઇન્ડિયા** એ ભારત સરકાર દ્વારા શરૂ કરવામાં આવેલ એક મુખ્ય અભિયાન છે જેનો ઉદ્દેશ્ય એ સુનિશ્ચિત કરવાનો છે કે સરકારી સેવાઓ સુધારેલ ઓનલાઇન ઇન્ફ્રાસ્ટ્રક્ચર અને ઇન્ટરનેટ કનેક્ટિવિટી દ્વારા નાગરિકોને ઇલેક્ટ્રોનિકલી ઉપલબ્ધ કરાવવામાં આવે.\n\n- **વિઝન:** દરેક નાગરિક માટે મુખ્ય ઉપયોગિતા તરીકે ડિજિટલ ઇન્ફ્રાસ્ટ્રક્ચર\n- **સ્તંભ:** ઇ-ગવર્નન્સ - ટેકનોલોજી દ્વારા શાસનમાં સુધારો",
    mr: "### सामान्य ज्ञान: डिजिटल इंडिया\n**डिजिटल इंडिया** ही भारत सरकारने सुरू केलेली एक प्रमुख मोहीम आहे ज्याचा उद्देश सरकारी सेवा सुधारित ऑनलाइन पायाभूत सुविधा आणि इंटरनेट कनेक्टिव्हिटीद्वारे नागरिकांना इलेक्ट्रॉनिक पद्धतीने उपलब्ध करून देणे हा आहे.\n\n- **व्हिजन:** प्रत्येक नागरिकासाठी मुख्य उपयुक्तता म्हणून डिजिटल पायाभूत सुविधा\n- **स्तंभ:** ई-गव्हर्नन्स - तंत्रज्ञानाद्वारे सरकारमध्ये सुधारणा",
    ta: "### பொது அறிவு: டிஜிட்டல் இந்தியா\n**டிஜிட்டல் இந்தியா** என்பது இந்திய அரசாங்கத்தால் தொடங்கப்பட்ட ஒரு முக்கிய பிரச்சாரமாகும், இது மேம்பட்ட ஆன்லைன் உள்கட்டமைப்பு மற்றும் இணைய இணைப்பை அதிகரிப்பதன் மூலம் அரசாங்கத்தின் சேவைகள் குடிமக்களுக்கு மின்னணு முறையில் கிடைப்பதை உறுதி செய்கிறது.\n\n- **நோக்கம்:** ஒவ்வொரு குடிமகனுக்கும் ஒரு அடிப்படை வசதியாக டிஜிட்டல் உள்கட்டமைப்பு\n- **தூண்:** மின்-ஆளுகை - தொழில்நுட்பத்தின் மூலம் அரசாங்கத்தை சீர்திருத்துதல்"
  },
  science_general: {
    en: "### Scientific Insight: Gravity\n**Gravity** is the force by which a planet or other body draws objects toward its center. It keeps all of the planets in orbit around the sun.\n\n> \"What goes up must come down.\"\n\n**Constant:** `g ≈ 9.8 m/s²` on Earth.",
    hi: "### वैज्ञानिक अंतर्दृष्टि: गुरुत्वाकर्षण (Gravity)\n**गुरुत्वाकर्षण** वह बल है जिसके द्वारा कोई ग्रह या अन्य पिंड वस्तुओं को अपने केंद्र की ओर खींचता है। यह सूर्य के चारों ओर सभी ग्रहों को कक्षा में रखता है।\n\n> \"जो ऊपर जाता है, वह नीचे जरूर आता है।\"\n\n**स्थिरांक:** पृथ्वी पर `g ≈ 9.8 m/s²`।",
    gu: "### વૈજ્ઞાનિક સમજ: ગુરુત્વાકર્ષણ (Gravity)\n**ગુરુત્વાકર્ષણ** એ બળ છે જેના દ્વારા ગ્રહ અથવા અન્ય પિંડ વસ્તુઓને તેના કેન્દ્ર તરફ ખેંચે છે. તે સૂર્યની આસપાસના તમામ ગ્રહોને ભ્રમણકક્ષામાં રાખે છે.\n\n> \"જે ઉપર જાય છે તેની નીચે આવવું અનિવાર્ય છે.\"\n\n**અચળાંક:** પૃથ્વી પર `g ≈ 9.8 m/s²`.",
    mr: "### वैज्ञानिक अंतर्दृष्टी: गुरुत्वाकर्षण (Gravity)\n**गुरुत्वाकर्षण** हे असे बल आहे ज्याद्वारे ग्रह किंवा इतर पिंड वस्तूंना त्यांच्या केंद्राकडे खेचतात. हे सूर्याभोवतीच्या सर्व ग्रहांना कक्षेत ठेवते.\n\n> \"जे वर जाते ते खाली आलेच पाहिजे.\"\n\n**स्थिरांक:** पृथ्वीवर `g ≈ 9.8 m/s²`.",
    ta: "### அறிவியல் நுண்ணறிவு: ஈர்ப்பு விசை (Gravity)\n**ஈர்ப்பு விசை** என்பது ஒரு கோள் அல்லது பிற உடல் பொருட்களை அதன் மையத்தை நோக்கி இழுக்கும் விசையாகும். இது சூரியனைச் சுற்றியுள்ள அனைத்து கோள்களையும் சுற்றுப்பாதையில் வைத்திருக்கிறது.\n\n> \"மேலே செல்வது கீழே வர வேண்டும்.\"\n\n**மாறிலி:** பூமியில் `g ≈ 9.8 m/s²`."
  },
  learning: {
    en: "### Language Learning Tip\nTo master a regional language:\n1. **Listen** to local news or music.\n2. **Speak** simple phrases daily.\n3. **Read** news headlines in native scripts.\n4. **Write** basic diary entries.\n\nI can help you translate any sentence if you ask!",
    hi: "### भाषा सीखने की टिप\nएक क्षेत्रीय भाषा में महारत हासिल करने के लिए:\n1. स्थानीय समाचार या संगीत **सुनें**।\n2. दैनिक रूप से सरल वाक्यांश **बोलें**।\n3. मूल लिपियों में समाचार सुर्खियां **पढ़ें**।\n4. बुनियादी डायरी प्रविष्टियाँ **लिखें**।\n\nयदि आप पूछें तो मैं किसी भी वाक्य का अनुवाद करने में आपकी मदद कर सकता हूँ!",
    gu: "### ભાષા શીખવાની ટિપ્સ\nપ્રાદેશિક ભાષામાં મહારત મેળવવા માટે:\n1. સ્થાનિક સમાચાર કે સંગીત **સાંભળો**.\n2. દરરોજ સરળ વાક્યો **બોલો**.\n3. મૂળ લિપિમાં સમાચારની હેડલાઇન્સ **વાંચો**.\n4. મૂળભૂત ડાયરી એન્ટ્રીઓ **લખો**.\n\nજો તમે પૂછશો તો હું કોઈપણ વાક્યનું ભાષાંતર કરવામાં તમારી મદદ કરી શકું છું!",
    mr: "### भाषा शिकण्याची टीप\nप्रादेशिक भाषेवर प्रभुत्व मिळवण्यासाठी:\n1. स्थानिक बातम्या किंवा संगीत **ऐका**.\n2. दररोज सोपी वाक्ये **बोला**.\n3. मूळ लिपीतील बातम्यांच्या ठळक बातम्या **वाचा**.\n4. मूलभूत डायरी नोंदी **लिहा**.\n\nतुम्ही विचारल्यास मी तुम्हाला कोणत्याही वाक्याचे भाषांतर करण्यास मदत करू शकतो!",
    ta: "### மொழி கற்றல் குறிப்பு\nஒரு பிராந்திய மொழியில் தேர்ச்சி பெற:\n1. உள்ளூர் செய்திகள் அல்லது இசையைக் **கேளுங்கள்**.\n2. தினமும் எளிய வாக்கியங்களைப் **பேசுங்கள்**.\n3. சொந்த எழுத்துக்களில் செய்தித் தலைப்புகளைப் **படியுங்கள்**.\n4. அடிப்படை நாட்குறிப்பு பதிவுகளை **எழுதுங்கள்**.\n\nநீங்கள் கேட்டால் எந்த வாக்கியத்தையும் மொழிபெயர்க்க நான் உங்களுக்கு உதவ முடியும்!"
  }
};

export const getResponse = (input: string, lang: Exclude<Language, 'auto'>): string => {
  const query = input.toLowerCase();
  
  if (/hi|hello|hey|namaste|नमस्ते|નમસ્તે/.test(query)) return responses.greeting[lang];
  if (/knowledge|fact|india|देश|भारत|ભારત|இந்தியா/.test(query)) return responses.knowledge[lang];
  if (/science|gravity|vigyan|विज्ञान|વિજ્ઞાન|அறிவியல்|ஈர்ப்பு/.test(query)) return responses.science_general[lang];
  if (/learn|language|hindi|gujarati|tamil|marathi|शिक्षण|શીખવું|கற்றல்/.test(query)) return responses.learning[lang];
  
  return responses.greeting[lang];
};

export const getSuggestedQuestions = (lang: Language): string[] => {
  const code = lang === 'auto' ? 'en' : (lang as Exclude<Language, 'auto'>);
  const questions: Record<Exclude<Language, 'auto'>, string[]> = {
    en: ["Tell me a fact", "Explain Gravity", "Language Tips", "Translation Help"],
    hi: ["तथ्य बताएं", "गुरुत्वाकर्षण समझाएं", "भाषा टिप्स", "अनुवाद सहायता"],
    gu: ["હકીકત જણાવો", "ગુરુત્વાકર્ષણ સમજાવો", "ભાષા ટિપ્સ", "અનુવાદ સહાય"],
    mr: ["तथ्य सांगा", "गुरुत्वाकर्षण समजावून सांगा", "भाषा टिप्स", "भाषांतर मदत"],
    ta: ["ஒரு உண்மையைச் சொல்", "ஈர்ப்பு விசையை விளக்கு", "மொழி குறிப்புகள்", "மொழிபெயர்ப்பு உதவி"]
  };
  return questions[code] || questions.en;
};
