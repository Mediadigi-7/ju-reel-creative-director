import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='/workspace/ju-reel-creative-director/.design/topic-suggestions-2026-11-14';
const targets=await(await fetch('http://127.0.0.1:9229/json')).json();
const ws=new WebSocket(targets[0].webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map(),events=[];let paused;
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}else{events.push(m);if(m.method==='Fetch.requestPaused')paused=m.params;}};
const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,m=>m.error?reject(Error(JSON.stringify(m.error))):resolve(m.result));ws.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const pause=(ms=350)=>new Promise(r=>setTimeout(r,ms));
const until=async(expression)=>{for(let i=0;i<35;i++){if(await evaluate(`Boolean(${expression})`))return;await pause(150);}throw Error('Timed out: '+expression);};
const click=async(text)=>{assert.ok(await evaluate(`(()=>{const b=[...document.querySelectorAll('button,a')].find(e=>(e.textContent.trim()===${JSON.stringify(text)} || (${JSON.stringify(text)}==='Saved reels'&&e.textContent.trim().startsWith('Saved reels'))));if(!b||b.disabled)return false;b.focus();b.click();return true;})()`),text);await pause();};
const input=async(selector,value)=>{await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing input');e.focus();Object.getOwnPropertyDescriptor(e.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype,'value').set.call(e,${JSON.stringify(value)});e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));})()`);await pause();};
const capture=async name=>{await evaluate('window.scrollTo(0,0)');await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true}).then(r=>fs.writeFile(root+'/'+name+'.png',Buffer.from(r.data,'base64')));};
const viewport=async(width,height=1000)=>{await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<640});await pause();assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'No overflow at '+width);};
const key=async(k,modifiers=0)=>{await call('Input.dispatchKeyEvent',{type:'keyDown',key:k,code:k,modifiers});await call('Input.dispatchKeyEvent',{type:'keyUp',key:k,code:k,modifiers});await pause(100);};

await fs.mkdir(root,{recursive:true});
try {
 await call('Page.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Page.bringToFront');await viewport(1440);
 await call('Page.navigate',{url:'http://localhost:3120/'});await pause(600);await until('document.querySelector("nav")');await evaluate('localStorage.clear();location.reload()');await until('document.querySelector("[role=combobox]")');
 assert.equal(await evaluate('Boolean(document.querySelector("[role=listbox]"))'),false);
 assert.ok(!(await evaluate('document.body.innerText')).includes('Try a sample topic'));
 await capture('closed-desktop');
 const clickField=async()=>{const r=await evaluate('(()=>{const r=document.querySelector("#reel-title-input").getBoundingClientRect();return {x:r.x+30,y:r.y+r.height/2};})()');await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...r});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...r});await pause();};
 await clickField();assert.equal(await evaluate('document.querySelectorAll("[role=option]").length'),6);await capture('open-desktop');
 await key('ArrowDown');await key('Enter');assert.equal(await evaluate('document.querySelector("#reel-title-input").value'),'I finished +2... now what?');assert.equal(await evaluate('Boolean(document.querySelector("[role=listbox]"))'),false);
 assert.equal(events.filter(e=>e.method==='Network.requestWillBeSent'&&e.params.request.url.endsWith('/api/generate')).length,0,'Selecting a suggestion never submits the form');
 await input('#reel-title-input','college');assert.equal(await evaluate('document.querySelectorAll("[role=option]").length'),1);
 await evaluate('document.querySelector("[role=option]").click()');await pause();assert.equal(await evaluate('document.querySelector("input[name=channel]:checked").value'),'Trust');assert.equal(await evaluate('document.activeElement.id'),'reel-title-input');assert.equal(await evaluate('Boolean(document.querySelector("[role=listbox]"))'),false);
 await clickField();assert.equal(await evaluate('document.querySelector("#reel-title-input").getAttribute("aria-expanded")'),'true');await key('Escape');assert.equal(await evaluate('document.querySelector("#reel-title-input").getAttribute("aria-expanded")'),'false');
 await clickField();await key('Tab');assert.equal(await evaluate('Boolean(document.querySelector("[role=listbox]"))'),false);
 await clickField();await call('Input.dispatchMouseEvent',{type:'mousePressed',x:180,y:150,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:180,y:150,button:'left',clickCount:1});await pause();assert.equal(await evaluate('Boolean(document.querySelector("[role=listbox]"))'),false);
 await input('#reel-title-input','a unique custom topic');assert.equal(await evaluate('Boolean(document.querySelector("[role=listbox]"))'),false);
 await input('#reel-title-input','college');await key('ArrowDown');await key('Enter');await click('Open sample storyboard');await until('document.querySelector("#shot-6")');
 console.log('PASS: hidden initially; opens on input click/focus; typing filters; pointer and arrow/Enter selection preserve matching channel; Escape/Tab/outside dismiss; no auto-submit; real sample still opens');
 for(const width of [390,320]){await viewport(width,900);await click('New reel');await until('document.querySelector("#reel-title-input")');await capture('closed-'+width);await clickField();assert.equal(await evaluate('document.querySelectorAll("[role=option]").length'),6);assert.ok(await evaluate('document.querySelector("[role=listbox]").getBoundingClientRect().width<=innerWidth'));await capture('open-'+width);await key('Escape');}
 console.log('PASS: 320/390px popup and closed form fit without horizontal overflow');
} finally {ws.close();}
