// Dark Mode toggle
const toggle = document.getElementById("darkModeToggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });
}

// Load dark mode state
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Load portfolio data (hanya di portfolio.html)
const portfolioList = document.getElementById("portfolioList");
if (portfolioList) {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      data.projects.forEach(p => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
        portfolioList.appendChild(card);
      });
    });
}

// Form validation (hanya di about.html)
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      document.getElementById("formResult").textContent = "Semua field harus diisi!";
      return;
    }

    const formData = { name, email, message };
    document.getElementById("formResult").textContent = "Data tersimpan: " + JSON.stringify(formData);
  });
}
// Carousel manual
const images = document.querySelectorAll(".carousel-images img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove("active");
    if (i === index) {
      img.classList.add("active");
    }
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
}
