// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    setupScrollAnimations();
});

// Initialize Leaflet map
function initMap() {
    // Barcelona coordinates
    const barcelona = [41.3874, 2.1686];
    
    // Create map
    const map = L.map('map').setView(barcelona, 12);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Define locations with custom markers
    const locations = [
        {
            name: 'INOKO',
            coords: [41.3851, 2.1734],
            description: 'Experiência VR - Quarta 15 Julho',
            icon: '🎮',
            color: '#667eea'
        },
        {
            name: 'Camp Nou',
            coords: [41.3709, 2.1222],
            description: 'Estádio FC Barcelona - Quinta 16 Julho',
            icon: '⚽',
            color: '#f5576c'
        },
        {
            name: 'Parque Güell',
            coords: [41.4143, 2.1526],
            description: 'Obra de Gaudí - Sexta 17 Julho',
            icon: '🌳',
            color: '#4facfe'
        },
        {
            name: 'Mercado La Boqueria',
            coords: [41.3829, 2.1705],
            description: 'Mercado Tradicional - Sexta 17 Julho',
            icon: '🏪',
            color: '#fa709a'
        },
        {
            name: 'Praia Bogatell',
            coords: [41.3947, 2.1978],
            description: 'Praia - Quarta 15 Julho',
            icon: '🏖️',
            color: '#a8edea'
        },
        {
            name: 'Barceloneta Beach',
            coords: [41.3809, 2.1944],
            description: 'Praia Urbana - Sexta 17 Julho',
            icon: '🌊',
            color: '#ff9a56'
        },
        {
            name: 'Aeroporto Barcelona',
            coords: [41.2971, 2.0714],
            description: 'Partida e Chegada',
            icon: '✈️',
            color: '#764ba2'
        }
    ];

    // Add markers to map
    locations.forEach(location => {
        // Create custom HTML icon
        const iconHtml = `
            <div class="custom-marker" style="background-color: ${location.color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                ${location.icon}
            </div>
        `;

        const customIcon = L.divIcon({
            html: iconHtml,
            iconSize: [40, 40],
            className: 'custom-div-icon'
        });

        // Add marker
        const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);
        
        // Add popup
        const popupContent = `
            <div class="map-popup">
                <h4>${location.name}</h4>
                <p>${location.description}</p>
            </div>
        `;
        marker.bindPopup(popupContent);
    });

    // Add route line between key locations
    const routeCoords = [
        [41.2971, 2.0714], // Aeroporto
        [41.3851, 2.1734], // INOKO
        [41.3947, 2.1978], // Bogatell
        [41.3709, 2.1222], // Camp Nou
        [41.4143, 2.1526], // Parque Güell
        [41.3829, 2.1705], // La Boqueria
        [41.3809, 2.1944], // Barceloneta
        [41.2971, 2.0714]  // Aeroporto de volta
    ];

    const polyline = L.polyline(routeCoords, {
        color: '#667eea',
        weight: 2,
        opacity: 0.5,
        dashArray: '5, 5'
    }).addTo(map);

    // Fit map to all markers
    map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

    // Add custom CSS for map popups
    const style = document.createElement('style');
    style.textContent = `
        .map-popup {
            padding: 10px;
            font-family: Arial, sans-serif;
        }
        .map-popup h4 {
            margin: 0 0 5px 0;
            color: #667eea;
        }
        .map-popup p {
            margin: 0;
            font-size: 0.9rem;
            color: #666;
        }
        .custom-div-icon {
            background: none !important;
            border: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all card elements
    document.querySelectorAll('.info-card, .day-card, .place-card, .tip-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dynamic calculation of daily costs (optional future feature)
function calculateDailyCosts() {
    const costs = {
        'Quarta': {
            'T Casual': 0,
            'INOKO': 18,
            'Comida': 25,
            'Bebidas': 20
        },
        'Quinta': {
            'Comida': 30,
            'Camp Nou': 29,
            'Bebidas': 15
        },
        'Sexta': {
            'Comida': 35,
            'Parque Güell': 16,
            'Bebidas': 25
        },
        'Sábado': {
            'Comida': 20
        }
    };
    
    return costs;
}

// Print itinerary functionality
function printItinerary() {
    window.print();
}

// Export to CSV
function exportToCSV() {
    let csv = 'Data,Hora,Atividade,Detalhes,Custo\n';
    
    // Add data rows (simplified version)
    const rows = [
        '15/07/2026,09:00,Chegada & Armazenamento,Hotel,0',
        '15/07/2026,13:00,INOKO,VR Experience,18',
        '15/07/2026,15:30,Praia Bogatell,Mergulho,0',
        '16/07/2026,15:00,Camp Nou,Tour + Museu,29',
        '17/07/2026,10:00,Mercado La Boqueria,Comida Local,0',
        '17/07/2026,11:30,Parque Güell,Gaudí,16',
        '17/07/2026,15:00,Barceloneta Beach,Praia Urbana,0'
    ];
    
    csv += rows.join('\n');
    
    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'barcelona-trip.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Add some interactivity to cost items
document.querySelectorAll('.cost-row').forEach(row => {
    row.addEventListener('click', function() {
        if (!this.classList.contains('total')) {
            this.classList.toggle('highlighted');
        }
    });
});

// Counter animation for prices
function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toFixed(2);
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(2);
        }
    }, 16);
}

// Initialize counters when visible
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('cost-price')) {
            const price = parseFloat(entry.target.textContent);
            if (!isNaN(price) && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target, price);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.cost-price').forEach(el => {
    counterObserver.observe(el);
});

// Add mobile menu toggle (if needed for smaller screens)
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar-container');
    const menu = document.querySelector('.navbar-menu');
    
    // Only add if screen is small
    if (window.innerWidth <= 768) {
        // Menu already handles itself via CSS media queries
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    setupMobileMenu();
    console.log('Barcelona Trip Itinerary loaded successfully! ✈️');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // P = Print
    if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        printItinerary();
    }
    // E = Export
    if (e.key === 'e' && e.ctrlKey) {
        e.preventDefault();
        exportToCSV();
    }
});

console.log('%c🌍 Barcelona Trip Itinerary 2026', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cBem-vindo! Pressione Ctrl+P para imprimir ou Ctrl+E para exportar.', 'font-size: 14px; color: #764ba2;');
