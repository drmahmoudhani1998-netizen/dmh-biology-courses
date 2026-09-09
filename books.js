const books = [
  {track:"ACT", title:"Explanation", ar:"الشرح", price:"300", group:"BASIC COURSE BOOKS"},
  {track:"ACT", title:"Solution", ar:"الحل", price:"350", group:"BASIC COURSE BOOKS"},
  {track:"ACT", title:"Exams", ar:"Exams", price:"350", group:"ADVANCED COURSE BOOKS"},
  {track:"EST", title:"Explanation", ar:"الشرح", price:"300", group:"BASIC COURSE BOOKS"},
  {track:"EST", title:"Solution", ar:"الحل", price:"350", group:"BASIC COURSE BOOKS"},
  {track:"EST", title:"Advanced", ar:"Advanced", price:"200", group:"ADVANCED · EACH BOOK"},
  {track:"EST", title:"Exams", ar:"Exams", price:"450", group:"ADVANCED COURSE BOOKS"},
  {track:"EST", title:"New Exams", ar:"New Exams", price:"200", group:"ADVANCED COURSE BOOKS"}
];

const stage = document.querySelector(".wheel-story");
const wheel = document.querySelector("#wheelDisc");
const cards = [...document.querySelectorAll(".book-card")];
const collection = document.querySelector("#collection");
const position = document.querySelector("#position");
const activeTrack = document.querySelector("#activeTrack");
const activeTitle = document.querySelector("#activeTitle");
const activePrice = document.querySelector("#activePrice");
const activeArabic = document.querySelector("#activeArabic");
const line = document.querySelector("#stepLine");
const progress = document.querySelector(".progress i");

books.forEach(()=>line.insertAdjacentHTML("beforeend","<i></i>"));
const dots=[...line.children];

function render(){
  const maxDoc=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(maxDoc>0 ? (scrollY/maxDoc)*100 : 0)+"%";

  const rect=stage.getBoundingClientRect();
  const usable=stage.offsetHeight-innerHeight;
  const local=Math.min(usable,Math.max(0,-rect.top));
  const p=usable>0?local/usable:0;
  const raw=p*(books.length-1);
  const idx=Math.round(raw);
  const angle=raw*45;

  wheel.style.transform=`rotate(${-angle}deg)`;

  cards.forEach((card,i)=>{
    const base=i*45;
    card.style.transform=`rotate(${base}deg) translateY(${innerWidth<=820?-135:-310}px) translate(-50%,-50%) rotate(${angle-base}deg)`;
    card.classList.toggle("active",i===idx);
  });

  const b=books[idx];
  collection.textContent=b.track+" COLLECTION";
  position.textContent=String(idx+1).padStart(2,"0")+" / 08";
  activeTrack.textContent=b.track+" · "+b.group;
  activeTitle.textContent=b.title;
  activePrice.textContent=b.price;
  activeArabic.textContent=b.ar;
  dots.forEach((d,i)=>d.classList.toggle("active",i===idx));
}

addEventListener("scroll",render,{passive:true});
addEventListener("resize",render);
render();
