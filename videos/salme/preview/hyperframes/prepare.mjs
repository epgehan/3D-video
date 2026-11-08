import {mkdir,copyFile,readdir} from 'node:fs/promises';
const target=new URL('./assets/',import.meta.url),images=new URL('../../images/',import.meta.url),shared=new URL('../assets/',import.meta.url);
await mkdir(new URL('images/',target),{recursive:true});
for(const file of await readdir(images)){if(/^\d{3}_\d+(?:\.\d+)?s\.png$/.test(file))await copyFile(new URL(file,images),new URL('images/'+file,target));}
for(const file of ['gsap.min.js','dnieper-map.svg','narration-timed.mp3','Arial-Bold.ttf','Arial-Bold.ttf'])await copyFile(new URL(file,shared),new URL(file,target));
console.log('Prepared local HyperFrames assets from the shared repository files.');
