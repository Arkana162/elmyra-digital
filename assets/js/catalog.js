async function renderCatalog(){
  const container=document.getElementById('catalog-container');
  if(!container) return;

  try{
    const res=await fetch('/assets/data/catalog.json');
    const items=await res.json();

    container.innerHTML='';

    items.filter(item=>item.active).forEach(item=>{
      const card=document.createElement('article');
      card.className='card reveal';
      card.innerHTML=`
        <div class="thumb">
          <div class="mini-phone">
            <img src="${item.thumbnail}" alt="${item.name}">
          </div>
        </div>
        <div class="card-body">
          <h3>${item.name}</h3>
          <div class="card-actions">
            <a class="btn-outline" href="${item.demoUrl}">Lihat Undangan</a>
            <a class="btn" href="https://wa.me/?text=${encodeURIComponent(item.orderMessage||'')}" target="_blank">Pesan</a>
          </div>
        </div>`;
      container.appendChild(card);
    });
  }catch(e){
    console.error('Catalog error',e);
  }
}

document.addEventListener('DOMContentLoaded',renderCatalog);