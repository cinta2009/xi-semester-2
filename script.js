// 1. Ambil Data dari JSON
async function loadProjects() {
    const container = document.getElementById('project-container');
    const searchBar = document.getElementById('searchBar');
    if(!container) return;

    try {
        // Mengambil data dari data.json
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Tampilkan semua data saat pertama kali load
        renderCards(data);

        // Fitur Search
        if(searchBar) {
            searchBar.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filtered = data.filter(p => 
                    p.title.toLowerCase().includes(searchTerm) || 
                    p.category.toLowerCase().includes(searchTerm)
                );
                renderCards(filtered);
            });
        }
    } catch (err) {
        console.error("Detail Error:", err);
        container.innerHTML = `<p style="color:red;">Gagal mengambil data JSON. Pastikan file 'data.json' tersedia.</p>`;
    }
}

function renderCards(data) {
    const container = document.getElementById('project-container');
    if (data.length === 0) {
        container.innerHTML = "<p>Project tidak ditemukan...</p>";
        return;
    }

    container.innerHTML = data.map(p => `
        <div class="card">
            <img src="${p.image || 'https://via.placeholder.com/300x180'}" alt="${p.title}">
            <div class="card-body">
                <h3 style="margin:15px 0; color:var(--primary-color);">${p.title}</h3>
                <p style="font-size: 0.9rem; margin-bottom:10px;">${p.desc}</p>
                <span class="tag">#${p.category}</span>
            </div>
        </div>
    `).join('');
}

// 2. Dark Mode & LocalStorage
const darkBtn = document.getElementById('dark-mode-toggle');
if(darkBtn) {
    darkBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        darkBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    });
}

// Cek tema saat halaman dimuat
if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    if(darkBtn) darkBtn.textContent = '☀️ Light';
}

// 3. Validasi Form Contact
const form = document.getElementById('contactForm');
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Pesan terkirim! Terima kasih sudah mampir Cinta ✨");
        form.reset();
    });
}