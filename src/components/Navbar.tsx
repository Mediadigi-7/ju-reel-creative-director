import React from 'react';
import { Library, Settings, Home, Lightbulb } from 'lucide-react';
import { ApiSettings } from '../services/storage.js';
interface NavbarProps {
 onNewReel:()=>void;onOpenIdeas?:()=>void;onOpenLibrary:()=>void;onOpenSettings:()=>void;
 savedCount:number;currentView?:'creator'|'library'|'ideas';apiSettings?:ApiSettings;
}
export const Navbar:React.FC<NavbarProps>=({onNewReel,onOpenIdeas,onOpenLibrary,onOpenSettings,savedCount,currentView='creator',apiSettings})=>{
 const hasKey=Boolean(apiSettings?.apiKey?.trim()),verified=hasKey&&apiSettings?.isVerified;
 const items=[{id:'creator',href:'/',label:'New reel',icon:Home,action:onNewReel},{id:'ideas',href:'/ideas',label:'Find ideas',icon:Lightbulb,action:onOpenIdeas},{id:'library',href:'/library',label:'Saved reels',icon:Library,action:onOpenLibrary}];
 return <header className="sm:sticky top-0 z-30 bg-white border-b border-stone-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
   <a href="/" onClick={e=>{if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onNewReel();}}} className="flex items-center gap-4 w-fit rounded-md" aria-label="Joy University — new reel">
    <img src="/joy-university-logo.png" alt="Joy University" className="h-8 w-auto max-w-[235px] object-contain"/>
    <span className="hidden lg:block text-sm font-medium text-stone-600 border-l border-stone-200 pl-4">Reel Creative Director</span>
   </a>
   <nav aria-label="Main navigation" className="grid grid-cols-4 sm:flex items-stretch gap-1">
    {items.map(({id,href,label,icon:Icon,action})=><a key={id} href={href} aria-current={currentView===id?'page':undefined} onClick={e=>{if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();action?.();}}}
     className={`min-h-11 px-1 sm:px-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-medium ${currentView===id?'bg-stone-100 text-stone-950':'text-stone-600 hover:bg-stone-50 hover:text-stone-950'}`}>
     <Icon aria-hidden="true" className="hidden sm:block w-4 h-4"/><span>{label}{id==='library'&&savedCount>0?<span className="sr-only"> ({savedCount} saved)</span>:null}</span>
    </a>)}
    <button onClick={onOpenSettings} aria-describedby="ai-connection-status" className="min-h-11 px-1 sm:px-3 text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg flex items-center justify-center gap-2">
     <Settings aria-hidden="true" className="hidden sm:block w-4 h-4"/><span>AI settings</span>
    </button>
    <span id="ai-connection-status" className="sr-only">{verified?'AI key verified':hasKey?'AI key needs verification':'AI not connected. Sample storyboards are available without a key.'}</span>
   </nav>
  </div>
 </header>;
};
