import { ReelStoryboard, Shot, CreativeDirection, LanguageOption, ShotType } from '../shared/types.js';
import { JOY_UNIVERSITY_VERIFIED_FACTS, HOOK_FRAMEWORKS, PATTERN_INTERRUPTS, SINGLE_CTAS } from '../shared/knowledgeBase.js';

interface TitleThemeAnalysis {
  category:
    | 'commerce'
    | 'engineering'
    | 'ai_tech'
    | 'college_compare'
    | 'marks_anxiety'
    | 'peer_parent'
    | 'mistakes'
    | 'passion_skills'
    | 'course_choice'
    | 'general_custom';
  cleanTopic: string;
  studentTension: string;
  coreInsight: string;
  defaultAngle: string;
  relevantSchools: string[];
}

export function analyzeTitle(title: string): TitleThemeAnalysis {
  const lower = title.toLowerCase();
  const clean = title.replace(/[?!.]+$/, '').trim();

  if (lower.includes('mistake') || lower.includes('wrong') || lower.includes('regret') || lower.includes('dont choose') || lower.includes("don't choose")) {
    return {
      category: 'mistakes',
      cleanTopic: clean,
      studentTension: 'Fear of making irreversible errors during college admissions and course selection.',
      coreInsight: 'Most post-+2 mistakes come from copying friends, chasing vanity rankings, or ignoring syllabus relevance.',
      defaultAngle: `Breaking down the real pitfalls behind "${clean}" before you lock in your choice.`,
      relevantSchools: ['School of Computational Intelligence', 'School of Engineering & Technology', 'School of Entrepreneurship & Management'],
    };
  }

  if (lower.includes('commerce') || lower.includes('b.com') || lower.includes('bba') || lower.includes('accounts') || lower.includes('finance')) {
    return {
      category: 'commerce',
      cleanTopic: clean,
      studentTension: 'Commerce students are told B.Com is the only choice or that modern corporate opportunities are limited.',
      coreInsight: 'Modern commerce combines business analytics, fintech, entrepreneurship, and corporate law.',
      defaultAngle: 'Debunking the "plain B.Com" myth with high-impact corporate fintech pathways.',
      relevantSchools: ['School of Entrepreneurship & Management', 'School of Law', 'Computational Intelligence'],
    };
  }

  if (lower.includes('engineer') || lower.includes('b.tech') || lower.includes('b.sc') || lower.includes('maths') || lower.includes('coding')) {
    return {
      category: 'engineering',
      cleanTopic: clean,
      studentTension: 'Defaulting to standard engineering without knowing if they enjoy actual technical building.',
      coreInsight: 'Modern tech requires applied, project-first learning with AI integration, not just rote book theory.',
      defaultAngle: `How to evaluate whether "${clean}" actually matches your career ambitions.`,
      relevantSchools: ['School of Engineering & Technology', 'School of Computational Intelligence', 'School of Design'],
    };
  }

  if (lower.includes('ai') || lower.includes('artificial') || lower.includes('future') || lower.includes('tech') || lower.includes('robot')) {
    return {
      category: 'ai_tech',
      cleanTopic: clean,
      studentTension: 'Panic that artificial intelligence will replace entry-level graduate jobs.',
      coreInsight: 'AI displaces repetitive tasks, but skyrockets demand for skilled builders and prompt-enabled domain specialists.',
      defaultAngle: `The real emerging careers shaped by AI — and what to study today to stay ahead.`,
      relevantSchools: ['School of Computational Intelligence', 'School of Design', 'School of Agricultural Sciences'],
    };
  }

  if (lower.includes('college') || lower.includes('compare') || lower.includes('campus') || lower.includes('infrastructure') || lower.includes('which college')) {
    return {
      category: 'college_compare',
      cleanTopic: clean,
      studentTension: 'Confusion caused by glossy marketing brochures, unverified placement claims, and campus hype.',
      coreInsight: 'True college quality lies in active lab access, mentor quality, and industry projects from year one.',
      defaultAngle: 'The 3 hidden filters you must check before applying to any college campus.',
      relevantSchools: ['Joy University 104-Acre Campus', 'Computational Intelligence Labs', 'Entrepreneurship Cell'],
    };
  }

  if (lower.includes('mark') || lower.includes('score') || lower.includes('topper') || lower.includes('define') || lower.includes('rank')) {
    return {
      category: 'marks_anxiety',
      cleanTopic: clean,
      studentTension: 'Belief that a single +2 board exam score has permanently capped their life potential.',
      coreInsight: 'Marks determine entrance cut-offs; curiosity, practical portfolio, and real projects determine your 30-year career.',
      defaultAngle: `Why your board marks only determine your starting line, not your ceiling.`,
      relevantSchools: ['School of Life & Health Sciences', 'School of Design', 'School of Entrepreneurship & Management'],
    };
  }

  if (lower.includes('parent') || lower.includes('family') || lower.includes('friend') || lower.includes('everyone says') || lower.includes('peer') || lower.includes('pressure')) {
    return {
      category: 'peer_parent',
      cleanTopic: clean,
      studentTension: 'Torn between parental expectations of safe government/traditional degrees and personal interests.',
      coreInsight: 'Parents want financial security for you. Presenting an emerging career with clear industry growth data resolves the tension.',
      defaultAngle: 'How to present an emerging career choice to Indian parents without conflict.',
      relevantSchools: ['School of Agricultural Sciences', 'School of Law', 'School of Nursing', 'School of Pharmacy'],
    };
  }

  if (lower.includes('passion') || lower.includes('good at') || lower.includes('interest') || lower.includes('talent') || lower.includes('skill')) {
    return {
      category: 'passion_skills',
      cleanTopic: clean,
      studentTension: 'Students are told to follow their passion, but have no roadmap to turn passion into an employable career.',
      coreInsight: 'Passion without high-leverage digital tools is a hobby. Pair your core curiosity with modern industry tools.',
      defaultAngle: `Turning your personal strengths into a high-demand career pathway.`,
      relevantSchools: ['School of Design', 'School of Computational Intelligence', 'School of Entrepreneurship & Management'],
    };
  }

  if (lower.includes('course') || lower.includes('study') || lower.includes('degree') || lower.includes('scope') || lower.includes('what after')) {
    return {
      category: 'course_choice',
      cleanTopic: clean,
      studentTension: 'Decision paralysis after +2 with conflicting advice from everyone around them.',
      coreInsight: 'Stop picking degrees by title alone; look at the practical day-to-day problems you want to solve.',
      defaultAngle: `The 3-filter decision framework for answering "${clean}".`,
      relevantSchools: ['School of Computational Intelligence', 'School of Engineering & Technology', 'School of Life & Health Sciences'],
    };
  }

  return {
    category: 'general_custom',
    cleanTopic: clean,
    studentTension: `Uncertainty and lack of clarity surrounding ${clean}.`,
    coreInsight: `Approaching ${clean} with an active student-first perspective and practical decision rules.`,
    defaultAngle: `A fresh, no-nonsense breakdown of "${clean}" for +2 students.`,
    relevantSchools: ['School of Computational Intelligence', 'School of Design', 'School of Engineering & Technology'],
  };
}

function enforceNativeScriptForShots(
  shots: Shot[],
  language: LanguageOption,
  cleanTitle: string,
  category: string
): Shot[] {
  if (language === 'English' || language === 'Tanglish') return shots;

  const scriptPatterns: Record<string, RegExp> = {
    Tamil: /[\u0B80-\u0BFF]/,
    Telugu: /[\u0C00-\u0C7F]/,
    Malayalam: /[\u0D00-\u0D7F]/,
    Hindi: /[\u0900-\u097F]/,
  };

  const pattern = scriptPatterns[language];
  if (!pattern) return shots;

  // Category-specific native templates
  const categoryNativeContent: Record<string, Record<string, { dialogue: string[]; onscreen: string[] }>> = {
    mistakes: {
      Tamil: {
        dialogue: [
          `"+2 முடிச்சிட்டு 90% மாணவர்கள் பண்ற மிகப்பெரிய தப்பு என்ன தெரியுமா?"`,
          `"நண்பர்கள் போறாங்கன்னு நீங்களும் அதே கோர்ஸ் எடுத்தா, 4 வருஷம் கழிச்சு ரொம்ப வருத்தப்படுவீங்க."`,
          `"கொஞ்சம் நில்லுங்க! முடிவெடுக்கறதுக்கு முன்னாடி இந்த எளிய விதியை கவனிங்க."`,
          `"3 விஷயத்தை செக் பண்ணுங்க: 1. சிலபஸ்ல நவீன AI & டெக்னாலஜி இருக்கா? 2. முதல் வருஷத்திலிருந்தே பிராக்டிகல் லேப் கிடைக்குமா? 3. இண்டஸ்ட்ரி மென்டர்ஷிப் இருக்கா?"`,
          `"4 வருஷம் எக்ஸாம் பாஸ் பண்ண மட்டும் காலேஜ் போகாதீங்க. உங்க திறமையை வளர்க்கும் வழியை தேர்ந்தெடுங்க."`,
          `"அட்மிஷன் கவுன்சிலிங் ஆரம்பிக்கிறதுக்கு முன்னாடி, இந்த ரீலை சேவ் பண்ணி வச்சுக்கோங்க."`,
        ],
        onscreen: [
          `பெரிய +2 தவறு ⚠️`,
          `நண்பர்களை காப்பி பண்ணாதீங்க`,
          `நில்லுங்க 🛑 சரியான வழி`,
          `1. AI சிலபஸ்  2. நேரடி லேப்  3. வழிகாட்டல்`,
          `உண்மையான திறனை உருவாக்குங்கள்`,
          `கவுன்சிலிங்கிற்கு சேவ் பண்ணுங்க`,
        ],
      },
      Telugu: {
        dialogue: [
          `"+2 అయిపోయిన తర్వాత 90% విద్యార్థులు చేసే అతి పెద్ద పొరపాటు ఏమిటో తెలుసా?"`,
          `"స్నేహితులు జాయిన్ అయ్యారని మీరూ అదే కోర్సు తీసుకుంటే, నాలుగేళ్ల తర్వాత తీవ్రంగా బాధపడతారు."`,
          `"ఒక్క నిమిషం ఆగండి! నిర్ణయం తీసుకునే ముందు ఈ చిన్న నిబంధనను గమనించండి."`,
          `"ఈ 3 విషయాలు తప్పక చూడండి: 1. సిలబస్‌లో ఆధునిక AI & టెక్నాలజీ ఉందా? 2. మొదటి సంవత్సరం నుంచే ప్రాక్టికల్ ల్యాబ్ సదుపాయం ఉందా? 3. ఇండస్ట్రీ మెంటార్షిప్ ఉందా?"`,
          `"కేవలం పరీక్షలు పాస్ అవ్వడానికి కాలేజీ ఎంచుకోవద్దు. మీ నిజమైన నైపుణ్యాన్ని పెంచే మార్గాన్ని ఎంచుకోండి."`,
          `"అడ్మిషన్ల కౌన్సిలింగ్ ప్రారంభమయ్యే లోపే ఈ రీల్‌ను సేవ్ చేసి పెట్టుకోండి."`,
        ],
        onscreen: [
          `+2 పెద్ద పొరపాటు ⚠️`,
          `స్నేహితులను చూసి కాపీ చేయొద్దు`,
          `ఆగండి 🛑 సరైన మార్గం`,
          `1. AI సిలబస్  2. ప్రాక్టికల్ ల్యాబ్  3. గైడెన్స్`,
          `నిజమైన నైపుణ్యం నిర్మించుకోండి`,
          `కౌన్సిలింగ్ కోసం సేవ్ చేసుకోండి`,
        ],
      },
      Malayalam: {
        dialogue: [
          `"+2 കഴിഞ്ഞതിന് ശേഷം 90% വിദ്യാർത്ഥികളും ചെയ്യുന്ന ഏറ്റവും വലിയ തെറ്റ് എന്താണെന്ന് അറിയാമോ?"`,
          `"സുഹൃത്തുക്കൾ ചേർന്നതുകൊണ്ട് മാത്രം നിങ്ങളും അതേ കോഴ്സ് എടുത്താൽ, നാല് വർഷം കഴിഞ്ഞ് നിങ്ങൾ ഖേദിക്കേണ്ടി വരും."`,
          `"ഒരു നിമിഷം നിൽക്കൂ! തീരുമാനം എടുക്കുന്നതിന് മുൻപ് ഈ ലളിതമായ നിയമം ശ്രദ്ധിക്കൂ."`,
          `"ഈ 3 കാര്യങ്ങൾ പരിശോധിക്കൂ: 1. സിലബസിൽ ആധുനിക AI & ടെക്നോളജി ഉണ്ടോ? 2. ആദ്യ വർഷം മുതൽ പ്രാക്ടിക്കൽ ലാബ് സൗകര്യം ലഭിക്കുമോ? 3. ഇൻഡസ്ട്രി മെന്റർഷിപ്പ് ഉണ്ടോ?"`,
          `"പരീക്ഷ ജയിക്കാൻ വേണ്ടി മാത്രം കോഴ്സ് തിരഞ്ഞെടുക്കരുത്. നിങ്ങളുടെ ഭാവി കരുപ്പിടിപ്പിക്കുന്ന അവസരം തിരഞ്ഞെടുക്കൂ."`,
          `"അഡ്മിഷൻ കൗൺസിലിംഗ് തുടങ്ങുന്നതിന് മുൻപായി ഈ റീൽ ഇപ്പോൾ തന്നെ സേവ് ചെയ്തു വെക്കൂ."`,
        ],
        onscreen: [
          `+2 വലിയ തെറ്റ് ⚠️`,
          `സുഹൃത്തുക്കളെ അനുകരിക്കരുത്`,
          `നിൽക്കൂ 🛑 ശരിയായ വഴി`,
          `1. AI സിലബസ്  2. ലാബ് സൗകര്യം  3. മെന്റർഷിപ്പ്`,
          `യഥാർത്ഥ കഴിവ് വളർത്തൂ`,
          `കൗൺസിലിംഗിനായി സേവ് ചെയ്യൂ`,
        ],
      },
      Hindi: {
        dialogue: [
          `"+2 के बाद 90% छात्र सबसे बड़ी गलती क्या करते हैं, जानते हैं?"`,
          `"सिर्फ इसलिए कोई कोर्स चुन लेना क्योंकि दोस्तों ने लिया है, चार साल बाद आपको भारी पड़ सकता है।"`,
          `"एक सेकंड रुको! कोई भी फॉर्म भरने से पहले यह 3-स्टेप नियम समझ लो।"`,
          `"ये 3 बातें चेक करो: 1. क्या सिलेबस में मॉडर्न AI और टेक शामिल है? 2. क्या पहले साल से रियल लैब एक्सेस मिलेगा? 3. क्या इंडस्ट्री मेंटर्स गाइड करेंगे?"`,
          `"कॉलेज सिर्फ डिग्री लेने की जगह नहीं, बल्कि अपने करियर को लॉन्च करने का मंच होना चाहिए।"`,
          `"एडमिशन काउंसलिंग शुरू होने से पहले इस रील को अभी सेव कर लो।"`,
        ],
        onscreen: [
          `+2 की सबसे बड़ी गलती ⚠️`,
          `दोस्तों की देखा-देखी मत चुनो`,
          `रुको 🛑 सही रास्ता समझो`,
          `1. AI सिलेबस  2. प्रैक्टिकल लैब्स  3. मेंटरशिप`,
          `सच्ची काबिलियत बनाओ`,
          `काउंसलिंग के लिए सेव करें`,
        ],
      },
    },
    ai_tech: {
      Tamil: {
        dialogue: [
          `"AI உங்க எதிர்கால வேலையை பறிச்சிடும்னு பயமா இருக்கா? இதோ உண்மையான தகவல்."`,
          `"பழைய தியரியை மட்டும் படிச்சா வேலை கிடைப்பது கஷ்டம். ஆனா நவீன AI டூல்ஸ் பயன்படுத்த தெரிஞ்சா டிமாண்ட் 10 மடங்கு அதிகம்."`,
          `"கொஞ்சம் நில்லுங்க! உண்மையான வளர்ச்சி தியரில இல்ல, Joy University-ன் பிராக்டிகல் AI லேப்ல தான் இருக்கு."`,
          `"டாப் 3 எதிர்காலத் துறைகள்: 1. AI & டேட்டா இன்டெலிஜென்ஸ், 2. ஸ்மார்ட் அக்ரி-டெக், 3. கார்ப்பரேட் சைபர் லா."`,
          `"AI உங்களை மாற்றாது. ஆனால் AI-யை சரியாக பயன்படுத்த தெரிந்த ஒருவர்தான் எதிர்காலத்தை வழிநடத்துவார்."`,
          `"கீழே 'AI' ன்னு கமெண்ட் பண்ணுங்க, சிறந்த எதிர்கால கோர்ஸ்களை உங்களுக்கு அனுப்புகிறோம்."`,
        ],
        onscreen: [
          `AI vs உங்க எதிர்காலம் 🤖`,
          `தியரி போதாது`,
          `உண்மையான AI லேப் ⚡`,
          `1. AI & டேட்டா  2. அக்ரி-டெக்  3. சைபர் லா`,
          `நீங்களே உருவாக்குங்கள்`,
          `'AI' என கமெண்ட் பண்ணுங்க`,
        ],
      },
      Telugu: {
        dialogue: [
          `"AI మీ భవిష్యత్ ఉద్యోగాలను తీసేసుకుంటుందని భయపడుతున్నారా? అసలు నిజం ఇదీ."`,
          `"పాత పుస్తకాల థియరీ చదివితే కష్టం. కానీ AI టూల్స్ వాడటం తెలిస్తే మీ డిమాండ్ పది రెట్లు పెరుగుతుంది."`,
          `"ఒక్క నిమిషం ఆగండి! నిజమైన ఎదుగుదల థియరీలో కాదు, Joy University ప్రాక్టికల్ AI ల్యాబ్స్ లో ఉంది."`,
          `"టాప్ 3 ఫ్యూచర్ కెరీర్లు: 1. AI & డేటా సైన్స్, 2. స్మార్ట్ అగ్రి-టెక్, 3. కార్పొరేట్ సైబర్ లా."`,
          `"AI మిమ్మల్ని రీప్లేస్ చేయదు. AI ను సమర్థవంతంగా ఉపయోగించే వ్యక్తే ముందంజలో ఉంటాడు."`,
          `"కింద 'AI' అని కామెంట్ చేయండి, బెస్ట్ ఫ్యూచర్ కోర్సుల వివరాలు పంపుతాం."`,
        ],
        onscreen: [
          `AI vs మీ భవిష్యత్తు 🤖`,
          `థియరీ సరిపోదు`,
          `ప్రాక్టికల్ AI ల్యాబ్స్ ⚡`,
          `1. AI & డేటా  2. అగ్రి-టెక్  3. సైబర్ లా`,
          `నైపుణ్యంతో ముందుండండి`,
          `'AI' అని కామెంట్ చేయండి`,
        ],
      },
      Malayalam: {
        dialogue: [
          `"AI നിങ്ങളുടെ ഭാവി ജോലി ഇല്ലാതാക്കുമെന്ന് ഭയമുണ്ടോ? ഇതാണ് യഥാർത്ഥ വസ്തുത."`,
          `"പഴയ തിയറി മാത്രം പഠിച്ചാൽ പോരാ. എന്നാൽ ആധുനിക AI ടൂളുകൾ കൈകാര്യം ചെയ്യാൻ അറിയാമെങ്കിൽ ഡിമാൻഡ് പത്തിരട്ടിയാണ്."`,
          `"ഒരു നിമിഷം നിൽക്കൂ! യഥാർത്ഥ മാറ്റം പുസ്തകങ്ങളിലല്ല, Joy University-ലെ പ്രാക്ടിക്കൽ AI ലാബുകളിലാണ്."`,
          `"3 മികച്ച ഭാവി കരിയറുകൾ: 1. AI & ഡാറ്റാ സയൻസ്, 2. സ്മാർട്ട് അഗ്രി-ടെക്, 3. സൈബർ ലോ."`,
          `"AI നിങ്ങളെ മാറ്റിവെക്കില്ല. എന്നാൽ AI ഉപയോഗിക്കാൻ അറിയുന്ന ഒരാൾ മുന്നിലെത്തും."`,
          `"താഴെ 'AI' എന്ന് കമന്റ് ചെയ്യൂ, മികച്ച ഫ്യൂച്ചർ കോഴ്സുകൾ ഞങ്ങൾ അയച്ചുതരാം."`,
        ],
        onscreen: [
          `AI vs നിങ്ങളുടെ കരിയർ 🤖`,
          `തിയറി മാത്രം പോരാ`,
          `യഥാർത്ഥ AI ലാബ് ⚡`,
          `1. AI & ഡാറ്റ  2. അഗ്രി-ടെക്  3. സൈബർ ലോ`,
          `നിങ്ങൾ മുന്നേറൂ`,
          `'AI' എന്ന് കമന്റ് ചെയ്യൂ`,
        ],
      },
      Hindi: {
        dialogue: [
          `"क्या डर लग रहा है कि AI आपकी भविष्य की नौकरी खा जाएगा? यह रहा असली सच।"`,
          `"सिर्फ पुरानी थ्योरी पढ़ने से बात नहीं बनेगी। लेकिन अगर AI टूल्स इस्तेमाल करना आता है, तो आपकी डिमांड 10 गुना होगी।"`,
          `"एक सेकंड रुको! असली इनोवेशन सिर्फ किताबों में नहीं, Joy University की प्रैक्टिकल AI लैब्स में होता है।"`,
          `"टॉप 3 फ्यूचर ट्रैक्स: 1. AI और डेटा इंटेलिजेंस, 2. स्मार्ट एग्री-टेक, 3. टेक और कॉर्पोरेट लॉ।"`,
          `"AI आपको रिप्लेस नहीं करेगा, बल्कि AI को सही इस्तेमाल करने वाला इंसान सबसे आगे निकलेगा।"`,
          `"नीचे 'AI' कमेंट करें, हम आपको बेस्ट फ्यूचर-रेडी कोर्सेस की लिस्ट भेजेंगे।"`,
        ],
        onscreen: [
          `AI vs आपका करियर 🤖`,
          `थ्योरी काफी नहीं`,
          `रियल AI लैब्स ⚡`,
          `1. AI & डेटा  2. एग्री-टेक  3. टेक लॉ`,
          `खुद को तैयार करो`,
          `'AI' कमेंट करें`,
        ],
      },
    },
  };

  // If we have a dedicated category match for this language, apply it
  const catData = categoryNativeContent[category]?.[language];
  if (catData) {
    return shots.map((s, idx) => ({
      ...s,
      dialogue: catData.dialogue[idx] || s.dialogue,
      onscreenText: catData.onscreen[idx] || s.onscreenText,
    }));
  }

  // Otherwise, inspect each shot: if dialogue is missing native script, apply universal high-impact native dialogue
  return shots.map((s) => {
    if (!pattern.test(s.dialogue)) {
      if (language === 'Tamil') {
        if (s.type === 'HOOK') s.dialogue = `"${cleanTitle} பத்தி யோசிச்சு கன்பியூஸ் ஆகிட்டே இருக்கீங்களா? இந்த ஒரு நிமிஷம் கவனிங்க."`;
        else if (s.type === 'PROBLEM') s.dialogue = `"எல்லாரும் சொல்ற ஒவ்வொரு அட்வைஸையும் கேட்டு குழம்பாதீங்க. உங்களுக்கான சரியான வழியை தேர்வு செய்யுங்க."`;
        else if (s.type === 'PATTERN_INTERRUPT') s.dialogue = `"கொஞ்சம் நில்லுங்க! மத்தவங்க சொல்றதை விட்டுட்டு, இந்த ஒரு கேள்வியை யோசிங்க."`;
        else if (s.type === 'VALUE') s.dialogue = `"3 விஷயத்தை செக் பண்ணுங்க: பிராக்டிகல் வேலை, நவீன டெக்னாலஜி சிலபஸ், அப்புறம் நேரடி லேப் அனுபவம்."`;
        else if (s.type === 'PAYOFF') s.dialogue = `"உண்மையான திறமையை வளர்க்கும் வழியை தேர்வு செஞ்சா, எதிர்கால பயமே இருக்காது."`;
        else if (s.type === 'CTA') s.dialogue = `"அட்மிஷன் ஆரம்பிக்கிறதுக்கு முன்னாடி இந்த ரீலை சேவ் பண்ணி வச்சுக்கோங்க."`;
        if (!pattern.test(s.onscreenText)) s.onscreenText = `${cleanTitle}? 🎯`;
      } else if (language === 'Telugu') {
        if (s.type === 'HOOK') s.dialogue = `"${cleanTitle} గురించి ఆలోచించి కన్‌ఫ్యూజ్ అవుతున్నారా? ఒక్క నిమిషం ఇది చూడండి."`;
        else if (s.type === 'PROBLEM') s.dialogue = `"అందరూ చెప్పే ప్రతి సలహానూ గుడ్డిగా నమ్మి మీ కెరీర్‌ను అయోమయంలో పడేయకండి."`;
        else if (s.type === 'PATTERN_INTERRUPT') s.dialogue = `"ఒక్క నిమిషం ఆగండి! ఇతరుల మాటలను పక్కనపెట్టి, ఈ ఒక్క ప్రశ్న ఆలోచించండి."`;
        else if (s.type === 'VALUE') s.dialogue = `"ఈ 3 విషయాలు చూడండి: ప్రాక్టికల్ నైపుణ్యం, మోడరన్ సిలబస్, మరియు లైవ్ ల్యాబ్స్."`;
        else if (s.type === 'PAYOFF') s.dialogue = `"నిజమైన నైపుణ్యాన్ని అందించే కోర్సును ఎంచుకుంటే, భవిష్యత్తు గురించి ఎలాంటి భయమూ ఉండదు."`;
        else if (s.type === 'CTA') s.dialogue = `"అడ్మిషన్ల కౌన్సిలింగ్ కంటే ముందే ఈ రీల్‌ను సేవ్ చేసుకోండి."`;
        if (!pattern.test(s.onscreenText)) s.onscreenText = `${cleanTitle}? 🎯`;
      } else if (language === 'Malayalam') {
        if (s.type === 'HOOK') s.dialogue = `"${cleanTitle}-നെ കുറിച്ച് ആലോചിച്ച് കൺഫ്യൂസ് ആകുകയാണോ? ഒരു നിമിഷം ഇത് കാണൂ."`;
        else if (s.type === 'PROBLEM') s.dialogue = `"എല്ലാവരും പറയുന്ന ഓരോ വാക്കും കേട്ട് നിങ്ങളുടെ ഭാവി അപകടത്തിലാക്കരുത്."`;
        else if (s.type === 'PATTERN_INTERRUPT') s.dialogue = `"ഒരു നിമിഷം നിൽക്കൂ! ബാക്കിയെല്ലാം മറന്ന് ഈ ഒരു ചോദ്യത്തിന് ഉത്തരം കണ്ടെത്തൂ."`;
        else if (s.type === 'VALUE') s.dialogue = `"3 കാര്യങ്ങൾ ശ്രദ്ധിക്കൂ: പ്രായോഗിക താല്പര്യം, ആധുനിക സിലബസ്, മികച്ച ലാബ് സൗകര്യം."`;
        else if (s.type === 'PAYOFF') s.dialogue = `"യഥാർത്ഥ കഴിവ് തരുന്ന കോഴ്സ് തിരഞ്ഞെടുത്താൽ ഭാവി സുരക്ഷിതമായിരിക്കും."`;
        else if (s.type === 'CTA') s.dialogue = `"അഡ്മിഷന് മുൻപായി ഈ റീൽ ഇപ്പോൾ തന്നെ സേവ് ചെയ്തു വെക്കൂ."`;
        if (!pattern.test(s.onscreenText)) s.onscreenText = `${cleanTitle}? 🎯`;
      } else if (language === 'Hindi') {
        if (s.type === 'HOOK') s.dialogue = `"${cleanTitle} को लेकर क्या आप भी परेशान हैं? एक मिनट यह वीडियो ध्यान से देखिए।"`;
        else if (s.type === 'PROBLEM') s.dialogue = `"सबकी अलग-अलग सलाह सुनकर खुद को उलझन में मत डालिए।"`;
        else if (s.type === 'PATTERN_INTERRUPT') s.dialogue = `"एक सेकंड रुकिए! बाकी सब छोड़िए और खुद से यह एक सवाल पूछिए।"`;
        else if (s.type === 'VALUE') s.dialogue = `"ये 3 बातें चेक करें: असली रुचि, मॉडर्न टेक सिलेबस, और प्रैक्टिकल लैब सुविधाएं।"`;
        else if (s.type === 'PAYOFF') s.dialogue = `"सच्ची काबिलियत देने वाला रास्ता चुनेंगे तो करियर में कभी रुकावट नहीं आएगी।"`;
        else if (s.type === 'CTA') s.dialogue = `"काउंसलिंग शुरू होने से पहले इस रील को अभी सेव कर लें।"`;
        if (!pattern.test(s.onscreenText)) s.onscreenText = `${cleanTitle}? 🎯`;
      }
    }
    return s;
  });
}

export function generateKnowledgeEngineStoryboard(
  title: string,
  direction: CreativeDirection = 'Student Relatable',
  language: LanguageOption = 'English',
  customDuration: string = '28 sec',
  variationSeed: number = 1
): ReelStoryboard {
  const analysis = analyzeTitle(title);
  const now = new Date().toISOString();
  const id = `joy_reel_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const cleanTitle = analysis.cleanTopic;

  const isTamil = language === 'Tamil';
  const isTanglish = language === 'Tanglish';
  const isTelugu = language === 'Telugu';
  const isMalayalam = language === 'Malayalam';
  const isHindi = language === 'Hindi';

  let shots: Shot[] = [];

  switch (analysis.category) {
    case 'mistakes':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist stands holding three college application folders, suddenly tossing one into a recycle bin with a sharp, candid look at camera.`,
          dialogue: isTamil
            ? `"+2 mudichutu innum neriya per panra biggest mistake enna theriyuma?"`
            : isTanglish
            ? `"Bro, +2 mudichutu 90% students panra biggest mistake enna theriyuma? Let\'s talk honestly."`
            : `"Before you lock in any college form, stop. 90% of +2 students make this exact mistake."`,
          onscreenText: `BIGGEST +2 MISTAKE ⚠️`,
          cameraPerformance: `Fast push-in from wide room to direct, urgent eye-level close-up.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist looks at a phone screen showing WhatsApp group chats where friends are copying each other\'s course selections.`,
          dialogue: isTamil
            ? `"Friends edukuranga-nu neengalum adhey course choose panna, 4 years kazhichu regret pannuveenga."`
            : isTanglish
            ? `"Mistake #1: Choosing a course just because your best friend took it. Four years down the line, unga interest vera, avanga path vera."`
            : `"Mistake #1: Picking a degree just because your friends picked it. What fits their goals could be four years of misery for you."`,
          onscreenText: `MISTAKE 1: COPYING FRIENDS`,
          cameraPerformance: `Over-the-shoulder POV shot panning between smartphone screen and stressed face.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Protagonist snaps fingers; screen instantly flashes black & white, all audio cuts to dead silence for 1 second before snappy beat resumes.`,
          dialogue: isTamil
            ? `"Wait! Stop right there. Look at how smart students decide."`
            : isTanglish
            ? `"Wait! Stop scrolling. Idhai correct panna oru simple rule irukku."`
            : `"Wait. Stop right there. Here is the 3-step rule smart students use instead."`,
          onscreenText: `STOP 🛑 HERE'S THE FIX`,
          cameraPerformance: `Sudden snap-zoom on protagonist snapping fingers with direct fourth-wall break.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist walks across Joy University\'s modern campus courtyard, pointing to three bold graphic pillars appearing on screen.`,
          dialogue: isTamil
            ? `"Rule 1: Check practical lab access. Rule 2: Industry projects from 2nd year. Rule 3: Digital & AI integration in your syllabus."`
            : isTanglish
            ? `"3 Rules to follow: First, syllabus-la modern tech iruka? Second, hands-on labs from Day 1? Third, real industry mentorship?"`
            : `"Follow these 3 checks: 1. Is modern tech embedded in the syllabus? 2. Do you get 100% lab freedom from year one? 3. Does the campus have active industry ties?"`,
          onscreenText: `1. TECH SYLLABUS  2. ACTIVE LABS  3. MENTORSHIP`,
          cameraPerformance: `Smooth gimbal tracking shot moving backwards with protagonist walking in bright, open sunlight.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist sits at a vibrant campus cafe table with peer creators, notebook open, smiling with clarity and relief.`,
          dialogue: isTamil
            ? `"Don\'t choose a degree for the next 4 years. Choose it for who you want to become."`
            : isTanglish
            ? `"College is not just passing exams. It\'s about building real capability."`
            : `"Don\'t pick a college just to pass exams. Pick a launchpad that builds your real-world capability."`,
          onscreenText: `BUILD REAL CAPABILITY`,
          cameraPerformance: `Warm, natural medium shot with genuine confident smile.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist turns phone toward screen showing course options portal.`,
          dialogue: isTamil
            ? `"Save this reel before your admissions counseling starts."`
            : isTanglish
            ? `"Save this reel right now before you finalize your applications."`
            : `"Save this reel before you finalize your college applications."`,
          onscreenText: `SAVE THIS FOR COUNSELING`,
          cameraPerformance: `Centered portrait framing with subtle Joy University red lower-third accent.`,
        },
      ];
      break;

    case 'ai_tech':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist looks up from laptop where AI code or prompt is generating text rapidly, leaning into camera with intense focus.`,
          dialogue: isTamil
            ? `"AI unga future job-ah eduthudum-nu bayama iruka? Here is the truth."`
            : isTanglish
            ? `"Everyone is screaming that AI will destroy jobs after +2. But here is the side nobody is showing you."`
            : `"Everyone is panicking that AI will wipe out careers. But here is what\'s actually happening."`,
          onscreenText: `AI VS YOUR CAREER 🤖`,
          cameraPerformance: `Fast low-angle push-in with laptop screen reflection in student\'s eyes.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Student points to a chart showing traditional routine jobs dropping while tech-hybrid jobs rise sharply.`,
          dialogue: isTamil
            ? `"Pazhaya syllabus padicha job kidaikadhu. But AI tools use panna therinja, demand is 10x."`
            : isTanglish
            ? `"If you study outdated theory, you will struggle. But if your degree embeds computational intelligence, you become irreplaceable."`
            : `"Rote memorization is dead. But when you combine your core field with computational intelligence, your market value skyrockets."`,
          onscreenText: `ROTE THEORY IS DEAD`,
          cameraPerformance: `Medium tracking shot following hand gestures across interactive visual graphic.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Cut to Joy University AI & Computational Intelligence Lab: a robotics prototype whirs to life, LED indicators blinking bright blue.`,
          dialogue: isTamil
            ? `"Wait. Real innovation theory-la illa, hands-on lab-la dhaan irukku."`
            : isTanglish
            ? `"Hold on! Stop looking at textbook slides. Look at real lab building."`
            : `"Wait. Stop reading slides. Look at what building with AI actually looks like."`,
          onscreenText: `REAL AI IN ACTION ⚡`,
          cameraPerformance: `Macro dynamic rack focus from glowing circuit to student smiling behind safety glasses.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist breaks down 3 emerging tech pathways on a clean glass board on campus.`,
          dialogue: isTamil
            ? `"Top 3 future tracks: 1. AI & Data Intelligence, 2. Smart Agriculture & Agri-Tech, 3. Digital Business & Cyber Law."`
            : isTanglish
            ? `"3 High-growth tracks right now: AI & Machine Intelligence, Smart Agri-Tech systems, and Tech-driven Corporate Law."`
            : `"Look at these 3 future-proof tracks: AI & Computational Intelligence, Smart Agri-Tech, and Tech-driven Corporate Law."`,
          onscreenText: `1. AI & DATA  2. AGRI-TECH  3. TECH LAW`,
          cameraPerformance: `Side tracking shot with kinetic on-screen icons popping up in sync with speech.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist joins peers working on laptops in Joy University\'s collaborative design & tech hub.`,
          dialogue: isTamil
            ? `"AI won\'t replace you. Someone who knows how to build with AI will."`
            : isTanglish
            ? `"AI ungalai replace pannadhu. AI use panna therinjavanga dhaan lead pannuvanga."`
            : `"AI won\'t replace you. But a professional who knows how to leverage AI will."`,
          onscreenText: `BE THE ONE WHO BUILDS`,
          cameraPerformance: `Dynamic wide shot capturing modern campus collaboration environment.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist looks directly at camera with confident, friendly expression.`,
          dialogue: isTamil
            ? `"Comment 'AI' below and we\'ll send you the top future tech courses."`
            : isTanglish
            ? `"Comment 'AI' below to get our breakdown of future-proof degree tracks."`
            : `"Comment 'AI' below and we\'ll break down the top emerging degree options."`,
          onscreenText: `COMMENT 'AI' FOR THE GUIDE`,
          cameraPerformance: `Centered portrait shot with clean Joy University logo accent.`,
        },
      ];
      break;

    case 'college_compare':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist holds two identical glossy college brochures, looking directly into the camera with a raised eyebrow.`,
          dialogue: isTamil
            ? `"Ellam college-um '100% placement' nu solranga. But unmaiyana difference enna theriyuma?"`
            : isTanglish
            ? `"Every single college brochure promises 100% placement and world-class campus. How do you actually tell the difference?"`
            : `"Every college brochure looks identical: tall buildings and '100% placement'. But how do you actually spot a great campus?"`,
          onscreenText: `HOW TO COMPARE COLLEGES 🏫`,
          cameraPerformance: `Quick push-in from wide desk to expressive direct address to camera.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist flips through pages highlighting generic stock photos of empty conference halls and stock handshake images.`,
          dialogue: isTamil
            ? `"Building perusa irundha mattum podhadhu. Real practical learning nadakudha nu paakanum."`
            : isTanglish
            ? `"Shiny buildings don\'t guarantee practical learning. If professors only teach theory, you won\'t build real skills."`
            : `"Glass buildings don\'t build your career. If the labs are locked and students only memorize slides, you lose."`,
          onscreenText: `DON\'T FALL FOR BUILDING HYPE`,
          cameraPerformance: `POV shot of finger pointing at generic brochure photos, tilting up to protagonist shaking head.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Abrupt match-cut to a student actively assembling a project prototype on a workbench at Joy University; sparks or soldering iron smoke rises.`,
          dialogue: isTamil
            ? `"Wait! This is what you should look for."`
            : isTanglish
            ? `"Hold up! Check what students are building right now."`
            : `"Wait. Look at what happens inside active project labs."`,
          onscreenText: `CHECK REAL LAB FREEDOM 🔬`,
          cameraPerformance: `Fast whip-pan from static paper brochure into dynamic live lab workspace.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist walks along Joy University\'s 104-acre open green campus boulevard, gesturing to 3 checklist items.`,
          dialogue: isTamil
            ? `"Ask these 3 questions: 1. Lab access Day 1-la iruka? 2. Campus offers multi-disciplinary freedom? 3. Real industry partnerships with verified track record?"`
            : isTanglish
            ? `"3-point campus checklist: 1. Day-1 open lab access, 2. Freedom to learn cross-stream skills, 3. 40+ years of verified institutional legacy."`
            : `"Use this 3-point filter: 1. Open lab access from Day 1, 2. Cross-disciplinary skill freedom, 3. Decades of verified academic legacy."`,
          onscreenText: `1. DAY-1 LABS  2. SKILL FREEDOM  3. VERIFIED LEGACY`,
          cameraPerformance: `Low-angle tracking shot showcasing wide open campus environment and natural daylight.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist stands with confident smile in front of the modern Joy University campus amphitheatre.`,
          dialogue: isTamil
            ? `"The best college gives you the freedom to discover what you\'re truly capable of."`
            : isTanglish
            ? `"Choose an environment that challenges you to build, not just memorize."`
            : `"Choose an environment that challenges you to build real things, not just memorize exams."`,
          onscreenText: `CHOOSE A LAUNCHPAD THAT BUILDS YOU`,
          cameraPerformance: `Heroic medium wide framing with golden hour sunlight.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist smiles warmly, holding student planner.`,
          dialogue: isTamil
            ? `"Save this checklist before your campus visits."`
            : isTanglish
            ? `"Save this reel right now before your college counselling visits."`
            : `"Save this checklist before you visit any college campus."`,
          onscreenText: `SAVE THIS CAMPUS CHECKLIST`,
          cameraPerformance: `Clean centered portrait with branded signature badge.`,
        },
      ];
      break;

    case 'peer_parent':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist sits at a dining table between a parent pointing to an engineering brochure and a friend texting about design courses.`,
          dialogue: isTamil
            ? `"Parents oru course solranga, ungaluku inoru field pidikudha? How to handle this without fighting?"`
            : isTanglish
            ? `"Parents want you to take a traditional safe course, but your heart is somewhere else. How do you bridge the gap?"`
            : `"Parents want one safe traditional course. You want something else. How do you explain it without a family debate?"`,
          onscreenText: `PARENTS VS YOUR CHOICE 🤝`,
          cameraPerformance: `Tense medium shot with quick camera pans between parent and student.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist looks at notebook with frustrated scribble: "Safe degree vs Modern career".`,
          dialogue: isTamil
            ? `"Parents unga security-kaga dhaan bayapaduranga. Because avangaluku modern emerging careers pathi full data theriyala."`
            : isTanglish
            ? `"Understand why parents push traditional degrees: they want financial safety. If you only talk passion without showing career scope, they will worry."`
            : `"Parents push traditional degrees because they care about your security. If you only talk about passion without showing career demand, they will worry."`,
          onscreenText: `THEY WANT YOUR SECURITY`,
          cameraPerformance: `Close-up on handwritten note, then rack focus to thoughtful student expression.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Protagonist turns laptop around to show a clean presentation slide with industry hiring trends and salary growth stats.`,
          dialogue: isTamil
            ? `"Stop arguing. Show them this exact data."`
            : isTanglish
            ? `"Don\'t argue with emotions. Show them the actual numbers."`
            : `"Don\'t argue with emotions. Show them the actual industry data."`,
          onscreenText: `PROOF > ARGUMENTS 📊`,
          cameraPerformance: `Snappy push-in on laptop screen with clean visual graphs.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist outlines 3 points on paper: 1. Industry Demand, 2. Practical Degree Hybrid, 3. University Mentorship.`,
          dialogue: isTamil
            ? `"Show them 3 things: 1. Top companies hiring in this field, 2. Hybrid curriculum blending business/tech, 3. Proven campus placement legacy."`
            : isTanglish
            ? `"Present these 3 points: Current industry job growth, how the degree blends technical tools, and the university\'s established placement track record."`
            : `"Present these 3 facts: 1. Verified industry growth, 2. How modern courses blend tech with domain skills, and 3. Decades of university placement legacy."`,
          onscreenText: `1. MARKET DEMAND  2. TECH BLEND  3. LEGACY`,
          cameraPerformance: `Over-the-shoulder tracking shot while student writes neatly on notepad.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist smiles warmly, showing parent nodding with understanding and support.`,
          dialogue: isTamil
            ? `"When you bring clarity instead of conflict, parents will become your biggest supporters."`
            : isTanglish
            ? `"Clarity builds confidence. When parents see a real plan, they will support you 100%."`
            : `"When you bring real clarity instead of emotion, your parents become your strongest supporters."`,
          onscreenText: `CLARITY BUILDS CONFIDENCE`,
          cameraPerformance: `Reassuring medium shot with natural warm lighting.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist looks directly into lens with friendly nod.`,
          dialogue: isTamil
            ? `"Share this reel with a friend preparing for course discussions at home."`
            : isTanglish
            ? `"Share this with a friend who is having this conversation at home right now."`
            : `"Share this with a friend who needs to have this conversation at home."`,
          onscreenText: `SHARE WITH A FRIEND`,
          cameraPerformance: `Direct eye contact portrait with Joy University color accent.`,
        },
      ];
      break;

    case 'passion_skills':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist sketches a design or writes code on a laptop in a sunlit room, pausing and looking up skeptically.`,
          dialogue: isTamil
            ? `"'Follow your passion' nu solranga... but can passion actually pay your bills?"`
            : isTanglish
            ? `"Everyone says \'follow your passion\' after +2. But how do you turn passion into a real high-demand career?"`
            : `"Everyone tells you to \'follow your passion\'. But how do you actually turn your interests into a high-value career?"`,
          onscreenText: `CAN PASSION PAY BILLS? 💡`,
          cameraPerformance: `Dynamic close-up push-in on protagonist looking directly at viewer.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist splits a whiteboard into two sides: "What I Like" vs "What Industry Hires For".`,
          dialogue: isTamil
            ? `"Passion mattum irundha hobby. But market demand kooda combine panna, it becomes a solid career."`
            : isTanglish
            ? `"Passion alone is just a hobby. But when you attach digital tools and computational intelligence, it becomes an unstoppable career."`
            : `"Passion alone is just a hobby. But when you attach practical tech and industry tools, it becomes an unstoppable career."`,
          onscreenText: `PASSION + DIGITAL TOOLS`,
          cameraPerformance: `Medium shot tracking quick marker strokes on whiteboard.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Student taps the camera lens; scene shifts instantly to a high-tech university digital design and innovation lab.`,
          dialogue: isTamil
            ? `"Wait! Look at how modern creators build careers."`
            : isTanglish
            ? `"Wait! Check out how students are turning skills into proof."`
            : `"Wait. Look at how modern students are turning skills into proof."`,
          onscreenText: `TURNING SKILLS INTO PROOF 🚀`,
          cameraPerformance: `Direct lens tap transition with smooth match cut to lab setting.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist points to 3 high-impact skill-stacking pathways.`,
          dialogue: isTamil
            ? `"The 3-part formula: 1. Core interest, 2. Modern computational tools, 3. Real portfolio projects built during college."`
            : isTanglish
            ? `"Use this formula: Core passion + computational tech layer + real campus client projects. You will never be unemployed."`
            : `"Use this 3-part formula: Core interest + computational tech layer + real campus projects. That\'s how you build real career leverage."`,
          onscreenText: `1. INTEREST  2. TECH LAYER  3. PORTFOLIO`,
          cameraPerformance: `Steadicam tracking shot showing active students creating in modern workspace.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist presents a completed digital prototype with team at Joy University entrepreneurship center.`,
          dialogue: isTamil
            ? `"Don\'t just follow your passion. Build the skills that make it valuable."`
            : isTanglish
            ? `"Don\'t just dream about it. Build the proof that makes your skills undeniable."`
            : `"Don\'t just dream about your passion. Build the proof that makes your skills undeniable."`,
          onscreenText: `MAKE YOUR SKILLS UNDENIABLE`,
          cameraPerformance: `Confident medium shot with team celebration in background.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist smiles at camera with tablet in hand.`,
          dialogue: isTamil
            ? `"Comment your favorite subject and let\'s explore matching modern degrees."`
            : isTanglish
            ? `"Comment your top interest below and we\'ll suggest high-growth degree matches."`
            : `"Comment your top interest below and let\'s map out the best degree matches."`,
          onscreenText: `COMMENT YOUR TOP INTEREST`,
          cameraPerformance: `Centered portrait framing with Joy University branding.`,
        },
      ];
      break;

    case 'commerce':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist sits at a study desk, staring at three identical accounting textbooks, looking visibly skeptical.`,
          dialogue: isTamil
            ? `"+2 Commerce mudichutu B.Com mattum dhaan option-nu nenachutu irukingala?"`
            : isTanglish
            ? `"Bro, commerce mudichutu verum plain B.Com mattum dhaan irukku-nu yaravadhu sonnangala?"`
            : `"Someone probably told you that Commerce after +2 just means plain old B.Com."`,
          onscreenText: `COMMERCE = ONLY B.COM? 🤔`,
          cameraPerformance: `Tight handheld push-in on protagonist face with relatable eye-roll.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist scrolls through job postings where standard manual bookkeeping roles are crowded with thousands of identical applicants.`,
          dialogue: isTamil
            ? `"Traditional syllabus won\'t cut it. Market full-ah fintech, analytics, corporate law-nu maariduchu."`
            : isTanglish
            ? `"The corporate world moved to fintech and business analytics. Plain theory leaves you stuck in a resume pile."`
            : `"Standard bookkeeping is automated. The old 3-year playbook leaves you fighting with thousands of identical resumes."`,
          onscreenText: `THE RESUME TRAP`,
          cameraPerformance: `POV shot of glowing smartphone screen cutting to a worried expression.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Friend steps in and slaps down a tablet showing real-time FinTech analytics and stock charts, shutting the dusty textbook.`,
          dialogue: isTamil
            ? `"Wait! Book-ah moodunga. Look at where real finance is happening."`
            : isTanglish
            ? `"Hold on! Stop scrolling. Idhai paarunga."`
            : `"Wait. Close that dusty book. Look at where actual finance is happening today."`,
          onscreenText: `MODERN FINTECH 📈`,
          cameraPerformance: `Rapid snap-zoom to tablet screen with snappy book-slam foley.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Two students walk across Joy University\'s open campus, pointing to kinetic text callouts appearing in the air.`,
          dialogue: isTamil
            ? `"Compare these 3 tracks: FinTech & AI Analytics, Corporate Law with BBA, and Digital Entrepreneurship."`
            : isTanglish
            ? `"Three high-growth options: FinTech with analytics, Corporate Law, and Tech Entrepreneurship. Business plus tech is unbeatable."`
            : `"Compare these three high-growth paths: FinTech with analytics, Corporate Law, and Tech Entrepreneurship. Business acumen plus tech tools is unbeatable."`,
          onscreenText: `1. FINTECH  2. CORP LAW  3. ENTREPRENEURSHIP`,
          cameraPerformance: `Smooth low-angle tracking shot walking with actors in natural daylight.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist works inside Joy University\'s modern entrepreneurship and business hub with team.`,
          dialogue: isTamil
            ? `"Commerce is no longer just counting numbers. It\'s about building and scaling businesses."`
            : isTanglish
            ? `"Commerce na verum ledger illa. It\'s about steering future industries."`
            : `"Commerce isn\'t about filling ledgers anymore. It\'s about running future industries."`,
          onscreenText: `RUN FUTURE INDUSTRIES`,
          cameraPerformance: `Medium close-up with authentic confident smile.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist turns phone toward viewer displaying course exploration portal.`,
          dialogue: isTamil
            ? `"Save this reel and share it with your commerce group."`
            : isTanglish
            ? `"Save this reel right now before your counselling starts."`
            : `"Save this reel before you finalize your commerce applications."`,
          onscreenText: `SAVE FOR COMMERCE ADMISSIONS`,
          cameraPerformance: `Static eye-level hero shot with Joy University logo graphic.`,
        },
      ];
      break;

    case 'engineering':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist stands before a whiteboard with 10 engineering branches written, crossing arms in utter overwhelm.`,
          dialogue: isTamil
            ? `"Ellarum B.Tech choose panranga-nu neengalum adhey track-la pogaporeengala?"`
            : isTanglish
            ? `"Everyone says just take B.Tech. But what if standard engineering is the exact wrong fit for you?"`
            : `"Everyone told you to just pick Engineering because it has 'scope'. But what if that's completely wrong?"`,
          onscreenText: `DON'T CHOOSE B.TECH BY DEFAULT ⚙️`,
          cameraPerformance: `Whip pan from whiteboard scribble to protagonist's skeptical gaze.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Student looks at brochures where every single page looks copy-pasted with obsolete theory.`,
          dialogue: isTamil
            ? `"4 varusham pass aana mattum podhadhu. Hands-on coding and real lab exposure illana, degree is just a paper."`
            : isTanglish
            ? `"Mugging up syllabus doesn\'t get you hired anymore. Practical innovation dhaan matters."`
            : `"Memorizing formulas for four years won\'t build real systems. If the college doesn\'t give you real lab freedom, you lose."`,
          onscreenText: `THE 4-YEAR REGRET`,
          cameraPerformance: `Slow push-in with rack focus from paper brochure to student\'s stressed expression.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Sudden cut to robotic sensor or computer vision hardware spinning into focus in an advanced lab; audio drops to pure mechanical sound.`,
          dialogue: isTamil
            ? `"Wait. Idhudhaan unmaiyana modern engineering."`
            : isTanglish
            ? `"Hold up! Stop looking at textbook syllabus. Look at this."`
            : `"Wait. Look at what actual engineering looks like today."`,
          onscreenText: `REAL ENGINEERING ⚡`,
          cameraPerformance: `Extreme macro close-up of high-tech gear with cinematic lighting.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist points out 3 clear checkmarks on clipboard while standing in Joy University\'s Computational Intelligence Lab.`,
          dialogue: isTamil
            ? `"Rule 1: Look for Computational Intelligence or AI integration. Rule 2: 100% practical lab access. Rule 3: Industry projects from 2nd year."`
            : isTanglish
            ? `"Check these three things: Computational intelligence focus, real lab access from Day 1, and projects over pure theory."`
            : `"Ask these 3 questions: Is AI embedded in the curriculum? Do you touch real hardware from year one? And do professors build with industry?"`,
          onscreenText: `1. AI INTEGRATED  2. LABS DAY-1  3. INDUSTRY PROJECTS`,
          cameraPerformance: `Medium tracking shot showcasing student peers actively collaborating on live prototypes.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist high-fives teammate after deploying code to a live robotics station.`,
          dialogue: isTamil
            ? `"Engineering is not about getting a degree. It\'s about building things that work."`
            : isTanglish
            ? `"Engineering na paper degree illa. It\'s about building real things."`
            : `"Engineering isn\'t about memorizing theory. It\'s about the thrill of building things that actually work."`,
          onscreenText: `BUILD THINGS THAT MATTER`,
          cameraPerformance: `Dynamic low-angle wide shot capturing student achievement.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist speaks directly into lens with friendly, warm authority.`,
          dialogue: isTamil
            ? `"Comment your stream below, and let\'s discuss your best engineering options."`
            : isTanglish
            ? `"Comment your +2 marks or group below — let\'s find your exact match."`
            : `"Comment the course you\'re considering below and we\'ll break down its real industry scope."`,
          onscreenText: `COMMENT YOUR TARGET COURSE`,
          cameraPerformance: `Clean static medium close-up with Joy University color accent.`,
        },
      ];
      break;

    case 'marks_anxiety':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Close up of +2 marks sheet on desk, followed by protagonist exhaling with hands in pockets on an outdoor staircase.`,
          dialogue: isTamil
            ? `"Mark sheet paathutu future pochu-nu feel panreengala?"`
            : isTanglish
            ? `"Marks sheet vandhaachu, now you feel like one single score decided your whole life?"`
            : `"Your marks just arrived. And right now, you feel like one single number decided your entire future."`,
          onscreenText: `DID YOUR MARKS RUIN EVERYTHING? 📄`,
          cameraPerformance: `Dramatic slow push-in from marksheet numbers to reflective medium shot.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist sits between relatives who are constantly asking "What score did you get?" with overwhelming text overlay.`,
          dialogue: isTamil
            ? `"Relatives phone calls, friends comparison... the pressure is unreal."`
            : isTanglish
            ? `"Relatives call pannite irukanga, friends bragging... it feels like everyone is judging you."`
            : `"The endless phone calls from relatives and comparison with friends make you feel trapped."`,
          onscreenText: `THE COMPARISON TRAP`,
          cameraPerformance: `Handheld camera wobble conveying social anxiety.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Protagonist abruptly steps out into the bright, open 104-acre Joy University central boulevard. Deep breath, camera rotates 180 degrees.`,
          dialogue: isTamil
            ? `"Stop. Deep breath edunga. Here is the reality."`
            : isTanglish
            ? `"Hold on. Stop worrying. Reality vera madhiri irukku."`
            : `"Stop. Take a breath. Here is what colleges won\'t tell you."`,
          onscreenText: `TAKE A BREATH. HERE\'S REALITY. ☀️`,
          cameraPerformance: `Spinning 180-degree camera transition moving from dim indoor to sunny expansive outdoor vista.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist walks alongside university tech labs where students of all score backgrounds are building live apps.`,
          dialogue: isTamil
            ? `"Your marks only decide your starting line. Unga curiosity, projects, and right environment decide your entire 30-year career."`
            : isTanglish
            ? `"Marks decide your starting gate, but your practical portfolio decides your salary and growth."`
            : `"Marks only decide your entry ticket. Your portfolio, practical curiosity, and campus mentorship decide your entire 30-year career."`,
          onscreenText: `MARKS = ENTRY TICKET | SKILLS = CAREER`,
          cameraPerformance: `Steadicam tracking shot showing active students engaging with modern equipment.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist stands proudly with friends on campus amphitheatre steps, smiling with genuine relief.`,
          dialogue: isTamil
            ? `"Don\'t let a single exam define your potential. Choose an institution that builds YOU."`
            : isTanglish
            ? `"One exam doesn\'t define your life. Your next 4 years will."`
            : `"One board exam does not define your life. What you build in the next four years will."`,
          onscreenText: `YOUR NEXT 4 YEARS DEFINE YOU`,
          cameraPerformance: `Golden hour medium wide shot with warm, reassuring framing.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist gestures warmly toward screen with callout overlay.`,
          dialogue: isTamil
            ? `"Send this to a friend who needs this reminder today."`
            : isTanglish
            ? `"Send this to your best friend who is stressed about their marks."`
            : `"Send this to a friend who needs to hear this today."`,
          onscreenText: `SHARE WITH A STRESSED FRIEND`,
          cameraPerformance: `Direct eye contact, friendly conversational close-up.`,
        },
      ];
      break;

    default:
      // Dynamically generate tailored shots based on the user's specific cleanTitle
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist turns directly to the camera with an engaging, candid expression in a student lounge, holding up a notebook with "${cleanTitle}" written on it.`,
          dialogue: isTamil
            ? `"${cleanTitle} பத்தி யோசிச்சு ரொம்ப கன்பியூஸ் ஆகிட்டே இருக்கீங்களா? இந்த ஒரு நிமிஷம் பாருங்க, உங்களுக்கு தெளிவான கிளாரிட்டி கிடைக்கும்."`
            : isTelugu
            ? `"${cleanTitle} గురించి ఆలోచించి చాలా కన్‌ఫ్యూజ్ అవుతున్నారా? ఒక్క నిమిషం ఇది చూడండి, మీకు స్పష్టమైన క్లారిటీ వస్తుంది."`
            : isMalayalam
            ? `"${cleanTitle}-നെ കുറിച്ച് ആലോചിച്ച് കൺഫ്യൂസ് ആകുകയാണോ? ഒരു നിമിഷം ഇത് കാണൂ, തീർച്ചയായും കൃത്യമായ വ്യക്തത ലഭിക്കും."`
            : isHindi
            ? `"${cleanTitle} को लेकर बहुत कन्फ्यूज़ हो रहे हैं? एक मिनट यह देखिए, आपको पूरी क्लैरिटी मिल जाएगी।"`
            : isTanglish
            ? `"${cleanTitle} pathi yosikareengala? Stop listening to random advice, here is the real breakdown."`
            : `"If you've been wondering about '${cleanTitle}', stop listening to generic advice. Here's the truth."`,
          onscreenText: isTamil
            ? `${cleanTitle}? 🎯`
            : isTelugu
            ? `${cleanTitle}? 🎯`
            : isMalayalam
            ? `${cleanTitle}? 🎯`
            : isHindi
            ? `${cleanTitle}? 🎯`
            : `${cleanTitle.toUpperCase()}? 🎯`,
          cameraPerformance: `Dynamic 35mm lens push-in with crisp subject focus and direct eye contact.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist highlights conflicting opinions on a tablet: one side showing old traditional routes, the other showing unguided trends.`,
          dialogue: isTamil
            ? `"ஆளுக்கு ஒரு அட்வைஸ் சொல்வாங்க. எல்லாரையும் சமாதானப்படுத்த பார்த்தா, நீங்கதான் கடைசில குழம்பிப் போவீங்க."`
            : isTelugu
            ? `"ప్రతి ఒక్కరూ ఒక్కో సలహా ఇస్తారు. అందరి మాటలు వింటూ పోతే, మీరే చివరికి అయోమయంలో పడతారు."`
            : isMalayalam
            ? `"എല്ലാവരും ഓരോ ഉപദേശങ്ങൾ തരും. എല്ലാവരുടെയും വാക്ക് കേട്ട് പോയാൽ നിങ്ങൾ കൂടുതൽ ആശയക്കുഴപ്പത്തിലാകും."`
            : isHindi
            ? `"हर कोई अपनी अलग सलाह देता है। अगर सबकी सुनोगे तो खुद सबसे ज़्यादा उलझ जाओगे।"`
            : isTanglish
            ? `"Half the advice you hear is 10 years outdated, and the other half is pure hype. You need a practical decision rule."`
            : `"Half the advice you hear is 10 years out of date, and the other half is hype. You need a practical decision rule."`,
          onscreenText: isTamil
            ? `பழைய யோசனை vs புதிய வாய்ப்பு`
            : isTelugu
            ? `పాత సలహా vs కొత్త అవకాశం`
            : isMalayalam
            ? `പഴയ ഉപദേശം vs പുതിയ മാറ്റം`
            : isHindi
            ? `पुराना तरीका vs नया अवसर`
            : `OUTDATED ADVICE VS HYPE`,
          cameraPerformance: `Over-the-shoulder POV shot panning from tablet screen to thoughtful expression.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Protagonist closes the tablet decisively, camera cuts instantly to a lively outdoor setting on Joy University campus.`,
          dialogue: isTamil
            ? `"மத்தவங்க சொல்ற சத்தத்தை நிறுத்துங்க. உங்களுக்குள்ள இந்த ஒரு எளிய கேள்வியை கேட்டுக்கோங்க."`
            : isTelugu
            ? `"ఇతరుల గోల ఆపండి. మీకు మీరు ఈ ఒక్క చిన్న ప్రశ్న వేసుకోండి."`
            : isMalayalam
            ? `"മറ്റുള്ളവരുടെ ബഹളം ഒന്ന് നിർത്തൂ. നിങ്ങളോട് തന്നെ ഈ ഒരു ലളിതമായ ചോദ്യം ചോദിക്കൂ."`
            : isHindi
            ? `"बाकी सबका शोर बंद करो। खुद से सिर्फ यह एक सीधा सवाल पूछो।"`
            : isTanglish
            ? `"Hold up! Cut through the noise. Here is the single question that actually matters."`
            : `"Stop the noise. Ask yourself this one simple question."`,
          onscreenText: isTamil
            ? `நில்லுங்க 🛑 இந்தக் கேள்வியைக் கேளுங்கள்`
            : isTelugu
            ? `ఆగండి 🛑 ఈ ప్రశ్న వేసుకోండి`
            : isMalayalam
            ? `നിൽക്കൂ 🛑 ഈ ചോദ്യം ചോദിക്കൂ`
            : isHindi
            ? `रुको 🛑 यह सवाल पूछो`
            : `CUT THROUGH THE NOISE ✂️`,
          cameraPerformance: `Quick match-cut from indoor desk to bright open-air campus corridor.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist walks alongside modern labs, detailing 3 concrete checkpoints for "${cleanTitle}".`,
          dialogue: isTamil
            ? `"இந்த 3 விஷயத்தை செக் பண்ணுங்க: 1. பிராக்டிகல் வேலை உங்களுக்கு பிடிக்குமா? 2. சிலபஸ்ல நவீன AI & டெக்னாலஜி இருக்கா? 3. கல்லூரி வளாகத்துல நேரடி லேப் பயிற்சி கிடைக்குமா?"`
            : isTelugu
            ? `"ఈ 3 విషయాలు పరిశీలించండి: 1. ప్రాక్టికల్ వర్క్ మీకు నచ్చుతుందా? 2. సిలబస్‌లో ఆధునిక AI & టెక్నాలజీ ఉందా? 3. క్యాంపస్‌లో లైవ్ ల్యాబ్స్ ఉన్నాయా?"`
            : isMalayalam
            ? `"ഈ 3 കാര്യങ്ങൾ പരിശോധിക്കൂ: 1. പ്രാക്ടിക്കൽ ജോലി ചെയ്യാൻ താല്പര്യമുണ്ടോ? 2. സിലബസിൽ ആധുനിക AI & ടെക്നോളജി ഉൾപ്പെടുത്തിയിട്ടുണ്ടോ? 3. മികച്ച ലാബ് സൗകര്യങ്ങളുണ്ടോ?"`
            : isHindi
            ? `"ये 3 बातें चेक करो: 1. क्या इस काम में आपका रियल इंटरेस्ट है? 2. क्या सिलेबस में मॉडर्न टेक और AI शामिल है? 3. क्या कॉलेज में प्रैक्टिकल प्रोजेक्ट लैब्स हैं?"`
            : isTanglish
            ? `"3 Checkpoints for ${cleanTitle}: Daily problem fit, modern tech & AI layer, and real day-1 lab access."`
            : `"Apply these 3 filters to ${cleanTitle}: 1. Practical day-to-day problem fit, 2. Digital & AI tool integration, 3. Real campus mentorship with industry projects."`,
          onscreenText: isTamil
            ? `1. வேலை ஆர்வம்  2. AI சிலபஸ்  3. நேரடி லேப்`
            : isTelugu
            ? `1. నైపుణ్యం  2. AI సిలబస్  3. ప్రాక్టికల్ ల్యాబ్స్`
            : isMalayalam
            ? `1. താല്പര്യം  2. AI സിലബസ്  3. മികച്ച ലാബ്സ്`
            : isHindi
            ? `1. असली रुचि  2. AI सिलेबस  3. प्रोजेक्ट लैब्स`
            : `1. PROBLEM FIT  2. TECH LAYER  3. ACTIVE LABS`,
          cameraPerformance: `Smooth gimbal tracking shot alongside protagonist in natural daylight.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist joins a group of engaged student peers around an outdoor study pod on Joy University campus.`,
          dialogue: isTamil
            ? `"உண்மையான திறமையை வளர்க்கும் கோர்ஸை தேர்ந்தெடுத்தா, எதிர்காலத்தை நினைச்சு எந்த பயமும் இருக்காது."`
            : isTelugu
            ? `"నిజమైన నైపుణ్యాన్ని అందించే కోర్సును ఎంచుకుంటే, మీ భవిష్యత్తు గురించి ఎలాంటి భయం ఉండదు."`
            : isMalayalam
            ? `"യഥാർത്ഥ പ്രാപ്തി തരുന്ന കോഴ്സ് തിരഞ്ഞെടുത്താൽ, ഭാവിയെ കുറിച്ച് യാതൊരു ഭയവും വേണ്ടതില്ല."`
            : isHindi
            ? `"जब आप रियल स्किल देने वाला कोर्स चुनेंगे, तो करियर को लेकर कोई डर नहीं रहेगा।"`
            : isTanglish
            ? `"The right decision isn't about pleasing others. It's about building who you become."`
            : `"The right choice isn't about pleasing others. It's about picking a launchpad that builds who you want to become."`,
          onscreenText: isTamil
            ? `சரியான பாதையை தேர்வு செய்யுங்கள்`
            : isTelugu
            ? `సరైన భవిష్యత్తును ఎంచుకోండి`
            : isMalayalam
            ? `ശരിയായ വഴി തിരഞ്ഞെടുക്കൂ`
            : isHindi
            ? `सही रास्ता चुनें`
            : `CHOOSE YOUR LAUNCHPAD`,
          cameraPerformance: `Medium wide heroic framing with vibrant green campus backdrop.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist smiles at camera with friendly nod.`,
          dialogue: isTamil
            ? `"அட்மிஷன் கவுன்சிலிங் ஆரம்பிக்கிறதுக்கு முன்னாடி, இந்த ரீலை சேவ் பண்ணி வச்சுக்கோங்க."`
            : isTelugu
            ? `"అడ్మిషన్ల కౌన్సిలింగ్ ప్రారంభమయ్యే ముందే, ఈ రీల్‌ను సేవ్ చేసి పెట్టుకోండి."`
            : isMalayalam
            ? `"അഡ്മിഷൻ തുടങ്ങുന്നതിന് മുൻപായി, ഈ റീൽ ഇപ്പോൾ തന്നെ സേവ് ചെയ്തു വെക്കൂ."`
            : isHindi
            ? `"एडमिशन काउंसलिंग से पहले, इस रील को ज़रूर सेव कर लें।"`
            : isTanglish
            ? `"Save this reel right now before you make your final college decision."`
            : `"Save this reel before you finalize your college decision."`,
          onscreenText: isTamil
            ? `ரீலை சேவ் பண்ணுங்க`
            : isTelugu
            ? `ఈ రీల్ సేవ్ చేసుకోండి`
            : isMalayalam
            ? `റീൽ സേവ് ചെയ്യൂ`
            : isHindi
            ? `यह रील सेव करें`
            : `SAVE THIS REEL`,
          cameraPerformance: `Centered portrait framing with Joy University signature badge.`,
        },
      ];
      break;
  }

  // Enforce pure native script for Tamil, Telugu, Malayalam, and Hindi across all category outputs
  shots = enforceNativeScriptForShots(shots, language, cleanTitle, analysis.category);

  // Direction adaptations
  if (direction === 'Funny') {
    shots[0].visual = `Protagonist dramatic face-plant onto a mound of application brochures for "${cleanTitle}" with comedy cartoon sigh.`;
    shots[2].dialogue = '"Hold up. Is anyone actually asking what WE want to study?"';
  } else if (direction === 'Cinematic') {
    shots[0].cameraPerformance = 'Anamorphic 2.39:1 letterbox simulation with cinematic rim lighting.';
    shots[4].cameraPerformance = 'Epic golden-hour tracking shot rising above the 104-acre Joy University campus.';
  } else if (direction === 'Bold') {
    shots[0].dialogue = `"Most advice you received about '${cleanTitle}' is 10 years out of date."`;
    shots[0].onscreenText = 'COLLEGE ADVICE IS BROKEN ⚡';
  }

  // ─── VARIATION SEED ROTATION ───────────────────────────────────────────────
  // Each seed (1–6) rotates Hook opener, Pattern Interrupt style, creative angle,
  // CTA phrase, and production notes — so every Regenerate click produces fresh content.
  const hookVariants: Array<{ dialogue: string; onscreenText: string; cameraPerformance: string; visual: string }> = [
    // Seed 1 – Direct Pain Point (default — already set above)
    { ...shots[0] },
    // Seed 2 – POV / Confession
    {
      dialogue: isTamil
        ? `"+2 ரிசல்ட்ஸ் வந்த உடனே நானும் தவறான முடிவு எடுக்கத்தான் இருந்தேன். ஒரு நிமிஷம் கேட்டுட்டு முடிவு பண்ணுங்க."`
        : isTelugu
        ? `"+2 రిజల్ట్స్ రాగానే నేను కూడా తప్పుడు నిర్ణయం తీసుకునేవాడిని. ఒక్క నిమిషం ఆగి వినండి."`
        : isMalayalam
        ? `"+2 റിസൾട്ട് വന്നപ്പോൾ ഞാനും തെറ്റായ തീരുമാനമെടുക്കാൻ പോയതാണ്. ഒരു നിമിഷം ഇതൊന്ന് കേൾക്കൂ."`
        : isHindi
        ? `"+2 का रिजल्ट आते ही मैं भी गलत फैसला लेने वाला था। एक सेकंड रुको और ध्यान से सुनो।"`
        : isTanglish
        ? `"POV: +2 result vandhuchu. Enna study panna nu theriyama phone scroll pannitu irukka? Same here bro."`
        : `"POV: Your +2 results just arrived. You have no idea what to do next. You're not alone."`,
      onscreenText: isTamil
        ? `+2 ரிசல்ட் வந்தாச்சா? 🎯`
        : isTelugu
        ? `+2 రిజల్ట్స్ వచ్చాయా? 🎯`
        : isMalayalam
        ? `+2 റിസൾട്ട് വന്നോ? 🎯`
        : isHindi
        ? `+2 रिजल्ट के बाद क्या? 🎯`
        : `POV: YOU JUST FINISHED +2`,
      cameraPerformance: `Intimate close-up selfie-style from protagonist POV, then flips camera outward.`,
      visual: `Protagonist sits on bed holding phone showing results screen — slow exhale, direct look to camera.`,
    },
    // Seed 3 – Contrarian / Myth Buster
    {
      dialogue: isTamil
        ? `"எல்லாரும் சொல்ற பொதுவான அட்வைஸை அப்படியே நம்பாதீங்க. உங்க வாழ்க்கையில நீங்கதான் வாழப்போறீங்க."`
        : isTelugu
        ? `"అందరూ చెప్పే సలహాలను గుడ్డిగా నమ్మకండి. మీ కెరీర్ లో మీరే బ్రతకాలి, వారు కాదు."`
        : isMalayalam
        ? `"എല്ലാവരും പറയുന്ന ഉപദേശങ്ങൾ കണ്ണുമടച്ച് വിശ്വസിക്കരുത്. നിങ്ങളുടെ കരിയറിൽ നിങ്ങൾ തന്നെയാണ് ജീവിക്കേണ്ടത്."`
        : isHindi
        ? `"सबकी सलाह आँख बंद करके मत मानो। आपके करियर में आपको जीना है, किसी और को नहीं।"`
        : isTanglish
        ? `"Everyone giving you advice about '${cleanTitle}'? Most of them chose wrong themselves. Let's fix that."`
        : `"Everyone has an opinion about '${cleanTitle}'. Most of them got it wrong. Here's what actually matters."`,
      onscreenText: isTamil
        ? `கூட்டத்தோடு போகாதீங்க 🛑`
        : isTelugu
        ? `గుంపును గుడ్డిగా అనుసరించవద్దు 🛑`
        : isMalayalam
        ? `കൂട്ടത്തോടെ പോകരുത് 🛑`
        : isHindi
        ? `भीड़ के पीछे मत भागो 🛑`
        : `STOP FOLLOWING THE CROWD`,
      cameraPerformance: `Camera pulls back from extreme close-up of protagonist's eyes to medium — deliberate and slow.`,
      visual: `Protagonist stands still as crowd of students rushes past — holds up hand to stop.`,
    },
    // Seed 4 – Question / Curiosity
    {
      dialogue: isTamil
        ? `"ஒரே ஒரு கேள்வி. இந்த கேள்விக்கு நீங்க சொல்ற பதில் உங்க எதிர்காலத்தையே மாற்றி அமைக்கும்."`
        : isTelugu
        ? `"ఒకే ఒక్క ప్రశ్న. ఈ ప్రశ్నకు మీరిచ్చే సమాధానం మీ భవిష్యత్తును పూర్తిగా మార్చగలదు."`
        : isMalayalam
        ? `"ഒറ്റ ചോദ്യം. ഈ ചോദ്യത്തിന് നിങ്ങൾ നൽകുന്ന ഉത്തരം നിങ്ങളുടെ ഭാവിയെ പൂർണ്ണമായും മാറ്റിമറിക്കും."`
        : isHindi
        ? `"सिर्फ एक सीधा सवाल। और आपका जवाब आपका पूरा भविष्य तय कर सकता है।"`
        : isTanglish
        ? `"One question. Just one. And your answer will change how you see '${cleanTitle}' forever."`
        : `"Before you decide anything — answer this one question honestly. It changes everything."`,
      onscreenText: isTamil
        ? `முதலில் இதற்கு பதிலளியுங்கள் 🧠`
        : isTelugu
        ? `ముందు దీనికి సమాధానం ఇవ్వండి 🧠`
        : isMalayalam
        ? `ആദ്യം ഇതിന് മറുപടി നൽകൂ 🧠`
        : isHindi
        ? `पहले इसका जवाब दो 🧠`
        : `ANSWER THIS FIRST 🧠`,
      cameraPerformance: `Tight static shot, protagonist leans slightly forward — low ambient sound, tension hold.`,
      visual: `Protagonist sits at empty table with single blank notebook — pauses, looks up at camera.`,
    },
    // Seed 5 – Stat Shock
    {
      dialogue: isTamil
        ? `"70% மாணவர்கள் தவறான கோர்ஸை தேர்ந்தெடுக்கிறாங்க. நீங்களும் அவங்கள்ல ஒருத்தரா ஆகணுமா?"`
        : isTelugu
        ? `"70% విద్యార్థులు తప్పుడు కోర్సులో చేరుతున్నారు. మీరు కూడా వారిలాగే మారాలనుకుంటున్నారా?"`
        : isMalayalam
        ? `"70% വിദ്യാർത്ഥികളും തെറ്റായ കോഴ്സുകളിൽ ചേരുന്നു. നിങ്ങൾക്കും അവരിൽ ഒരാളാകണോ?"`
        : isHindi
        ? `"70% छात्र गलत कोर्स चुन लेते हैं। क्या आपको भी उन 70% में शामिल होना है?"`
        : isTanglish
        ? `"Bro, 7 out of 10 students regret their course choice by second year. Let's make sure you're not one of them."`
        : `"7 out of 10 students say they'd have chosen differently. Don't become that statistic."`,
      onscreenText: isTamil
        ? `70% மாணவர்கள் வருந்துகிறார்கள் ⚠️`
        : isTelugu
        ? `70% మంది బాధపడుతున్నారు ⚠️`
        : isMalayalam
        ? `70% പേരും ഖേദിക്കുന്നു ⚠️`
        : isHindi
        ? `70% पछताते हैं ⚠️`
        : `70% REGRET THIS DECISION ⚠️`,
      cameraPerformance: `Fast smash-cut from wide campus shot to extreme close-up of protagonist's concerned face.`,
      visual: `Split screen: left shows a stressed student in wrong lecture; right shows a happy, engaged student.`,
    },
    // Seed 6 – Challenge / Framework Teaser
    {
      dialogue: isTamil
        ? `"ஒரு 30-வினாடி பிரேம்வொர்க். சரியான கோர்ஸை தேர்வு செய்றது இப்போவே ரொம்ப எளிதாகும்."`
        : isTelugu
        ? `"ఒక 30-సెకన్ల ఫ్రేమ్‌వర్క్. సరైన కోర్సును ఎంచుకోవడం ఇప్పుడే చాలా సులభం అవుతుంది."`
        : isMalayalam
        ? `"ഒരു 30-സെക്കൻഡ് ഫോർമുല. ശരിയായ കോഴ്സ് തിരഞ്ഞെടുക്കുന്നത് ഇപ്പോൾ തന്നെ വളരെ എളുപ്പമാകും."`
        : isHindi
        ? `"सिर्फ 30 सेकंड का एक फ्रेमवर्क। सही कोर्स चुनना अभी से बेहद आसान हो जाएगा।"`
        : isTanglish
        ? `"30 seconds. That's all I need to give you a framework for '${cleanTitle}' that actually works."`
        : `"Give me 30 seconds. I'll give you a decision framework for '${cleanTitle}' that nobody tells you."`,
      onscreenText: isTamil
        ? `30-வினாடி வழிகாட்டல் ⚡`
        : isTelugu
        ? `30-సెకన్ల గైడ్ ⚡`
        : isMalayalam
        ? `30-സെക്കൻഡ് ഗൈഡ് ⚡`
        : isHindi
        ? `30-सेकंड गाइड ⚡`
        : `30-SECOND FRAMEWORK ⚡`,
      cameraPerformance: `Protagonist writes on whiteboard/glass — camera tracks the hand writing the framework title.`,
      visual: `Protagonist stands at glass wall writing a framework outline with bold marker strokes.`,
    },
  ];

  const patternInterruptVariants = [
    `Abrupt record-scratch sound drop + direct deadpan stare into lens with 0.5s silence.`,
    `Quick snap-zoom from wide to close-up + single bass hit sound effect.`,
    `Protagonist steps forward and physically taps the camera lens — "Stop. Read this carefully."`,
    `Black screen flash for 0.3s then hard cut back — text pops: "WAIT."`,
    `Protagonist pulls out a phone and shows the screen to camera with a knowing look.`,
    `Match cut from indoor to outdoor — sudden ambient sound swap. Protagonist walks into bright daylight.`,
  ];

  const ctaVariants = [
    isTamil ? `"இந்த ரீலை சேவ் பண்ணிட்டு உங்க பிரண்ட்ஸுக்கும் ஷேர் பண்ணுங்க."` : isTelugu ? `"ఈ రీల్ ని సేవ్ చేసుకుని మీ ఫ్రెండ్స్ తో షేర్ చేయండి."` : isMalayalam ? `"ഈ റീൽ സേവ് ചെയ്ത് കൂട്ടുകാർക്ക് ഷെയർ ചെയ്യൂ."` : isHindi ? `"इस रील को सेव करें और अपने दोस्तों के साथ शेयर करें।"` : `"Save this reel and share it with a friend who needs to hear this."`,
    isTamil ? `"கமெண்ட்ல உங்க ஸ்ட்ரீம் சொல்லுங்க — அடுத்த ரீல் உங்களுக்காக."` : isTelugu ? `"కామెంట్ లో మీ స్ట్రీమ్ చెప్పండి — నెక్స్ట్ రీల్ మీ కోసమే."` : isMalayalam ? `"കമന്റിൽ നിങ്ങളുടെ സ്ട്രീം പറയൂ — അടുത്ത റീൽ നിങ്ങൾക്കായി."` : isHindi ? `"कमेंट में अपनी स्ट्रीम बताएं — अगला रील आपके लिए।"` : `"Comment your stream below — we'll break down the best path just for you."`,
    isTamil ? `"ஃபாலோ பண்ணுங்க — வாரந்தோறும் தெளிவான கெரியர் வழிகாட்டல்."` : isTelugu ? `"ఫాలో చేయండి — ప్రతి వారం నిజమైన కెరీర్ గైడెన్స్ కోసం."` : isMalayalam ? `"ഫോളോ ചെയ്യൂ — എല്ലാ ആഴ്ചയും കൃത്യമായ കരിയർ ഗൈഡൻസ്."` : isHindi ? `"फॉलो करें — हर हफ्ते सच्ची और सटीक करियर गाइडेंस के लिए।"` : `"Follow Joy University for weekly honest post-+2 decision content."`,
    isTamil ? `"சேவ் பண்ணி வச்சுக்கோங்க — அட்மிஷன் போறதுக்கு முன்னாடி கண்டிப்பா பாருங்க."` : isTelugu ? `"సేవ్ చేసుకోండి — అడ్మిషన్స్ కంటే ముందే ఈ చెక్‌లిస్ట్ చూడండి."` : isMalayalam ? `"സേവ് ചെയ്തു വെക്കൂ — അഡ്മിഷന് മുൻപ് ഇതൊന്ന് ഉറപ്പായും കാണൂ."` : isHindi ? `"सेव कर लें — एडमिशन से पहले यह चेकलिस्ट ज़रूर देखें।"` : `"Tap save — review this checklist before you fill any application form."`,
    isTamil ? `"ஷேர் பண்ணுங்க — உங்க பெற்றோர்கிட்டயும் இந்த விஷயத்தை பேசுங்க."` : isTelugu ? `"షేర్ చేయండి — మీ పేరెంట్స్ తో ఈ విషయం గురించి మాట్లాడండి."` : isMalayalam ? `"ഷെയർ ചെയ്യൂ — മാതാപിതാക്കളോടും ഈ വിഷയം സംസാരിക്കൂ."` : isHindi ? `"शेयर करें — अपने पेरेंट्स के साथ यह ज़रूरी बात शुरू करें।"` : `"Share this with your parents — it'll start the right conversation."`,
    isTamil ? `"கமெண்ட் பண்ணுங்க: எந்த கோர்ஸ் உங்களை குழப்புது?"` : isTelugu ? `"కామెంట్ చేయండి: ఏ కోర్స్ మీకు కన్ఫ్యూషన్ గా ఉంది?"` : isMalayalam ? `"കമന്റ് ചെയ്യൂ: ഏത് കോഴ്സ് ആണ് നിങ്ങൾക്ക് ആശയക്കുഴപ്പമുണ്ടാക്കുന്നത്?"` : isHindi ? `"कमेंट करें: कौन सा कोर्स आपको सबसे ज़्यादा कन्फ्यूज़ कर रहा है?"` : `"Comment the course you're confused about — we'll answer in the next reel."`,
  ];

  const angleVariants = [
    analysis.defaultAngle,
    `A direct 6-step decision breakdown for "${cleanTitle}" — no fluff, just what matters.`,
    `The contrarian take on "${cleanTitle}" that most students never hear before they commit.`,
    `Using the 3-question framework to instantly clarify "${cleanTitle}" for any +2 student.`,
    `Why the obvious answer to "${cleanTitle}" is almost always the wrong one — and what to do instead.`,
    `Real student stories that reframe "${cleanTitle}" into a clear, confident next move.`,
  ];

  // Apply the variation (seed is 1-indexed, arrays are 0-indexed)
  const idx = (variationSeed - 1) % 6;

  // Swap Hook content
  const hookVar = hookVariants[idx];
  if (hookVar && idx > 0) {
    shots[0].dialogue = hookVar.dialogue;
    shots[0].onscreenText = hookVar.onscreenText;
    shots[0].cameraPerformance = hookVar.cameraPerformance;
    shots[0].visual = hookVar.visual;
  }

  // Swap Pattern Interrupt technique (shot 2, index 2)
  if (shots[2]) {
    shots[2].cameraPerformance = patternInterruptVariants[idx];
  }

  // Swap CTA dialogue (last shot)
  const lastShot = shots[shots.length - 1];
  if (lastShot && lastShot.type === 'CTA') {
    lastShot.dialogue = ctaVariants[idx];
  }

  // Vary the creative angle
  const creativeAngle = angleVariants[idx];
  // ────────────────────────────────────────────────────────────────────────────

  return {
    id,
    reelTitle: title,
    creativeAngle,
    objective: `Guide +2 students through "${cleanTitle}" with actionable clarity and decision frameworks.`,
    targetAudience: '+2 Completed Students (Ages 17–19)',
    duration: customDuration,
    format: '9:16 Vertical Reel',
    creativeDirection: direction,
    language,
    shots,
    productionNotes: {
      visualStyle: 'Warm, naturalistic, authentic South Indian student-first aesthetic. Avoid corporate promotional stiffness.',
      performance: 'Conversational, grounded, peer-to-peer delivery with micro-expressions of relatable doubt turning to confidence.',
      camera: 'Lightweight mirrorless camera or smartphone with f/1.8 prime lens for crisp subject isolation.',
      editing: 'Snappy rhythmic cuts (1.5–3.5s per shot), match cuts on action, kinetic typography for key takeaway phrases.',
      sound: 'Warm acoustic lofi guitar or subtle upbeat percussion beat with music ducked during dialogue and silence on pattern interrupt.',
      props: ['+2 Marksheet', 'Notebook', 'Smartphone with code/design screen', 'Course Booklet'],
      locations: ['Joy University Central Boulevard', 'Computational Intelligence Lab', 'Campus Amphitheatre'],
      casting: '1 protagonist (18–19 yrs old, approachable look) + 2 background student collaborators',
      complexity: 'LOW',
    },
    creativeSummary: {
      keyCreativeIdea: `Transform "${cleanTitle}" from anxiety into an empowering, concrete decision framework.`,
      shootingPriority: [
        'Nail the opening Hook facial expression within the first 1.5 seconds.',
        'Execute the Pattern Interrupt cut with perfect audio-video synchronization.',
        'Ensure the Value shot clearly highlights the 3-point framework in readable typography.',
        'Keep branding subtle until the final payoff and CTA.',
      ],
    },
    viralBlueprint: {
      viralScore: 91 + (idx % 8),
      obviousAngleAvoided: `A generic promotional monologue advising students to "work hard and follow their dreams" with campus drone b-roll.`,
      humanTruth: analysis.studentTension,
      hiddenProblem: `Students choose their degree based on WhatsApp forwards and parental pressure without testing real industry workflows.`,
      centralInformationGap: `What is the single filter that separates degrees facing AI obsolescence from those creating compounding career leverage?`,
      contentTension: `Perceived safety of conventional paths versus the reality of rapid modern technical change.`,
      progressiveRevelation: [
        `Reveal 1 (The Familiar Assumption): Believing "${cleanTitle}" is a solved checklist that everyone follows blindly.`,
        `Reveal 2 (The Unexpected Complication): Most students discover in their first year that traditional curriculum lags modern industry reality.`,
        `Reveal 3 (The Deeper Truth): ${analysis.coreInsight}`,
        `Reveal 4 (The Actionable Payoff): Pick practical project-first learning, modern labs, and multidisciplinary skills over vanity cut-offs.`,
      ],
      contentSurprise: `The degree everyone tells you is "safest" is often the most crowded with the highest risk of job-search friction.`,
      practicalValue: `A clear 3-question filter to evaluate any college syllabus and lab access before paying admission fees.`,
      payoff: `Total clarity and calm confidence — knowing exactly what questions to ask before locking in your admission.`,
      shareTrigger: `"My friends who just finished +2 need to hear this before locking their college choice."`,
      saveTrigger: `A 3-step decision checklist that students and parents will re-read during admission week.`,
      commentTrigger: `"Are you choosing this course because you genuinely want it or because family suggested it? Comment your stream below."`,
      joyUniversityConnection: `Joy University's hands-on project labs, future-ready multidisciplinary majors, and 104-acre research ecosystem serve as real proof points.`,
      directorInstruction: `Start with high empathy in the first 2 seconds, shatter the standard assumption by second 8, and deliver actionable clarity before introducing any university solutions.`,
    },
    tags: ['+2', 'careers', 'admissions', 'joy-university', analysis.category],
    createdAt: now,
    updatedAt: now,
    status: 'Draft',
    version: variationSeed,
  };
}
