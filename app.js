import {schoolPhotos,schoolImage} from './school-data.js?v=5';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const safeStorage = {get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
const copy = {
  ru:{
    schoolNav:'Наша школа',schoolButton:'Наша школа · 7 фото',schoolTag:'ШКОЛЬНЫЙ ФОТОАЛЬБОМ · МУХАВЕЦ',schoolLabel:'СОЗДАЁМ ПРАЗДНИК ВМЕСТЕ',schoolTitle:'Как наша школа встречает Новый год',schoolIntro:'Тёплые встречи, творчество, награды и улыбки. Семь моментов из жизни нашей школы.',schoolSource:'Фотографии из Instagram школы, предоставленные для проекта.',schoolAria:'Фотографии школы',homeText:'← Начало',edition:'НОВЫЙ ГОД / 2027',concept:'LUMEN / КОНЦЕПЦИЯ',aboutMobile:'Идея проекта ↗',resetAria:'Вернуть общий вид',exhibit:'К ёлке',about:'Идея проекта',gift:'Подарок жюри',eyebrow:'НОВОГОДНЯЯ ИНТЕРАКТИВНАЯ ИСТОРИЯ',
    title:'Пусть случится<br> <em>чудо.</em>',intro:'Тихо падает снег. Мерцают огни. И где-то между ветвями уже прячется ваше новогоднее желание.',enter:'Войти в зимний сад',introHint:'Лучше со звуком · настоящая 3D-прогулка',objectLabel:'СВЕТ, КОТОРЫЙ ОБЪЕДИНЯЕТ',
    referenceLabel:'Визуальный эскиз зимнего сада',authorFull:'Якушевич Арсений',authorSchool:'ученик 11-го класса · п. Мухавец',authorLabel:'АВТОР ПРОЕКТА',monogram:'АЯ',authorName:'Якушевич<br> Арсений',class:'ученик 11-го класса',authorNote:'Создаю сегодня.\nМечтаю о будущем.',openGift:'Для тех, кто верит в идеи',
    sceneCaption:'ВЫБЕРИТЕ НАСТРОЕНИЕ',emerald:'Рождественский',aurora:'Лунный свет',gold:'Золотой час',soundOff:'Звук выкл.',soundOn:'Звук вкл.',loading:'Собираем свет…',welcome:'ЗИМНИЙ САД · LUMEN',walkHint:'Двигайтесь клавишами<br><b>Осматривайтесь мышью</b>',orbitHint:'Вращайте сцену мышью<br><b>Масштаб — колёсиком · WASD — прогулка</b>',giftHint:'Нажмите на подарок под ёлкой ✧',wish:'Загадать желание',orbit:'Обзор',walk:'Прогулка',
    letterTag:'ЛИЧНОЕ ПОСЛАНИЕ / 2027',letterOverline:'С ТЕПЛОМ — ЧЕРЕЗ ТЕХНОЛОГИИ',letterTitle:'Большие мечты<br>начинаются с <em>искры.</em>',
    letterBody:`<p>Уважаемые члены жюри!</p><p>Новый год ещё только приближается, а мне уже хочется подарить вам немного его света. Поэтому я создал эту ёлку — маленькое пространство, в котором технологии встречаются с ожиданием чуда.</p><p>Пусть наступающий год принесёт вам здоровье, душевное спокойствие и радость от того, что вы делаете. Пусть рядом будут близкие люди, в работе случаются открытия, а среди обычных дней всегда находится место для чего-то удивительного.</p><p>Для меня этот проект — возможность сделать шаг к большой мечте. Я хочу развиваться, учиться новому и создавать классные продукты: красивые, полезные и способные вызывать эмоции. Мне интересно превращать идеи в то, с чем можно взаимодействовать, что можно почувствовать и показать другим.</p><p>Я открыт к сотрудничеству, совместным проектам и новым знаниям. Буду рад учиться у опытных людей и работать с теми, кому тоже хочется создавать что-то интересное. Верю, что даже небольшая идея может вырасти во что-то значимое, если вложить в неё труд, любопытство и заботу.</p><p>Спасибо вам за время, внимание и готовность замечать первые шаги. За каждым таким шагом — человек, который решился попробовать.</p><p>С наступающим Новым годом! Пусть у вас будет больше поводов улыбаться, смелости начинать и сил доводить задуманное до конца. А эта ёлка пусть напомнит: будущее становится светлее, когда мы сами добавляем в него свет.</p>`,
    signature:'Арсений',signatureDetail:'Якушевич Арсений · 11-й класс · п. Мухавец',letterEnd:'ПУСТЬ ВАШ НОВЫЙ ГОД БУДЕТ СВЕТЛЫМ.',
    aboutTag:'ТРАДИЦИЯ В НОВОМ ИЗМЕРЕНИИ',aboutTitle:'А что, если ёлка<br>сделана из <em>света?</em>',aboutLead:'LUMEN — моя идея новогодней ёлки будущего. Знакомый с детства символ превращается в живую цифровую скульптуру, которую можно исследовать.',formTitle:'Форма',formText:'Живая форма хвои, отражения на ёлочных шарах и сотни тёплых огней. Ёлка стоит в заснеженном круглом саду, окружённом зимним лесом.',mediaTitle:'Ощущение',mediaText:'Три световых настроения, падающий снег и авторская синтезированная мелодия. Вы выбираете, каким будет этот маленький мир.',ideaTitle:'Смысл',ideaText:'Технологии могут дарить тепло. Я хочу учиться, создавать полезные и красивые продукты и находить людей, с которыми можно воплощать смелые идеи.',credit:'Якушевич Арсений, ученик 11-го класса, п. Мухавец.',
    fallbackTitle:'Для этой ёлки нужен WebGL',fallbackText:'Откройте сайт в современном браузере с включённым аппаратным ускорением. Поздравление и история проекта доступны в меню.',
    wishes:['Пусть смелая идея найдёт свой путь.','Пусть в новом году будет больше света.','Пусть мечты встречают возможности.','Пусть рядом будут те, кто верит в вас.'],
    sceneAria:'Интерактивная трёхмерная ёлка. Вращайте мышью. WASD или стрелки — прогулка.',navAria:'Навигация',homeAria:'На начальный экран',closeAria:'Закрыть',snowAria:'Снег',fullAria:'Полный экран',themesAria:'Световые настроения',forward:'Вперёд',back:'Назад',left:'Влево',right:'Вправо'
  },
  be:{
    schoolNav:'Наша школа',schoolButton:'Наша школа · 7 фота',schoolTag:'ШКОЛЬНЫ ФОТААЛЬБОМ · МУХАВЕЦ',schoolLabel:'СТВАРАЕМ СВЯТА РАЗАМ',schoolTitle:'Як наша школа сустракае Новы год',schoolIntro:'Цёплыя сустрэчы, творчасць, узнагароды і ўсмешкі. Сем імгненняў з жыцця нашай школы.',schoolSource:'Фатаграфіі з Instagram школы, прадастаўленыя для праекта.',schoolAria:'Фатаграфіі школы',homeText:'← Пачатак',edition:'НОВЫ ГОД / 2027',concept:'LUMEN / КАНЦЭПЦЫЯ',aboutMobile:'Ідэя праекта ↗',resetAria:'Вярнуць агульны выгляд',exhibit:'Да ёлкі',about:'Ідэя праекта',gift:'Падарунак журы',eyebrow:'НАВАГОДНЯЯ ІНТЭРАКТЫЎНАЯ ГІСТОРЫЯ',
    title:'Няхай здарыцца<br> <em>цуд.</em>',intro:'Ціха падае снег. Мігцяць агні. І недзе паміж галінамі ўжо хаваецца ваша навагодняе жаданне.',enter:'Увайсці ў зімовы сад',introHint:'Лепш з гукам · сапраўдная 3D-прагулка',objectLabel:'СВЯТЛО, ЯКОЕ АБ’ЯДНОЎВАЕ',
    referenceLabel:'Візуальны эскіз зімовага саду',authorFull:'Якушэвіч Арсеній',authorSchool:'вучань 11-га класа · п. Мухавец',authorLabel:'АЎТАР ПРАЕКТА',monogram:'АЯ',authorName:'Якушэвіч<br> Арсеній',class:'вучань 11-га класа',authorNote:'Ствараю сёння.\nМару пра будучыню.',openGift:'Для тых, хто верыць у ідэі',
    sceneCaption:'ВЫБЕРЫЦЕ НАСТРОЙ',emerald:'Калядны',aurora:'Месяцовае святло',gold:'Залатая гадзіна',soundOff:'Гук выкл.',soundOn:'Гук укл.',loading:'Збіраем святло…',welcome:'ЗІМОВЫ САД · LUMEN',walkHint:'Рухайцеся клавішамі<br><b>Азірайцеся мышшу</b>',orbitHint:'Паварочвайце сцэну мышшу<br><b>Маштаб — колцам · WASD — прагулка</b>',giftHint:'Націсніце на падарунак пад ёлкай ✧',wish:'Загадаць жаданне',orbit:'Агляд',walk:'Прагулка',
    letterTag:'АСАБІСТАЕ ПАСЛАННЕ / 2027',letterOverline:'З ЦЯПЛОМ — ПРАЗ ТЭХНАЛОГІІ',letterTitle:'Вялікія мары<br>пачынаюцца з <em>іскры.</em>',
    letterBody:`<p>Паважаныя члены журы!</p><p>Новы год яшчэ толькі набліжаецца, а мне ўжо хочацца падарыць вам крыху яго святла. Таму я стварыў гэтую ёлку — маленькую прастору, у якой тэхналогіі сустракаюцца з чаканнем цуду.</p><p>Няхай надыходзячы год прынясе вам здароўе, душэўны спакой і радасць ад таго, што вы робіце. Няхай побач будуць блізкія людзі, у працы здараюцца адкрыцці, а сярод звычайных дзён заўсёды знаходзіцца месца для чагосьці дзіўнага.</p><p>Для мяне гэты праект — магчымасць зрабіць крок да вялікай мары. Я хачу развівацца, вучыцца новаму і ствараць класныя прадукты: прыгожыя, карысныя і здольныя выклікаць эмоцыі. Мне цікава ператвараць ідэі ў тое, з чым можна ўзаемадзейнічаць, што можна адчуць і паказаць іншым.</p><p>Я адкрыты да супрацоўніцтва, сумесных праектаў і новых ведаў. Буду рады вучыцца ў дасведчаных людзей і працаваць з тымі, каму таксама хочацца ствараць нешта цікавае. Веру, што нават невялікая ідэя можа вырасці ў нешта значнае, калі ўкласці ў яе працу, цікаўнасць і клопат.</p><p>Дзякуй вам за час, увагу і гатоўнасць заўважаць першыя крокі. За кожным такім крокам — чалавек, які наважыўся паспрабаваць.</p><p>З надыходзячым Новым годам! Няхай у вас будзе больш нагод усміхацца, смеласці пачынаць і сіл даводзіць задуманае да канца. А гэтая ёлка няхай нагадае: будучыня робіцца святлейшай, калі мы самі дадаём у яе святло.</p>`,
    signature:'Арсеній',signatureDetail:'Якушэвіч Арсеній · 11-ы клас · п. Мухавец',letterEnd:'НЯХАЙ ВАШ НОВЫ ГОД БУДЗЕ СВЕТЛЫМ.',
    aboutTag:'ТРАДЫЦЫЯ Ў НОВЫМ ВЫМЯРЭННІ',aboutTitle:'А што, калі ёлка<br>зроблена са <em>святла?</em>',aboutLead:'LUMEN — мая ідэя навагодняй ёлкі будучыні. Знаёмы з дзяцінства сімвал ператвараецца ў жывую лічбавую скульптуру, якую можна даследаваць.',formTitle:'Форма',formText:'Жывая форма ігліцы, адлюстраванні на ёлачных шарах і сотні цёплых агнёў. Ёлка стаіць у заснежаным круглым садзе, акружаным зімовым лесам.',mediaTitle:'Адчуванне',mediaText:'Тры светлавыя настроі, снег і аўтарская сінтэзаваная мелодыя. Вы выбіраеце, якім будзе гэты маленькі свет.',ideaTitle:'Сэнс',ideaText:'Тэхналогіі могуць дарыць цяпло. Я хачу вучыцца, ствараць карысныя і прыгожыя прадукты і знаходзіць людзей, з якімі можна ўвасабляць смелыя ідэі.',credit:'Якушэвіч Арсеній, вучань 11-га класа, п. Мухавец.',
    fallbackTitle:'Для гэтай ёлкі патрэбны WebGL',fallbackText:'Адкрыйце сайт у сучасным браўзеры з уключаным апаратным паскарэннем. Віншаванне і гісторыя праекта даступныя ў меню.',
    wishes:['Няхай смелая ідэя знойдзе свой шлях.','Няхай у новым годзе будзе больш святла.','Няхай мары сустракаюць магчымасці.','Няхай побач будуць тыя, хто верыць у вас.'],
    sceneAria:'Інтэрактыўная трохмерная ёлка. Паварочвайце мышшу. WASD або стрэлкі — прагулка.',navAria:'Навігацыя',homeAria:'На пачатковы экран',closeAria:'Закрыць',snowAria:'Снег',fullAria:'Поўны экран',themesAria:'Светлавыя настроі',forward:'Наперад',back:'Назад',left:'Улева',right:'Управа'
  }
};
let lang=safeStorage.get('lumen-lang')==='be'?'be':'ru',entered=false,mode='orbit',soundPlaying=false,snowing=true,theme='emerald',sceneReady=false;
let schoolIndex=0;
let sceneAPI=null,wishTimer=null,wishIndex=0;
function setLanguage(value){
  lang=value;const t=copy[lang];document.documentElement.lang=lang;document.title=lang==='ru'?'LUMEN — ёлка будущего':'LUMEN — ёлка будучыні';
  $$('[data-i18n]').forEach(el=>{el.textContent=t[el.dataset.i18n]||'';if(el.dataset.i18n==='authorNote')el.style.whiteSpace='pre-line'});
  $$('[data-i18n-html]').forEach(el=>el.innerHTML=t[el.dataset.i18nHtml]||'');
  $('#ru').classList.toggle('selected',lang==='ru');$('#be').classList.toggle('selected',lang==='be');$('#ru').setAttribute('aria-pressed',lang==='ru');$('#be').setAttribute('aria-pressed',lang==='be');
  $('#scene').setAttribute('aria-label',t.sceneAria);$('.nav').setAttribute('aria-label',t.navAria);$('#home').setAttribute('aria-label',t.homeAria);$('#snow').setAttribute('aria-label',t.snowAria);$('#fullscreen').setAttribute('aria-label',t.fullAria);$('#camera-reset').setAttribute('aria-label',t.resetAria);$('#camera-reset').title=t.resetAria;$('.themes').setAttribute('aria-label',t.themesAria);$$('[data-close]').forEach(e=>e.setAttribute('aria-label',t.closeAria));$$('[data-dir]').forEach(e=>e.setAttribute('aria-label',t[e.dataset.dir]));
  $('#sound span').textContent=t[soundPlaying?'soundOn':'soundOff'];$('#sound').setAttribute('aria-label',t[soundPlaying?'soundOn':'soundOff']);$('.move-hint p').innerHTML=t[mode==='walk'?'walkHint':'orbitHint'];
  if($('#wish-message').classList.contains('show'))$('#wish-message').textContent=t.wishes[(wishIndex-1)%t.wishes.length];
  sceneAPI?.language(lang);if($('#school-thumbnails').children.length)showSchoolPhoto(schoolIndex);
  safeStorage.set('lumen-lang',lang);
}
$('#ru').onclick=()=>setLanguage('ru');$('#be').onclick=()=>setLanguage('be');setLanguage(lang);

function showSchoolPhoto(index){schoolIndex=index;const photo=schoolPhotos[index];$('#school-image').src=schoolImage(photo);$('#school-image').alt=photo[lang];$('#school-caption').textContent=photo[lang];$('#school-count').textContent=String(index+1).padStart(2,'0')+' / 07';$('#school-thumbnails').setAttribute('aria-label',copy[lang].schoolAria);$$('[data-school-index]').forEach((b,i)=>{b.setAttribute('aria-label',schoolPhotos[i][lang]);b.setAttribute('aria-pressed',i===index);});}
function openSchool(index=0){showSchoolPhoto(index);openPanel('#school-gallery');}
for(const [index,photo] of schoolPhotos.entries()){const button=document.createElement('button');button.type='button';button.dataset.schoolIndex=index;button.setAttribute('aria-pressed','false');const img=document.createElement('img');img.src=schoolImage(photo);img.alt='';img.loading='lazy';button.appendChild(img);button.onclick=()=>showSchoolPhoto(index);$('#school-thumbnails').appendChild(button);}
$('#school-nav').onclick=()=>openSchool(0);$('#school-open').onclick=()=>openSchool(0);

const openPanel=id=>{sceneAPI?.clearKeys();sceneAPI?.pause();$(id).showModal();};
$('#about').onclick=()=>openPanel('#about-panel');$('#about-mobile').onclick=()=>openPanel('#about-panel');$('#gift-nav').onclick=()=>openPanel('#letter');$('#gift-card').onclick=()=>openPanel('#about-panel');
$$('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$$('dialog').forEach(d=>{d.addEventListener('close',()=>{sceneAPI?.resume();if(entered)$('#scene').focus({preventScroll:true});});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}})});

function enter(){
  entered=true;setMode('orbit');document.body.classList.add('visiting');$('#intro').setAttribute('inert','');$('#visit-ui').hidden=false;sceneAPI?.enter();
  if(!soundPlaying)music.start().catch(()=>{});setTimeout(()=>$('#scene').focus({preventScroll:true}),100);
}
$('#enter').onclick=enter;
function resetView(){if(!entered)return;setMode('orbit');sceneAPI?.reset();$('#scene').focus({preventScroll:true});}
$('#exhibit').onclick=()=>{if(!entered)return;setMode('orbit');sceneAPI?.treeView();$('#scene').focus({preventScroll:true});};$('#camera-reset').onclick=resetView;
$('#home').onclick=()=>{entered=false;document.body.classList.remove('visiting');$('#intro').removeAttribute('inert');$('#visit-ui').hidden=true;$('#mobile-move').hidden=true;sceneAPI?.home();};
function setMode(next){mode=next;$('#orbit-mode').classList.toggle('selected',mode==='orbit');$('#walk-mode').classList.toggle('selected',mode==='walk');$('#orbit-mode').setAttribute('aria-pressed',mode==='orbit');$('#walk-mode').setAttribute('aria-pressed',mode==='walk');$('.move-hint p').innerHTML=copy[lang][mode==='walk'?'walkHint':'orbitHint'];syncInputUI();sceneAPI?.setMode(mode);}
function syncInputUI(){$('#mobile-move').hidden=!(entered&&mode==='walk'&&(innerWidth<=900||matchMedia('(pointer:coarse)').matches));}
window.addEventListener('resize',syncInputUI);
$('#orbit-mode').onclick=()=>{setMode('orbit');$('#scene').focus({preventScroll:true});};$('#walk-mode').onclick=()=>{setMode('walk');$('#scene').focus({preventScroll:true});};
$('#wish').onclick=()=>{clearTimeout(wishTimer);$('#wish-message').textContent=copy[lang].wishes[wishIndex++%4];$('#wish-message').classList.add('show');sceneAPI?.wish();music.chime();wishTimer=setTimeout(()=>$('#wish-message').classList.remove('show'),5400);};
$$('.theme').forEach(b=>b.onclick=()=>{theme=b.dataset.theme;$$('.theme').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)});$('.scene-index').innerHTML=`0${['emerald','aurora','gold'].indexOf(theme)+1} <span>/ 03</span>`;sceneAPI?.theme(theme);});
$('#snow').onclick=()=>{snowing=!snowing;$('#snow').setAttribute('aria-pressed',snowing);sceneAPI?.snow(snowing);};
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{}};

// A finite, original 96-second ambient composition. All tones are synthesized locally.
const music={ctx:null,master:null,endTimer:null,nodes:[],playing:false,
  async start(){
    if(this.playing)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    this.ctx ||= new AC();await this.ctx.resume();if(this.ctx.state!=='running')return;
    this.master=this.ctx.createGain();this.master.gain.value=.58;this.master.connect(this.ctx.destination);this.playing=true;this.update(true);
    const now=this.ctx.currentTime+.12,duration=96;const chords=[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]];
    for(let bar=0;bar<24;bar++){
      const chord=chords[bar%4];chord.forEach((m,i)=>this.tone(m,now+bar*4+i*.04,4.6,.027,'sine'));
      const melody=[chord[2]+12,chord[3]+12,chord[1]+24,chord[2]+12];melody.forEach((m,j)=>{if((bar+j)%3!==0)this.bell(m,now+bar*4+j*.94,.046)});
    }
    this.master.gain.setValueAtTime(.58,now+duration-6);this.master.gain.linearRampToValueAtTime(0,now+duration);
    this.endTimer=setTimeout(()=>this.stop(),duration*1000+300);
  },
  tone(midi,at,length,volume,type='sine'){
    const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.value=440*2**((midi-69)/12);g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(volume,at+.6);g.gain.exponentialRampToValueAtTime(.0001,at+length);o.connect(g);g.connect(this.master);o.start(at);o.stop(at+length+.05);this.nodes.push(o);o.onended=()=>{o.disconnect();g.disconnect();const i=this.nodes.indexOf(o);if(i!==-1)this.nodes.splice(i,1);};
  },
  bell(midi,at,vol){
    [1,2.001,3.99].forEach((ratio,i)=>{const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.frequency.value=440*2**((midi-69)/12)*ratio;g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(vol/(i+1)**2,at+.014);g.gain.exponentialRampToValueAtTime(.0001,at+2.8-i*.4);o.connect(g);g.connect(this.master);o.start(at);o.stop(at+3);this.nodes.push(o);o.onended=()=>{o.disconnect();g.disconnect();const ix=this.nodes.indexOf(o);if(ix!==-1)this.nodes.splice(ix,1);};});
  },
  chime(){if(this.playing){const t=this.ctx.currentTime;[72,76,79,84].forEach((n,i)=>this.bell(n,t+i*.15,.07));}},
  stop(){clearTimeout(this.endTimer);this.nodes.forEach(o=>{try{o.stop()}catch{}});this.nodes=[];this.master?.disconnect();this.playing=false;this.update(false);},
  update(v){soundPlaying=v;$('#sound').setAttribute('aria-pressed',v);$('#sound span').textContent=copy[lang][v?'soundOn':'soundOff'];$('#sound').setAttribute('aria-label',copy[lang][v?'soundOn':'soundOff']);}
};
$('#sound').onclick=()=>{if(music.playing)music.stop();else music.start().catch(()=>music.update(false));};
document.addEventListener('visibilitychange',()=>{sceneAPI?.clearKeys();if(music.ctx){if(document.hidden)music.ctx.suspend().catch(()=>{});else if(music.playing)music.ctx.resume().catch(()=>{});}});


// The welcome artwork sets the mood; the interactive garden is fully three-dimensional.
for(let i=0;i<(innerWidth<=760?12:20);i++){const flake=document.createElement('i');flake.style.cssText=`left:${Math.random()*100}%;animation-delay:-${Math.random()*18}s;animation-duration:${12+Math.random()*15}s;opacity:${.12+Math.random()*.3};width:${1+Math.random()*3}px;height:${1+Math.random()*3}px`;$('.intro-snow').appendChild(flake);}
import('./winter-scene.js?v=5').then(async ({createWinterScene})=>{
  sceneAPI=await createWinterScene({container:$('#scene'),getState:()=>({entered,mode,lang}),onMode:setMode,onGift:()=>openPanel('#letter'),onSchool:openSchool});
  sceneReady=true;sceneAPI.theme(theme);sceneAPI.snow(snowing);$('#loading').hidden=true;$('#enter').disabled=false;$('#enter').setAttribute('aria-busy','false');
}).catch(error=>{console.error('LUMEN:',error);$('#loading').hidden=true;$('#fallback').hidden=false;$('#enter').disabled=true;});

if(!document.fullscreenEnabled||!document.documentElement.requestFullscreen)$('#fullscreen').hidden=true;
