/**
 * Bharat-Mitra NLP Engine V2 - Professional Academic Intelligence
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
    en: "### Welcome to Bharat-Mitra Professional\nI am your **Academic Assistant** for CLIL. I can provide detailed guidance on:\n- **Science** (Biology, Physics)\n- **Mathematics** (Logic, Algebra)\n- **History & Geography**\n\nHow may I assist your research today?",
    hi: "### भारत-मित्र प्रोफेशनल में आपका स्वागत है\nमैं CLIL के लिए आपका **शैक्षणिक सहायक** हूँ। मैं निम्नलिखित पर विस्तृत मार्गदर्शन दे सकता हूँ:\n- **विज्ञान**\n- **गणित**\n- **इतिहास और भूगोल**\n\nआज मैं आपकी कैसे मदद कर सकता हूँ?",
    gu: "### ભારત-મિત્ર પ્રોફેશ્નલમાં આપનું સ્વાગત છે\nહું CLIL માટે તમારો **શૈક્ષણિક સહાયક** છું. હું નીચેના વિષયો પર વિગતવાર માર્ગદર્શન આપી શકું છું:\n- **વિજ્ઞાન**\n- **ગણિત**\n- **ઈતિહાસ અને ભૂગોળ**\n\nઆજે હું તમારી કઈ રીતે મદદ કરી શકું?",
    mr: "### भारत-मित्र प्रोफेशनल मध्ये आपले स्वागत आहे\nमी CLIL साठी तुमचा **शैक्षणिक सहाय्यक** आहे. मी खालील विषयांवर तपशीलवार मार्गदर्शन देऊ शकतो:\n- **विज्ञान**\n- **गणित**\n- **इतिहास आणि भूगोल**\n\nआज मी तुम्हाला कशी मदत करू शकतो?",
    ta: "### பாரத-மித்ரா புரொபஷனலுக்கு உங்களை வரவேற்கிறோம்\nநான் CLIL கல்வி உதவியாளர். பின்வரும் பாடங்களில் நான் உங்களுக்கு உதவ முடியும்:\n- **அறிவியல்**\n- **கணிதம்**\n- **வரலாறு மற்றும் புவியியல்**\n\nஇன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?"
  },
  science: {
    en: "### Scientific Analysis: Photosynthesis\nIn the context of **CLIL Biology**, Photosynthesis is defined as:\n\n> The process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.\n\n**Chemical Formula:**\n`6CO2 + 6H2O + light energy -> C6H12O6 + 6O2`",
    hi: "### वैज्ञानिक विश्लेषण: प्रकाश संश्लेषण (Photosynthesis)\n**CLIL जीवविज्ञान** के संदर्भ में:\n\n> वह प्रक्रिया जिसके द्वारा हरे पौधे सूर्य के प्रकाश का उपयोग करके कार्बन डाइऑक्साइड और पानी से पोषक तत्वों का संश्लेषण करते हैं।\n\n**रासायनिक सूत्र:**\n`6CO2 + 6H2O + प्रकाश ऊर्जा -> C6H12O6 + 6O2`",
    gu: "### વૈજ્ઞાનિક વિશ્લેષણ: પ્રકાશ સંશ્લેષણ (Photosynthesis)\n**CLIL જીવવિજ્ઞાન** ના સંદર્ભમાં:\n\n> તે પ્રક્રિયા જેના દ્વારા લીલી વનસ્પતિઓ સૂર્યપ્રકાશનો ઉપયોગ કરીને કાર્બન ડાયોક્સાઇડ અને પાણીમાંથી પોષક તત્વો બનાવે છે.\n\n**રાસાયણિક સૂત્ર:**\n`6CO2 + 6H2O + પ્રકાશ ઉર્જા -> C6H12O6 + 6O2`",
    mr: "### वैज्ञानिक विश्लेषण: प्रकाश संश्लेषण (Photosynthesis)\n**CLIL जीवशास्त्र** संदर्भात:\n\n> ही अशी प्रक्रिया आहे ज्याद्वारे हिरव्या वनस्पती सूर्यप्रकाशाचा वापर करून कार्बन डायऑक्साइड आणि पाण्यापासून पोषक तत्वे तयार करतात.\n\n**रासायनिक सूत्र:**\n`6CO2 + 6H2O + प्रकाश ऊर्जा -> C6H12O6 + 6O2`",
    ta: "### அறிவியல் பகுப்பாய்வு: ஒளிச்சேர்க்கை (Photosynthesis)\n**CLIL உயிரியல்** சூழலில்:\n\n> பச்சைத் தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி கார்பன் டை ஆக்சைடு மற்றும் நீரிலிருந்து ஊட்டச்சத்துக்களைத் தயாரிக்கும் செயல்முறை இதுவாகும்.\n\n**வேதியியல் சூத்திரம்:**\n`6CO2 + 6H2O + ஒளி ஆற்றல் -> C6H12O6 + 6O2`"
  },
  math: {
    en: "### Mathematical Foundation: Geometry\nA **Triangle** is a fundamental polygon in geometry.\n\n- **Properties:**\n  - Sum of interior angles = `180°`\n  - Types: *Equilateral, Isosceles, Scalene*\n\n**Pythagoras Theorem:**\n`a² + b² = c²` (Used for right-angled triangles)",
    hi: "### गणितीय आधार: ज्यामिति (Geometry)\n**त्रिभुज** ज्यामिति का एक मौलिक हिस्सा है।\n\n- **विशेषताएं:**\n  - आंतरिक कोणों का योग = `180°`\n  - प्रकार: *समबाहु, समद्विबाहु, विषमबाहु*\n\n**पाइथागोरस प्रमेय:**\n`a² + b² = c²` (समकोण त्रिभुज के लिए)",
    gu: "### ગાણિતિક આધાર: ભૂમિતિ (Geometry)\n**ત્રિકોણ** એ ભૂમિતિનો એક મૂળભૂત ભાગ છે.\n\n- **લાક્ષણિકતાઓ:**\n  - આંતરિક ખૂણાઓનો સરવાળો = `180°`\n  - પ્રકાર: *સમબાજુ, સમદ્રીબાજુ, વિષમબાજુ*\n\n**પાયથાગોરસ પ્રમેય:**\n`a² + b² = c²` (કાટકોણ ત્રિકોણ માટે)",
    mr: "### गणितीय आधार: भूमिती (Geometry)\n**त्रिकोण** हा भूमितीचा एक मूलभूत भाग आहे.\n\n- **वैशिष्ट्ये:**\n  - अंतर्ग्त कोनांची बेरीज = `180°`\n  - प्रकार: *समभुज, समद्विभुज, विषमभुज*\n\n**पायथागोरस प्रमेय:**\n`a² + b² = c²` (काटकोण त्रिकोणासाठी)",
    ta: "### கணித அடிப்படை: வடிவியல் (Geometry)\n**முக்கோணம்** என்பது வடிவியலில் ஒரு அடிப்படை வடிவம்.\n\n- **பண்புகள்:**\n  - உட்புறக் கோணங்களின் கூடுதல் = `180°`\n  - வகைகள்: *சமபக்க, இருசமபக்க, அசமபக்க*\n\n**பித்தகோரஸ் தேற்றம்:**\n`a² + b² = c²` (செங்கோண முக்கோணங்களுக்கு)"
  },
  clil_deep: {
    en: "### CLIL Methodology Overview\n**Content and Language Integrated Learning** (CLIL) involves:\n\n1. **Content**: Progress in specific subjects.\n2. **Communication**: Using language to learn.\n3. **Cognition**: Developing thinking skills.\n4. **Culture**: Exposure to alternative perspectives.",
    hi: "### CLIL कार्यप्रणाली विवरण\n**विषय और भाषा एकीकृत शिक्षण** (CLIL) में शामिल हैं:\n\n1. **सामग्री (Content)**: विशिष्ट विषयों में प्रगति।\n2. **संचार (Communication)**: सीखने के लिए भाषा का उपयोग।\n3. **संज्ञान (Cognition)**: सोचने की क्षमता का विकास।\n4. **संस्कृति (Culture)**: वैकल्पिक दृष्टिकोणों का अनुभव।",
    gu: "### CLIL કાર્યપદ્ધતિ વિવરણ\n**વિષય અને ભાષા સંકલિત શિક્ષણ** (CLIL) માં સમાવેશ થાય છે:\n\n1. **સામગ્રી (Content)**: વિશિષ્ટ વિષયોમાં પ્રગતિ.\n2. **સંચાર (Communication)**: શીખવા માટે ભાષાનો ઉપયોગ.\n3. **સંજ્ઞાન (Cognition)**: વિચારવાની ક્ષમતાનો વિકાસ.\n4. **સંસ્કૃતિ (Culture)**: વૈકલ્પિક દ્રષ્ટિકોણનો અનુભવ.",
    mr: "### CLIL कार्यपद्धती विवरन\n**विषय आणि भाषा एकात्मिक शिक्षण** (CLIL) मध्ये समाविष्ट आहे:\n\n1. **सामग्री (Content)**: विशिष्ट विषयांमध्ये प्रगती.\n2. **संप्रेषण (Communication)**: शिकण्यासाठी भाषेचा वापर.\n3. **संज्ञान (Cognition)**: विचार करण्याच्या क्षमतेचा विकास.\n4. **संस्कृती (Culture)**: पर्यायी दृष्टिकोनांचा अनुभव.",
    ta: "### CLIL முறையியல் கண்ணோட்டம்\n**உள்ளடக்கம் மற்றும் மொழி ஒருங்கிணைந்த கற்றல்** (CLIL) பின்வருவனவற்றை உள்ளடக்கியது:\n\n1. **உள்ளடக்கம்**: குறிப்பிட்ட பாடங்களில் முன்னேற்றம்.\n2. **தொடர்பு**: கற்க மொழியைப் பயன்படுத்துதல்.\n3. **அறிவுத்துறை**: சிந்தனைத் திறனை மேம்படுத்துதல்.\n4. **கலாச்சாரம்**: மாற்றுப் பார்வைகளை அறிதல்."
  }
};

export const getResponse = (input: string, lang: Exclude<Language, 'auto'>): string => {
  const query = input.toLowerCase();
  
  if (/hi|hello|hey|namaste|नमस्ते|નમસ્તે/.test(query)) return responses.greeting[lang];
  if (/clil/.test(query)) return responses.clil_deep[lang];
  if (/science|vigyan|biology|विज्ञान|વિજ્ઞાન/.test(query)) return responses.science[lang];
  if (/math|geometry|ganit|गणित|ગણિત/.test(query)) return responses.math[lang];
  
  return responses.greeting[lang]; // Professional fallback to introduction
};

export const getSuggestedQuestions = (lang: Language): string[] => {
  const code = lang === 'auto' ? 'en' : (lang as Exclude<Language, 'auto'>);
  const questions: Record<Exclude<Language, 'auto'>, string[]> = {
    en: ["What is CLIL?", "Biology Analysis", "Geometry Base", "Academic Support"],
    hi: ["CLIL क्या है?", "जीव विज्ञान विश्लेषण", "ज्यामिति आधार", "शैक्षणिक सहायता"],
    gu: ["CLIL શું છે?", "જીવ વિજ્ઞાન વિશ્લેષણ", "ભૂમિતિ આધાર", "શૈક્ષણિક સહાય"],
    mr: ["CLIL काय आहे?", "जीवशास्त्र विश्लेषण", "भूमिती आधार", "शैक्षणिक सहाय्य"],
    ta: ["CLIL என்றால் என்ன?", "உயிரியல் பகுப்பாய்வு", "வடிவியல் அடிப்படை", "கல்வி உதவி"]
  };
  return questions[code] || questions.en;
};
