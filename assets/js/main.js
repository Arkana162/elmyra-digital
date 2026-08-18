const heroHeadlines = [
  "Spesialis Undangan Digital",
  "Elegan & Terjangkau",
  "Interaktif & Berkesan"
];
let heroHeadlineIndex = 0;
const heroHeadline = document.getElementById("heroHeadline");

if (heroHeadline) {
  setInterval(() => {
    heroHeadline.classList.add("headline-out");

    setTimeout(() => {
      heroHeadlineIndex = (heroHeadlineIndex + 1) % heroHeadlines.length;
      heroHeadline.textContent = heroHeadlines[heroHeadlineIndex];
      heroHeadline.classList.remove("headline-out");
      heroHeadline.classList.remove("headline-in");
      void heroHeadline.offsetWidth;
      heroHeadline.classList.add("headline-in");
    }, 420);
  }, 2800);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const catalogBar = document.querySelector(".catalog-bar");
    if (catalogBar) catalogBar.textContent = tab.textContent;
  });
});

const whatsappNumber = "6289616992224";
const whatsappMessage = "Halo Elmyra Digital, saya ingin bertanya tentang undangan pernikahan digital.";

// =========================================================
// LIVE TEMPLATE PREVIEW — LAYAR HANDPHONE BESAR
// =========================================================
const catalogCards = document.querySelector("#katalog .cards");

if (catalogCards) {
  const previewStyle = document.createElement("style");
  previewStyle.textContent = `
    .live-template-preview{
      min-height:610px;
      position:relative;
      overflow:hidden;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px 16px 24px;
      background:linear-gradient(145deg,#f1e7dc,#dcc8b4);
      isolation:isolate;
    }
    .live-template-preview::after{
      content:"LIVE PREVIEW";
      position:absolute;
      top:16px;
      left:16px;
      z-index:7;
      padding:7px 10px;
      background:rgba(255,250,244,.95);
      color:#6e5848;
      font-size:9px;
      letter-spacing:.15em;
      font-weight:800;
      border-radius:999px;
      box-shadow:0 6px 18px rgba(0,0,0,.12);
    }
    .phone-preview-shell{
      position:relative;
      width:min(88%,320px);
      aspect-ratio:9/19.5;
      padding:9px;
      border-radius:42px;
      background:#171412;
      box-shadow:0 28px 55px rgba(54,40,31,.30);
      animation:phonePreviewFloat 5.5s ease-in-out infinite alternate;
      z-index:2;
    }
    .phone-preview-shell::before{
      content:"";
      position:absolute;
      top:9px;
      left:50%;
      transform:translateX(-50%);
      width:78px;
      height:17px;
      border-radius:0 0 12px 12px;
      background:#171412;
      z-index:5;
    }
    .phone-preview-screen{
      position:relative;
      width:100%;
      height:100%;
      border-radius:33px;
      overflow:hidden;
      background:#2e251f;
    }
    .phone-preview-screen iframe{
      position:absolute;
      top:0;
      left:0;
      width:560px;
      height:1180px;
      border:0;
      pointer-events:none;
      background:#2e251f;
      transform:scale(.54);
      transform-origin:top left;
    }
    .preview-shadow-phone{
      position:absolute;
      width:72%;
      max-width:340px;
      height:30px;
      bottom:8px;
      border-radius:50%;
      background:rgba(70,50,36,.16);
      filter:blur(10px);
      z-index:1;
    }
    .live-template-preview .preview-glow{
      position:absolute;
      inset:-15%;
      pointer-events:none;
      background:radial-gradient(circle at 50% 38%,rgba(255,250,240,.62),transparent 48%);
      animation:catalogGlow 5s ease-in-out infinite alternate;
      z-index:0;
    }
    .catalog .card-body .old,
    .catalog .card-body .price{display:none!important}
    .catalog .card-body h3{margin-bottom:18px}
    .catalog-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .catalog-actions .btn,
    .catalog-actions .order-btn{
      min-height:48px;
      display:flex;
      align-items:center;
      justify-content:center;
      text-align:center;
      text-decoration:none;
      border-radius:999px;
      font-weight:700;
      padding:11px 14px;
    }
    .catalog-actions .order-btn{
      background:#fff0dc;
      color:#9b6668;
      border:1px solid #d8aaaa;
    }
    @keyframes phonePreviewFloat{
      from{transform:translateY(4px)}
      to{transform:translateY(-8px)}
    }
    @keyframes catalogGlow{
      from{opacity:.55;transform:scale(.97)}
      to{opacity:1;transform:scale(1.04)}
    }
    @media(max-width:420px){
      .live-template-preview{min-height:560px;padding-left:12px;padding-right:12px}
      .phone-preview-shell{width:min(90%,292px)}
      .phone-preview-screen iframe{transform:scale(.49)}
      .catalog-actions{gap:8px}
      .catalog-actions .btn,.catalog-actions .order-btn{font-size:13px;padding-left:10px;padding-right:10px}
    }
  `;
  document.head.appendChild(previewStyle);

  const template02 = document.createElement("article");
  template02.className = "card show";
  template02.innerHTML = `
    <div class="ribbon">TERBARU</div>
    <div class="live-template-preview" aria-label="Preview animasi Warm Editorial dalam layar handphone">
      <div class="preview-glow"></div>
      <div class="preview-shadow-phone"></div>
      <div class="phone-preview-shell">
        <div class="phone-preview-screen">
          <iframe
            src="/undangan/template-02/"
            title="Preview Warm Editorial"
            loading="lazy"
            tabindex="-1"
            aria-hidden="true"></iframe>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h3>WARM EDITORIAL</h3>
      <div class="catalog-actions">
        <a class="btn" href="/undangan/template-02/" target="_blank" rel="noopener noreferrer">Lihat Undangan</a>
        <a class="order-btn" href="#" data-template="Warm Editorial">Pesan</a>
      </div>
    </div>
  `;

  catalogCards.prepend(template02);

  // Rapikan seluruh kartu katalog: tanpa harga, hanya judul + dua tombol.
  catalogCards.querySelectorAll(".card").forEach((card) => {
    const body = card.querySelector(".card-body");
    if (!body) return;

    body.querySelectorAll(".old,.price").forEach((el) => el.remove());

    const titleEl = body.querySelector("h3");
    const title = titleEl ? titleEl.textContent.trim() : "Undangan Digital";
    const existingMainButton = body.querySelector("a.btn");

    if (!body.querySelector(".catalog-actions")) {
      const actions = document.createElement("div");
      actions.className = "catalog-actions";

      if (existingMainButton) {
        existingMainButton.textContent = "Lihat Undangan";
        actions.appendChild(existingMainButton);
      }

      const order = document.createElement("a");
      order.className = "order-btn";
      order.href = "#";
      order.dataset.template = title;
      order.textContent = "Pesan";
      actions.appendChild(order);
      body.appendChild(actions);
    }
  });

  catalogCards.querySelectorAll(".order-btn").forEach((link) => {
    const templateName = link.dataset.template || "undangan digital";
    const message = `Halo Elmyra Digital, saya ingin memesan desain ${templateName}. Mohon informasi selanjutnya.`;
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

document.querySelectorAll(".wa-link").forEach((link) => {
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
