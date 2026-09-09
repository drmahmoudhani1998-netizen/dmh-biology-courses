const books = [
  {
    track:"ACT", title:"Explanation", ar:"الشرح", price:"300",
    chip:"BASIC COURSE BOOK",
    desc:"22 Chapter شرح كامل للمنهج، مع أهم الـPoints وTips & Tricks المهمة.",
    bullets:["22 Chapters","Full Explanation","Important Points","Tips & Tricks"]
  },
  {
    track:"ACT", title:"Solution", ar:"Classified / الحل", price:"350",
    chip:"BASIC COURSE BOOK",
    desc:"حل منظم Chapter by Chapter عشان تطبّق على كل جزء بعد ما تذاكره مباشرة.",
    bullets:["Chapter by Chapter","Practice","Concept Fixing","Classified"]
  },
  {
    track:"ACT", title:"Exams", ar:"كتاب الامتحانات", price:"350",
    chip:"ADVANCED COURSE BOOK",
    desc:"تدريب على Trials مرتبة من الأقدم للأحدث عشان تدخل على شكل الامتحان تدريجيًا.",
    bullets:["Trials","Old → New","Exam Practice","Score Training"]
  },
  {
    track:"EST", title:"Explanation", ar:"الشرح", price:"300",
    chip:"BASIC COURSE BOOK",
    desc:"22 Chapter شرح كامل للمنهج، مع أهم الـPoints وTips & Tricks المهمة.",
    bullets:["22 Chapters","Full Explanation","Important Points","Tips & Tricks"]
  },
  {
    track:"EST", title:"Solution", ar:"Classified / الحل", price:"350",
    chip:"BASIC COURSE BOOK",
    desc:"حل مرتب Chapter by Chapter لتثبيت كل Chapter قبل الانتقال للمرحلة التالية.",
    bullets:["Chapter by Chapter","Classified","Practice","Concept Fixing"]
  },
  {
    track:"EST", title:"Advanced", ar:"Advanced", price:"200",
    chip:"ADVANCED · EACH BOOK",
    desc:"نفس فكرة الـClassified لكن بتدريب أكتر وأفكار أعلى للطالب اللي عايز يزود مستواه.",
    bullets:["More Practice","Higher Ideas","Advanced Level","Chapter Based"]
  },
  {
    track:"EST", title:"Exams", ar:"كتاب الامتحانات", price:"450",
    chip:"ADVANCED COURSE BOOK",
    desc:"Trials مرتبة من الأقدم للأحدث للتدريب الكامل على شكل وأساليب الامتحان.",
    bullets:["Old → New Trials","Full Exams","Exam Strategy","Real Practice"]
  },
  {
    track:"EST", title:"New Exams", ar:"New Exams", price:"200",
    chip:"LATEST PRACTICE",
    desc:"تدريب إضافي على أحدث الـTrials لاستكمال سلسلة الامتحانات والوصول لأحدث شكل.",
    bullets:["Latest Trials","Extra Practice","New Patterns","Final Training"]
  }
];

const stage=document.querySelector(".wheel-story");
const wheel=document.querySelector("#wheelDisc");
const cards=[...document.querySelectorAll(".book-card")];
const collection=document.querySelector("#collection");
const position=document.querySelector("#position");
const track=document.querySelector("#activeTrack");
const title=document.querySelector("#activeTitle");
const ar=document.querySelector("#activeArabic");
const price=document.querySelector("#activePrice");
const chip=document.querySelector("#bookChip");
const desc=document.querySelector("#activeDesc");
const bullets=document.querySelector("#activeBullets");
const line=document.querySelector("#stepLine");
const progress=document.querySelector(".progress i");

books.forEach(()=>line.insertAdjacentHTML("beforeend","<i></i>"));
const dots=[...line.children];

function radius(){
  return innerWidth<=820 ? Math.min(innerWidth*.31,132) : Math.min(innerWidth*.185,278);
}

function render(){
  const maxDoc=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(maxDoc>0?scrollY/maxDoc*100:0)+"%";

  const r=stage.getBoundingClientRect();
  const usable=stage.offsetHeight-innerHeight;
  const passed=Math.min(usable,Math.max(0,-r.top));
  const p=usable>0?passed/usable:0;
  const raw=p*(books.length-1);
  const idx=Math.round(raw);
  const angle=raw*45;
  const rad=radius();

  wheel.style.transform=`rotate(${-angle}deg)`;

  cards.forEach((card,i)=>{
    const base=i*45;
    card.style.transform=`rotate(${base}deg) translateY(${-rad}px) translate(-50%,-50%) rotate(${angle-base}deg)`;
    card.classList.toggle("active",i===idx);
  });

  const b=books[idx];
  collection.textContent=b.track+" COLLECTION";
  position.textContent=String(idx+1).padStart(2,"0")+" / 08";
  track.textContent=b.track;
  title.textContent=b.title;
  ar.textContent=b.ar;
  price.textContent=b.price;
  chip.textContent=b.chip;
  desc.textContent=b.desc;
  bullets.innerHTML=b.bullets.map(x=>`<span>${x}</span>`).join("");
  dots.forEach((d,i)=>d.classList.toggle("active",i===idx));
}

addEventListener("scroll",render,{passive:true});
addEventListener("resize",render);
render();
