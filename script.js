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
  
  return `
    <div class="weather-card" style="grid-column: 1/-1;">
      <h2 style="margin-bottom: 1.5rem; text-align: center;">
        ${isToday ? "Aujourd'hui" : "Demain"} - ${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 1rem;">Aperçu</h3>
          <div style="text-align: center;">
            <img class="weather-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" style="width: 100px; height: 100px;">
            <div class="temp" style="margin: 1rem 0;">${day.day.avgtemp_c}°C</div>
            <div class="condition">${day.day.condition.text}</div>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem;">Températures</h3>
          <div class="details">
            <div class="detail-item">
              <span class="detail-label">Maximum</span>
              <span class="detail-value">${day.day.maxtemp_c}°C</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Minimum</span>
              <span class="detail-value">${day.day.mintemp_c}°C</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Ressenti max</span>
              <span class="detail-value">${day.day.maxtemp_c}°C</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Ressenti min</span>
              <span class="detail-value">${day.day.mintemp_c}°C</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem;">Précipitations</h3>
          <div class="details">
            <div class="detail-item">
              <span class="detail-label">Chance de pluie</span>
              <span class="detail-value">${day.day.daily_chance_of_rain}%</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Précipitations</span>
              <span class="detail-value">${day.day.totalprecip_mm} mm</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Humidité moyenne</span>
              <span class="detail-value">${day.day.avghumidity}%</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem;">Conditions</h3>
          <div class="details">
            <div class="detail-item">
              <span class="detail-label">Vent maximum</span>
              <span class="detail-value">${day.day.maxwind_kph} km/h</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Visibilité moyenne</span>
              <span class="detail-value">${day.day.avgvis_km} km</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Index UV</span>
              <span class="detail-value">${day.day.uv}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Couverture nuageuse</span>
              <span class="detail-value">${day.day.avgvis_km}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
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