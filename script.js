// 1. Ambil Data dari JSON (Poin 5b)
async function loadProjects() {
    const container = document.getElementById('project-container');
    if(!container) return;

    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderCards(data);

        // Fitur Search (Poin 5c)
        document.getElementById('searchBar').addEventListener('input', (e) => {
            const filtered = data.filter(p => p.title.toLowerCase().includes(e.target.value.toLowerCase()));
            renderCards(filtered);
        });
    } catch (err) {
        container.innerHTML = "<p>Gagal mengambil data JSON :(</p>";
    }
}

function renderCards(data) {
    const container = document.getElementById('project-container');
    container.innerHTML = data.map(p => `
        <div class="card">
            <img src="${p.image}" alt="project">
            <h3 style="margin:15px 0; color:var(--primary);">${p.title}</h3>
            <p>${p.desc}</p>
            <small><b>Tag:</b> ${p.category}</small>
        </div>
    `).join('');
}

// 2. Dark Mode & LocalStorage (Poin 6c)
const darkBtn = document.getElementById('dark-mode-toggle');
if(darkBtn) {
    darkBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const mode = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', mode);
    });
}

if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// 3. Validasi Form (Poin 5a)
const form = document.getElementById('contactForm');
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Pesan terkirim! Terima kasih sudah mampir ✨");
        form.reset();
    });
}
// Animasi tambahan saat tombol diklik (Poin 6b)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
    });
    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1.05)';
    });
});