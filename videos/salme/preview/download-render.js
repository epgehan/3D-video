'use strict';
const downloadButton=document.getElementById('download-render');
const downloadStatus=document.getElementById('download-progress');
let renderManifest;
const megabytes=bytes=>(bytes/1048576).toFixed(1)+' MB';
fetch('render-manifest.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Download manifest unavailable');return r.json();}).then(m=>{renderManifest=m;downloadButton.disabled=false;downloadButton.textContent='Download 1080p MP4 · '+megabytes(m.size);}).catch(()=>{downloadStatus.textContent='The rendered download is not available yet.';});
downloadButton.addEventListener('click',async()=>{
 if(!renderManifest)return;downloadButton.disabled=true;let writer=null;const pieces=[];
 try{
  if(window.showSaveFilePicker){const handle=await window.showSaveFilePicker({suggestedName:renderManifest.filename,types:[{description:'MP4 video',accept:{'video/mp4':['.mp4']}}]});writer=await handle.createWritable();}
  let received=0;
  for(const part of renderManifest.parts){
   const response=await fetch(part.url);if(!response.ok)throw Error('A video part could not be downloaded. Please try again.');
   const bytes=await response.arrayBuffer();if(bytes.byteLength!==part.size)throw Error('A video part is incomplete. Please try again.');
   const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(x=>x.toString(16).padStart(2,'0')).join('');
   if(digest!==part.sha256)throw Error('Video integrity check failed. Please try again.');
   if(writer)await writer.write(bytes);else pieces.push(bytes);
   received+=bytes.byteLength;downloadStatus.textContent='Downloading '+megabytes(received)+' / '+megabytes(renderManifest.size);
  }
  if(writer){await writer.close();writer=null;}else{const url=URL.createObjectURL(new Blob(pieces,{type:'video/mp4'}));const anchor=document.createElement('a');anchor.href=url;anchor.download=renderManifest.filename;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),60000);}
  downloadStatus.textContent='Download complete · '+renderManifest.filename;
 }catch(error){if(writer)await writer.abort().catch(()=>{});downloadStatus.textContent=error.name==='AbortError'?'Download canceled.':error.message;}
 finally{downloadButton.disabled=false;}
});
