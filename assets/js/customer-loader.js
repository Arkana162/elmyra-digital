(async()=>{
  const match=location.pathname.match(/^\/invite\/([^/]+)\/?/);
  if(!match)return;
  const slug=decodeURIComponent(match[1]);
  try{
    const res=await fetch(`/customers/${encodeURIComponent(slug)}/data.json`,{cache:'no-store'});
    if(!res.ok)throw new Error('customer data not found');
    const data=await res.json();

    const q=(s,root=document)=>root.querySelector(s);
    const qa=(s,root=document)=>[...root.querySelectorAll(s)];
    const setText=(el,text)=>{if(el&&text!=null)el.textContent=text};

    const coverTitle=q('.cover h1');
    if(coverTitle&&data.couple){coverTitle.innerHTML=`${data.couple.groom||'Nama Pria'}<br>&amp; ${data.couple.bride||'Nama Wanita'}`}
    setText(q('.cover-date'),data.dateDisplay);

    const people=qa('.person');
    if(people[0]){setText(q('h3',people[0]),data.couple?.groom);setText(q('p',people[0]),data.couple?.groomParents)}
    if(people[1]){setText(q('h3',people[1]),data.couple?.bride);setText(q('p',people[1]),data.couple?.brideParents)}

    const eventCards=qa('.event-card');
    if(eventCards[0]&&data.events?.akad)setText(q('p',eventCards[0]),data.events.akad);
    if(eventCards[1]&&data.events?.resepsi)setText(q('p',eventCards[1]),data.events.resepsi);

    const locationSlide=qa('.slide').find(s=>q('.kicker',s)?.textContent.includes('LOKASI'));
    if(locationSlide){
      const title=q('.title',locationSlide);if(title&&data.location?.name)setText(title,data.location.name);
      const lead=q('.lead',locationSlide);if(lead&&data.location?.address)setText(lead,data.location.address);
      const map=q('.mapbtn',locationSlide);if(map&&data.location?.mapsUrl)map.href=data.location.mapsUrl;
    }

    const giftSlide=qa('.slide').find(s=>q('.kicker',s)?.textContent.includes('HADIAH')||q('.kicker',s)?.textContent.includes('AMPLOP'));
    if(giftSlide&&data.gift){
      const card=q('.gift-card',giftSlide);
      if(card)card.innerHTML=`<strong>${data.gift.bank||''}</strong><br>${data.gift.account||''}<br><span>a.n. ${data.gift.name||''}</span>`;
    }

    if(data.assets){
      const cover=q('.cover-bg');if(cover&&data.assets.cover)cover.src=data.assets.cover;
      const portraits=qa('.portrait img');if(portraits[0]&&data.assets.gallery1)portraits[0].src=data.assets.gallery1;if(portraits[1]&&data.assets.gallery2)portraits[1].src=data.assets.gallery2;
      const galleries=qa('.gallery img');['gallery3','gallery4','gallery5','gallery6'].forEach((k,i)=>{if(galleries[i]&&data.assets[k])galleries[i].src=data.assets[k]});
      const music=q('#music');if(music&&data.assets.music)music.src=data.assets.music;
    }

    if(data.eventDate){
      window.ELMYRA_EVENT_DATE=data.eventDate;
    }

    document.documentElement.dataset.customer=slug;
  }catch(err){console.error('Elmyra customer loader:',err)}
})();
