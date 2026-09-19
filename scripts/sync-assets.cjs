/* Mechanical mirror generation. Root runtime files are the source of truth. */
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const files=['index.html','cpu-lab.html','styles.css','catalog.js','cpus.js','catalog-extended.js','i18n.js','hardware.js','glossary.js','engine.js','viewer.js','workshop-data.js','workshop-components.js','workshop-lessons.js','lab-builder-bridge.js','workshop-models.js','workshop.js','workshop.css','app.js','v18-fixes.js','lab-124-fixes.js','pwa.js','sw.js','manifest.webmanifest','desktop/renderer.js','desktop/desktop.css'];
const check=process.argv.includes('--check');
let mismatches=0;
for(const destination of ['site','android-app/app/src/main/assets'])for(const file of files){
  const source=path.join(root,file),target=path.join(root,destination,file);
  if(check){if(!fs.existsSync(target)||!fs.readFileSync(source).equals(fs.readFileSync(target))){console.error(`Out of sync: ${destination}/${file}`);mismatches++}}
  else{fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(source,target)}
}
if(mismatches)process.exitCode=1;else console.log(check?'Runtime mirrors verified.':'Runtime mirrors synchronized.');
