const EXPIRED_HTML=`<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b0b0b"><title>Undangan Tidak Aktif — Elmyra Digital</title><style>body{margin:0;min-height:100svh;display:grid;place-items:center;background:#0b0b0b;color:#f3ebdd;font-family:system-ui,sans-serif}.box{width:min(88%,520px);padding:42px 28px;text-align:center;border:1px solid rgba(210,174,104,.35);position:relative}.box:before,.box:after{content:"";position:absolute;width:28px;height:28px;border-color:#d2ae68}.box:before{left:-1px;top:-1px;border-left:1px solid;border-top:1px solid}.box:after{right:-1px;bottom:-1px;border-right:1px solid;border-bottom:1px solid}.k{color:#d2ae68;letter-spacing:.25em;font-size:11px}.ed{font:600 54px Georgia,serif;color:#d2ae68;margin:12px 0}.box h1{font:600 32px Georgia,serif;margin:0 0 12px}.box p{color:#a9a194;line-height:1.7;margin:0}</style></head><body><main class="box"><div class="k">ELMYRA DIGITAL</div><div class="ed">ED</div><h1>Undangan Sudah Tidak Aktif</h1><p>Masa tayang undangan ini telah berakhir. Silakan hubungi pemilik undangan untuk informasi lebih lanjut.</p></main></body></html>`;
const NOT_FOUND_HTML=`<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Undangan Tidak Ditemukan</title></head><body style="margin:0;min-height:100svh;display:grid;place-items:center;background:#0b0b0b;color:#f3ebdd;font-family:system-ui"><div style="text-align:center"><h1>Undangan tidak ditemukan</h1><p style="color:#a9a194">Periksa kembali link undangan.</p></div></body></html>`;

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    const match=url.pathname.match(/^\/invite\/([^/]+)\/?$/);
    if(!match)return env.ASSETS.fetch(request);

    const slug=decodeURIComponent(match[1]);
    const dataUrl=new URL(`/customers/${encodeURIComponent(slug)}/data.json`,url.origin);
    const dataRes=await env.ASSETS.fetch(new Request(dataUrl,{method:'GET'}));
    if(!dataRes.ok)return new Response(NOT_FOUND_HTML,{status:404,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});

    let data;
    try{data=await dataRes.json()}catch{return new Response(NOT_FOUND_HTML,{status:404,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}})}

    if(!data.permanent){
      const expires=Date.parse(data.activeUntil||'');
      if(!Number.isFinite(expires)||Date.now()>expires){
        return new Response(EXPIRED_HTML,{status:410,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
      }
    }

    const template=String(data.template||'').replace(/[^a-zA-Z0-9_-]/g,'');
    if(!template)return new Response(NOT_FOUND_HTML,{status:404,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
    const templateUrl=new URL(`/undangan/${template}/index.html`,url.origin);
    const templateRes=await env.ASSETS.fetch(new Request(templateUrl,{method:'GET'}));
    if(!templateRes.ok)return templateRes;

    let html=await templateRes.text();
    const loader='<script src="/assets/js/customer-loader.js" defer></script>';
    html=html.includes('</body>')?html.replace('</body>',`${loader}</body>`):html+loader;
    return new Response(html,{status:200,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
  }
};
