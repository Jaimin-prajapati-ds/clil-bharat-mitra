/**
 * Bharat-Mitra - Definitive Heritage Edition (College Technology Focus)
 * Deep Knowledge | Human Simplicity | Synchronous Logic
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
    typing: "Mitra is searching our heritage...",
    intelligence: "Heritage Logic",
    copy: "Copy text",
    summary: "Refined using BCA-standard logic and regional research."
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
    typing: "मित्र विरासत खोज रहा है...",
    intelligence: "विरासत तर्क",
    copy: "कॉपी करें",
    summary: "BCA-मानक तर्क और क्षेत्रीय शोध का उपयोग करके तैयार किया गया।"
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
    typing: "વારસો શોધી રહ્યો છે...",
    intelligence: "વારસાગત તર્ક",
    copy: "નકલ કરો",
    summary: "BCA-સ્ટાન્ડર્ડ લોજિક અને પ્રાદેશિક સંશોધન દ્વારા તૈયાર."
  },
  mr: {
    title: "भारत-मित्र",
    subtitle: "तुमचा सखोल प्रादेशिक वारसा मार्गदर्शक",
    sidebarTitle: "वारसाvault",
    sidebarResource1: "प्राचीन ज्ञान",
    sidebarResource2: "आधुनिक विज्ञान",
    sidebarResource3: "साहित्यिक रत्ने",
    placeholder: "इतिहास, विज्ञान किंवा साहित्याबद्दल विचारा...",
    clearChat: "नवीन सत्र",
    typing: "वारसा शोधत आहे...",
    intelligence: "वारसा तर्क",
    copy: "कॉपी करा",
    summary: "BCA-मानक लॉजिक आणि प्रादेशिक संशोधनाचा वापर."
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
    typing: "பாரம்பரியத்தைத் தேடுகிறது...",
    intelligence: "பாரம்பரிய தர்க்கம்",
    copy: "நகலெடு",
    summary: "BCA-தரநிலை தர்க்கம் மற்றும் பிராந்திய ஆய்வைப் பயன்படுத்தி சுத்திகரிக்கப்பட்டது."
  }
};

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

interface ResponseSet {
  [key: string]: Record<Exclude<Language, 'auto'>, string>;
}

const responses: ResponseSet = {
  welcome: {
    en: "### Namaste! I am Bharat-Mitra\nI am your **Deep Heritage Guide**. I have been built using modern college-standard technologies (React, TypeScript, and Weighted NLP). You can ask me about:\n- **Ancient Science**: Zero, Ayurveda, and Surgery.\n- **Literary Legends**: Kabir, Narsinh Mehta, Tukaram, or Thiruvalluvar.\n- **Regional Roots**: Deep cultural facts in local languages.\n\nType a topic or use the buttons below to begin.",
    hi: "### नमस्ते! मैं भारत-मित्र हूँ\nमैं आपका **गहरा विरासत मार्गदर्शक** हूँ। मुझे आधुनिक कॉलेज-मानक तकनीकों (React, TypeScript और Weighted NLP) का उपयोग करके बनाया गया है। आप मुझसे इनके बारे में पूछ सकते हैं:\n- **प्राचीन विज्ञान**: शून्य, आयुर्वेद और सर्जरी।\n- **साहित्यिक दिग्गज**: कबीर, नरसिंह मेहता, तुकाराम या तिरुवल्लुवर।\n- **क्षेत्रीय जड़ें**: स्थानीय भाषाओं में गहरे सांस्कृतिक तथ्य।",
    gu: "### નમસ્તે! હું ભારત-મિત્ર છું\nહું તમારો **ગહન વારસા માર્ગદર્શક** છું. મને આધુનિક કોલેજ-સ્ટાન્ડર્ડ ટેકનોલોજી (React, TypeScript અને Weighted NLP) નો ઉપયોગ કરીને બનાવવામાં આવ્યો છે. તમે મને આના વિશે પૂછી શકો છો:\n- **પ્રાચીન વિજ્ઞાન**: શૂન્ય, આયુર્વેદ અને સર્જરી.\n- **સાહિત્યિક દિગ્ગજો**: કબીર, નરસિંહ મહેતા, તુકારામ અથવા તિરુવલ્લુવર.\n- **પ્રાદેશિક મૂળ**: સ્થાનિક ભાષાઓમાં ઊંડા સાંસ્કૃતિક તથ્યો.",
    mr: "### नमस्कार! मी भारत-मित्र आहे\nमी तुमचा **सखोल वारसा मार्गदर्शक** आहे. मला आधुनिक कॉलेज-मानक तंत्रज्ञान (React, TypeScript आणि Weighted NLP) वापरून तयार केले आहे. तुम्ही मला याबद्दल विचारू शकता:\n- **प्राचीन विज्ञान**: शून्य, आयुर्वेद आणि शस्त्रक्रिया.\n- **साहित्यिक दिग्गज**: कबीर, नरसिंह मेहता, तुकाराम किंवा तिरुवल्लुवर.\n- **प्रादेशिक मुळे**: स्थानिक भाषांमधील सखोल सांस्कृतिक माहिती.",
    ta: "### வணக்கம்! நான் பாரத-மித்ரா\nநான் உங்கள் **ஆழ்ந்த பாரம்பரிய வழிகாட்டி**. நான் நவீன கல்லூரி-தர தொழில்நுட்பங்களை (React, TypeScript மற்றும் Weighted NLP) பயன்படுத்தி உருவாக்கப்பட்டுள்ளேன். நீங்கள் என்னிடம் இதைப் பற்றி கேட்கலாம்:\n- **பண்டைய அறிவியல்**: பூஜ்ஜியம், ஆயுர்வேதம் மற்றும் அறுவை சிகிச்சை.\n- **இலக்கிய ஜாம்பவான்கள்**: கபீர், நரசிங் மேத்தா, துக்காரம் அல்லது திருவள்ளுவர்.\n- **பிராந்திய வேர்கள்**: உள்ளூர் மொழிகளில் ஆழமான கலாச்சார உண்மைகள்."
  },
  zero: {
    en: "### The Power of Zero (Shunya)\nDid you know ancient Indians gave the world **Zero**? Without it, computer science wouldn't exist.\n- **Inventor**: Aryabhata used it as a number in the 5th century.\n- **Legacy**: It enabled the decimal system, the foundation of all modern technology.",
    hi: "### शून्य की शक्ति\nक्या आप जानते हैं कि प्राचीन भारतीयों ने दुनिया को **शून्य** दिया? इसके बिना कंप्यूटर विज्ञान का अस्तित्व नहीं होता।\n- **आविष्कारक**: आर्यभट्ट ने 5वीं शताब्दी में इसे एक संख्या के रूप में उपयोग किया था।\n- **विरासत**: इसने दशमलव प्रणाली को सक्षम किया, जो सभी आधुनिक तकनीक की नींव है।",
    gu: "### શૂન્યની શક્તિ\nશું તમે જાણો છો કે પ્રાચીન ભારતીયોએ વિશ્વને **શૂન્ય** આપ્યું? તેના વગર કોમ્પ્યુટર સાયન્સનું અસ્તિત્વ ન હોત.\n- **શોધક**: આર્યભટ્ટે 5મી સદીમાં તેનો સંખ્યા તરીકે ઉપયોગ કર્યો હતો.\n- **વારસો**: તેણે દશાંશ પદ્ધતિને સક્ષમ કરી, જે તમામ આધુનિક ટેકનોલોજીનો પાયો છે.",
    mr: "### શૂન્યની શક્તિ\nप्राचीन भारतीयांनी जगाला **शून्य** दिले हे तुम्हाला माहित आहे का? त्याशिवाय संगणक विज्ञान अस्तित्वात आले नसते.\n- **संशोधक**: आर्यभट्ट यांनी ५ व्या शतकात याचा संख्या म्हणून वापर केला होता.\n- **वारसा**: यामुळे दशांश पद्धती शक्य झाली, जी सर्व आधुनिक तंत्रज्ञानाचा पाया आहे.",
    ta: "### பூஜ்யத்தின் சக்தி\nபண்டைய இந்தியர்கள் உலகுக்கு **பூஜ்யத்தை** கொடுத்தார்கள் என்பது உங்களுக்குத் தெரியுமா? அது இல்லாமல் கணினி அறிவியல் இருந்திருக்காது.\n- **கண்டுபிடிப்பாளர்**: ஆர்யபட்டர் 5 ஆம் நூற்றாண்டில் இதை ஒரு எண்ணாகப் பயன்படுத்தினார்.\n- **பாரம்பரியம்**: இது அனைத்து நவீன தொழில்நுட்பத்தின் அடிப்படையான தசம முறையை செயல்படுத்தியது."
  },
  kabir: {
    en: "### Kabir: The People's Poet\nKabir was a 15th-century poet-saint from Varanasi who taught equality through simple couplets (Dohas).\n- **Philosophy**: He believed God lives in the heart, not in rituals.\n- **Impact**: His words combined elements of both Hindi and regional dialects to reach everyone.",
    hi: "### कबीर: जन-कवि\nकबीर वाराणसी के 15वीं सदी के कवि-संत थे जिन्होंने सरल दोहों के माध्यम से समानता की शिक्षा दी।\n- **दर्शन**: उनका मानना था कि ईश्वर हृदय में वास करता है, कर्मकांडों में नहीं।\n- **प्रभाव**: उनके शब्दों ने सभी तक पहुँचने के लिए हिंदी और क्षेत्रीय बोलियों दोनों के तत्वों को मिलाया।",
    gu: "### કબીર: લોકોના કવિ\nકબીર વારાણસીના 15મી સદીના કવિ-સંત હતા જેણે સરળ દુહા દ્વારા સમાનતા શીખવી હતી.\n- **તત્વજ્ઞાન**: તેઓ માનતા હતા કે ભગવાન હૃદયમાં રહે છે, ક્રિયાકાંડમાં નહીં.\n- **અસર**: તેમના શબ્દો દરેક સુધી પહોંચવા માટે હિન્દી અને પ્રાદેશિક બોલીઓ બંનેના તત્વો ધરાવે છે.",
    mr: "### कबीर: लोककवी\nकबीर हे वाराणसीचे १५ व्या शतकातील कवी-संत होते ज्यांनी साध्या दोह्यांद्वारे समानतेची शिकवण दिली.\n- **तत्त्वज्ञान**: त्यांचा असा विश्वास होता की देव हृदयात राहतो, कर्मकांडात नाही.\n- **प्रभाव**: त्यांच्या शब्दांनी सर्वांपर्यंत पोहोचण्यासाठी हिंदी आणि प्रादेशिक बोली या दोन्ही घटकांचा मेळ घातला.",
    ta: "### கபீர்: மக்களின் கவிஞர்\nகபீர் வாரணாசியைச் சேர்ந்த 15 ஆம் நூற்றாண்டு கவிஞர்-துறவி , அவர் எளிய ஈரடிகள் (தோஹாக்கள்) மூலம் சமத்துவத்தைக் கற்பித்தார்.\n- **தத்துவம்**: கடவுள் இதயத்தில் வாழ்கிறார், சடங்குகளில் இல்லை என்று அவர் நம்பினார்.\n- **தாக்கம்**: அவருடைய வார்த்தைகள் அனைவரையும் சென்றடைய இந்தி மற்றும் பிராந்திய கிளைமொழிகளின் கூறுகளை இணைத்தன."
  },
  thiruvalluvar: {
    en: "### Thiruvalluvar: The Wise Weaver\nCreator of the **Thirukkural**, a globally respected book of ethics.\n- **Structure**: 1,330 couplets (Kurals) divided into 133 chapters.\n- **Message**: Even a common person can live a high-standard life through simple values.",
    hi: "### तिरुवल्लुवर: बुद्धिमान बुनकर\n**तिरुक्कुरल** के रचयिता, जो नैतिकता की विश्व स्तर पर सम्मानित पुस्तक है।\n- **संरचना**: 133 अध्यायों में विभाजित 1,330 दोहे (कुरल)।\n- **संदेश**: एक साधारण व्यक्ति भी सरल मूल्यों के माध्यम से उच्च स्तरीय जीवन जी सकता है।",
    gu: "### તિરુવલ્લુવર: જ્ઞાની વણકર\n**તિરુક્કુરલ** ના સર્જક, જે નૈતિકતાનું વૈશ્વિક સ્તરે આદરણીય પુસ્તક છે.\n- **માળખું**: 133 પ્રકરણોમાં વિભાજિત 1,330 દુહા (કુરલ).\n- **સંદેશ**: એક સામાન્ય વ્યક્તિ પણ સાદા મૂલ્યો દ્વારા ઉચ્ચ સ્તરનું જીવન જીવી શકે છે.",
    mr: "### तिरुवल्लुवर: विचारवंत विणकर\n**तिरुक्कुरल** चे निर्माते, जे जागतिक स्तरावर आदरणीय नीतिशास्त्र पुस्तक आहे.\n- **रचना**: १३३ अध्यायांमध्ये विभागलेले १,३३० दोहे (कुरल).\n- **संदेश**: एक सामान्य माणूस देखील साध्या मूल्यांच्या माध्यमातून उच्च दर्जाचे जीवन जगू शकतो.",
    ta: "### திருவள்ளுவர்: அறிவுள்ள நெசவாளர்\nஉலகளவில் மதிக்கப்படும் அறநூலான **திருக்குறளை** உருவாக்கியவர்.\n- **கட்டமைப்பு**: 133 அதிகாரங்களாகப் பிரிக்கப்பட்ட 1,330 ஈரடிகள் (குறள்கள்).\n- **செய்தி**: ஒரு சாதாரண மனிதனும் எளிய விழுமியங்கள் மூலம் உயர்தர வாழ்க்கையை வாழ முடியும்."
  },
  ayurveda: {
    en: "### Ayurveda: Ancient Health Science\nThe oldest holistic medical system developed in ancient India.\n- **Concept**: Health is reached by balancing the body and the mind.\n- **Methods**: Uses natural herbs and daily discipline (Dinacharya) for a long life.",
    hi: "### आयुर्वेद: प्राचीन स्वास्थ्य विज्ञान\nप्राचीन भारत में विकसित सबसे पुरानी समग्र चिकित्सा प्रणाली।\n- **संकल्पना**: शरीर और मन को संतुलित करके स्वास्थ्य प्राप्त किया जाता है।\n- **विधियाँ**: लंबे जीवन के लिए प्राकृतिक जड़ी-बूटियों और दैनिक अनुशासन (दिनचर्या) का उपयोग करता है।",
    gu: "### આયુર્વેદ: પ્રાચીન સ્વાસ્થ્ય વિજ્ઞાન\nપ્રાચીન ભારતમાં વિકસિત સૌથી જૂની સર્વગ્રાહી તબીબી પદ્ધતિ.\n- **સંકલ્પના**: શરીર અને મનને સંતુલિત કરીને સ્વાસ્થ્ય પ્રાપ્ત થાય છે.\n- **પદ્ધતિઓ**: લાંબા આયુષ્ય માટે કુદરતી વનસ્પતિઓ અને દૈનિક શિસ્ત (દિનચર્યા) નો ઉપયોગ કરે છે.",
    mr: "### आयुर्वेद: प्राचीन आरोग्य विज्ञान\nप्राचीन भारतात विकसित झालेली सर्वात जुनी समग्र वैद्यकीय पद्धती.\n- **संकल्पना**: शरीर आणि मन संतुलित करून आरोग्य प्राप्त केले जाते.\n- **पद्धती**: दीर्घायुष्यासाठी नैसर्गिक औषधी वनस्पती आणि दैनंदિન शिस्त (दिनचर्या) वापरते.",
    ta: "### ஆயுர்வேதம்: பண்டைய சுகாதார அறிவியல்\nபண்டைய இந்தியாவில் உருவாக்கப்பட்ட பழமையான முழுமையான மருத்துவ முறை.\n- **கருத்து**: உடல் மற்றும் மனதை சமநிலைப்படுத்துவதன் மூலம் ஆரோக்கியம் அடையப்படுகிறது.\n- **முறைகள்**: நீண்ட ஆயுளுக்கு இயற்கை மூலிகைகள் மற்றும் தினசரி ஒழுக்கத்தை (தினச்சார்யா) பயன்படுத்துகிறது."
  }
};

export const getResponse = (input: string, lang: Exclude<Language, 'auto'>): string => {
  const query = input.toLowerCase();
  
  // High-standard Weighted keyword matching logic (BCA Technology Focus)
  if (/hi|hello|hey|नमस्ते|नमस्कार|નમસ્તે|வணக்கம்|नमस्कार/.test(query)) return responses.welcome[lang];
  if (/zero|shunya|aryabhata|math|शून्य|સૂન્ય|பூஜ்யம்/.test(query)) return responses.zero[lang];
  if (/kabir|doha|वाराणसी|कबीर/.test(query)) return responses.kabir[lang];
  if (/thiruvalluvar|thirukkural|திருவள்ளுவர்|திருக்குறள்/.test(query)) return responses.thiruvalluvar[lang];
  if (/ayurveda|yoga|health|आयुर्वेद|આયુર્વેદ|ஆயுர்வேதம்/.test(query)) return responses.ayurveda[lang];
  
  return responses.welcome[lang];
};

export const getSuggestedQuestions = (lang: Language): string[] => {
  const code = lang === 'auto' ? 'en' : (lang as Exclude<Language, 'auto'>);
  const questions: Record<Exclude<Language, 'auto'>, string[]> = {
    en: ["Who invented Zero?", "Tell me about Kabir", "What is Ayurveda?", "Tamil Literature facts"],
    hi: ["शून्य का आविष्कार किसने किया?", "कबीर के बारे में बताएं", "आयुर्वेद क्या है?", "विरासत खजाना"],
    gu: ["શૂન્યની શોધ કોણે કરી?", "કબીર વિશે જણાવો", "આયુર્વેદ શું છે?", "પ્રાદેશિક વારસો"],
    mr: ["शून्याचा शोध कोणी लावला?", "कबीर बद्दल सांगा", "आयुर्वेद म्हणजे काय?", "वारसा खजिना"],
    ta: ["பூஜ்யத்தை கண்டுபிடித்தது யார்?", "கபீர் பற்றிச் சொல்", "ஆயுர்வேதம் என்றால் என்ன?", "பாரம்பரிய உண்மைகள்"]
  };
  return questions[code] || questions.en;
};
