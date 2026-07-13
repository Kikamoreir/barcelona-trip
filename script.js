document.addEventListener('DOMContentLoaded', function () {
    initMap();
});

function initMap() {
    const barcelona = [41.3874, 2.1686];
    const map = L.map('travel-map').setView(barcelona, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    const locations = [
        { name: 'Hotel Doctor Trueta', coords: [41.3895, 2.1762], description: 'Alojamento em Sant Martí', icon: '🏨', color: '#4f46e5' },
        { name: 'Mercadona Sant Martí', coords: [41.3910, 2.1835], description: 'Supermercado para compras diárias', icon: '🛒', color: '#f97316' },
        { name: 'INOKO', coords: [41.3851, 2.1734], description: 'Experiência VR', icon: '🎮', color: '#0ea5e9' },
        { name: 'Camp Nou', coords: [41.3709, 2.1222], description: 'Estádio do FC Barcelona', icon: '⚽', color: '#fb7185' },
        { name: 'Parque Güell', coords: [41.4143, 2.1526], description: 'Obra de Gaudí', icon: '🌳', color: '#14b8a6' },
        { name: 'La Boqueria', coords: [41.3829, 2.1705], description: 'Mercado tradicional', icon: '🏪', color: '#a855f7' },
        { name: 'Bogatell Beach', coords: [41.3947, 2.1978], description: 'Praia de relax', icon: '🏖️', color: '#38bdf8' },
        { name: 'Barceloneta', coords: [41.3809, 2.1944], description: 'Praia urbana', icon: '🌊', color: '#f59e0b' }
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
