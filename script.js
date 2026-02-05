// 1. Dark Mode dengan LocalStorage
const toggleBtn = document.getElementById('dark-mode-toggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

toggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// 2. Mengambil Data JSON & Menampilkan secara Dinamis (Data Viewer)
const portfolioContainer = document.querySelector('.portfolio-grid');

async function loadProjects() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        displayProjects(data);
    } catch (err) {
        console.error("Gagal memuat data", err);
    }
}

function displayProjects(items) {
    if (!portfolioContainer) return;
    portfolioContainer.innerHTML = items.map(item => `
        <div class="card">
            <img src="${item.image}" alt="${item.title}" style="width:100%">
            <h3>${item.title}</h3>
            <p>${item.category}</p>
            <p>${item.desc}</p>
        </div>
    `).join('');
}

// 3. Fitur Search/Filter
const searchInput = document.getElementById('search-bar');
searchInput?.addEventListener('input', async (e) => {
    const term = e.target.value.toLowerCase();
    const response = await fetch('data.json');
    const data = await response.json();
    const filtered = data.filter(p => p.title.toLowerCase().includes(term));
    displayProjects(filtered);
});

// 4. Carousel Manual
let currentSlide = 0;
function moveSlide(step) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    document.querySelector('.carousel').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Inisialisasi
loadProjects();