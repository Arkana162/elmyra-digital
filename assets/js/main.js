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

const whatsappNumber = "6289616992224";
const whatsappMessage = "Halo Elmyra Digital, saya ingin bertanya tentang undangan pernikahan digital.";

document.querySelectorAll(".wa-link").forEach((link) => {
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
