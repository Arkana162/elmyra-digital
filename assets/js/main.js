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
// TEMPLATE KATALOG AKTIF
// Template 02 menggunakan cover asli dari assets/template02.
// Tambahkan template baru dengan pola yang sama di sini.
// =========================================================
const catalogCards = document.querySelector("#katalog .cards");

if (catalogCards) {
  const template02 = document.createElement("article");
  template02.className = "card show";
  template02.innerHTML = `
    <div class="ribbon">TERBARU</div>
    <div class="thumb" style="
      height:320px;
      padding:0;
      position:relative;
      overflow:hidden;
      background:
        linear-gradient(180deg,rgba(37,30,25,.02) 40%,rgba(37,30,25,.72) 100%),
        url('assets/template02/cover.jpg') center/cover no-repeat;
    ">
      <div style="
        position:absolute;
        left:18px;
        right:18px;
        bottom:18px;
        color:#fff;
        text-align:left;
        text-shadow:0 2px 10px rgba(0,0,0,.35);
      ">
        <div style="font-size:10px;letter-spacing:.22em;font-weight:700;">SPECIAL PHOTO</div>
        <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:700;line-height:1.05;margin-top:7px;">Warm Editorial</div>
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
