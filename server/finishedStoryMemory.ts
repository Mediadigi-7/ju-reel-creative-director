import { createHash } from 'node:crypto';
import type { ReelStoryboard } from '../shared/types.js';
export type FinishedStory=Pick<ReelStoryboard,'channel'|'reelTitle'|'creativeAngle'|'language'|'shots'>;
const entries=new Map<string,{expires:number;stories:FinishedStory[]}>();
const key=(account:string,provider:string,topic:string)=>createHash('sha256').update(JSON.stringify([account,provider,topic.toLowerCase().trim()])).digest('hex');
export function recentFinishedStories(account:string,provider:string,topic:string):FinishedStory[]{
 const value=entries.get(key(account,provider,topic));return value&&value.expires>Date.now()?structuredClone(value.stories):[];
}
export function rememberFinishedStory(account:string,provider:string,reel:ReelStoryboard,topic=reel.reelTitle){
 const id=key(account,provider,topic);const prior=recentFinishedStories(account,provider,topic).filter(s=>s.channel!==reel.channel);
 const story={channel:reel.channel,reelTitle:reel.reelTitle,creativeAngle:reel.creativeAngle,language:reel.language,shots:reel.shots.map(s=>({...s,visual:s.visual.slice(0,700),dialogue:s.dialogue.slice(0,700),onscreenText:s.onscreenText.slice(0,700)}))};
 entries.set(id,{expires:Date.now()+10*60*1000,stories:[...prior,structuredClone(story)].slice(-3)});
 while(entries.size>32)entries.delete(entries.keys().next().value!);
}
export function clearFinishedStoryMemory(){entries.clear();}
