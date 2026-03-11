/**
 * Bharat-Mitra - Ultimate Knowledge Engine (BCA Standard)
 * Scoring-based NLP Logic | Deep Regional Heritage | Multi-lingual Accuracy
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
    subtitle: "Your Deep Regional Heritage Guide",
    sidebarTitle: "Heritage Vault",
    sidebarResource1: "Ancient Wisdom",
    sidebarResource2: "Modern Science",
    sidebarResource3: "Literary Gems",
    placeholder: "Ask about history, science, or literature...",
    clearChat: "New Session",
    typing: "Mitra is searching the archives...",
    intelligence: "Accuracy Mode",
    copy: "Copy text",
    summary: "High-accuracy intelligence engine for regional roots."
  },
  hi: {
    title: "भारत-मित्र",
    subtitle: "आपका गहरा क्षेत्रीय विरासत मार्गदर्शक",
    sidebarTitle: "विरासत खजाना",
    sidebarResource1: "प्राचीन ज्ञान",
    sidebarResource2: "आधुनिक विज्ञान",
    sidebarResource3: "साहित्यिक रत्न",
    placeholder: "इतिहास, विज्ञान या साहित्य के बारे में पूछें...",
    clearChat: "नया सत्र",
    typing: "मित्र अभिलेखागार खोज रहा है...",
    intelligence: "सटीकता मोड",
    copy: "कॉपी करें",
    summary: "क्षेत्रीय जड़ों के लिए उच्च-सटीकता इंटेलिजेंस इंजन।"
  },
  gu: {
    title: "ભારત-મિત્ર",
    subtitle: "તમારા ઊંડા પ્રાદેશિક વારસા માર્ગદર્શક",
    sidebarTitle: "વારસાની તિજોરી",
    sidebarResource1: "પ્રાચીન જ્ઞાન",
    sidebarResource2: "આધુનિક વિજ્ઞાન",
    sidebarResource3: "સાહિત્યિક રત્નો",
    placeholder: "ઇતિહાસ, વિજ્ઞાન અથવા સાહિત્ય વિશે પૂછો...",
    clearChat: "નવું સત્ર",
    typing: "મિત્ર આર્કાઇવ્સ શોધી રહ્યો છે...",
    intelligence: "ચોકસાઈ મોડ",
    copy: "નકલ કરો",
    summary: "પ્રાદેશિક મૂળ માટે ઉચ્ચ-ચોકસાઈ ઇન્ટેલિજન્સ એન્જિન."
  },
  mr: {
    title: "भारत-मित्र",
    subtitle: "तुमचा सखोल प्राદેશિક वारसा मार्गदर्शक",
    sidebarTitle: "वारसाvault",
    sidebarResource1: "प्राचीन ज्ञान",
    sidebarResource2: "आधुनिक विज्ञान",
    sidebarResource3: "साहित्यिक रत्ने",
    placeholder: "इतिहास, विज्ञान किंवा साहित्याबद्दल विचारा...",
    clearChat: "नवीन सत्र",
    typing: "मित्र पुरातत्व शोधत आहे...",
    intelligence: "अचूकता मोड",
    copy: "कॉपी करा",
    summary: "प्रादेशिक मुळांसाठी उच्च-अचूकता इंटेलिजेंस इंजिन."
  },
  ta: {
    title: "பாரத-மித்ரா",
    subtitle: "உங்கள் ஆழ்ந்த பிராந்திய பாரம்பரிய வழிகாட்டி",
    sidebarTitle: "பாரம்பரிய பெட்டகம்",
    sidebarResource1: "பண்டைய அறிவு",
    sidebarResource2: "நவீன அறிவியல்",
    sidebarResource3: "இலக்கிய ரத்தினங்கள்",
    placeholder: "வரலாறு, அறிவியல் அல்லது இலக்கியம் பற்றி கேளுங்கள்...",
    clearChat: "புதிய அமர்வு",
    typing: "மித்ரா ஆவணங்களைத் தேடுகிறது...",
    intelligence: "துல்லிய முறை",
    copy: "நகலெடு",
    summary: "பிராந்திய வேர்களுக்கான உயர் துல்லிய நுண்ணறிவு இயந்திரம்."
  }
};

export const detectLanguage = (text: string): Exclude<Language, 'auto'> => {
  const hindiRegex = /[\u0900-\u097F]/;
  const gujaratiRegex = /[\u0a80-\u0aff]/;
  const tamilRegex = /[\u0b80-\u0bff]/;
  if (gujaratiRegex.test(text)) return 'gu';
  if (tamilRegex.test(text)) return 'ta';
  if (hindiRegex.test(text)) {
    const marathiKeywords = ['आहे', 'नाही', 'काय', 'कुठे', 'कसे', 'आणि', 'पण', 'मરાઠી'];
    if (marathiKeywords.some(kw => text.includes(kw))) return 'mr';
    return 'hi';
  }
  return 'en';
};

interface Intent {
  keywords: string[];
  responses: Record<Exclude<Language, 'auto'>, string>;
}

// MASSIVE DEEP INTELLIGENCE DATASET (Accurate & Proper)
const intents: Intent[] = [
  {
    keywords: ["hi", "hello", "hey", "नमस्ते", "नमस्कार", "નમસ્તે", "வணக்கம்", "नमस्कार"],
    responses: {
      en: "### Namaste! I am Bharat-Mitra\nI am your companion in discovering India's unthinkable heritage. Ask me about **Ancient Science**, **Literary Legends**, or **Regional Wonders**. I work with high-accuracy weighted logic to guide you correctly.",
      hi: "### नमस्ते! मैं भारत-मित्र हूँ\nमैं भारत की अकल्पनीय विरासत की खोज में आपका साथी हूँ। मुझसे **प्राचीन विज्ञान**, **साहित्यिक दिग्गजों**, या **क्षेत्रीय चमत्कारों** के बारे में पूछें। मैं आपको सही मार्गदर्शन करने के लिए उच्च-सटीकता तर्क के साथ काम करता हूँ।",
      gu: "### નમસ્તે! હું ભારત-મિત્ર છું\nહું ભારતનો અકલ્પનીય વારસો શોધવામાં તમારો સાથી છું. મને **પ્રાચીન વિજ્ઞાન**, **સાહિત્યિક દિગ્ગજો**, અથવા **પ્રાદેશિક અજાયબીઓ** વિશે પૂછો. હું તમને સાચું માર્ગદર્શન આપવા માટે ઉચ્ચ-ચોકસાઈવાળા તર્ક સાથે કામ કરું છું.",
      mr: "### नमस्कार! मी भारत-मित्र आहे\nमी भारताचा अकल्पनीय वारसा शोधण्यात तुमचा सोबती आहे. मला **प्राचीन विज्ञान**, **साहित्यिक दिग्गज**, किंवा **प्रादेशિક चमत्कार** याबद्दल विचारा. मी तुम्हाला योग्य मार्गदर्शन करण्यासाठी उच्च-अचूकतेच्या तर्कासह काम करतो.",
      ta: "### வணக்கம்! நான் பாரத-மித்ரா\nஇந்தியாவின் நம்பமுடியாத பாரம்பரியத்தைக் கண்டடைவதில் நான் உங்கள் துணை. **பண்டைய அறிவியல்**, **இலக்கிய ஜாம்பவான்கள்** அல்லது **பிராந்திய அதிசயங்கள்** பற்றி என்னிடம் கேளுங்கள். உங்களுக்குச் சரியாக வழிகாட்ட நான் உயர் துல்லியமான தர்க்கத்துடன் செயல்படுகிறேன்."
    }
  },
  {
    keywords: ["zero", "shunya", "aryabhata", "math", "शून्य", "સૂન્ય", "பூஜ்யம்", "गणित", "ગણિત", "கணிதம்"],
    responses: {
      en: "### Invention of Zero (Shunya)\nAncient India gave the world the digit **0**. \n- **Fact**: Aryabhata (5th Century) used it as a placeholder and number.\n- **Impact**: Without Zero, the binary system (0 and 1) used in modern computers would not exist.\n- **Science**: It enabled complex calculus and astronomy in ancient India.",
      hi: "### शून्य (शून्य) का आविष्कार\nप्राचीन भारत ने दुनिया को अंक **0** दिया।\n- **तथ्य**: आर्यभट्ट (5वीं शताब्दी) ने इसे एक स्थानधारक और संख्या के रूप में उपयोग किया।\n- **प्रभाव**: शून्य के बिना, आधुनिक कंप्यूटरों में उपयोग की जाने वाली बाइनरी प्रणाली (0 और 1) मौजूद नहीं होती।\n- **विज्ञान**: इसने प्राचीन भारत में जटिल कैलकुलस और खगोल विज्ञान को सक्षम बनाया।",
      gu: "### શૂન્ય (શૂન્ય) ની શોધ\nપ્રાચીન ભારતે વિશ્વને અંક **0** આપ્યો.\n- **હકીકત**: આર્યભટ્ટે (5મી સદી) તેનો સ્થાનધારક અને સંખ્યા તરીકે ઉપયોગ કર્યો હતો.\n- **અસર**: શૂન્ય વગર, આધુનિક કોમ્પ્યુટરમાં વપરાતી બાઈનરી સિસ્ટમ (0 અને 1) અસ્તિત્વમાં ન હોત.\n- **વિજ્ઞાન**: તેણે પ્રાચીન ભારતમાં જટિલ કેલ્ક્યુલસ અને ખગોળશાસ્ત્રને સક્ષમ બનાવ્યું.",
      mr: "### शून्याचा (शून्य) शोध\nप्राचीन भारताने जगाला **0** हा अंक दिला.\n- **तथ्य**: आर्यभट्ट (5 वे शतक) यांनी याचा वापर स्थानधारक आणि संख्या म्हणून केला.\n- **प्रभाव**: शून्याशिवाय, आधुनिक संगणकांमध्ये वापरली जाणारी बायनरी प्रणाली (0 आणि 1) अस्तित्वात नसती.\n- **विज्ञान**: यामुळे प्राचीन भारतात जटिल कलन (calculus) आणि खगोलशास्त्र शक्य झाले.",
      ta: "### பூஜ்யத்தின் (சூன்யா) கண்டுபிடிப்பு\nபண்டைய இந்தியா உலகுக்கு **0** என்ற இலக்கத்தை வழங்கியது.\n- **உண்மை**: ஆர்யபட்டர் (கி.பி. 5 ஆம் நூற்றாண்டு) இதை ஒரு இடம்பிடிப்பாளராகவும் எண்ணாகவும் பயன்படுத்தினார்.\n- **தாக்கம்**: பூஜ்யம் இல்லாமல், நவீன கணினிகளில் பயன்படுத்தப்படும் பைனரி முறை (0 மற்றும் 1) இருந்திருக்காது.\n- **அறிவியல்**: இது பண்டைய இந்தியாவில் சிக்கலான கால்குலஸ் மற்றும் வானியலை செயல்படுத்தியது."
    }
  },
  {
    keywords: ["ayurveda", "medicine", "health", "sushruta", "surgery", "आयुर्वेद", "આયુર્વેદ", "ஆயுர்வேதம்", "स्वास्थ्य", "તબિયત"],
    responses: {
      en: "### Ayurveda & Ancient Surgery\nIndia is the birthplace of **Ayurveda** and **Plastic Surgery**.\n- **Sushruta**: Known as the Father of Surgery (600 BC). He detailed over 300 surgeries and 120 tools.\n- **Philosophy**: Ayurveda focuses on balance between mind, body, and spirit using natural elements.",
      hi: "### आयुर्वेद और प्राचीन सर्जरी\nभारत **आयुर्वेद** और **प्लास्टिक सर्जरी** की जन्मस्थली है।\n- **सुश्रुत**: सर्जरी के जनक (600 ईसा पूर्व) के रूप में जाने जाते हैं। उन्होंने 300 से अधिक सर्जरी और 120 उपकरणों का विवरण दिया।\n- **दर्शन**: आयुर्वेद प्राकृतिक तत्वों का उपयोग करके मन, शरीर और आत्मा के बीच संतुलन पर ध्यान केंद्रित करता है।",
      gu: "### આયુર્વેદ અને પ્રાચીન સર્જરી\nભારત **આયુર્વેદ** અને **પ્લાસ્ટિક સર્જરી**નું જન્મસ્થળ છે.\n- **સુશ્રુત**: સર્જરીના પિતા (600 BC) તરીકે ઓળખાય છે. તેમણે 300 થી વધુ સર્જરી અને 120 સાધનોની વિગતો આપી હતી.\n- **તત્વજ્ઞાન**: આયુર્વેદ કુદરતી તત્વોનો ઉપયોગ કરીને મન, શરીર અને આત્મા વચ્ચેના સંતુલન પર ધ્યાન કેન્દ્રિત કરે છે.",
      mr: "### आयुर्वेद आणि प्राचीन शस्त्रक्रिया\nभारत ही **आयुर्वेद** आणि **प्लास्टिक सर्जरी**ची जन्मभूमी आहे.\n- **सुश्रुत**: शस्त्रक्रियेचे जनक (इ.स.पू. ६००) म्हणून ओळखले जातात. त्यांनी ३०० हून अधिक शस्त्रक्रिया आणि १२० साधनांचे वर्णन केले आहे.\n- **तत्त्वज्ञान**: आयुर्वेद नैसर्गिक घटकांचा वापर करून मन, शरीर आणि आत्मा यांच्यातील संतुलनावर लक्ष केंद्रित करतो.",
      ta: "### ஆயுர்வேதம் மற்றும் பண்டைய அறுவை சிகிச்சை\nஇந்தியா **ஆயுர்வேதம்** மற்றும் **பிளாஸ்டிக் அறுவை சிகிச்சையின்** பிறப்பிடமாகும்.\n- **சுஷ்ருதா**: அறுவை சிகிச்சையின் தந்தை (கி.மு. 600) என்று அழைக்கப்படுபவர். அவர் 300 க்கும் மேற்பட்ட அறுவை சிகிச்சைகள் மற்றும் 120 கருவிகளை விவரித்தார்.\n- **தத்துவம்**: ஆயுர்வேதம் இயற்கை கூறுகளைப் பயன்படுத்தி மனம், உடல் மற்றும் ஆன்மாவிற்கு இடையிலான சமநிலையில் கவனம் செலுத்துகிறது."
    }
  },
  {
    keywords: ["kabir", "sant kabir", "doha", "वाराणसी", "कबीर", "કબીર", "கபீர்"],
    responses: {
      en: "### Sant Kabir: The Social Reformer\nA weaver by trade, he became India's most loved poet-saint.\n- **Legacy**: His couplets (Dohas) are famous for Criticizing hypocrisy and promoting human unity.\n- **Language**: He used a mix of Hindi dialects (Sadhukkari) to talk to the common man.",
      hi: "### संत कबीर: समाज सुधारक\nपेशे से एक बुनकर, वे भारत के सबसे प्रिय कवि-संत बने।\n- **विरासत**: उनके दोहे पाखंड की आलोचना करने और मानवीय एकता को बढ़ावा देने के लिए प्रसिद्ध हैं।\n- **भाषा**: उन्होंने आम आदमी से बात करने के लिए हिंदी बोलियों (सधुक्कड़ी) के मिश्रण का उपयोग किया।",
      gu: "### સંત કબીર: સમાજ સુધારક\nવ્યવસાયે વણકર, તેઓ ભારતના સૌથી પ્રિય કવિ-સંત બન્યા.\n- **વારસો**: તેમના દુહા પાખંડની ટીકા કરવા અને માનવીય એકતાને પ્રોત્સાહન આપવા માટે પ્રખ્યાત છે.\n- **ભાષા**: તેમણે સામાન્ય માણસ સાથે વાત કરવા માટે હિન્દી બોલીઓના મિશ્રણનો ઉપયોગ કર્યો હતો.",
      mr: "### संत कबीर: समाजसुधारक\nव्यावसायाने विणकर, ते भारताचे अत्यंत लाडके कवी-संत बनले.\n- **वारसा**: त्यांचे दोहे ढोंगीपणावर टीका करण्यासाठी आणि मानवी एकता वाढवण्यासाठी प्रसिद्ध आहेत.\n- **भाषा**: त्यांनी सामान्य माणसाशी संवाद साधण्यासाठी हिंदी बोलीभाषांच्या (सधुक्कडी) मिश्रणाचा वापर केला.",
      ta: "### சந்த் கபீர்: சமூக சீர்திருத்தவாதி\nதொழிலால் நெசவாளர், அவர் இந்தியாவின் மிகவும் நேசிக்கப்படும் கவிஞர்-துறவியானார்.\n- **பாரம்பரியம்**: அவருடைய ஈரடிகள் (தோஹாக்கள்) பாசாங்குத்தனத்தை விமர்சிப்பதற்கும் மனித ஒற்றுமையை மேம்படுத்துவதற்கும் பிரபலமானவை.\n- **மொழி**: அவர் சாமானிய மக்களுடன் பேச இந்தி கிளைமொழிகளின் (சதுக்கரி) கலவையைப் பயன்படுத்தினார்."
    }
  },
  {
    keywords: ["thiruvalluvar", "thirukkural", "tamil", "திருவள்ளுவர்", "திருக்குறள்", "தமிழ்"],
    responses: {
      en: "### Thiruvalluvar: The Universal Sage\nAuthor of the **Thirukkural**, which is the 'Common Creed' of Tamils.\n- **The Book**: 1,330 couplets covering Ethics, Wealth, and Love.\n- **Uniqueness**: It doesn't mention any religion, making it a universal guide for living a perfect life.",
      hi: "### तिरुवल्लुवर: सार्वभौमिक ऋषि\n**तिरुक्कुरल** के लेखक, जो तमिलों का 'सामान्य पंथ' है।\n- **पुस्तक**: नैतिकता, धन और प्रेम को कवर करने वाले 1,330 दोहे।\n- **विलक्षणता**: इसमें किसी धर्म का उल्लेख नहीं है, जो इसे एक आदर्श जीवन जीने के लिए एक सार्वभौमिक मार्गदर्शक बनाता है।",
      gu: "### તિરુવલ્લુવર: સાર્વત્રિક ઋષિ\n**તિરુક્કુરલ** ના લેખક, જે તમિલોનું 'સામાન્ય પંથ' છે.\n- **પુસ્તક**: નૈતિકતા, સંપત્તિ અને પ્રેમને આવરી લેતા 1,330 દુહા.\n- **વિશિષ્ટતા**: તેમાં કોઈ ધર્મનો ઉલ્લેખ નથી, જે તેને આદર્શ જીવન જીવવા માટે સાર્વત્રિક માર્ગદર્શક બનાવે છે.",
      mr: "### तिरुवल्लुवर: वैश्विक ऋषी\n**तिरुक्कुरल** चे लेखक, जे तमिळ लोकांचे 'सामान्य पंथ' (Common Creed) आहे.\n- **पुस्तक**: नैतिकता, संपत्ती आणि प्रेम या विषयांवरील १,३३૦ दोहे.\n- **वैशिष्ट्य**: यामध्ये कोणत्याही धर्माचा उल्लेख नाही, ज्यामुळे तो एक आदर्श जीवन जगण्यासाठी जागतिक मार्गदर्शक ठरतो.",
      ta: "### திருவள்ளுவர்: உலகளாவிய முனிவர்\nதமிழர்களின் 'பொதுமறை' என்று அழைக்கப்படும் **திருக்குறளை** இயற்றியவர்.\n- **நூல்**: அறம், பொருள், இன்பம் ஆகியவற்றை உள்ளடக்கிய 1,330 குறள்கள்.\n- **தனித்துவம்**: இதில் எந்த மதமும் குறிப்பிடப்படவில்லை, இது ஒரு முழுமையான வாழ்க்கையை வாழ்வதற்கான உலகளாவிய வழிகாட்டியாக அமைகிறது."
    }
  }
];

export const getResponse = (input: string, lang: Exclude<Language, 'auto'>): string => {
  const query = input.toLowerCase();
  
  // High-standard Scoring-based NLP Logic (BCA Standard)
  let bestMatch: Intent | null = null;
  let highestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (query.includes(kw)) {
        score += 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }

  if (bestMatch && highestScore > 0) {
    return bestMatch.responses[lang];
  }

  // Proper fallback to Welcome/General
  return intents[0].responses[lang];
};

export const getSuggestedQuestions = (lang: Language): string[] => {
  const code = lang === 'auto' ? 'en' : (lang as Exclude<Language, 'auto'>);
  const questions: Record<Exclude<Language, 'auto'>, string[]> = {
    en: ["Who invented Zero?", "Tell me about Kabir", "What is Ayurveda?", "Thiruvalluvar wisdom"],
    hi: ["शून्य का आविष्कार किसने किया?", "कबीर के बारे में बताएं", "आयुर्वेद क्या है?", "तिरुवल्लुवर का ज्ञान"],
    gu: ["શૂન્યની શોધ કોણે કરી?", "કબીર વિશે જણાવો", "આયુર્વેદ શું છે?", "તિરુવલ્લુવરનું જ્ઞાન"],
    mr: ["शून्याचा शोध कोणी लावला?", "कबीर बद्दल सांगा", "आयुर्वेद म्हणजे काय?", "तिरुवल्लुवरचे ज्ञान"],
    ta: ["பூஜ்யத்தை கண்டுபிடித்தது யார்?", "கபீர் பற்றிச் சொல்", "ஆயுர்வேதம் என்றால் என்ன?", "திருவள்ளுவர் அறிவு"]
  };
  return questions[code] || questions.en;
};
