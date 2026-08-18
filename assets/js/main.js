const heroHeadlines=["Spesialis Undangan Digital","Elegan & Terjangkau","Interaktif & Berkesan"];
let heroHeadlineIndex=0;
const heroHeadline=document.getElementById("heroHeadline");
if(heroHeadline){setInterval(()=>{heroHeadline.classList.add("headline-out");setTimeout(()=>{heroHeadlineIndex=(heroHeadlineIndex+1)%heroHeadlines.length;heroHeadline.textContent=heroHeadlines[heroHeadlineIndex];heroHeadline.classList.remove("headline-out","headline-in");void heroHeadline.offsetWidth;heroHeadline.classList.add("headline-in")},420)},2800)}

const featureHeadlines=["Harga Terjangkau","Fitur yang Lengkap","Praktis & Interaktif"];
let featureHeadlineIndex=0;
const featureHeadline=document.getElementById("featureHeadline");
if(featureHeadline){setInterval(()=>{featureHeadline.classList.add("feature-title-out");setTimeout(()=>{featureHeadlineIndex=(featureHeadlineIndex+1)%featureHeadlines.length;featureHeadline.textContent=featureHeadlines[featureHeadlineIndex];featureHeadline.classList.remove("feature-title-out","feature-title-in");void featureHeadline.offsetWidth;featureHeadline.classList.add("feature-title-in")},340)},2400)}

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("show");revealObserver.unobserve(entry.target)}})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const whatsappNumber="6289616992224";
const whatsappMessage="Halo Elmyra Digital, saya ingin bertanya tentang undangan pernikahan digital.";

function makeEl(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!=null)el.textContent=text;return el}

async function renderCatalog(){
  const root=document.querySelector("#katalog .cards");
  if(!root)return;
  root.replaceChildren(makeEl("div","catalog-loading","Memuat koleksi..."));
  try{
    const response=await fetch("/assets/data/catalog.json",{cache:"no-store"});
    if(!response.ok)throw new Error("catalog unavailable");
    const items=(await response.json()).filter(item=>item&&item.active!==false);
    root.replaceChildren();
    items.forEach(item=>{
      const card=makeEl("article","card show");card.dataset.templateId=item.id||"";
      if(item.badge){const badge=makeEl("span","catalog-badge",item.badge);card.appendChild(badge)}
      const preview=makeEl("div","live-template-preview");
      const shell=makeEl("div","phone-preview-shell");
      const screen=makeEl("div","phone-preview-screen");
      const frame=document.createElement("iframe");frame.src=item.demoUrl||"#";frame.title=`Preview ${item.name||"Undangan Digital"}`;frame.loading="lazy";frame.tabIndex=-1;frame.setAttribute("aria-hidden","true");
      screen.appendChild(frame);shell.appendChild(screen);preview.appendChild(shell);card.appendChild(preview);
      const body=makeEl("div","card-body");body.appendChild(makeEl("h3","",item.name||"Undangan Digital"));
      const actions=makeEl("div","catalog-actions");
      const view=makeEl("a","btn","Lihat Undangan");view.href=item.demoUrl||"#";view.target="_blank";view.rel="noopener noreferrer";
      const order=makeEl("a","order-btn","Pesan");const msg=item.orderMessage||`Halo Elmyra Digital, saya ingin memesan desain ${item.name||"undangan digital"}. Mohon informasi selanjutnya.`;order.href=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;order.target="_blank";order.rel="noopener noreferrer";
      actions.append(view,order);body.appendChild(actions);card.appendChild(body);root.appendChild(card);
    });
    if(!items.length)root.appendChild(makeEl("div","catalog-loading","Koleksi sedang disiapkan."));
  }catch(error){console.error("Elmyra catalog:",error);root.replaceChildren(makeEl("div","catalog-loading","Katalog belum dapat dimuat. Silakan coba lagi."))}
}
renderCatalog();

document.querySelectorAll(".wa-link").forEach(link=>{link.href=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;link.target="_blank";link.rel="noopener noreferrer"});
const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
