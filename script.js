document.addEventListener('DOMContentLoaded', function () {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const heroMenu = document.getElementById('heroMenu');
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            heroMenu.style.display = heroMenu.style.display === 'none' ? 'block' : 'none';
        });
    }

    initMap();

    const plane = document.getElementById('plane');
    function triggerPlaneFly(mode = 'depart') {
        if (!plane) return;
        plane.classList.remove('fly', 'land');
        void plane.offsetWidth;
        plane.classList.add(mode === 'depart' ? 'fly' : 'land');
    }

    setTimeout(() => triggerPlaneFly('depart'), 550);

    document.querySelectorAll('a[href="#guide"], a[href="#itinerary"], a[href="#map"]').forEach(link => {
        link.addEventListener('click', () => triggerPlaneFly('land'));
    });
});

function initMap() {
    const barcelona = [41.3874, 2.1686];
    const map = L.map('travel-map').setView(barcelona, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    const locations = [
        // Hotel
        { name: 'Best 4 Hotel Barcelona', coords: [41.3895, 2.1762], description: 'Hotel onde vamos ficar', icon: '🏨', color: '#0f766e' },
        // Lockers
        { name: 'Locker Barcelona - Plaça Catalunya', coords: [41.3874, 2.1685], description: 'Guardar malas', icon: '🔐', color: '#1e40af' },
        { name: 'Lockers Barcelona Sants', coords: [41.3788, 2.1410], description: 'Guardar malas alternativa', icon: '🔐', color: '#1e40af' },
        // Supermercados
        { name: 'Mercadona Sant Martí', coords: [41.3910, 2.1835], description: 'Supermercado', icon: '🛒', color: '#f97316' },
        // Dia 15
        { name: 'Sagrada Família', coords: [41.4036, 2.1744], description: 'Exterior', icon: '⛪', color: '#dc2626' },
        { name: 'IKONO Barcelona', coords: [41.3860, 2.1750], description: 'Experiência VR', icon: '🎮', color: '#7c3aed' },
        { name: 'Bogatell Beach', coords: [41.3947, 2.1978], description: 'Praia', icon: '🏖️', color: '#06b6d4' },
        { name: 'Circolo Popolare', coords: [41.3820, 2.1950], description: 'Restaurante', icon: '🍽️', color: '#ea580c' },
        // Dia 16
        { name: 'Camp Nou', coords: [41.3709, 2.1222], description: 'Estádio do FC Barcelona', icon: '⚽', color: '#fb7185' },
        { name: 'Casa Batlló', coords: [41.3915, 2.1649], description: 'Exterior', icon: '🏛️', color: '#8b5cf6' },
        { name: 'La Pedrera', coords: [41.3961, 2.1657], description: 'Exterior', icon: '🏛️', color: '#8b5cf6' },
        { name: 'Five Guys', coords: [41.3890, 2.1700], description: 'Restaurante', icon: '🍔', color: '#ea580c' },
        { name: 'TKO Tacos', coords: [41.3895, 2.1710], description: 'Restaurante', icon: '🌮', color: '#ea580c' },
        { name: '99 Cheesecake', coords: [41.3920, 2.1680], description: 'Sobremesa', icon: '🍰', color: '#f59e0b' },
        // Dia 17
        { name: 'La Boqueria', coords: [41.3829, 2.1705], description: 'Mercado tradicional', icon: '🏪', color: '#a855f7' },
        { name: 'La Rambla', coords: [41.3826, 2.1725], description: 'Passeio', icon: '🚶', color: '#14b8a6' },
        { name: 'Bairro Gótico', coords: [41.3837, 2.1758], description: 'Centro histórico', icon: '🏰', color: '#8b5cf6' },
        { name: 'Quo Vadis', coords: [41.3845, 2.1730], description: 'Restaurante (50% TheFork)', icon: '🍽️', color: '#ea580c' },
        { name: 'Barceloneta Beach', coords: [41.3809, 2.1944], description: 'Praia e sunset', icon: '🌊', color: '#f59e0b' },
        { name: 'C81 Pizzas', coords: [41.3810, 2.1950], description: 'Pizzas 3€', icon: '🍕', color: '#dc2626' },
        // Dia 18
        { name: 'Port Vell', coords: [41.3757, 2.1900], description: 'Porto', icon: '⛵', color: '#0ea5e9' },
        { name: 'Maremagnum', coords: [41.3745, 2.1895], description: 'Centro comercial', icon: '🛍️', color: '#0ea5e9' }
    ];

    locations.forEach(location => {
        const iconHtml = `
            <div class="custom-marker" style="background-color: ${location.color}; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.25);">
                ${location.icon}
            </div>
        `;

        const customIcon = L.divIcon({ html: iconHtml, iconSize: [38, 38], className: 'custom-div-icon' });
        const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);

        marker.bindPopup(`
            <div class="map-popup">
                <h4>${location.name}</h4>
                <p>${location.description}</p>
            </div>
        `);
    });

    const routeCoords = [
        [41.3895, 2.1762],
        [41.3910, 2.1835],
        [41.3851, 2.1734],
        [41.3947, 2.1978],
        [41.3709, 2.1222],
        [41.4143, 2.1526],
        [41.3829, 2.1705],
        [41.3809, 2.1944]
    ];

    const polyline = L.polyline(routeCoords, {
        color: '#4f46e5',
        weight: 2.5,
        opacity: 0.6,
        dashArray: '6, 6'
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    const style = document.createElement('style');
    style.textContent = `
        .map-popup { padding: 8px; font-family: Arial, sans-serif; }
        .map-popup h4 { margin: 0 0 5px 0; color: #4f46e5; }
        .map-popup p { margin: 0; font-size: 0.9rem; color: #64748b; }
        .custom-div-icon { background: none !important; border: none !important; }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


