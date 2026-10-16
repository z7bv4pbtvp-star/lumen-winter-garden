import {createSchoolStands} from './school-stands.js?v=5';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/RoomEnvironment.js';
import {mergeGeometries} from 'three/addons/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/RoundedBoxGeometry.js';

export async function createWinterScene({container,getState,onMode,onGift,onSchool}){
  let mobile=innerWidth<=760;let tween=null,overviewActive=true;
  const phone=mobile||matchMedia('(pointer:coarse)').matches;
  const lean=phone||(navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4);
  let renderScale=Math.min(devicePixelRatio,lean?1.15:1.4);
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  let seed=271224;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  const scene=new THREE.Scene();scene.background=new THREE.Color('#071427');scene.fog=new THREE.FogExp2('#10233b',.026);
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(renderScale);renderer.setSize(innerWidth,innerHeight);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;container.appendChild(renderer.domElement);
  const camera=new THREE.PerspectiveCamera(mobile?52:44,innerWidth/innerHeight,.1,130);
  const overviewTarget=new THREE.Vector3(0,3.55,-.7);
  function overview(){const aspect=innerWidth/innerHeight,halfWidth=innerWidth<=760&&innerHeight>innerWidth?5.8:9.4,halfHeight=4.5,vFov=THREE.MathUtils.degToRad(mobile?52:44);const distance=Math.max(halfHeight/Math.tan(vFov/2),halfWidth/(Math.tan(vFov/2)*aspect));return new THREE.Vector3(0,5.35,Math.max(18,distance));}
  const initial=overview;
  camera.position.copy(initial());const target=overviewTarget.clone();
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.copy(target);controls.enableDamping=true;controls.dampingFactor=.09;controls.enablePan=false;controls.minDistance=6;controls.maxDistance=52;controls.minPolarAngle=.30;controls.maxPolarAngle=Math.PI/2-.04;controls.autoRotate=false;controls.autoRotateSpeed=.17;controls.enabled=false;controls.update();
  controls.addEventListener('start',()=>{controls.autoRotate=false;tween=null;overviewActive=false;});
  const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.035);scene.environment=env.texture;scene.environmentIntensity=.18;room.dispose();pmrem.dispose();
  const hemi=new THREE.HemisphereLight('#9ecbff','#34402f',.28);scene.add(hemi);
  const moon=new THREE.DirectionalLight('#a1c9ff',.45);moon.position.set(-9,13,-7);scene.add(moon);
  const warmKey=new THREE.DirectionalLight('#ffdb9a',1.15);warmKey.position.set(5,9,7);warmKey.castShadow=true;warmKey.shadow.mapSize.set(lean?512:1024,lean?512:1024);Object.assign(warmKey.shadow.camera,{left:-5,right:5,top:10,bottom:-4,near:.5,far:32});warmKey.shadow.bias=-.0008;warmKey.shadow.normalBias=.025;warmKey.shadow.radius=3;scene.add(warmKey);
  const treeLight=new THREE.PointLight('#ffb756',5,13,2);treeLight.position.set(4,4,4);scene.add(treeLight);
  const backLight=new THREE.PointLight('#ffa842',5,12,2);backLight.position.set(-4,5,-3);scene.add(backLight);

  function canvasTexture(size,draw){const c=document.createElement('canvas');c.width=c.height=size;draw(c.getContext('2d'),size);return new THREE.CanvasTexture(c);}
  const glowMap=canvasTexture(128,(c,n)=>{const g=c.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.07,'rgba(255,255,255,.9)');g.addColorStop(.24,'rgba(255,255,255,.23)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,0,n,n);});
  const snowBump=canvasTexture(256,(c,n)=>{c.fillStyle='#999';c.fillRect(0,0,n,n);for(let i=0;i<22000;i++){const grey=100+rand()*155;c.fillStyle=`rgb(${grey},${grey},${grey})`;c.fillRect(rand()*n,rand()*n,1+rand()*2,1+rand()*2);}});snowBump.wrapS=snowBump.wrapT=THREE.RepeatWrapping;snowBump.repeat.set(45,45);
  const snowMat=new THREE.MeshStandardMaterial({color:'#3d4b5b',roughness:.85,metalness:0,bumpMap:snowBump,bumpScale:.035});
  const ground=new THREE.Mesh(new THREE.CircleGeometry(70,96),snowMat);ground.rotation.x=-Math.PI/2;ground.position.y=-.13;ground.receiveShadow=true;scene.add(ground);
  const goldMat=new THREE.MeshStandardMaterial({color:'#c39a58',metalness:1,roughness:.22});
  const stoneMat=new THREE.MeshStandardMaterial({color:'#526170',metalness:.12,roughness:.65,bumpMap:snowBump,bumpScale:.018});
  const podium=new THREE.Mesh(new THREE.CylinderGeometry(3.55,3.65,.23,120),stoneMat);podium.position.y=.025;podium.receiveShadow=true;scene.add(podium);
  const podiumSnow=new THREE.Mesh(new THREE.CylinderGeometry(3.52,3.56,.075,120),snowMat);podiumSnow.position.y=.178;podiumSnow.receiveShadow=true;scene.add(podiumSnow);
  function ring(radius,y,material,thick=.022){const mesh=new THREE.Mesh(new THREE.TorusGeometry(radius,thick,8,180),material);mesh.rotation.x=Math.PI/2;mesh.position.y=y;scene.add(mesh);return mesh;}
  ring(3.59,.025,goldMat,.033);
  const edgeGlowMat=new THREE.MeshBasicMaterial({color:new THREE.Color('#ffce7d').multiplyScalar(2.4)});ring(3.58,-.025,edgeGlowMat,.011);
  const contactTex=canvasTexture(128,(c,n)=>{const g=c.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);g.addColorStop(0,'#000b');g.addColorStop(.5,'#0007');g.addColorStop(1,'#0000');c.fillStyle=g;c.fillRect(0,0,n,n);});
  const contact=new THREE.Mesh(new THREE.PlaneGeometry(8.8,8.8),new THREE.MeshBasicMaterial({map:contactTex,transparent:true,depthWrite:false}));contact.rotation.x=-Math.PI/2;contact.position.y=-.12;scene.add(contact);

  // A circular brass garden with an open view of the snowy forest.
  const structuralMat=new THREE.MeshStandardMaterial({color:'#63503b',metalness:.85,roughness:.31});
  ring(17.9,.82,goldMat,.038);ring(17.9,.08,structuralMat,.045);ring(17.9,9.6,structuralMat,.09);ring(17.9,9.68,edgeGlowMat,.012);
  for(let i=0;i<12;i++){
    const a=i*Math.PI/6,x=Math.cos(a)*17.9,z=Math.sin(a)*17.9;
    const post=new THREE.Mesh(new THREE.CylinderGeometry(.035,.055,9.9,10),structuralMat);post.position.set(x,4.83,z);if(i!==3)scene.add(post);
    const points=[];for(let j=0;j<=40;j++){const t=j/40,ang=a+t*Math.PI/6;points.push(new THREE.Vector3(Math.cos(ang)*17.9,9.1-Math.sin(t*Math.PI)*1.7,Math.sin(ang)*17.9));}
    const strand=new THREE.CatmullRomCurve3(points);scene.add(new THREE.Mesh(new THREE.TubeGeometry(strand,40,.009,3,false),structuralMat));
    for(let j=0;j<13;j++){const p=strand.getPoint(j/13);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.027,5,4),edgeGlowMat);bulb.position.copy(p);scene.add(bulb);}
  }
  const panorama=await new THREE.TextureLoader().loadAsync('./assets/winter-panorama.webp');
  panorama.mapping=THREE.EquirectangularReflectionMapping;panorama.colorSpace=THREE.SRGBColorSpace;
  scene.background=panorama;scene.backgroundIntensity=.62;scene.backgroundRotation.y=.3;

  const tree=new THREE.Group();scene.add(tree);
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.035,.15,6.7,12),new THREE.MeshStandardMaterial({color:'#483124',roughness:.9}));trunk.position.y=3.55;tree.add(trunk);
  const needleData=[],twigData=[];const up=new THREE.Vector3(0,1,0),dummy=new THREE.Object3D(),tint=new THREE.Color();
  const tempA=new THREE.Vector3();
  function twig(a,b,r){twigData.push({a:a.clone(),b:b.clone(),r});}
  function spray(root,axis,count=5){
    const along=axis.clone().normalize(),side=new THREE.Vector3(-along.z,0,along.x).normalize(),cross=new THREE.Vector3().crossVectors(along,side).normalize();
    for(let k=0;k<count;k++){
      const angle=k/count*Math.PI*2+rand()*.7,dir=along.clone().multiplyScalar(.36+rand()*.3).addScaledVector(side,Math.cos(angle)*.9).addScaledVector(cross,Math.sin(angle)*.9).normalize();
      needleData.push({p:root.clone(),d:dir,l:.11+rand()*.12,w:(.009+rand()*.007)*(lean?1.45:1.18),c:rand(),snow:rand()>.996&&root.y>2.5});
    }
  }
  const tiers=lean?24:28,steps=lean?4:5;
  for(let row=0;row<tiers;row++){
    const t=row/(tiers-1),y=.75+t*6.15,r=2.5*Math.pow(1-t,.86)+.06,n=Math.round(10+(1-t)*4),rot=row*2.39996;
    for(let j=0;j<n;j++){
      const a=j/n*Math.PI*2+rot+(rand()-.5)*.13,dr=new THREE.Vector3(Math.cos(a),0,Math.sin(a)),side=new THREE.Vector3(-dr.z,0,dr.x),len=r*(.76+rand()*.16);
      const start=new THREE.Vector3(dr.x*.06,y+.16,dr.z*.06),end=new THREE.Vector3(dr.x*len,y-.12-r*.08+rand()*.12,dr.z*len);
      twig(start,end,.011+(1-t)*.012);const axis=end.clone().sub(start);
      for(let k=0;k<steps;k++){
        const f=.1+k/(steps-1)*.85,root=start.clone().lerp(end,f);
        for(const sign of [-1,1]){
          const twigAxis=dr.clone().multiplyScalar(.5).addScaledVector(side,sign*.78).normalize();twigAxis.y=.13+rand()*.16;
          const twigLen=(.13+(1-f)*r*.43)*(.85+rand()*.3),tip=root.clone().addScaledVector(twigAxis,twigLen);
          twig(root,tip,.0045+(1-f)*.004);
          const subSteps=lean?3:4;
          for(let q=0;q<subSteps;q++){const nf=q/(subSteps-1);spray(root.clone().lerp(tip,nf),twigAxis,lean?4:5);}
        }
        spray(root,axis,5);
      }
      for(let k=0;k<4;k++)spray(end.clone().addScaledVector(dr,k*.035),dr,6);
    }
  }
  // Every blade is a narrow three-dimensional needle, rather than a faceted cone.
  const needleGeo=new THREE.BufferGeometry();needleGeo.setAttribute('position',new THREE.Float32BufferAttribute([-.5,0,0,.5,0,0,0,1,0],3));needleGeo.computeVertexNormals();
  const needleMat=new THREE.MeshStandardMaterial({color:'#ffffff',roughness:.95,metalness:0,side:THREE.DoubleSide});
  const needles=new THREE.InstancedMesh(needleGeo,needleMat,needleData.length);
  for(let i=0;i<needleData.length;i++){const n=needleData[i];dummy.position.copy(n.p);dummy.quaternion.setFromUnitVectors(up,n.d);dummy.rotateY(rand()*Math.PI*2);dummy.scale.set(n.w,n.l,1);dummy.updateMatrix();needles.setMatrixAt(i,dummy.matrix);if(n.snow)tint.set('#c7d7d5');else tint.setHSL(.34+n.c*.035,.3+n.c*.25,.08+n.c*.14);needles.setColorAt(i,tint);}
  needles.castShadow=true;needles.receiveShadow=false;needles.instanceMatrix.needsUpdate=true;tree.add(needles);
  const twigMesh=new THREE.InstancedMesh(new THREE.CylinderGeometry(.6,1,1,4),new THREE.MeshStandardMaterial({color:'#3f3d2b',roughness:1}),twigData.length);
  twigData.forEach((b,i)=>{tempA.copy(b.b).sub(b.a);dummy.position.copy(b.a).add(b.b).multiplyScalar(.5);dummy.quaternion.setFromUnitVectors(up,tempA.clone().normalize());dummy.scale.set(b.r,tempA.length(),b.r);dummy.updateMatrix();twigMesh.setMatrixAt(i,dummy.matrix);});tree.add(twigMesh);
  // Data have been uploaded to the GPU; discard construction-only objects.
  needleData.length=0;twigData.length=0;

  const baubleMats=[new THREE.MeshPhysicalMaterial({color:'#d9b675',metalness:1,roughness:.12,clearcoat:1,envMapIntensity:2.2}),new THREE.MeshPhysicalMaterial({color:'#eee3cf',metalness:.25,roughness:.23,clearcoat:1}),new THREE.MeshPhysicalMaterial({color:'#7f1626',metalness:.82,roughness:.2,clearcoat:1})];
  const sphereGeo=new THREE.SphereGeometry(1,lean?16:20,lean?12:14),baubles=[];
  for(let i=0;i<112;i++){
    const t=.05+rand()*.86,y=.75+t*6.15,a=i*2.39996,r=(2.5*Math.pow(1-t,.86)+.04)*(.92+rand()*.1),size=.075+rand()*.10;
    const mesh=new THREE.Mesh(sphereGeo,baubleMats[i%7===0?2:i%3===0?1:0]);mesh.scale.setScalar(size);mesh.position.set(Math.cos(a)*r,y,Math.sin(a)*r);mesh.castShadow=true;tree.add(mesh);baubles.push(mesh);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(size*.22,size*.28,.037,8),goldMat);cap.position.copy(mesh.position);cap.position.y+=size+.008;tree.add(cap);
  }
  const strandPts=[];for(let i=0;i<=700;i++){const t=i/700,a=t*Math.PI*2*7.5,r=2.59*Math.pow(1-t,.86)+.05;strandPts.push(new THREE.Vector3(Math.cos(a)*r,.72+t*6.3,Math.sin(a)*r));}
  const strandCurve=new THREE.CatmullRomCurve3(strandPts);
  tree.add(new THREE.Mesh(new THREE.TubeGeometry(strandCurve,700,.007,4,false),new THREE.MeshStandardMaterial({color:'#667552',metalness:.65,roughness:.4})));
  const bulbCount=lean?300:360,bulbMat=new THREE.MeshBasicMaterial({color:new THREE.Color('#ffcb7c').multiplyScalar(4.2)}),bulbs=new THREE.InstancedMesh(new THREE.SphereGeometry(1,6,5),bulbMat,bulbCount),bulbPos=[];
  for(let i=0;i<bulbCount;i++){const p=strandCurve.getPoint(i/(bulbCount-1));dummy.position.copy(p);dummy.quaternion.identity();dummy.scale.setScalar(.017+(i%5===0?.008:0));dummy.updateMatrix();bulbs.setMatrixAt(i,dummy.matrix);bulbPos.push(p.x,p.y,p.z);}tree.add(bulbs);
  const glowGeo=new THREE.BufferGeometry();glowGeo.setAttribute('position',new THREE.Float32BufferAttribute(bulbPos,3));
  const sparkleMaterial=new THREE.ShaderMaterial({uniforms:{uTime:{value:0},uColor:{value:new THREE.Color('#ffcf81')},uSize:{value:lean?230:240},uBoost:{value:1}},vertexShader:`uniform float uTime;uniform float uSize;uniform float uBoost;varying float vAlpha;void main(){vec4 p=modelViewMatrix*vec4(position,1.);vAlpha=(.64+.13*sin(uTime*1.1+position.y*7.+position.x*3.))*min(uBoost,1.6);gl_PointSize=min(48.,uSize/-p.z);gl_Position=projectionMatrix*p;}`,fragmentShader:`uniform vec3 uColor;varying float vAlpha;void main(){float d=distance(gl_PointCoord,vec2(.5));float a=pow(max(0.,1.-d*2.),2.);gl_FragColor=vec4(uColor,min(a*vAlpha,.85));}`,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  tree.add(new THREE.Points(glowGeo,sparkleMaterial));

  const starShape=new THREE.Shape();for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,r=i%2===0?.37:.16;i===0?starShape.moveTo(Math.cos(a)*r,Math.sin(a)*r):starShape.lineTo(Math.cos(a)*r,Math.sin(a)*r);}starShape.closePath();
  const star=new THREE.Mesh(new THREE.ExtrudeGeometry(starShape,{depth:.08,bevelEnabled:true,bevelThickness:.03,bevelSize:.025,bevelSegments:3,steps:1}),new THREE.MeshStandardMaterial({color:'#ffda90',metalness:.85,roughness:.14,emissive:'#ffbb52',emissiveIntensity:2.8}));star.position.y=7.35;tree.add(star);
  const starHalo=new THREE.Sprite(new THREE.SpriteMaterial({map:glowMap,color:'#ffca79',transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));starHalo.position.copy(star.position);starHalo.scale.setScalar(2.0);tree.add(starHalo);
  const starLight=new THREE.PointLight('#ffcf7c',9,8,2);starLight.position.y=7.35;scene.add(starLight);

  const gifts=new THREE.Group();scene.add(gifts);const giftBodies=[];const boxGeo=new RoundedBoxGeometry(1,1,1,3,.04);
  const paperMats=[new THREE.MeshStandardMaterial({color:'#e4d8c0',roughness:.52,metalness:.08}),new THREE.MeshStandardMaterial({color:'#74323b',roughness:.4,metalness:.18}),new THREE.MeshStandardMaterial({color:'#234c43',roughness:.55,metalness:.12})];
  for(let i=0;i<10;i++){
    const a=i*2.39996,r=2.45+rand()*.4,g=new THREE.Group(),w=.35+rand()*.4,h=.3+rand()*.55,d=.33+rand()*.35;g.position.set(Math.cos(a)*r,.22+h/2,Math.sin(a)*r);g.rotation.y=rand()*Math.PI;
    const box=new THREE.Mesh(boxGeo,paperMats[i%3]);box.scale.set(w,h,d);box.castShadow=true;box.receiveShadow=true;g.add(box);giftBodies.push(box);
    const lid=new THREE.Mesh(boxGeo,paperMats[i%3]);lid.scale.set(w+.035,.065,d+.035);lid.position.y=h/2-.01;lid.castShadow=true;g.add(lid);
    const bandA=new THREE.Mesh(new THREE.BoxGeometry(w+.041,h+.028,.045),goldMat);g.add(bandA);const bandB=new THREE.Mesh(new THREE.BoxGeometry(.045,h+.03,d+.04),goldMat);g.add(bandB);
    for(const sign of [-1,1]){const bow=new THREE.Mesh(new THREE.TorusGeometry(.09,.012,7,28),goldMat);bow.scale.set(1.4,.65,1);bow.rotation.x=Math.PI/2-.28;bow.rotation.z=sign*.35;bow.position.set(sign*.085,h/2+.075,0);g.add(bow);}gifts.add(g);
  }
  const lanternMat=new THREE.MeshStandardMaterial({color:'#b98b48',metalness:1,roughness:.24});
  const flameMat=new THREE.MeshBasicMaterial({color:new THREE.Color('#ffb75e').multiplyScalar(5)});
  const lanternPositions=[];
  const lanternPoolMat=new THREE.MeshBasicMaterial({map:glowMap,color:'#e6a95f',transparent:true,opacity:.23,depthWrite:false,blending:THREE.AdditiveBlending});
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4+.2,r=i%2===0?5.1:15,g=new THREE.Group();g.position.set(Math.cos(a)*r,-.1,Math.sin(a)*r);
    const base=new THREE.Mesh(new THREE.BoxGeometry(.3,.06,.3),lanternMat);base.position.y=.03;g.add(base);const top=base.clone();top.position.y=.65;g.add(top);
    for(const x of [-.13,.13])for(const z of [-.13,.13]){const edge=new THREE.Mesh(new THREE.BoxGeometry(.018,.6,.018),lanternMat);edge.position.set(x,.34,z);g.add(edge);}
    const candle=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.3,12),paperMats[0]);candle.position.y=.20;g.add(candle);const flame=new THREE.Mesh(new THREE.SphereGeometry(.045,8,8),flameMat);flame.scale.y=1.7;flame.position.y=.4;g.add(flame);
    lanternPositions.push(g.position.x,.35,g.position.z);const pool=new THREE.Mesh(new THREE.PlaneGeometry(2.4,2.4),lanternPoolMat);pool.rotation.x=-Math.PI/2;pool.position.set(g.position.x,-.119,g.position.z);scene.add(pool);scene.add(g);
  }

  const lanternGeo=new THREE.BufferGeometry();lanternGeo.setAttribute('position',new THREE.Float32BufferAttribute(lanternPositions,3));
  const lanternGlowMat=sparkleMaterial.clone();lanternGlowMat.depthTest=false;lanternGlowMat.uniforms.uColor.value.set('#ffb75e');lanternGlowMat.uniforms.uSize.value=590;scene.add(new THREE.Points(lanternGeo,lanternGlowMat));

  const snowCount=lean?350:850,snowPos=new Float32Array(snowCount*3),snowSpeeds=new Float32Array(snowCount);
  for(let i=0;i<snowCount;i++){snowPos[i*3]=(rand()-.5)*38;snowPos[i*3+1]=rand()*15;snowPos[i*3+2]=(rand()-.5)*38;snowSpeeds[i]=.28+rand()*.4;}
  const snowGeo=new THREE.BufferGeometry();snowGeo.setAttribute('position',new THREE.BufferAttribute(snowPos,3));snowGeo.setAttribute('aSpeed',new THREE.BufferAttribute(snowSpeeds,1));
  const flakeMat=new THREE.ShaderMaterial({uniforms:{uTime:{value:0},uPixelRatio:{value:renderScale}},vertexShader:`uniform float uTime;uniform float uPixelRatio;attribute float aSpeed;void main(){vec3 p=position;p.y=mod(p.y-uTime*aSpeed,15.);p.x+=sin(uTime*.3+position.z)*.18;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(30.*(.7+aSpeed)*uPixelRatio/-mv.z,1.,8.);gl_Position=projectionMatrix*mv;}`,fragmentShader:`void main(){float a=1.-smoothstep(.05,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.78,.86,1.,a*.7);}`,transparent:true,depthWrite:false});
  const snowfall=new THREE.Points(snowGeo,flakeMat);scene.add(snowfall);
  const burstCount=lean?120:200,burstPos=new Float32Array(burstCount*3),burstVel=[],burstGeo=new THREE.BufferGeometry();burstGeo.setAttribute('position',new THREE.BufferAttribute(burstPos,3));const burstMat=new THREE.PointsMaterial({color:new THREE.Color('#ffd591').multiplyScalar(2.5),size:.075,map:glowMap,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});const burstMesh=new THREE.Points(burstGeo,burstMat);scene.add(burstMesh);let burst=0;

  const schoolStands=await createSchoolStands(scene,getState().lang);

  // Static surfaces share geometry batches. Gift hit areas stay on a separate
  // interaction layer, so batching does not remove their click behaviour.
  scene.updateMatrixWorld(true);
  const batches=new Map(),giftHitSet=new Set([...giftBodies,...schoolStands.hitAreas]);
  const staticMeshes=[];scene.traverse(o=>{if(o.isMesh&&!o.isInstancedMesh&&!o.userData.schoolStand&&o!==star&&!Array.isArray(o.material))staticMeshes.push(o);});
  for(const mesh of staticMeshes){
    const key=mesh.material.uuid+':'+mesh.castShadow+':'+mesh.receiveShadow;
    if(!batches.has(key))batches.set(key,{material:mesh.material,cast:mesh.castShadow,receive:mesh.receiveShadow,geometries:[]});
    const baked=mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);batches.get(key).geometries.push(baked.index?baked.toNonIndexed():baked);
    if(giftHitSet.has(mesh)){mesh.layers.set(1);}else mesh.removeFromParent();
  }
  for(const batch of batches.values()){
    const geometry=mergeGeometries(batch.geometries,false);
    if(!geometry)throw new Error('Unable to batch static geometry');
    const mesh=new THREE.Mesh(geometry,batch.material);mesh.castShadow=batch.cast;mesh.receiveShadow=batch.receive;scene.add(mesh);
    batch.geometries.forEach(g=>g.dispose());
  }
  batches.clear();
  let yaw=0,pitch=0,targetYaw=0,targetPitch=0,drag=false,lastX=0,lastY=0,downAt=null;
  const keys=new Set(),pointer=new THREE.Vector2(),ray=new THREE.Raycaster();ray.layers.enable(1);
  const forward=new THREE.Vector3(),right=new THREE.Vector3(),desired=new THREE.Vector3(),velocity=new THREE.Vector3(),next=new THREE.Vector3();
  let time=0,raf=0,lastTime=0,paused=false,resizeRaf=0,frameAverage=16.7,sampleCount=0,lastQualityChange=0,pauseAt=0,hiddenAt=0;
  const qa=new URLSearchParams(location.search).has('stats');let qaFrames=0,qaAt=performance.now();
  const qaHud=qa?document.body.appendChild(document.createElement('output')):null;
  if(qaHud){qaHud.id='render-stats';qaHud.style.cssText='position:fixed;right:12px;top:85px;z-index:40;max-width:95%;background:#000d;color:#fff;padding:8px;font:11px monospace;pointer-events:none';}
  function render(now=performance.now()){
    renderer.render(scene,camera);
    if(qa){qaFrames++;if(now-qaAt>1000){qaHud.textContent=JSON.stringify({fps:Math.round(qaFrames*1000/(now-qaAt)),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,needles:needles.count,pixelRatio:renderer.getPixelRatio()});qaFrames=0;qaAt=now;}}
  }
  function resize(){
    mobile=innerWidth<=760;schoolStands.layout();camera.aspect=innerWidth/innerHeight;camera.fov=mobile?52:44;camera.updateProjectionMatrix();if(overviewActive&&!tween){camera.position.copy(overview());controls.target.copy(overviewTarget);controls.update();}
    renderer.setPixelRatio(Math.min(renderScale,mobile?1.15:1.4));renderer.setSize(innerWidth,innerHeight);flakeMat.uniforms.uPixelRatio.value=renderer.getPixelRatio();
    if(!raf)render();
  }
  window.addEventListener('resize',()=>{cancelAnimationFrame(resizeRaf);resizeRaf=requestAnimationFrame(resize);});
  function stop(){cancelAnimationFrame(raf);raf=0;lastTime=0;}
  function start(){if(!raf&&!document.hidden&&!paused&&getState().entered){lastTime=0;qaAt=performance.now();qaFrames=0;raf=requestAnimationFrame(frame);}}
  function glide(pos,tar,ms=850,done=null){tween={start:performance.now(),duration:ms,from:camera.position.clone(),to:pos,targetFrom:controls.target.clone(),targetTo:tar,done};controls.autoRotate=false;}
  function walkOrientation(){camera.getWorldDirection(tempA);yaw=targetYaw=Math.atan2(-tempA.x,-tempA.z);pitch=targetPitch=Math.asin(THREE.MathUtils.clamp(tempA.y,-1,1));}
  function key(e,isDown){
    const map={KeyW:'forward',KeyS:'back',KeyA:'left',KeyD:'right',ArrowUp:'forward',ArrowDown:'back',ArrowLeft:'left',ArrowRight:'right'},k=map[e.code];
    if(!k)return;if(!isDown){keys.delete(k);return;}
    if(!getState().entered||document.querySelector('dialog[open]')||['BUTTON','INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;
    e.preventDefault();if(getState().mode!=='walk')onMode('walk');keys.add(k);
  }
  window.addEventListener('keydown',e=>key(e,true));window.addEventListener('keyup',e=>key(e,false));window.addEventListener('blur',()=>{keys.clear();velocity.set(0,0,0);});
  renderer.domElement.addEventListener('pointerdown',e=>{
    if(!getState().entered)return;downAt={x:e.clientX,y:e.clientY};
    if(getState().mode==='walk'){container.focus({preventScroll:true});if(tween){tween=null;walkOrientation();}drag=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);}
  });
  renderer.domElement.addEventListener('pointermove',e=>{if(!drag||getState().mode!=='walk')return;targetYaw-=(e.clientX-lastX)*.0035;targetPitch=THREE.MathUtils.clamp(targetPitch-(e.clientY-lastY)*.0028,-.9,.9);lastX=e.clientX;lastY=e.clientY;});
  renderer.domElement.addEventListener('pointerup',e=>{drag=false;if(downAt&&Math.hypot(e.clientX-downAt.x,e.clientY-downAt.y)<6){pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(pointer,camera);const schoolHit=ray.intersectObjects(schoolStands.hitAreas,false)[0];if(schoolHit)onSchool(schoolStands.indexAt(schoolHit));else if(ray.intersectObjects(giftBodies,false).length)onGift();}downAt=null;});
  renderer.domElement.addEventListener('pointercancel',()=>{drag=false;downAt=null;});
  document.querySelectorAll('[data-dir]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();keys.add(b.dataset.dir);b.setPointerCapture(e.pointerId);});['pointerup','pointercancel','lostpointercapture'].forEach(ev=>b.addEventListener(ev,()=>keys.delete(b.dataset.dir)));});
  const api={
    enter(){overviewActive=true;controls.enabled=false;glide(overview(),overviewTarget.clone(),850,()=>{controls.enabled=true;});start();},
    reset(){overviewActive=true;controls.enabled=false;glide(overview(),overviewTarget.clone(),850,()=>{controls.enabled=true;});start();},
    language(value){schoolStands.setLanguage(value);if(!raf)render();},
    treeView(){overviewActive=false;controls.enabled=false;glide(new THREE.Vector3(8.6,4.15,13.5),new THREE.Vector3(0,3.65,0),850,()=>{controls.enabled=true;});start();},
    home(){overviewActive=true;stop();keys.clear();velocity.set(0,0,0);tween=null;controls.enabled=true;camera.position.copy(initial());controls.target.copy(target);controls.update();render();},
    setMode(mode){
      keys.clear();velocity.set(0,0,0);controls.enabled=false;
      if(mode==='walk'){overviewActive=false;const walkPos=camera.position.clone();const radius=Math.hypot(walkPos.x,walkPos.z);if(radius>16.5)walkPos.multiplyScalar(16.5/radius);glide(new THREE.Vector3(walkPos.x,1.8,walkPos.z),new THREE.Vector3(0,3.1,0),650,walkOrientation);}
      else{const pos=camera.position.clone();pos.y=4.15;glide(pos,new THREE.Vector3(0,3.65,0),650,()=>{controls.enabled=true;});}start();
    },
    pause(){if(!paused)pauseAt=performance.now();paused=true;keys.clear();velocity.set(0,0,0);stop();},resume(){if(paused&&tween)tween.start+=performance.now()-pauseAt;paused=false;start();},
    clearKeys(){keys.clear();velocity.set(0,0,0);drag=false;},
    snow(on){snowfall.visible=on;document.querySelector('.intro-snow').style.display=on?'':'none';},
    theme(name){const colors={emerald:['#ffcb7c','#ffb756','#ffa842','#a1c9ff'],aurora:['#b6e6ff','#92bbff','#b1b8ff','#8ebdff'],gold:['#ffd891','#ffa850','#ec873e','#c5b8d8']}[name];bulbMat.color.set(colors[0]).multiplyScalar(4.2);sparkleMaterial.uniforms.uColor.value.set(colors[0]);treeLight.color.set(colors[1]);backLight.color.set(colors[2]);moon.color.set(colors[3]);document.querySelector('.welcome-art').style.filter=name==='aurora'?'saturate(.7) hue-rotate(12deg)':name==='gold'?'sepia(.13) saturate(1.12)':'';},
    wish(){burst=6;for(let i=0;i<burstCount;i++){burstPos[i*3]=0;burstPos[i*3+1]=7.35;burstPos[i*3+2]=0;const a=rand()*Math.PI*2,z=rand()*2-1,r=Math.sqrt(1-z*z),speed=1+rand()*2;burstVel[i]=new THREE.Vector3(Math.cos(a)*r*speed,z*speed+1.2,Math.sin(a)*r*speed);}burstMat.opacity=1;}
  };
  function frame(now){
    raf=0;if(document.hidden||paused||!getState().entered){lastTime=0;return;}
    raf=requestAnimationFrame(frame);
    const frameMs=lastTime?now-lastTime:16.7,dt=Math.min(frameMs/1000,.05);lastTime=now;time+=dt;sampleCount++;frameAverage+=(frameMs-frameAverage)*.04;
    // Lower only the drawing resolution after sustained slow frames. No geometry
    // rebuilds or repeated quality oscillation while a visitor is moving.
    if(sampleCount>90&&frameAverage>24&&now-lastQualityChange>5000&&renderScale>.86){renderScale=Math.max(.85,renderScale-.15);renderer.setPixelRatio(renderScale);renderer.setSize(innerWidth,innerHeight);flakeMat.uniforms.uPixelRatio.value=renderScale;lastQualityChange=now;sampleCount=0;frameAverage=16.7;}
    const state=getState();
    if(tween){const ride=tween;let p=Math.min(1,(now-ride.start)/ride.duration);p=p*p*(3-2*p);camera.position.lerpVectors(ride.from,ride.to,p);controls.target.lerpVectors(ride.targetFrom,ride.targetTo,p);camera.lookAt(controls.target);if(p===1){tween=null;ride.done?.();}}
    else if(state.mode==='walk'){
      const lookEase=1-Math.exp(-20*dt);yaw+=(targetYaw-yaw)*lookEase;pitch+=(targetPitch-pitch)*lookEase;
      forward.set(-Math.sin(yaw),0,-Math.cos(yaw));right.set(Math.cos(yaw),0,-Math.sin(yaw));desired.set(0,0,0);
      if(keys.has('forward'))desired.add(forward);if(keys.has('back'))desired.sub(forward);if(keys.has('right'))desired.add(right);if(keys.has('left'))desired.sub(right);
      desired.normalize().multiplyScalar(2.8);velocity.lerp(desired,1-Math.exp(-13*dt));next.copy(camera.position).addScaledVector(velocity,dt);
      const r=Math.hypot(next.x,next.z),bounded=THREE.MathUtils.clamp(r,4.15,16.8);if(r>0&&r!==bounded){next.x*=bounded/r;next.z*=bounded/r;}if(!schoolStands.hitAreas.some(face=>{const center=face.getWorldPosition(tempA);return Math.abs(next.x-center.x)<2.8&&Math.abs(next.z-center.z)<.6;}))camera.position.copy(next);camera.position.y=1.8;camera.rotation.set(pitch,yaw,0,'YXZ');
    }else controls.update(dt);
    if(!reduced){sparkleMaterial.uniforms.uTime.value=time;lanternGlowMat.uniforms.uTime.value=time*.3;flakeMat.uniforms.uTime.value=time;star.position.y=7.35+Math.sin(time*.8)*.025;}
    starHalo.position.y=star.position.y;star.rotation.y=Math.atan2(camera.position.x,camera.position.z);
    if(burst>0){burst-=dt;for(let i=0;i<burstCount;i++){const v=burstVel[i];burstPos[i*3]+=v.x*dt;burstPos[i*3+1]+=v.y*dt;burstPos[i*3+2]+=v.z*dt;v.y-=dt*.5;}burstGeo.attributes.position.needsUpdate=true;burstMat.opacity=Math.max(0,burst/6);sparkleMaterial.uniforms.uBoost.value=1+burst*.5;treeLight.intensity=5+burst*1.2;}else{sparkleMaterial.uniforms.uBoost.value=1;treeLight.intensity=5;}
    render(now);
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden){hiddenAt=paused?0:performance.now();keys.clear();velocity.set(0,0,0);stop();}else{if(hiddenAt&&tween&&!paused)tween.start+=performance.now()-hiddenAt;hiddenAt=0;start();}});
  await renderer.compileAsync(scene,camera);render();
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();stop();document.querySelector('#fallback').hidden=false;});
  return api;
}
