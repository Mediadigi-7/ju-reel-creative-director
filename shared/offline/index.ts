import { validateChannel, CHANNEL_STRATEGIES, type ContentChannel } from '../channels.js';
import { validateOfflineStoryboard } from './validate.js';
import type { CreativeDirection, LanguageOption, ReelStoryboard, ShotType } from '../types.js';
import { OFFLINE_CATALOGUE_VERSION, OFFLINE_IDEAS, OFFLINE_SCRIPTS, OFFLINE_SAMPLE_CHANNELS, findOfflineIdea, normalizeOfflineTitle } from './catalogue.js';
import { tamilCopy } from './ta.js';
import { teluguCopy } from './te.js';
import { malayalamCopy } from './ml.js';
import { hindiCopy } from './hi.js';
export { OFFLINE_IDEAS, OFFLINE_SCRIPTS, OFFLINE_SAMPLE_CHANNELS, OFFLINE_CATALOGUE_VERSION } from './catalogue.js';
export const OFFLINE_LANGUAGES = ['English', 'Tamil', 'Telugu', 'Malayalam', 'Hindi'] as const;
export const OFFLINE_CHANNEL_UNSUPPORTED = 'This fixed offline sample belongs to another channel. Choose a matching sample or connect AI for a channel-specific story.';
export const OFFLINE_UNSUPPORTED = 'This idea or language needs live AI. Connect an AI provider or choose one of the six offline samples.';
const nativeCopies = { Tamil: tamilCopy, Telugu: teluguCopy, Malayalam: malayalamCopy, Hindi: hindiCopy };
const localTitles = {
 Tamil: ['+2 முடிச்சப்புறம் அடுத்து என்ன?', '+2க்குப் பிறகு மாணவர்கள் செய்யும் 3 தவறுகள்', 'இன்ஜினியரிங் எல்லோருக்கும் பொருந்தாது', 'காமர்ஸுக்குப் பிறகு என்ன படிக்கலாம்?', 'செயற்கை நுண்ணறிவு இந்தத் தொழில்களை மாற்றும்', 'சரியான கல்லூரியை எப்படித் தேர்வு செய்வது?'],
 Telugu: ['+2 తర్వాత ఏం చేయాలి?', '+2 తర్వాత విద్యార్థులు చేసే 3 తప్పులు', 'ఇంజినీరింగ్ అందరికీ కాదు', 'కామర్స్ తర్వాత ఏం చదవాలి?', 'ఏఐ ఈ వృత్తులను మారుస్తుంది', 'సరైన కాలేజీని ఎలా ఎంచుకోవాలి?'],
 Malayalam: ['+2 കഴിഞ്ഞാൽ ഇനി എന്ത്?', '+2 കഴിഞ്ഞ് വിദ്യാർഥികൾ ചെയ്യുന്ന 3 തെറ്റുകൾ', 'എൻജിനീയറിങ് എല്ലാവർക്കുമല്ല', 'കൊമേഴ്സിനുശേഷം എന്ത് പഠിക്കാം?', 'നിർമിതബുദ്ധി ഈ തൊഴിലുകൾ മാറ്റും', 'ശരിയായ കോളേജ് എങ്ങനെ തിരഞ്ഞെടുക്കാം?'],
 Hindi: ['+2 के बाद क्या करें?', '+2 के बाद छात्रों की 3 गलतियाँ', 'इंजीनियरिंग सबके लिए नहीं है', 'कॉमर्स के बाद क्या पढ़ें?', 'एआई इन पेशों को बदलेगा', 'सही कॉलेज कैसे चुनें?'],
};
export function matchOfflineIdea(title: string) {
  const english = findOfflineIdea(title);
  if (english) return english;
  for (const names of Object.values(localTitles)) {
    const i = names.findIndex(name => normalizeOfflineTitle(name) === normalizeOfflineTitle(title));
    if (i >= 0) return OFFLINE_IDEAS[i];
  }
}
export function supportsOffline(title: string, language: LanguageOption = 'English'): boolean {
  return !!matchOfflineIdea(title) && (OFFLINE_LANGUAGES as readonly string[]).includes(language);
}
const types: ShotType[] = ['HOOK','PROBLEM','PATTERN_INTERRUPT','VALUE','PAYOFF','CTA'];
const cameras = {
 Informative: ['Eye-level medium close-up; pause after the opening question.','Over-the-shoulder view of the specific dilemma; hold long enough to read.','Cut to a tight detail; a brief quiet pause resets attention.','Stable overhead view of the actual example, with one label at a time.','Return to the opening framing; show the resolved decision or next question.','Static close-up of the single action card with a small brand mark.'],
 Funny: ['Medium shot with a straight-faced delivery; let the situation carry the joke.','Alternate character positions using matched eye-lines; avoid a laugh track.','Hold a still reaction for half a second in silence.','Show the concrete explanation in close-up; keep the useful detail legible.','Return to the opening prop or character for the callback.','Single, unhurried end-card action; do not add another spoken request.'],
 Trendy: ['Top-down or tight close-up on the challenge object; start on an action.','Two short, matched cuts clarify the question before accelerating.','Match cut to the reveal; mute the music briefly.','Three short inserts demonstrate the answer; hold each text label.','Widen back to the starting setup to show what changed.','Hold the single action card clearly; no additional engagement prompts.'],
};
const overlays = {
 English: 'Display the supplied on-screen text exactly; do not add a second CTA.',
 Tamil: 'வழங்கிய திரை வாசகத்தை மட்டும் காட்டவும். கூடுதல் அழைப்பைச் சேர்க்க வேண்டாம்.',
 Telugu: 'ఇచ్చిన తెర వాక్యాన్ని మాత్రమే చూపించండి. అదనపు పిలుపు చేర్చవద్దు.',
 Malayalam: 'നൽകിയ സ്ക്രീൻവാചകം മാത്രം കാണിക്കുക. മറ്റൊരു ആഹ്വാനം ചേർക്കരുത്.',
 Hindi: 'दिया गया स्क्रीन टेक्स्ट ही दिखाएँ। कोई दूसरी अपील न जोड़ें।',
};

export function generateOfflineStoryboard(title: string, direction: CreativeDirection = 'Informative', language: LanguageOption = 'English', requestedDuration = '28 sec', requestedChannel?: ContentChannel): ReelStoryboard {
  const selectedChannel = validateChannel(requestedChannel);
  const idea = matchOfflineIdea(title);
  if (!idea || !(OFFLINE_LANGUAGES as readonly string[]).includes(language)) throw new Error(OFFLINE_UNSUPPORTED);
  const channel = OFFLINE_SAMPLE_CHANNELS[idea.id];
  if (selectedChannel && selectedChannel !== channel) throw new Error(OFFLINE_CHANNEL_UNSUPPORTED);
  const script = OFFLINE_SCRIPTS.find(s => s.id === `${idea.id}-${direction}`);
  if (!script) throw new Error(OFFLINE_UNSUPPORTED);
  const locale = language as typeof OFFLINE_LANGUAGES[number];
  const translated = locale === 'English' ? undefined : nativeCopies[locale][script.id];
  const copy = script.scenes.map((scene, i) => {
    const pair = translated?.[i]?.split('|');
    if (translated && (pair?.length !== 2 || !pair.every(Boolean))) throw new Error('Offline catalogue entry is incomplete.');
    return { dialogue: pair?.[0] || scene[0], text: pair?.[1] || scene[1] };
  });
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const sceneSeconds = copy.map(c => {
    const words = c.dialogue.split(/\s+/).length;
    const graphemes = [...segmenter.segment(c.dialogue)].length;
    return Math.max(2, Math.ceil(Math.max(words / 2.5, locale === 'English' ? 0 : graphemes / 9) + 0.5));
  });
  const requested = parseInt(requestedDuration, 10);
  const minimum = sceneSeconds.reduce((sum, n) => sum + n, 0);
  const seconds = Math.max(20, Number.isFinite(requested) ? Math.min(45, requested) : 28, minimum);
  // Allocate real speaking time to every beat, then distribute any spare time.
  const extra = seconds - minimum;
  sceneSeconds.forEach((_, i) => { sceneSeconds[i] += Math.floor(extra / 6) + (i < extra % 6 ? 1 : 0); });
  const format = (n: number) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  let cursor = 0;
  const timestamps = sceneSeconds.map(length => { const start = cursor; cursor += length; return `${format(start)} – ${format(cursor)}`; });
  const now = new Date().toISOString();
  const reel: ReelStoryboard = {
    id: `offline_${script.id}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
    channel, reelTitle: idea.title, creativeAngle: script.angle, objective: idea.takeaway,
    targetAudience: CHANNEL_STRATEGIES[channel].audience,
    duration: `${seconds} sec`, format:'9:16 Vertical Reel', creativeDirection:direction, language,
    generation: { source:'offline', generatedAt:now, templateId:script.id, catalogueVersion:OFFLINE_CATALOGUE_VERSION },
    shots: script.scenes.map((scene,i) => ({ number:i+1,type:types[i],name:types[i].replace('_',' '),
      timestamp:timestamps[i],
      visual:scene[2],
      dialogue:copy[i].dialogue, onscreenText:copy[i].text, cameraPerformance:cameras[direction][i],userEdited:false,
    })),
    productionNotes: {
      visualStyle: `${script.angle} Use the listed props and ordinary student spaces; do not imply access to unverified institutional facilities.`,
      performance: direction === 'Funny' ? 'Conversational, straight-faced acting. Let pauses and character reactions carry the joke.' : 'Natural spoken delivery with short pauses; read the dialogue aloud before filming.',
      camera:cameras[direction].join(' '),
      editing: direction === 'Trendy' ? 'Match cuts support the challenge and reveal. Keep the Value labels readable; finish with the Payoff callback.' : 'Cut between the specific situation and its explanation. Keep the Pattern Interrupt brief and the Payoff connected to the Hook.',
      sound:script.sound, props:[...script.props], locations:['Suggested: a quiet desk or seating area with permission to film'], casting:script.cast, complexity:'LOW',
    },
    creativeSummary: { keyCreativeIdea:script.angle, shootingPriority:[
      `Prepare: ${script.props.join(', ')}.`,
      `Cast: ${script.cast}.`,
      `Rehearse the ${language} dialogue aloud and adjust the timing estimate to the actual delivery.`,
      'Use fictional sample documents; avoid personal data and unverified institutional claims.',
      'Keep the final spoken action and on-screen action consistent; add no other CTA.',
    ] },
    tags:['offline-sample',idea.id,direction,language],createdAt:now,updatedAt:now,status:'Draft',version:1,
  };
  reel.productionNotes.editing += ' ' + overlays[locale];
  const result = reel;
  validateOfflineStoryboard(result);
  return result;
}
