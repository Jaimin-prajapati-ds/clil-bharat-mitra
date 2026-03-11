/**
 * Bharat-Mitra - Simple & Premium Regional Guide
 * Human-centric, understandable, and deeply respectful of regional languages.
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
    subtitle: "Your Regional Knowledge Guide",
    sidebarTitle: "Discovery",
    sidebarResource1: "Heritage & Places",
    sidebarResource2: "Science & Nature",
    sidebarResource3: "Language Help",
    placeholder: "How can I help you today?",
    clearChat: "Start Over",
    typing: "Searching for you...",
    intelligence: "English Guide",
    copy: "Copy text",
    summary: "A simple and beautiful way to explore regional knowledge."
  },
  hi: {
    title: "भारत-मित्र",
    subtitle: "आपका क्षेत्रीय ज्ञान मार्गदर्शक",
    sidebarTitle: "खोज",
    sidebarResource1: "विरासत और स्थान",
    sidebarResource2: "विज्ञान और प्रकृति",
    sidebarResource3: "भाषा सहायता",
    placeholder: "आज मैं आपकी कैसे मदद कर सकता हूँ?",
    clearChat: "शुरुआत करें",
    typing: "आपके लिए खोज रहा हूँ...",
    intelligence: "हिंदी मार्गदर्शक",
    copy: "कॉपी करें",
    summary: "क्षेत्रीय ज्ञान को खोजने का एक सरल और सुंदर तरीका।"
  },
  gu: {
    title: "ભારત-મિત્ર",
    subtitle: "તમારા પ્રાદેશિક જ્ઞાન માર્ગદર્શક",
    sidebarTitle: "શોધ",
    sidebarResource1: "વારસો અને સ્થાનો",
    sidebarResource2: "વિજ્ઞાન અને પ્રકૃતિ",
    sidebarResource3: "ભાષા સહાય",
    placeholder: "હું આજે તમારી કેવી રીતે મદદ કરી શકું?",
    clearChat: "ફરી શરૂ કરો",
    typing: "તમારા માટે શોધી રહ્યો છું...",
    intelligence: "ગુજરાતી માર્ગદર્શક",
    copy: "નકલ કરો",
    summary: "પ્રાદેશિક જ્ઞાન મેળવવાની એક સરળ અને સુંદર રીત."
  },
  mr: {
    title: "भारत-मित्र",
    subtitle: "तुमचा प्रादेशिक ज्ञान मार्गदर्शक",
    sidebarTitle: "शोध",
    sidebarResource1: "वारसा आणि ठिकाणे",
    sidebarResource2: "विज्ञान आणि निसर्ग",
    sidebarResource3: "भाषा मदत",
    placeholder: "मी आज तुम्हाला कशी मदत करू शकतो?",
    clearChat: "पुन्हा सुरुवात करा",
    typing: "तुमच्यासाठी शोधत आहे...",
    intelligence: "मराठी मार्गदर्शक",
    copy: "कॉपी करा",
    summary: "प्रादेशिक ज्ञान मिळवण्याचा एक सोपा आणि सुंदर मार्ग."
  },
  ta: {
    title: "பாரத-மித்ரா",
    subtitle: "உங்கள் பிராந்திய அறிவு வழிகாட்டி",
    sidebarTitle: "கண்டுபிடிப்பு",
    sidebarResource1: "பாரம்பரியம் & இடங்கள்",
    sidebarResource2: "அறிவியல் & இயற்கை",
    sidebarResource3: "மொழி உதவி",
    placeholder: "நான் இன்று உங்களுக்கு எப்படி உதவ முடியும்?",
    clearChat: "மீண்டும் தொடங்கு",
    typing: "உங்களுக்காகத் தேடுகிறேன்...",
    intelligence: "தமிழ் வழிகாட்டி",
    copy: "நகலெடு",
    summary: "பிராந்திய அறிவை ஆராய ஒரு எளிய மற்றும் அழகான வழி."
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
  hello: {
    en: "### Namaste! I am Bharat-Mitra\nI am here to help you learn about India's regional beauty and knowledge in a **simple way**. I can assist with:\n- **Linguistic Help**: Understanding words and phrases.\n- **Our Heritage**: Learning about our festivals and history.\n- **General Discovery**: Simple facts about science and the world around us.\n\nWhat would you like to talk about?",
    hi: "### नमस्ते! मैं भारत-मित्र हूँ\nमैं यहाँ भारत की क्षेत्रीय सुंदरता और ज्ञान के बारे में **सरल तरीके** से सीखने में आपकी मदद करने के लिए हूँ। मैं आपको निम्न में सहायता दे सकता हूँ:\n- **भाषाई सहायता**: शब्दों और वाक्यों को समझना।\n- **हमारी विरासत**: हमारे त्यौहारों और इतिहास के बारे में जानना।\n- **सामान्य खोज**: विज्ञान और हमारे आसपास की दुनिया के बारे में सरल तथ्य।\n\nआप किस बारे में बात करना चाहते हैं?",
    gu: "### નમસ્તે! હું ભારત-મિત્ર છું\nહું અહીં ભારતની પ્રાદેશિક સુંદરતા અને જ્ઞાન વિશે **સરળ રીતે** શીખવામાં તમારી મદદ કરવા માટે છું. હું તમને નીચેની બાબતોમાં મદદ કરી શકું છું:\n- **ભાષાકીય મદદ**: શબ્દો અને વાક્યો સમજવા.\n- **આપણો વારસો**: આપણા તહેવારો અને ઇતિહાસ વિશે જાણવું.\n- **સામાન્ય શોધ**: વિજ્ઞાન અને આપણી આસપાસની દુનિયા વિશેના સરળ તથ્યો.\n\nતમે શેના વિશે વાત કરવા માંગો છો?",
    mr: "### नमस्कार! मी भारत-मित्र आहे\nमी येथे भारताचे प्रादेशिक सौंदर्य आणि ज्ञान **सोप्या पद्धतीने** शिकण्यास मदत करण्यासाठी आहे. मी तुम्हाला खालील गोष्टींमध्ये मदत करू शकतो:\n- **भाषिक मदत**: शब्द आणि वाक्ये समजून घेणे.\n- **आपला वारसा**: आमचे सण आणि इतिहास याबद्दल जाणून घेणे.\n- **सामान्य शोध**: विज्ञान आणि आपल्या सभोवतालच्या जगाबद्दल सोपी तथ्ये.\n\nतुम्हाला कशाबद्दल बोलायचे आहे?",
    ta: "### வணக்கம்! நான் பாரத-மித்ரா\nஇந்தியாவின் பிராந்திய அழகு மற்றும் அறிவை **எளிமையான முறையில்** அறிய உங்களுக்கு உதவ நான் இங்கு இருக்கிறேன். நான் உங்களுக்கு உதவ முடியும்:\n- **மொழி உதவி**: சொற்கள் மற்றும் வாக்கியங்களைப் புரிந்துகொள்ளுதல்.\n- **நமது பாரம்பரியம்**: நமது பண்டிகைகள் மற்றும் வரலாறு பற்றி அறிதல்.\n- **பொதுவான கண்டுபிடிப்பு**: அறிவியல் மற்றும் நம்மைச் சுற்றியுள்ள உலகம் பற்றிய எளிய உண்மைகள்.\n\nநீங்கள் எதைப் பற்றி பேச விரும்புகிறீர்கள்?"
  },
  places: {
    en: "### Beautiful India: Our Heritage\nIndia has so many wonderful places to see:\n- **Temples of South**: Famous for beautiful stone carvings.\n- **Himalayas**: The great mountains in the north.\n- **Deserts & Greeneries**: From the sands of Rajasthan to the forests of Kerala.\nOur history lives in every corner!",
    hi: "### सुंदर भारत: हमारी विरासत\nभारत में देखने के लिए बहुत सारे अद्भुत स्थान हैं:\n- **दक्षिण के मंदिर**: सुंदर पत्थर की नक्काशी के लिए प्रसिद्ध।\n- **हिमालय**: उत्तर के महान पर्वत।\n- **रेगिस्तान और हरियाली**: राजस्थान की रेत से लेकर केरल के जंगलों तक।\nहमारा इतिहास हर कोने में बसता है!",
    gu: "### સુંદર ભારત: આપણો વારો\nભારતમાં જોવા માટે ઘણા સુંદર સ્થળો છે:\n- **દક્ષિણના મંદિરો**: પથ્થરની સુંદર કોતરણી માટે પ્રખ્યાત.\n- **હિમાલય**: ઉત્તરના મહાન પર્વતો.\n- **રણ અને હરિયાળી**: રાજસ્થાનની રેતીથી લઈને કેરળના જંગલો સુધી.\nઆપણો ઇતિહાસ દરેક ખૂણે જીવે છે!",
    mr: "### सुंदर भारत: आपला वारसा\nभारतात पाहण्यासारखी अनेक सुंदर ठिकाणे आहेत:\n- **दक्षिणेतील मंदिरे**: दगडांवरील सुंदर कोरीव कामासाठी प्रसिद्ध.\n- **हिमालय**: उत्तरेकडील महान पर्वत.\n- **वाळवंट आणि हिरवळ**: राजस्थानच्या वाळूपासून केरळच्या जंगलांपर्यंत.\nआमचा इतिहास प्रत्येक कोपऱ्यात जिवंत आहे!",
    ta: "### அழகான இந்தியா: நமது பாரம்பரியம்\nஇந்தியாவில் பார்க்க பல அற்புதமான இடங்கள் உள்ளன:\n- **தென்னிந்திய கோவில்கள்**: கற்கதுக்குகளுக்கு பெயர் பெற்றது.\n- **இமயமலை**: வடக்கில் உள்ள மிகப்பெரிய மலைகள்.\n- **பாலைவனங்கள் & பசுமை**: ராஜஸ்தானின் மணல் முதல் கேரளாவின் காடுகள் வரை.\nநமது வரலாறு ஒவ்வொரு மூலையிலும் வாழ்கிறது!"
  },
  science: {
    en: "### Simple Science: Why things fall?\nEverything falls to the ground because of **Gravity**. Built by nature, it acts like a giant magnet pulling everything toward the center of the Earth. \n\nWithout it, everything would float away into space!",
    hi: "### सरल विज्ञान: चीजें नीचे क्यों गिरती हैं?\n**गुरुत्वाकर्षण** के कारण हर चीज जमीन पर गिरती है। प्रकृति द्वारा निर्मित, यह एक विशाल चुंबक की तरह कार्य करता है जो सब कुछ पृथ्वी के केंद्र की ओर खींचता है।\n\nइसके बिना, सब कुछ उड़कर अंतरिक्ष में चला जाता!",
    gu: "### સરળ વિજ્ઞાન: વસ્તુઓ કેમ નીચે પડે છે?\n**ગુરુત્વાકર્ષણ** ને કારણે દરેક વસ્તુ જમીન પર પડે છે. કુદરત દ્વારા રચાયેલ, તે એક વિશાળ ચુંબક જેવું કામ કરે છે જે પૃથ્વીના કેન્દ્ર તરફ બધું ખેંચે છે.\n\nતેના વગર, બધું જ અવકાશમાં ઊડી જાય!",
    mr: "### साधे विज्ञान: गोष्टी खाली का पडतात?\n**गुरुत्वाकर्षणामुळे** प्रत्येक गोष्ट जमिनीवर पडते. निसर्गाद्वारे निर्मित, हे एका मोठ्या चुंबकासारखे काम करते जे सर्व काही पृथ्वीच्या केंद्राकडे खेचते.\n\nत्याशिवाय सर्व काही अंतराळात तरंगले असते!",
    ta: "### எளிய அறிவியல்: ஏன் பொருட்கள் கீழே விழுகின்றன?\n**ஈர்ப்பு விசை** காரணமாக அனைத்தும் தரையில் விழுகின்றன. இயற்கையினால் உருவாக்கப்பட்டது, இது பூமியின் மையத்தை நோக்கி அனைத்தையும் இழுக்கும் ஒரு பெரிய காந்தம் போல செயல்படுகிறது.\n\nஅது இல்லையென்றால், அனைத்தும் விண்வெளியில் மிதந்துவிடும்!"
  }
};

export const getResponse = (input: string, lang: Exclude<Language, 'auto'>): string => {
  const query = input.toLowerCase();
  
  if (/hi|hello|hey|namaste|नमस्ते|નમસ્તે/.test(query)) return responses.hello[lang];
  if (/place|heritage|history|india|भारत|વારસો|இடம்/.test(query)) return responses.places[lang];
  if (/science|fall|why|gravity|विज्ञान|વિજ્ઞાન|அறிவியல்/.test(query)) return responses.science[lang];
  
  return responses.hello[lang];
};

export const getSuggestedQuestions = (lang: Language): string[] => {
  const code = lang === 'auto' ? 'en' : (lang as Exclude<Language, 'auto'>);
  const questions: Record<Exclude<Language, 'auto'>, string[]> = {
    en: ["Tell me about India", "Why do things fall?", "Language help", "Tell me a fact"],
    hi: ["भारत के बारे में बताएं", "चीजें क्यों गिरती हैं?", "भाषा सहायता", "कोई तथ्य बताएं"],
    gu: ["ભારત વિશે જણાવો", "વસ્તુઓ કેમ નીચે પડે છે?", "ભાષાકીય મદદ", "કોઈ હકીકત જણાવો"],
    mr: ["भारताबद्दल सांगा", "गोष्टी खाली का पडतात?", "भाषिक मदत", "तथ्य सांगा"],
    ta: ["இந்தியாவைப் பற்றிச் சொல்", "ஏன் பொருட்கள் விழுகின்றன?", "மொழி உதவி", "ஒரு உண்மை சொல்"]
  };
  return questions[code] || questions.en;
};
