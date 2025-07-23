// Mobile Menu Functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const body = document.body;

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mainNav.classList.toggle('active');
  body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mainNav.classList.contains('active') &&
      !e.target.closest('.main-nav') &&
      !e.target.closest('.mobile-menu-toggle')) {
    mobileMenuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    body.style.overflow = '';
  }
});

// Close mobile menu when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
    mobileMenuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    body.style.overflow = '';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

const cities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fes",
  "Tangier",
  "Agadir",
  "Oujda",
  "Meknes",
  "Kenitra",
  "Tetouan",
  "El Jadida",
  "Safi",
  "Mohammedia",
  "Khouribga",
  "Beni Mellal",
  "Taza",
  "Nador",
  "Settat",
  "Larache",
  "Ksar El Kebir",
  "Khemisset",
  "Guelmim",
  "Berrechid",
  "Taourirt",
  "Berkane",
  "Sidi Slimane",
  "Sidi Kacem",
  "Essaouira",
  "Tiflet",
  "Ouezzane",
  "Youssoufia",
  "Sefrou",
  "Fnideq",
  "Ouarzazate",
  "Chefchaouen",
  "Al Hoceima",
  "Errachidia",
  "Taroudant",
  "Zagora",
  "Ifrane"
];

const apiKey = "f86567b5c2e7414996b142126252107"; // Replace with your actual API key
const weatherGrid = document.getElementById("weather-grid");
const forecastGrid = document.getElementById("forecast-grid");
const citySelect = document.getElementById("citySelect");
const viewButtons = document.querySelectorAll('.view-btn');
const detailCheckboxes = document.querySelectorAll('.detail-checkbox input');

// Initialize city search and select
function initializeCitySearch() {
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'search-wrapper';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Rechercher une ville...';
  searchInput.className = 'city-search';
  
  const suggestionsList = document.createElement('ul');
  suggestionsList.className = 'suggestions-list hidden';
  
  searchWrapper.appendChild(searchInput);
  searchWrapper.appendChild(suggestionsList);
  citySelect.parentElement.insertBefore(searchWrapper, citySelect);
  
  // Sort cities alphabetically
  cities.sort((a, b) => a.localeCompare(b, 'fr'));
  
  // Add cities to select
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
  
  // Search input handler
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    suggestionsList.innerHTML = '';
    
    if (value.length < 2) {
      suggestionsList.classList.add('hidden');
      return;
    }
    
    const matches = cities.filter(city => 
      city.toLowerCase().includes(value)
    );
    
    if (matches.length > 0) {
      suggestionsList.classList.remove('hidden');
      matches.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.addEventListener('click', () => {
          searchInput.value = city;
          citySelect.value = city;
          suggestionsList.classList.add('hidden');
          handleCityChange();
        });
        suggestionsList.appendChild(li);
      });
    } else {
      suggestionsList.classList.add('hidden');
    }
  });
  
  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchWrapper.contains(e.target)) {
      suggestionsList.classList.add('hidden');
    }
  });
  
  // Sync select with search
  citySelect.addEventListener('change', () => {
    searchInput.value = citySelect.value;
    handleCityChange();
  });
}

let currentCity = '';
let currentView = 'general';
let weatherData = null;
let forecastData = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initializeCitySearch();
  initializeCharts();
});

citySelect.addEventListener('change', handleCityChange);
viewButtons.forEach(btn => btn.addEventListener('click', handleViewChange));
detailCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateDetailVisibility));

async function handleCityChange() {
  currentCity = citySelect.value;
  if (!currentCity) return;

  weatherGrid.innerHTML = getLoadingHTML();
  forecastGrid.innerHTML = '';
  
  try {
    const [weather, forecast] = await Promise.all([
      fetchCurrentWeather(currentCity),
      fetchForecastData(currentCity)
    ]);
    
    weatherData = weather;
    forecastData = forecast;
    
    updateDisplay();
  } catch (error) {
    console.error("Error fetching data:", error);
    showError(currentCity);
  }
}

function handleViewChange(e) {
  const btn = e.target;
  viewButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  currentView = btn.dataset.view;
  updateDisplay();
}

function updateDetailVisibility() {
  const selectedDetails = Array.from(detailCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
    
  document.querySelectorAll('.detail-item').forEach(item => {
    const detailType = item.querySelector('.detail-label').textContent.toLowerCase();
    item.style.display = selectedDetails.includes(detailType.toLowerCase()) ? 'block' : 'none';
  });
}

async function fetchCurrentWeather(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`);
  if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`);
  return response.json();
}

async function fetchForecastData(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=14&aqi=no`);
  if (!response.ok) throw new Error(`Failed to fetch forecast for ${city}`);
  return response.json();
}

function updateDisplay() {
  if (!weatherData || !forecastData) return;
  
  weatherGrid.classList.add('hidden');
  forecastGrid.classList.add('hidden');
  
  switch(currentView) {
    case 'general':
      weatherGrid.innerHTML = createWeatherCard(weatherData);
      const chartContainer = document.createElement('div');
      chartContainer.className = 'chart-container';
      chartContainer.appendChild(createWeatherChart(forecastData));
      weatherGrid.appendChild(chartContainer);
      weatherGrid.classList.remove('hidden');
      break;
    case '14days':
      forecastGrid.innerHTML = create14DaysForecast(forecastData);
      forecastGrid.classList.remove('hidden');
      break;
    case 'current-month':
      forecastGrid.innerHTML = createMonthlyForecast(forecastData, 0);
      forecastGrid.classList.remove('hidden');
      break;
    case 'next-month':
      forecastGrid.innerHTML = createMonthlyForecast(forecastData, 1);
      forecastGrid.classList.remove('hidden');
      break;
    case 'today':
      weatherGrid.innerHTML = createDetailedDayForecast(forecastData, 0);
      weatherGrid.classList.remove('hidden');
      break;
    case 'tomorrow':
      weatherGrid.innerHTML = createDetailedDayForecast(forecastData, 1);
      weatherGrid.classList.remove('hidden');
      break;
  }
  
  updateDetailVisibility();
}

function createWeatherCard(data) {
  const localTime = new Date(data.location.localtime);
  const timeString = localTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
  return `
    <div class="weather-card">
      <div class="city-name">${data.location.name}</div>
      <div style="font-size: 0.9rem; color: #666; text-align: center;">${timeString}</div>
      <img class="weather-icon" src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
      <div class="temp">${data.current.temp_c}°C</div>
      <div class="condition">${data.current.condition.text}</div>
      <div class="details">
        <div class="detail-item">
          <span class="detail-label">Humidité</span>
          <span class="detail-value">${data.current.humidity}%</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Vent</span>
          <span class="detail-value">${data.current.wind_kph} km/h ${data.current.wind_dir}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Ressenti</span>
          <span class="detail-value">${data.current.feelslike_c}°C</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Pression</span>
          <span class="detail-value">${data.current.pressure_mb} mb</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Visibilité</span>
          <span class="detail-value">${data.current.vis_km} km</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">UV</span>
          <span class="detail-value">${data.current.uv}</span>
        </div>
      </div>
    </div>
  `;
}

function create14DaysForecast(data) {
  return data.forecast.forecastday.map(day => {
    const date = new Date(day.date);
    return `
      <div class="weather-card">
        <div style="font-size: 1rem; font-weight: 600; text-align: center;">
          ${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })}
        </div>
        <img class="weather-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
        <div class="temp">${day.day.avgtemp_c}°C</div>
        <div class="condition">${day.day.condition.text}</div>
        <div class="details">
          <div class="detail-item">
            <span class="detail-label">Max/Min</span>
            <span class="detail-value">${day.day.maxtemp_c}°/${day.day.mintemp_c}°</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Pluie</span>
            <span class="detail-value">${day.day.daily_chance_of_rain}%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Humidité</span>
            <span class="detail-value">${day.day.avghumidity}%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Vent max</span>
            <span class="detail-value">${day.day.maxwind_kph} km/h</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function createMonthlyForecast(data, monthOffset) {
  const currentDate = new Date(data.forecast.forecastday[0].date);
  const targetMonth = new Date(currentDate.setMonth(currentDate.getMonth() + monthOffset));
  
  const daysInMonth = data.forecast.forecastday.filter(day => {
    const date = new Date(day.date);
    return date.getMonth() === targetMonth.getMonth();
  });
  
  const monthName = targetMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  
  return `
    <h2 class="month-title">${monthName}</h2>
    ${daysInMonth.map(day => {
      const date = new Date(day.date);
      return `
        <div class="weather-card">
          <div style="font-size: 1rem; font-weight: 600; text-align: center;">
            ${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })}
          </div>
          <img class="weather-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
          <div class="temp">${day.day.avgtemp_c}°C</div>
          <div class="condition">${day.day.condition.text}</div>
          <div class="details">
            <div class="detail-item">
              <span class="detail-label">Max/Min</span>
              <span class="detail-value">${day.day.maxtemp_c}°/${day.day.mintemp_c}°</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Pluie</span>
              <span class="detail-value">${day.day.daily_chance_of_rain}%</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Humidité</span>
              <span class="detail-value">${day.day.avghumidity}%</span>
            </div>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

function createDetailedDayForecast(data, dayOffset) {
  const day = data.forecast.forecastday[dayOffset];
  const date = new Date(day.date);
  const isToday = dayOffset === 0;

  if (isToday) {
    // Obtenir l'heure actuelle et arrondir à l'heure précédente
    const now = new Date();
    now.setMinutes(0, 0, 0);
    
    // Filtrer les heures à partir de l'heure actuelle jusqu'à la fin de la journée
    const currentHours = day.hour.filter(hour => {
      const hourTime = new Date(hour.time);
      return hourTime >= now;
    });

    return `
      <div class="weather-card today-forecast">
        <h2 class="today-title">
          Aujourd'hui - ${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h2>

        <!-- Version Desktop -->
        <div class="today-table-wrapper">
          <table class="today-table">
            <thead>
              <tr>
                <th>Heure</th>
                <th>Température</th>
                <th>Météo</th>
                <th>Humidité</th>
                <th>Vent</th>
              </tr>
            </thead>
            <tbody>
              ${currentHours.map(hour => {
                const hourTime = new Date(hour.time);
                return `
                  <tr>
                    <td>${hourTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td><span class="today-temp-value">${Math.round(hour.temp_c)}°C</span></td>
                    <td class="today-weather-cell">
                      <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" class="today-weather-icon-small">
                      <span class="today-weather-desc">${hour.condition.text}</span>
                    </td>
                    <td>${hour.humidity}%</td>
                    <td>${Math.round(hour.wind_kph)} km/h</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Version Mobile -->
        <div class="today-carousel-container">
          <button class="today-carousel-arrow today-prev" aria-label="Précédent">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <div class="today-carousel">
            ${currentHours.map(hour => {
              const hourTime = new Date(hour.time);
              return `
                <div class="today-hourly-card">
                  <div class="today-hour-header">
                    ${hourTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div class="today-temp-value">${Math.round(hour.temp_c)}°C</div>
                  <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" class="today-weather-icon-small">
                  <div class="today-weather-desc">${hour.condition.text}</div>
                  <div class="today-humidity-value">
                    <span class="today-label">Humidité:</span> ${hour.humidity}%
                  </div>
                  <div class="today-wind-value">
                    <span class="today-label">Vent:</span> ${Math.round(hour.wind_kph)} km/h
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <button class="today-carousel-arrow today-next" aria-label="Suivant">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // Pour demain, afficher le tableau horaire
  const hours = day.hour.filter((_, index) => index % 3 === 0); // Toutes les 3 heures

  return `
    <div class="weather-card tomorrow-forecast">
      <h2 class="tomorrow-title">
        Demain - ${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
      </h2>

      <!-- Version Desktop -->
      <div class="hourly-table-wrapper">
        <table class="hourly-table">
          <thead>
            <tr>
              <th>Heure</th>
              <th>Température</th>
              <th>Météo</th>
              <th>Humidité</th>
              <th>Vent</th>
            </tr>
          </thead>
          <tbody>
            ${hours.map(hour => {
              const hourTime = new Date(hour.time);
              return `
                <tr>
                  <td>${hourTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td><span class="temp-value">${Math.round(hour.temp_c)}°C</span></td>
                  <td class="weather-cell">
                    <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" class="weather-icon-small">
                    <span class="weather-desc">${hour.condition.text}</span>
                  </td>
                  <td>${hour.humidity}%</td>
                  <td>${Math.round(hour.wind_kph)} km/h</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Version Mobile -->
      <div class="hourly-carousel-container">
        <button class="carousel-arrow prev" aria-label="Précédent">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div class="hourly-carousel">
          ${hours.map(hour => {
            const hourTime = new Date(hour.time);
            return `
              <div class="hourly-card">
                <div class="hour-header">
                  ${hourTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div class="temp-value">${Math.round(hour.temp_c)}°C</div>
                <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" class="weather-icon-small">
                <div class="weather-desc">${hour.condition.text}</div>
                <div class="humidity-value">
                  <span class="label">Humidité:</span> ${hour.humidity}%
                </div>
                <div class="wind-value">
                  <span class="label">Vent:</span> ${Math.round(hour.wind_kph)} km/h
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button class="carousel-arrow next" aria-label="Suivant">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

// Ajout de la fonction pour gérer le carousel d'aujourd'hui
function initTodayCarousel() {
  const carousel = document.querySelector('.today-carousel');
  if (!carousel) return;

  const prevBtn = document.querySelector('.today-carousel-arrow.today-prev');
  const nextBtn = document.querySelector('.today-carousel-arrow.today-next');
  const cardWidth = 280; // Largeur d'une carte + gap
  
  function updateArrows() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    prevBtn.style.opacity = carousel.scrollLeft <= 0 ? '0.5' : '1';
    nextBtn.style.opacity = carousel.scrollLeft >= maxScroll ? '0.5' : '1';
  }

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  carousel.addEventListener('scroll', updateArrows);
  updateArrows();
}

// Modification de la fonction handleViewChange
function handleViewChange(e) {
  const btn = e.target;
  viewButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  currentView = btn.dataset.view;
  updateDisplay();

  // Initialiser les carousels selon la vue
  if (currentView === 'tomorrow') {
    setTimeout(initCarousel, 100);
  } else if (currentView === 'today') {
    setTimeout(initTodayCarousel, 100);
  }
}

function getLoadingHTML() {
  return `
    <div class="loading">
      <div class="spinner"></div>
      <span>Chargement des données météo...</span>
    </div>
  `;
}

function showError(city) {
  weatherGrid.innerHTML = `
    <div class="weather-card" style="grid-column: 1/-1; background-color: #fff9f9; border-left: 4px solid #ff5252;">
      <div class="city-name" style="color: #ff5252;">${city}</div>
      <div style="text-align: center; padding: 1.5rem 0;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div class="condition" style="color: #ff5252; margin-top: 0.5rem;">Données météo indisponibles</div>
      </div>
    </div>
  `;
}

// Add Chart.js for weather visualization
function initializeCharts() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = () => {
    console.log('Chart.js loaded');
  };
  document.head.appendChild(script);
}

function createWeatherChart(data) {
  const ctx = document.createElement('canvas');
  ctx.id = 'weatherChart';
  ctx.style.width = '100%';
  ctx.style.height = '300px';
  ctx.style.marginBottom = '2rem';
  
  const labels = data.forecast.forecastday.slice(0, 7).map(day => 
    new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short' })
  );
  
  const temperatures = data.forecast.forecastday.slice(0, 7).map(day => day.day.avgtemp_c);
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Température moyenne (°C)',
        data: temperatures,
        borderColor: 'rgb(30, 136, 229)',
        backgroundColor: 'rgba(30, 136, 229, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
  
  return ctx;
}

// Footer city links functionality
document.querySelectorAll('.city-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const cityName = e.target.dataset.city;
    const searchInput = document.querySelector('.city-search');
    
    if (searchInput) {
      searchInput.value = cityName;
      // Déclencher la recherche
      const event = new Event('input', { bubbles: true });
      searchInput.dispatchEvent(event);
      
      // Simuler un clic sur la suggestion
      setTimeout(() => {
        const suggestionsList = document.querySelector('.suggestions-list');
        const cityItem = Array.from(suggestionsList.children)
          .find(item => item.textContent === cityName);
        if (cityItem) {
          cityItem.click();
        }
      }, 100);
    }
    
    // Scroll vers le contenu météo
    document.querySelector('.weather-content').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
});