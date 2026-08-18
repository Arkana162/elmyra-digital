const heroHeadlines=["Spesialis Undangan Digital","Elegan & Terjangkau","Interaktif & Berkesan"];
let heroHeadlineIndex=0;
const heroHeadline=document.getElementById("heroHeadline");
if(heroHeadline){setInterval(()=>{heroHeadline.classList.add("headline-out");setTimeout(()=>{heroHeadlineIndex=(heroHeadlineIndex+1)%heroHeadlines.length;heroHeadline.textContent=heroHeadlines[heroHeadlineIndex];heroHeadline.classList.remove("headline-out","headline-in");heroHeadline.classList.add("headline-in")},420)},2800)}

const whatsappNumber="6289616992224";
const whatsappMessage="Halo Elmyra Digital, saya ingin bertanya tentang undangan pernikahan digital.";
function makeEl(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e}

async function renderCatalog(){
 const root=document.querySelector("#katalog .cards");
 if(!root)return;
 try{
  const res=await fetch("/assets/data/catalog.json",{cache:"no-store"});
  const items=(await res.json()).filter(x=>x.active!==false);
  root.replaceChildren();
  items.forEach(item=>{
   const card=makeEl("article","card show");
   const preview=makeEl("div","live-template-preview");
   const shell=makeEl("div","phone-preview-shell");
   const screen=makeEl("div","phone-preview-screen");
   const img=document.createElement("img");
   img.src=item.thumbnail||"/assets/templates/default-preview.jpg";
   img.alt=item.name||"Preview undangan";
   screen.appendChild(img);shell.appendChild(screen);preview.appendChild(shell);card.appendChild(preview);
   const body=makeEl("div","card-body");
   body.appendChild(makeEl("h3","",item.name||"Undangan Digital"));
   const actions=makeEl("div","catalog-actions");
   const view=makeEl("a","btn","Lihat Undangan");view.href=item.demoUrl||"#";view.target="_blank";
   const order=makeEl("a","order-btn","Pesan");
   order.href=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(item.orderMessage||`Halo Elmyra Digital, saya ingin memesan desain ${item.name}.`)}`;
   order.target="_blank";
   actions.append(view,order);body.appendChild(actions);card.appendChild(body);root.appendChild(card);
  });
 }catch(e){console.error(e);root.textContent="Katalog belum tersedia";}
}
renderCatalog();

document.querySelectorAll(".wa-link").forEach(link=>{link.href=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;link.target="_blank"});
