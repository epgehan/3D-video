"""Reassemble the exact rendered MP4; use local parts or download missing parts."""
from pathlib import Path
import json,hashlib,urllib.request,os
root=Path(__file__).resolve().parent
manifest=json.loads((root/'render-manifest.json').read_text())
output=root/manifest['filename'];temporary=output.with_suffix('.mp4.partial')
if output.exists():
 if hashlib.sha256(output.read_bytes()).hexdigest()==manifest['sha256']:
  print('The complete verified video already exists:',output);raise SystemExit(0)
 raise SystemExit('The output filename already exists with different contents. Rename it before downloading.')
hash_all=hashlib.sha256()
try:
 with temporary.open('wb') as dest:
  for i,part in enumerate(manifest['parts'],1):
   local=root/part['path']
   if local.exists():data=local.read_bytes()
   else:
    with urllib.request.urlopen(part['url'],timeout=120) as response:data=response.read()
   assert len(data)==part['size'] and hashlib.sha256(data).hexdigest()==part['sha256'],'Part integrity check failed'
   dest.write(data);hash_all.update(data);print(f'Part {i}/{len(manifest["parts"])} verified')
 assert hash_all.hexdigest()==manifest['sha256'],'Full video integrity check failed'
 os.replace(temporary,output);print('Video saved:',output)
except BaseException:
 temporary.unlink(missing_ok=True);raise
