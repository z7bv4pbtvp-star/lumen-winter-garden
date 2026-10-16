import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/BufferGeometryUtils.js';
import {schoolPhotos,schoolImage} from './school-data.js?v=5';

export async function createSchoolStands(scene,language='ru'){
  const images=await Promise.all(schoolPhotos.map(p=>new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=schoolImage(p);}))); 
  await document.fonts.ready;
  const hitAreas=[],boards=[],locations=[[-6.25,0,-2.0,.12],[6.25,0,-2.0,-.12]];
  const bronze=new THREE.MeshStandardMaterial({color:'#b09260',metalness:.75,roughness:.35});
  const back=new THREE.MeshStandardMaterial({color:'#18342c',metalness:.25,roughness:.6});
  for(let side=0;side<2;side++){
    const [x,y,z,angle]=locations[side],group=new THREE.Group();group.position.set(x,y,z);group.rotation.y=angle;scene.add(group);
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1408;
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;
    const material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false,fog:false});
    const face=new THREE.Mesh(new THREE.PlaneGeometry(4.95,6.8),material);face.position.set(0,3.95,.12);group.add(face);hitAreas.push(face);
    const backing=new THREE.Mesh(new THREE.BoxGeometry(5.05,6.9,.19),back);backing.position.y=3.95;group.add(backing);
    for(const sx of [-2.48,2.48]){const frame=new THREE.Mesh(new THREE.BoxGeometry(.045,6.91,.25),bronze);frame.position.set(sx,3.95,.025);group.add(frame);const leg=new THREE.Mesh(new THREE.BoxGeometry(.09,.65,.12),bronze);leg.position.set(sx,.3,0);group.add(leg);const foot=new THREE.Mesh(new THREE.BoxGeometry(.5,.05,1),bronze);foot.position.set(sx,-.08,0);group.add(foot);}
    for(const sy of [.52,7.39]){const frame=new THREE.Mesh(new THREE.BoxGeometry(5.05,.045,.25),bronze);frame.position.set(0,sy,.025);group.add(frame);}
    const ids=side===0?[0,1,2,3]:[4,5,6],slots=[];
    ids.forEach((id,k)=>{const column=k%2,row=Math.floor(k/2),left=k===2&&side===1?304:112+column*430;slots.push({id,x:left,y:290+row*510,w:390,h:470});});
    face.userData.slots=slots;const parts=group.children.filter(o=>o.material===bronze),geometries=[];
    for(const part of parts){part.updateMatrix();geometries.push(part.geometry.clone().applyMatrix4(part.matrix));group.remove(part);}
    const trim=new THREE.Mesh(mergeGeometries(geometries),bronze);group.add(trim);geometries.forEach(g=>g.dispose());
    group.traverse(o=>{if(o.isMesh)o.userData.schoolStand=true;});
    boards.push({canvas,texture,slots,side,group});
  }
  function draw(lang){
    for(const {canvas,texture,slots,side} of boards){
      const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;
      c.fillStyle='#a92037';c.fillRect(0,0,w,h*2/3);c.fillStyle='#176347';c.fillRect(0,h*2/3,w,h/3);
      // A white embroidered band echoes the Belarusian flag.
      c.fillStyle='#fff5dd';c.fillRect(0,0,68,h);c.fillStyle='#af2437';
      for(let y=16;y<h;y+=64){for(const [dx,dy,s] of [[26,0,16],[12,16,13],[40,16,13],[26,32,16],[26,53,7]])c.fillRect(dx,y+dy,s,s);}
      c.textAlign='left';c.fillStyle='#fff0ce';c.font='600 17px Manrope, sans-serif';c.fillText(lang==='be'?'МУХАВЕЦ · ШКОЛЬНЫ ФОТААЛЬБОМ':'МУХАВЕЦ · ШКОЛЬНЫЙ ФОТОАЛЬБОМ',111,65);
      c.fillStyle='#ffffff';c.font='500 47px Cormorant, Georgia, serif';
      c.fillText(lang==='be'?'Як наша школа':'Как наша школа',110,135);
      c.fillText(lang==='be'?'сустракае Новы год':'встречает Новый год',110,190);
      c.font='400 17px Manrope, sans-serif';c.fillStyle='#fff0dedb';c.fillText(lang==='be'?'Націсніце на фота, каб адкрыць бліжэй':'Нажмите на фото, чтобы рассмотреть',112,239);
      for(const slot of slots){
        const {id,x,y,w:sw,h:sh}=slot;c.fillStyle='#f3eedf';c.fillRect(x-7,y-7,sw+14,sh+14);
        const img=images[id];if(img){const scale=Math.min(sw/img.width,(sh-38)/img.height),iw=img.width*scale,ih=img.height*scale;c.fillStyle='#172521';c.fillRect(x,y,sw,sh-38);c.drawImage(img,x+(sw-iw)/2,y+(sh-38-ih)/2,iw,ih);}
        c.fillStyle='#354c43';c.font='500 15px Manrope, sans-serif';c.fillText(String(id+1).padStart(2,'0')+'  '+schoolPhotos[id][lang],x+8,y+sh-12,sw-16);
      }
      c.fillStyle='#f8e7c4';c.font='400 17px Manrope, sans-serif';c.fillText(lang==='be'?'Свята, якое мы ствараем разам.':'Праздник, который мы создаём вместе.',112,1372);
      texture.needsUpdate=true;
    }
  }
  function layout(){const narrow=innerWidth<=760&&innerHeight>innerWidth;for(const b of boards){b.group.scale.setScalar(narrow?.65:1);b.group.position.x=(b.side===0?-1:1)*(narrow?3.8:6.25);}}
  layout();draw(language);
  return {hitAreas,layout,setLanguage:draw,indexAt(hit){const x=hit.uv.x*1024,y=(1-hit.uv.y)*1408;const s=hit.object.userData.slots.find(s=>x>=s.x-10&&x<=s.x+s.w+10&&y>=s.y-10&&y<=s.y+s.h+10);return s?s.id:hit.object.userData.slots[0].id;}};
}
