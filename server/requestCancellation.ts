import type { Request, Response } from 'express';
// req.close also fires after normal body consumption; use aborted and unfinished
// response.close so ordinary completed POST bodies do not cancel generation.
export function requestCancellation(req:Request,res:Response) {
 const controller=new AbortController();
 const abort=()=>controller.abort(new DOMException('Client disconnected','AbortError'));
 const close=()=>{if(!res.writableEnded)abort();};
 req.once('aborted',abort);res.once('close',close);
 if(req.aborted)abort();
 return {signal:controller.signal,dispose(){req.off('aborted',abort);res.off('close',close);}};
}
