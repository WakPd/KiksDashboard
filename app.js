// Données initiales
let cvData = {
    name: "Votre Nom",
    title: "Chef de Projet chez ICDC",
    email: "contact@example.com",
    phone: "+33 X XX XX XX XX",
    location: "France",
    summary: "Chef de projet passionné avec une solide expertise en gestion de projets IT, développement d'applications et transformation digitale. Spécialisé dans les méthodologies agiles et la coordination d'équipes multidisciplinaires.",
    experiences: [
        {
            title: "Chef de Projet",
            company: "ICDC",
            location: "France",
            period: "2024 - Présent",
            description: [
                "Pilotage de projets digitaux de bout en bout en méthodologie agile",
                "Coordination des équipes techniques et fonctionnelles",
                "Gestion du backlog produit et animation des sprints Scrum",
                "Suivi de la qualité, des délais et du budget des projets"
            ]
        }
    ],
    education: [
        {
            degree: "Master MIAGE (en cours)",
            school: "Université",
            location: "France",
            period: "2023 - 2025"
        }
    ],
    skills: [
        {
            category: "Gestion de Projet",
            items: ["Agile/Scrum", "Kanban", "Jira", "Confluence", "MS Project"]
        },
        {
            category: "Développement",
            items: ["React", "TypeScript", "Node.js", "HTML/CSS", "JavaScript"]
        }
    ]
};

let stocks = JSON.parse(localStorage.getItem('stocks') || '[]');
let perfumes = JSON.parse(localStorage.getItem('perfumes') || '[]');

// Navigation
function showPage(pageId) {
    // Cacher toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page sélectionnée
    document.getElementById(pageId).classList.add('active');
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.nav-link').classList.add('active');
    
    // Charger les données spécifiques
    if (pageId === 'portfolio') loadPortfolio();
    if (pageId === 'finance') loadStocks();
    if (pageId === 'perfumes') loadPerfumes();
}

// Portfolio
function loadPortfolio() {
    // Header
    document.getElementById('cv-name').textContent = cvData.name;
    document.getElementById('cv-title').textContent = cvData.title;
    document.getElementById('cv-email').textContent = cvData.email;
    document.getElementById('cv-phone').textContent = cvData.phone;
    document.getElementById('cv-location').textContent = cvData.location;
    document.getElementById('cv-summary').textContent = cvData.summary;
    
    // Expériences
    const expList = document.getElementById('experiences-list');
    expList.innerHTML = cvData.experiences.map(exp => `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                    <h4 class="text-2xl font-bold text-blue-400">${exp.title}</h4>
                    <p class="text-xl">${exp.company}</p>
                    <p class="text-gray-500">${exp.location}</p>
                </div>
                <span class="text-gray-400">${exp.period}</span>
            </div>
            <ul class="space-y-2">
                ${exp.description.map(item => `
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-blue-400 mt-1"></i>
                        <span>${item}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
    
    // Formation
    const eduList = document.getElementById('education-list');
    eduList.innerHTML = cvData.education.map(edu => `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                    <h4 class="text-xl font-bold text-blue-400">${edu.degree}</h4>
                    <p class="text-lg">${edu.school}</p>
                    <p class="text-gray-500">${edu.location}</p>
                </div>
                <span class="text-gray-400">${edu.period}</span>
            </div>
        </div>
    `).join('');
    
    // Compétences
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = cvData.skills.map(skillGroup => `
        <div class="card">
            <h4 class="text-lg font-bold text-blue-400 mb-3">${skillGroup.category}</h4>
            <div class="flex flex-wrap gap-2">
                ${skillGroup.items.map(skill => `
                    <span class="px-3 py-1 bg-gray-800 rounded-lg text-sm">${skill}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function editCV() {
    const name = prompt('Votre nom:', cvData.name);
    if (name) cvData.name = name;
    
    const title = prompt('Votre titre:', cvData.title);
    if (title) cvData.title = title;
    
    const email = prompt('Votre email:', cvData.email);
    if (email) cvData.email = email;
    
    const phone = prompt('Votre téléphone:', cvData.phone);
    if (phone) cvData.phone = phone;
    
    const summary = prompt('Résumé professionnel:', cvData.summary);
    if (summary) cvData.summary = summary;
    
    loadPortfolio();
}

// Finance
function loadStocks() {
    const grid = document.getElementById('stocks-grid');
    
    if (stocks.length === 0) {
        grid.innerHTML = `
            <div class="card col-span-full text-center py-12">
                <i class="fas fa-chart-line text-6xl text-gray-600 mb-4"></i>
                <h3 class="text-xl font-semibold mb-2">Aucun actif suivi</h3>
                <p class="text-gray-400">Recherchez et ajoutez des actifs pour commencer</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = stocks.map((stock, index) => {
        const isPositive = stock.change >= 0;
        return `
            <div class="card relative">
                <button onclick="removeStock(${index})" class="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <i class="fas fa-times"></i>
                </button>
                
                <h3 class="text-2xl font-bold text-blue-400 mb-1">${stock.symbol}</h3>
                <p class="text-sm text-gray-400 mb-4">${stock.name}</p>
                
                <div class="text-3xl font-bold mb-2">$${stock.price.toFixed(2)}</div>
                
                <div class="flex items-center gap-2 ${isPositive ? 'text-green-400' : 'text-red-400'}">
                    <i class="fas fa-${isPositive ? 'arrow-up' : 'arrow-down'}"></i>
                    <span class="font-semibold">
                        ${isPositive ? '+' : ''}${stock.change.toFixed(2)} 
                        (${isPositive ? '+' : ''}${stock.changePercent.toFixed(2)}%)
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function addStock() {
    const input = document.getElementById('stock-search');
    const symbol = input.value.trim().toUpperCase();
    
    if (!symbol) return;
    
    // Simuler des données (en production, utiliser une vraie API)
    const newStock = {
        symbol: symbol,
        name: symbol,
        price: 100 + Math.random() * 500,
        change: -10 + Math.random() * 20,
        changePercent: -5 + Math.random() * 10
    };
    
    stocks.push(newStock);
    localStorage.setItem('stocks', JSON.stringify(stocks));
    
    input.value = '';
    loadStocks();
}

function removeStock(index) {
    stocks.splice(index, 1);
    localStorage.setItem('stocks', JSON.stringify(stocks));
    loadStocks();
}

// Parfums
function loadPerfumes() {
    loadWeather();
    
    const grid = document.getElementById('perfumes-grid');
    
    if (perfumes.length === 0) {
        grid.innerHTML = `
            <div class="card col-span-full text-center py-12">
                <i class="fas fa-flask text-6xl text-gray-600 mb-4"></i>
                <h3 class="text-xl font-semibold mb-2">Aucun parfum</h3>
                <p class="text-gray-400">Ajoutez des parfums à votre collection</p>
            </div>
        `;
        return;
    }
    
    const typeColors = {
        fresh: 'from-blue-500 to-cyan-500',
        warm: 'from-orange-500 to-red-500',
        floral: 'from-pink-500 to-purple-500',
        woody: 'from-amber-700 to-amber-900',
        oriental: 'from-purple-700 to-indigo-900',
        citrus: 'from-yellow-400 to-lime-500'
    };
    
    grid.innerHTML = perfumes.map((perfume, index) => `
        <div class="card relative">
            <button onclick="removePerfume(${index})" class="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br ${typeColors[perfume.type]} flex items-center justify-center mb-4">
                <i class="fas fa-flask text-white text-2xl"></i>
            </div>
            
            <h3 class="text-xl font-bold mb-1">${perfume.name}</h3>
            <p class="text-gray-400 mb-3">${perfume.brand}</p>
            
            <div class="flex flex-wrap gap-2 mb-3">
                <span class="px-3 py-1 bg-blue-600 rounded-full text-sm">${perfume.type}</span>
            </div>
            
            <div class="flex flex-wrap gap-2">
                ${perfume.notes.map(note => `
                    <span class="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">${note}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function showAddPerfumeModal() {
    document.getElementById('perfume-modal').classList.remove('hidden');
}

function hideAddPerfumeModal() {
    document.getElementById('perfume-modal').classList.add('hidden');
    document.getElementById('perfume-form').reset();
}

document.getElementById('perfume-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newPerfume = {
        name: document.getElementById('perfume-name').value,
        brand: document.getElementById('perfume-brand').value,
        type: document.getElementById('perfume-type').value,
        notes: document.getElementById('perfume-notes').value.split(',').map(n => n.trim())
    };
    
    perfumes.push(newPerfume);
    localStorage.setItem('perfumes', JSON.stringify(perfumes));
    
    hideAddPerfumeModal();
    loadPerfumes();
});

function removePerfume(index) {
    perfumes.splice(index, 1);
    localStorage.setItem('perfumes', JSON.stringify(perfumes));
    loadPerfumes();
}

function loadWeather() {
    // Simuler la météo (en production, utiliser une vraie API)
    const temp = Math.round(15 + Math.random() * 15);
    const conditions = ['Ensoleillé', 'Nuageux', 'Pluvieux', 'Clair'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    document.getElementById('weather-temp').textContent = temp + '°C';
    document.getElementById('weather-desc').textContent = condition;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
});
