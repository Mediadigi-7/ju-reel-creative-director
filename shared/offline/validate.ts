import type { ReelStoryboard } from '../types.js';
import { ReelStoryboardSchema } from '../schema.js';
const order = ['HOOK','PROBLEM','PATTERN_INTERRUPT','VALUE','PAYOFF','CTA'];
const nativePatterns: Record<string,RegExp> = { Tamil:/[\u0B80-\u0BFF]/, Telugu:/[\u0C00-\u0C7F]/, Malayalam:/[\u0D00-\u0D7F]/, Hindi:/[\u0900-\u097F]/ };
const actions: Record<string,{save:RegExp;share:RegExp;other:RegExp}> = {
 English:{save:/\bsave\b/i,share:/\bshare\b/i,other:/\b(comment|follow|apply|tag|subscribe|dm)\b/i},
 Tamil:{save:/சேவ்/,share:/பகிர/,other:/கமெண்ட்|ஃபாலோ|சப்ஸ்கிரைப்/},
 Telugu:{save:/సేవ్/,share:/షేర్/,other:/కామెంట్|ఫాలో|సబ్‌స్క్రైబ్/},
 Malayalam:{save:/സേവ്/,share:/പങ്കിട/,other:/കമന്റ്|ഫോളോ|സബ്സ്ക്രൈബ്/},
 Hindi:{save:/सेव/,share:/भेजो|शेयर/,other:/कमेंट|फ़ॉलो|फॉलो|सब्सक्राइब/},
};
export function validateOfflineStoryboard(reel: ReelStoryboard): void {
  if (!ReelStoryboardSchema.safeParse(reel).success) throw new Error('Offline catalogue schema check failed.');
  const text = reel.shots.map(s=>s.dialogue+' '+s.onscreenText).join(' ');
  if (/%|guaranteed|future-proof|skyrockets|unlock your potential|stop scrolling|did you know|here.s the secret|are you ready|3 things you need to know|most people don.t know/i.test(text)) throw new Error('Offline script contains an unsupported claim or cliché.');
  let previous = 0;
  for (const [i,scene] of reel.shots.entries()) {
    if (scene.type!==order[i] || scene.number!==i+1 || !scene.dialogue.trim() || !scene.onscreenText.trim()) throw new Error('Offline scene order or content check failed.');
    const native = nativePatterns[reel.language];
    if (native && (!native.test(scene.dialogue) || !native.test(scene.onscreenText) || /[A-Za-z]/.test(scene.dialogue+' '+scene.onscreenText))) throw new Error('Offline native-script check failed.');
    const times = [...scene.timestamp.matchAll(/(\d+):(\d{2})/g)].map(m=>Number(m[1])*60+Number(m[2]));
    if (times.length!==2 || times[0]!==previous || times[1]<=times[0]) throw new Error('Offline timing sequence check failed.');
    previous = times[1];
  }
  if (previous!==parseInt(reel.duration,10)) throw new Error('Offline duration does not match its scene endpoints.');
  const action = actions[reel.language];
  if (!action) throw new Error('Unsupported offline language.');
  const expected = reel.creativeDirection==='Funny'?'share':'save';
  const other = expected==='save'?'share':'save';
  const cta = reel.shots[5];
  if (![cta.dialogue,cta.onscreenText].every(t=>action[expected].test(t) && !action[other].test(t) && !action.other.test(t))) throw new Error('Offline CTA must be one consistent action.');
}
