
const qs = (s, root=document) => root.querySelector(s);
const qsa = (s, root=document) => [...root.querySelectorAll(s)];

const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));

function createBasicDots(){
  const holder = qs('#basicDots');
  if(!holder) return;
  holder.innerHTML = '';
  for(let i=0;i<25;i++){
    const dot=document.createElement('i');
    holder.appendChild(dot);
  }
}
createBasicDots();

const railPath = qs('#dnaRailPath');
const railLength = 1800;

function globalProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max <= 0 ? 0 : window.scrollY / max;
}

function sceneProgress(section){
  const rect = section.getBoundingClientRect();
  const total = section.offsetHeight - window.innerHeight;
  const passed = -rect.top;
  return clamp(passed / Math.max(total,1), 0, 1);
}

function updateRail(){
  if(!railPath) return;
  const p = globalProgress();
  railPath.style.strokeDashoffset = railLength * (1-p);
}

function updateBasic(){
  const sec = qs('#basic');
  if(!sec) return;
  const p = sceneProgress(sec);
  const dots = qsa('#basicDots i');
  const active = Math.floor(p * dots.length * 1.12);
  dots.forEach((d,i)=>d.classList.toggle('active',i<active));
}

function animateCounters(){
  qsa('[data-count]').forEach(el=>{
    const sec = el.closest('.course');
    const p = sceneProgress(sec);
    const target = +el.dataset.count;
    const local = clamp((p-.15)/.35,0,1);
    el.textContent = Math.round(target*local);
  });
}

function updateCountdown(){
  const sec = qs('#revision');
  const el = qs('#countdownNumber');
  if(!sec || !el) return;
  const p = sceneProgress(sec);
  const value = Math.max(1, 7 - Math.floor(p*7));
  el.textContent = value;
}

function updateClock(){
  const sec=qs('#lastday');
  if(!sec) return;
  const p=sceneProgress(sec);
  const times=['3:00 PM','5:00 PM','8:00 PM','11:00 PM','1:00 AM'];
  const idx=Math.min(times.length-1,Math.floor(p*times.length));
  const time=qs('#clockTime');
  if(time) time.textContent=times[idx];

  const a=qs('.hand-a',sec), b=qs('.hand-b',sec);
  if(a) a.style.transform=`rotate(${(-90 + p*500)}deg)`;
  if(b) b.style.transform=`rotate(${(-35 + p*760)}deg)`;
}

function updateExamPapers(){
  const sec=qs('#exams');
  if(!sec) return;
  const p=sceneProgress(sec);
  qsa('.exam-papers span',sec).forEach((el,i)=>{
    const dir=i%2?1:-1;
    el.style.transform=`translate3d(${dir*p*90}px,${p*(i+1)*24}px,0) rotate(${dir*(10+i*3)}deg)`;
  });
}

function updateHero(){
  const hero=qs('#hero');
  if(!hero) return;
  const r=hero.getBoundingClientRect();
  const p=clamp(-r.top/window.innerHeight,0,1);
  const mark=qs('.hero-mark');
  const copy=qs('.hero-copy');
  if(mark) mark.style.transform=`translate(-50%,50%) scale(${1+p*.35}) rotate(${p*8}deg)`;
  if(copy) copy.style.transform=`translateY(${-p*70}px)`;
}

function revealObserver(){
  const targets=qsa('.feature-grid article, .path-card, .ring-checks li, .feature-orbit span, .feature-ribbon span');
  targets.forEach(t=>t.classList.add('reveal'));
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:.16});
  targets.forEach(t=>io.observe(t));
}
revealObserver();

function onScroll(){
  updateRail();
  updateBasic();
  animateCounters();
  updateCountdown();
  updateClock();
  updateExamPapers();
  updateHero();
}
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',onScroll);
onScroll();

qsa('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id==='#') return;
    const target=qs(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Replace this with your real WhatsApp link.
qs('#whatsappBtn')?.addEventListener('click', e=>{
  e.preventDefault();
  alert('حطي لينك الـWhatsApp الحقيقي بدل الـplaceholder في script.js');
});


// V2 active course navigator
const navLinks = qsa('.course-nav a');
const navSections = navLinks.map(a => qs(a.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = '#' + entry.target.id;
      navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')===id));
    }
  });
},{rootMargin:'-42% 0px -42% 0px', threshold:0});
navSections.forEach(s=>navObserver.observe(s));

// Premium cursor tilt for detail cards (desktop)
if(window.matchMedia('(pointer:fine)').matches){
  qsa('.detail-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(700px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', ()=>card.style.transform='');
  });
}

// ===== V3 cinematic interactions =====
const progressBar = qs('.scroll-progress i');
const cursorDot = qs('.cursor-dot');
const cursorRing = qs('.cursor-ring');

function v3Frame(){
  const p = globalProgress();
  if(progressBar) progressBar.style.width = `${p*100}%`;

  // ambient biology parallax
  qsa('.bio-floaters > *').forEach((el,i)=>{
    const dir=i%2?1:-1;
    el.style.transform=`translate3d(${dir*p*(30+i*8)}px,${p*(70+i*15)}px,0) rotate(${dir*p*45}deg)`;
  });
}
window.addEventListener('scroll',v3Frame,{passive:true}); v3Frame();

if(window.matchMedia('(pointer:fine)').matches){
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cursorDot){cursorDot.style.left=mx+'px';cursorDot.style.top=my+'px'}});
  const follow=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;if(cursorRing){cursorRing.style.left=rx+'px';cursorRing.style.top=ry+'px'}requestAnimationFrame(follow)};follow();
  qsa('a,button,.detail-card,.path-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
  });
}

const courseViewObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>e.target.classList.toggle('in-view',e.isIntersecting));
},{threshold:.22});
qsa('.course').forEach(s=>courseViewObserver.observe(s));

// subtle magnetic CTA
qsa('.btn.primary,.mini-cta').forEach(btn=>{
  if(!window.matchMedia('(pointer:fine)').matches) return;
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  btn.addEventListener('mouseleave',()=>btn.style.transform='');
});
