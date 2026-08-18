const words = ["mudah", "cepat", "indah", "berkesan"];
let wordIndex = 0;
const rotator = document.getElementById("rotator");

if (rotator) {
  setInterval(() => {
    rotator.classList.add("swap");
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotator.textContent = words[wordIndex];
      rotator.classList.remove("swap");
    }, 280);
  }, 2200);
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

// =========================================================
// LIVE TEMPLATE PREVIEW DI DALAM MOCKUP HANDPHONE
// iframe tetap memuat undangan HTML asli sehingga animasinya hidup,
// tetapi diperkecil seperti layar HP agar katalog lebih rapi.
// =========================================================
const catalogCards = document.querySelector("#katalog .cards");

if (catalogCards) {
  const previewStyle = document.createElement("style");
  previewStyle.textContent = `
    .live-template-preview{
      height:390px;
      position:relative;
      overflow:hidden;
      display:flex;
      align-items:center;
      justify-content:center;
      background:linear-gradient(145deg,#eee3d7,#d8c3ae);
      isolation:isolate;
    }
    .live-template-preview::after{
      content:"LIVE PREVIEW";
      position:absolute;
      top:14px;
      left:14px;
      z-index:6;
      padding:7px 10px;
      background:rgba(255,250,244,.94);
      color:#6e5848;
      font-size:9px;
      letter-spacing:.15em;
      font-weight:800;
      border-radius:999px;
      box-shadow:0 6px 18px rgba(0,0,0,.12);
    }
    .phone-preview-shell{
      position:relative;
      width:190px;
      height:365px;
      padding:8px;
      border-radius:34px;
      background:#171412;
      box-shadow:0 24px 45px rgba(54,40,31,.28);
      transform:rotate(-2deg);
      animation:phonePreviewFloat 5.5s ease-in-out infinite alternate;
      z-index:2;
    }
    .phone-preview-shell::before{
      content:"";
      position:absolute;
      top:8px;
      left:50%;
      transform:translateX(-50%);
      width:62px;
      height:13px;
      border-radius:0 0 10px 10px;
      background:#171412;
      z-index:5;
    }
    .phone-preview-screen{
      position:relative;
      width:100%;
      height:100%;
      border-radius:27px;
      overflow:hidden;
      background:#2e251f;
    }
    .phone-preview-screen iframe{
      position:absolute;
      top:0;
      left:0;
      width:560px;
      height:1000px;
      border:0;
      pointer-events:none;
      background:#2e251f;
      transform:scale(.31);
      transform-origin:top left;
    }
    .preview-shadow-phone{
      position:absolute;
      width:210px;
      height:28px;
      bottom:4px;
      border-radius:50%;
      background:rgba(70,50,36,.16);
      filter:blur(9px);
      z-index:1;
    }
    .live-template-preview .preview-glow{
      position:absolute;
      inset:-15%;
      pointer-events:none;
      background:radial-gradient(circle at 50% 40%,rgba(255,250,240,.55),transparent 48%);
      animation:catalogGlow 5s ease-in-out infinite alternate;
      z-index:0;
    }
    @keyframes phonePreviewFloat{
      from{transform:rotate(-2deg) translateY(3px)}
      to{transform:rotate(1deg) translateY(-7px)}
    }
    @keyframes catalogGlow{
      from{opacity:.55;transform:scale(.97)}
      to{opacity:1;transform:scale(1.04)}
    }
    @media(max-width:420px){
      .live-template-preview{height:360px}
      .phone-preview-shell{width:176px;height:338px}
      .phone-preview-screen iframe{transform:scale(.286)}
    }
  `;
  document.head.appendChild(previewStyle);

  const template02 = document.createElement("article");
  template02.className = "card show";
  template02.innerHTML = `
    <div class="ribbon">TERBARU</div>
    <div class="live-template-preview" aria-label="Preview animasi Template 02 dalam layar handphone">
      <div class="preview-glow"></div>
      <div class="preview-shadow-phone"></div>
      <div class="phone-preview-shell">
        <div class="phone-preview-screen">
          <iframe
            src="/undangan/template-02/"
            title="Preview Template 02 Warm Editorial"
            loading="lazy"
            tabindex="-1"
            aria-hidden="true"></iframe>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h3>TEMPLATE 02 — WARM EDITORIAL</h3>
      <div class="old">Rp 199.000</div>
      <div class="price">Rp 129.000</div>
      <a class="btn" href="/undangan/template-02/" target="_blank" rel="noopener noreferrer">Lihat Undangan</a>
    </div>
  `;

  catalogCards.prepend(template02);
}

const whatsappNumber = "6289616992224";
const whatsappMessage = "Halo Elmyra Digital, saya ingin bertanya tentang undangan pernikahan digital.";

document.querySelectorAll(".wa-link").forEach((link) => {
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
