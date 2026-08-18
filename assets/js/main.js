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
// LIVE TEMPLATE PREVIEW DI KATALOG
// Bukan foto statis: iframe memuat undangan HTML asli sehingga
// animasi cover/background Template 02 ikut bergerak di kartu katalog.
// =========================================================
const catalogCards = document.querySelector("#katalog .cards");

if (catalogCards) {
  const previewStyle = document.createElement("style");
  previewStyle.textContent = `
    .live-template-preview{
      height:330px;
      position:relative;
      overflow:hidden;
      background:#2e251f;
      isolation:isolate;
    }
    .live-template-preview::after{
      content:"LIVE PREVIEW";
      position:absolute;
      top:14px;
      left:14px;
      z-index:4;
      padding:7px 10px;
      background:rgba(255,250,244,.92);
      color:#6e5848;
      font-size:9px;
      letter-spacing:.15em;
      font-weight:800;
      border-radius:999px;
      box-shadow:0 6px 18px rgba(0,0,0,.12);
    }
    .live-template-preview iframe{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      border:0;
      pointer-events:none;
      background:#2e251f;
      transform:scale(1.015);
      animation:catalogPreviewFloat 6s ease-in-out infinite alternate;
    }
    .live-template-preview .preview-glow{
      position:absolute;
      z-index:3;
      inset:auto -25% -36% -25%;
      height:55%;
      pointer-events:none;
      background:radial-gradient(ellipse,rgba(255,238,216,.22),transparent 66%);
      animation:catalogGlow 5s ease-in-out infinite alternate;
    }
    @keyframes catalogPreviewFloat{
      from{transform:scale(1.015) translateY(0)}
      to{transform:scale(1.04) translateY(-3px)}
    }
    @keyframes catalogGlow{
      from{opacity:.45;transform:translateX(-3%)}
      to{opacity:.9;transform:translateX(3%)}
    }
  `;
  document.head.appendChild(previewStyle);

  const template02 = document.createElement("article");
  template02.className = "card show";
  template02.innerHTML = `
    <div class="ribbon">TERBARU</div>
    <div class="live-template-preview" aria-label="Preview animasi Template 02">
      <iframe
        src="/undangan/template-02/"
        title="Preview Template 02 Warm Editorial"
        loading="lazy"
        tabindex="-1"
        aria-hidden="true"></iframe>
      <div class="preview-glow"></div>
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
