import { pathToFileURL } from 'node:url';
export const EXPECTED_PRODUCTION_HOST = 'ju-reel-creative.vercel.app';
export async function verifyStagingTarget({token,projectId,orgId,request=fetch}) {
  if(!token || !projectId || !orgId) throw new Error('Missing secure token or verified project/owner selectors.');
  const scope = orgId.startsWith('team_') ? {teamId:orgId} : {};
  const get = async (pathname, params={}) => {
    const url = new URL('https://api.vercel.com'+pathname);
    for(const [key,value] of Object.entries({...scope,...params}))url.searchParams.set(key,String(value));
    let response;
    try {response=await request(url,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(15000)});}
    catch {throw new Error('Cannot reach authorized Vercel metadata. Check network access.');}
    if(!response.ok)throw new Error('Vercel metadata access failed with HTTP '+response.status+'. Check token scope and selectors.');
    try{return await response.json();}catch{throw new Error('Vercel returned invalid project metadata.');}
  };
  const project=await get('/v9/projects/'+encodeURIComponent(projectId));
  if(project.id!==projectId || project.accountId!==orgId)throw new Error('Project or owner does not match the selected existing Vercel project.');
  let until;
  for(let page=0;page<10;page++){
    const result=await get('/v9/projects/'+encodeURIComponent(projectId)+'/domains',{limit:100,...(until?{until}:{})});
    if(result.domains?.some(domain=>domain.name===EXPECTED_PRODUCTION_HOST))return {projectId,orgId,productionHost:EXPECTED_PRODUCTION_HOST};
    until=result.pagination?.next;
    if(!until)break;
  }
  throw new Error('The selected project does not prove ownership of '+EXPECTED_PRODUCTION_HOST+'. Preview deployment is blocked.');
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  try {
    await verifyStagingTarget({token:process.env.VERCEL_TOKEN,projectId:process.env.VERCEL_PROJECT_ID,orgId:process.env.VERCEL_ORG_ID});
    console.log('Verified existing Vercel target for '+EXPECTED_PRODUCTION_HOST+'.');
  } catch(error){console.error(error instanceof Error?error.message:'Vercel target verification failed.');process.exitCode=2;}
}
