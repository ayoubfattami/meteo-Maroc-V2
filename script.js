// Gestion des sections d'introduction, FAQ et villes populaires
document.addEventListener('DOMContentLoaded', function () {
  const introSection = document.getElementById('site-intro-section');
  const faqSection = document.getElementById('faq-section');
  const popularSection = document.getElementById('popular-cities-section');
  const citySelect = document.getElementById('citySelect');
  const weatherGrid = document.getElementById('weather-grid');
  const forecastGrid = document.getElementById('forecast-grid');
  const viewBtns = document.querySelectorAll('.view-btn');

  // Masquer les sections informatives si une ville est déjà sélectionnée
  function hideInfoSections() {
    if (introSection) introSection.style.display = 'none';
    if (faqSection) faqSection.style.display = 'none';
    if (popularSection) popularSection.style.display = 'none';
    // Ajouter la classe city-selected au body pour afficher les boutons de vue
    document.body.classList.add('city-selected');
  }

  // Afficher les sections informatives
  function showInfoSections() {
    if (introSection) introSection.style.display = '';
    if (faqSection) faqSection.style.display = '';
    if (popularSection) popularSection.style.display = '';
    // Retirer la classe city-selected du body pour cacher les boutons de vue
    document.body.classList.remove('city-selected');
  }

  // Quand une ville populaire est cliquée
  if (popularSection) {
    popularSection.addEventListener('click', function (e) {
      if (e.target.classList.contains('popular-city-btn')) {
        const city = e.target.getAttribute('data-city');
        // Mettre à jour le champ de recherche visible et le select caché
        const citySearch = document.getElementById('citySearch');
        if (citySearch) {
          citySearch.value = city;
        }
        // Sélectionner la ville dans le select (toujours utilisé pour la logique)
        if (citySelect) {
          citySelect.value = city;
          const event = new Event('change', { bubbles: true });
          citySelect.dispatchEvent(event);
        }
        // Masquer les sections informatives
        hideInfoSections();
        // Activer les filtres météo
        viewBtns.forEach(btn => btn.classList.remove('active'));
        if (viewBtns[0]) viewBtns[0].classList.add('active');
        // Afficher la grille météo (si masquée)
        if (weatherGrid) weatherGrid.style.display = '';
        if (forecastGrid) forecastGrid.classList.add('hidden');
      }
    });
  }

  // Masquer les sections informatives si une ville est déjà sélectionnée au chargement
  if (citySelect && citySelect.value) {
    hideInfoSections();
    // S'assurer que les boutons de vue sont visibles si une ville est déjà sélectionnée
    document.body.classList.add('city-selected');
  } else {
    showInfoSections();
    // S'assurer que les boutons de vue sont cachés si aucune ville n'est sélectionnée
    document.body.classList.remove('city-selected');
  }

  // Masquer les sections informatives dès qu'une ville est sélectionnée via le select
  if (citySelect) {
    citySelect.addEventListener('change', function () {
      if (citySelect.value) {
        hideInfoSections();
      }
    });
  }
  
  // Gestion de l'interactivité de la FAQ
  const faqItems = document.querySelectorAll('.mm-faq-question');
  faqItems.forEach(item => {
    // Ajouter un indicateur visuel pour montrer que c'est cliquable
    item.innerHTML += '<span class="mm-faq-toggle">+</span>';
    
    // Masquer toutes les réponses par défaut
    const answer = item.nextElementSibling;
    answer.style.display = 'none';
    
    // Ajouter l'événement de clic
    item.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const toggle = this.querySelector('.mm-faq-toggle');
      
      // Fermer toutes les autres réponses ouvertes
      faqItems.forEach(otherItem => {
        if (otherItem !== this && otherItem.classList.contains('mm-faq-active')) {
          const otherAnswer = otherItem.nextElementSibling;
          const otherToggle = otherItem.querySelector('.mm-faq-toggle');
          
          otherAnswer.style.display = 'none';
          otherToggle.textContent = '+';
          otherItem.classList.remove('mm-faq-active');
        }
      });
      
      // Basculer l'affichage de la réponse avec une animation
      if (answer.style.display === 'none') {
        // Afficher la réponse
        answer.style.display = 'block';
        toggle.textContent = '−';
        this.classList.add('mm-faq-active');
        toggle.style.transform = 'rotate(180deg)';
      } else {
        // Masquer la réponse
        answer.style.display = 'none';
        toggle.textContent = '+';
        this.classList.remove('mm-faq-active');
        toggle.style.transform = 'rotate(0deg)';
      }
    });
  });
  
  // Ouvrir la première question par défaut
  if (faqItems.length > 0) {
    setTimeout(() => {
      faqItems[0].click();
    }, 500);
  }
});
// Mobile Menu Functionality
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mainNav = document.querySelector(".main-nav");
const body = document.body;

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  mainNav.classList.toggle("active");
  body.style.overflow = mainNav.classList.contains("active") ? "hidden" : "";
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mainNav.classList.contains("active") &&
    !e.target.closest(".main-nav") &&
    !e.target.closest(".mobile-menu-toggle")
  ) {
    mobileMenuToggle.classList.remove("active");
    mainNav.classList.remove("active");
    body.style.overflow = "";
  }
});

// Close mobile menu when window is resized above mobile breakpoint
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mainNav.classList.contains("active")) {
    mobileMenuToggle.classList.remove("active");
    mainNav.classList.remove("active");
    body.style.overflow = "";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

// Gestion des liens de villes dans le footer
document.addEventListener('DOMContentLoaded', function() {
  const cityLinks = document.querySelectorAll('.city-link');
  cityLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const city = this.getAttribute('data-city');
      
      // Mettre à jour le champ de recherche visible
      const citySearch = document.getElementById('citySearch');
      if (citySearch) {
        citySearch.value = city;
      }
      
      // Mettre à jour le select caché et déclencher le changement
      const citySelect = document.getElementById('citySelect');
      if (citySelect) {
        citySelect.value = city;
        const event = new Event('change', { bubbles: true });
        citySelect.dispatchEvent(event);
      }
      
      // Faire défiler vers le haut de la page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});

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
  "Youssoufia",
  "Sefrou",
  "Fnideq",
  "Ouarzazate",
  "Al Hoceima",
  "Taroudant",
  "Zagora",
  "Ifrane",
];

const apiKey = "f86567b5c2e7414996b142126252107"; // Replace with your actual API key
const weatherGrid = document.getElementById("weather-grid");
const forecastGrid = document.getElementById("forecast-grid");
const citySelect = document.getElementById("citySelect");
const viewButtons = document.querySelectorAll(".view-btn");
const detailCheckboxes = document.querySelectorAll(".detail-checkbox input");

// Initialize city search and select
function initializeCitySearch() {
  const citySearch = document.getElementById("citySearch");
  const suggestionsList = document.getElementById("suggestionsList");
  
  // Sort cities alphabetically
  cities.sort((a, b) => a.localeCompare(b, "fr"));

  // Add cities to select (hidden but still used for functionality)
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  // Search input handler
  citySearch.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    suggestionsList.innerHTML = "";

    if (value.length < 2) {
      suggestionsList.classList.add("hidden");
      return;
    }

    const matches = cities.filter((city) => city.toLowerCase().includes(value));

    if (matches.length > 0) {
      suggestionsList.classList.remove("hidden");
      matches.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
          citySearch.value = city;
          citySelect.value = city;
          suggestionsList.classList.add("hidden");
          handleCityChange();
        });
        suggestionsList.appendChild(li);
      });
    } else {
      suggestionsList.classList.add("hidden");
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!citySearch.contains(e.target) && !suggestionsList.contains(e.target)) {
      suggestionsList.classList.add("hidden");
    }
  });

  // Sync select with search (for compatibility with existing code)
  citySelect.addEventListener("change", () => {
    citySearch.value = citySelect.value;
    handleCityChange();
  });
  
  // Permettre la recherche en appuyant sur Entrée
  citySearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // Si une seule suggestion correspond, la sélectionner
      const value = citySearch.value.toLowerCase();
      const matches = cities.filter((city) => city.toLowerCase().includes(value));
      
      if (matches.length === 1) {
        citySearch.value = matches[0];
        citySelect.value = matches[0];
        suggestionsList.classList.add("hidden");
        handleCityChange();
      } else if (matches.length > 1) {
        // Si plusieurs suggestions, sélectionner la première qui commence par la valeur
        const exactMatches = matches.filter(city => city.toLowerCase().startsWith(value));
        if (exactMatches.length > 0) {
          citySearch.value = exactMatches[0];
          citySelect.value = exactMatches[0];
          suggestionsList.classList.add("hidden");
          handleCityChange();
        }
      }
    }
  });
}

let currentCity = "";
let currentView = "general";
let weatherData = null;
let forecastData = null;

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initializeCitySearch();
  initializeCharts();
});

citySelect.addEventListener("change", handleCityChange);
viewButtons.forEach((btn) => btn.addEventListener("click", handleViewChange));
detailCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", updateDetailVisibility)
);

async function handleCityChange() {
  currentCity = citySelect.value;
  if (!currentCity) {
    // Si aucune ville n'est sélectionnée, cacher les boutons de vue
    document.body.classList.remove('city-selected');
    return;
  }

  // Ajouter la classe city-selected pour afficher les boutons de vue
  document.body.classList.add('city-selected');
  
  weatherGrid.innerHTML = getLoadingHTML();
  forecastGrid.innerHTML = "";

  try {
    const [weather, forecast] = await Promise.all([
      fetchCurrentWeather(currentCity),
      fetchForecastData(currentCity),
    ]);

    weatherData = weather;
    forecastData = forecast;

    updateDisplay();
  } catch (error) {
    console.error("Error fetching data:", error);
    showError(currentCity);
  }
}

// La fonction handleViewChange a été déplacée plus bas dans le code

function updateDetailVisibility() {
  const selectedDetails = Array.from(detailCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  document.querySelectorAll(".detail-item").forEach((item) => {
    const detailType = item
      .querySelector(".detail-label")
      .textContent.toLowerCase();
    item.style.display = selectedDetails.includes(detailType.toLowerCase())
      ? "block"
      : "none";
  });
}

async function fetchCurrentWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
      city
    )}&aqi=no`
  );
  if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`);
  return response.json();
}

async function fetchForecastData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
      city
    )}&days=14&aqi=no`
  );
  if (!response.ok) throw new Error(`Failed to fetch forecast for ${city}`);
  return response.json();
}

function updateDisplay() {
  if (!weatherData || !forecastData) return;

  // Vider les deux conteneurs avant d'ajouter du nouveau contenu
  weatherGrid.innerHTML = "";
  forecastGrid.innerHTML = "";
  
  // Cacher les deux grilles par défaut
  weatherGrid.classList.add("hidden");
  forecastGrid.classList.add("hidden");
  
  // Supprimer tous les messages de chargement existants
  document.querySelectorAll('.loading').forEach(el => el.remove());
  
  // Message personnalisé dans la console pour confirmer le changement de section
  console.log(`✅ Section météo changée: ${currentView} - Contenu précédent effacé avec succès`);

  switch (currentView) {
    case "general": {
      // Modern current weather block with all available info and icons
      weatherGrid.innerHTML = createCurrentWeatherBlock(weatherData);
      const chartContainer = document.createElement("div");
      chartContainer.className = "chart-container";
      chartContainer.appendChild(createWeatherChart(forecastData));
      weatherGrid.appendChild(chartContainer);
      weatherGrid.classList.remove("hidden");
      break;
    }
    case "14days":
      forecastGrid.innerHTML = create14DaysForecast(forecastData);
      forecastGrid.classList.remove("hidden");
      break;
    case "current-month":
      forecastGrid.innerHTML = createMonthlyForecast(forecastData, 0);
      forecastGrid.classList.remove("hidden");
      break;
    case "next-month":
      forecastGrid.innerHTML = createMonthlyForecast(forecastData, 1);
      forecastGrid.classList.remove("hidden");
      break;
    case "today":
      weatherGrid.innerHTML = createDetailedDayForecast(forecastData, 0);
      weatherGrid.classList.remove("hidden");
      break;
    case "tomorrow":
      weatherGrid.innerHTML = createDetailedDayForecast(forecastData, 1);
      weatherGrid.classList.remove("hidden");
      break;
  }

  updateDetailVisibility();
}

// Modern, detailed current weather block with icons and grid layout
function createCurrentWeatherBlock(data) {
  const c = data.current;
  const l = data.location;
  const localTime = new Date(l.localtime);
  const timeString = localTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  // SVG icons (inline for performance and style)
  const icons = {
    temp: `<svg width="28" height="28" fill="none" stroke="#1e88e5" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M12 14v6"/><circle cx="12" cy="20" r="2"/></svg>`,
    feels: `<svg width="28" height="28" fill="none" stroke="#26c6da" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v10"/><circle cx="12" cy="16" r="6"/></svg>`,
    humidity: `<svg width="28" height="28" fill="none" stroke="#1e88e5" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8.5 7 13a5 5 0 0 0 10 0c0-4.5-5-11-5-11z"/><circle cx="12" cy="17" r="1.5"/></svg>`,
    pressure: `<svg width="28" height="28" fill="none" stroke="#1565c0" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    wind: `<svg width="28" height="28" fill="none" stroke="#26c6da" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12h16M4 18h10M4 6h6"/><circle cx="20" cy="18" r="2"/></svg>`,
    vis: `<svg width="28" height="28" fill="none" stroke="#1e88e5" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>`,
    uv: `<svg width="28" height="28" fill="none" stroke="#ffb300" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
    cloud: `<svg width="28" height="28" fill="none" stroke="#90a4ae" stroke-width="2" viewBox="0 0 24 24"><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6.5 6.5 0 0 0-13 1.5A4.5 4.5 0 0 0 6.5 19h11z"/></svg>`,
    gust: `<svg width="28" height="28" fill="none" stroke="#26c6da" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12h12a4 4 0 1 1 0 8H6"/></svg>`,
    rain: `<svg width="28" height="28" fill="none" stroke="#2196f3" stroke-width="2" viewBox="0 0 24 24"><path d="M16 13v-1a4 4 0 0 0-8 0v1"/><path d="M8 17v2M16 17v2"/></svg>`,
    snow: `<svg width="28" height="28" fill="none" stroke="#90caf9" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>`,
    sunrise: `<svg width="28" height="28" fill="none" stroke="#ffb300" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v6"/><path d="M5.22 10.22l1.42 1.42"/><path d="M2 18h20"/><path d="M7 18a5 5 0 0 1 10 0"/></svg>`,
    sunset: `<svg width="28" height="28" fill="none" stroke="#ff7043" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22v-6"/><path d="M5.22 13.78l1.42-1.42"/><path d="M2 18h20"/><path d="M7 18a5 5 0 0 1 10 0"/></svg>`,
    dir: `<svg width="28" height="28" fill="none" stroke="#26c6da" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20"/></svg>`,
  };

  // Compose all available info
  const info = [
    { label: "Température", value: `${c.temp_c}°C`, icon: icons.temp },
    { label: "Ressenti", value: `${c.feelslike_c}°C`, icon: icons.feels },
    { label: "Humidité", value: `${c.humidity}%`, icon: icons.humidity },
    { label: "Pression", value: `${c.pressure_mb} mb`, icon: icons.pressure },
    {
      label: "Vent",
      value: `${c.wind_kph} km/h ${c.wind_dir}`,
      icon: icons.wind,
    },
    { label: "Rafales", value: `${c.gust_kph} km/h`, icon: icons.gust },
    { label: "Visibilité", value: `${c.vis_km} km`, icon: icons.vis },
    { label: "Indice UV", value: `${c.uv}`, icon: icons.uv },
    { label: "Couverture nuageuse", value: `${c.cloud}%`, icon: icons.cloud },
    { label: "Précipitations", value: `${c.precip_mm} mm`, icon: icons.rain },
    {
      label: "Neige",
      value: `${c.snow_cm !== undefined ? c.snow_cm : 0} cm`,
      icon: icons.snow,
    },
    {
      label: "Dernière mise à jour",
      value: `${c.last_updated}`,
      icon: icons.temp,
    },
  ];

  // Optionally, add sunrise/sunset if available in forecast (not in current)

  return `
    <div class="current-weather-block">
      <h2 class="current-weather-title">Conditions météorologiques actuelles à ${
        l.name
      }</h2>
      <div class="current-weather-meta">
        <span class="current-weather-time">${timeString}</span>
        <span class="current-weather-condition"><img class="weather-icon" src="https:${
          c.condition.icon
        }" alt="${c.condition.text}"> ${c.condition.text}</span>
      </div>
      <div class="current-weather-grid">
        ${info
          .map(
            (item) => `
          <div class="current-weather-item">
            <div class="current-weather-icon">${item.icon}</div>
            <div class="current-weather-label">${item.label}</div>
            <div class="current-weather-value">${item.value}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

function create14DaysForecast(data) {
  return data.forecast.forecastday
    .map((day, index) => {
      const date = new Date(day.date);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const hasExtremeCondition = day.day.daily_chance_of_rain > 70 || 
                                day.day.maxwind_kph > 50 || 
                                day.day.avgtemp_c > 35 || 
                                day.day.avgtemp_c < 5;
      
      // Icônes SVG pour les infos compactes
      const windIcon = `<svg class="mini-weather-icon" fill="none" stroke="#26c6da" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12h16M4 18h10M4 6h6"/><circle cx="20" cy="18" r="2"/></svg>`;
      const humidityIcon = `<svg class="mini-weather-icon" fill="none" stroke="#1e88e5" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8.5 7 13a5 5 0 0 0 10 0c0-4.5-5-11-5-11z"/><circle cx="12" cy="17" r="1.5"/></svg>`;
      const uvIcon = `<svg class="mini-weather-icon" fill="none" stroke="#ffb300" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
      const rainIcon = `<svg class="mini-weather-icon" fill="none" stroke="#2196f3" stroke-width="2" viewBox="0 0 24 24"><path d="M16 13v-1a4 4 0 0 0-8 0v1"/><path d="M8 17v2M16 17v2"/></svg>`;
      
      // Calcul du pourcentage de remplissage de la barre de pluie
      const rainProbabilityWidth = `${day.day.daily_chance_of_rain}%`;
      
      // Animation décalée pour chaque carte
      const animationDelay = `${index * 0.05}s`;
      
      return `
      <div class="weather-card card-enhanced forecast-card-enhanced ${isWeekend ? 'weekend-day' : ''}" style="animation-delay: ${animationDelay};">
        ${hasExtremeCondition ? `<div class="weather-alert-badge">Alerte</div>` : ''}
        
        <div style="font-size: 1rem; font-weight: 600; text-align: center;">
          ${date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
          })}
        </div>
        
        <img class="weather-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
        
        <div class="temp">${day.day.avgtemp_c}°C</div>
        
        <div class="temp-range-container">
          <span class="temp-min">${day.day.mintemp_c}°</span>
          <span class="temp-arrow">→</span>
          <span class="temp-max">${day.day.maxtemp_c}°</span>
        </div>
        
        <div class="condition">${day.day.condition.text}</div>
        
        <div class="rain-probability-bar">
          <div class="rain-probability-fill" style="width: ${rainProbabilityWidth}"></div>
        </div>
        
        <div class="compact-weather-info">
          <div class="compact-weather-info-item">
            ${windIcon}
            <span class="compact-weather-info-value">${day.day.maxwind_kph}</span>
            <span>km/h</span>
          </div>
          
          <div class="compact-weather-info-item">
            ${humidityIcon}
            <span class="compact-weather-info-value">${day.day.avghumidity}</span>
            <span>%</span>
          </div>
          
          <div class="compact-weather-info-item">
            ${rainIcon}
            <span class="compact-weather-info-value">${day.day.daily_chance_of_rain}</span>
            <span>%</span>
          </div>
        </div>
        
        <div class="enhanced-forecast-details">
          ${day.day.uv ? `<div class="enhanced-detail-chip">${uvIcon} UV: ${day.day.uv}</div>` : ''}
          ${day.day.daily_will_it_rain ? `<div class="enhanced-detail-chip">${rainIcon} Pluie</div>` : ''}
        </div>
      </div>
    `;
    })
    .join("");
}

function createMonthlyForecast(data, monthOffset) {
  const currentDate = new Date(data.forecast.forecastday[0].date);
  const targetMonth = new Date(
    currentDate.setMonth(currentDate.getMonth() + monthOffset)
  );

  const daysInMonth = data.forecast.forecastday.filter((day) => {
    const date = new Date(day.date);
    return date.getMonth() === targetMonth.getMonth();
  });

  const monthName = targetMonth.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return `
    <h2 class="month-title">${monthName}</h2>
    ${daysInMonth
      .map((day, index) => {
        const date = new Date(day.date);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const hasExtremeCondition = day.day.daily_chance_of_rain > 70 || 
                                  day.day.maxwind_kph > 50 || 
                                  day.day.avgtemp_c > 35 || 
                                  day.day.avgtemp_c < 5;
        
        // Icônes SVG pour les infos compactes
        const windIcon = `<svg class="mini-weather-icon" fill="none" stroke="#26c6da" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12h16M4 18h10M4 6h6"/><circle cx="20" cy="18" r="2"/></svg>`;
        const humidityIcon = `<svg class="mini-weather-icon" fill="none" stroke="#1e88e5" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8.5 7 13a5 5 0 0 0 10 0c0-4.5-5-11-5-11z"/><circle cx="12" cy="17" r="1.5"/></svg>`;
        const uvIcon = `<svg class="mini-weather-icon" fill="none" stroke="#ffb300" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
        const rainIcon = `<svg class="mini-weather-icon" fill="none" stroke="#2196f3" stroke-width="2" viewBox="0 0 24 24"><path d="M16 13v-1a4 4 0 0 0-8 0v1"/><path d="M8 17v2M16 17v2"/></svg>`;
        
        // Calcul du pourcentage de remplissage de la barre de pluie
        const rainProbabilityWidth = `${day.day.daily_chance_of_rain}%`;
        
        // Animation décalée pour chaque carte
        const animationDelay = `${index * 0.05}s`;
        
        return `
        <div class="weather-card card-enhanced forecast-card-enhanced ${isWeekend ? 'weekend-day' : ''}" style="animation-delay: ${animationDelay};">
          ${hasExtremeCondition ? `<div class="weather-alert-badge">Alerte</div>` : ''}
          
          <div style="font-size: 1rem; font-weight: 600; text-align: center;">
            ${date.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
            })}
          </div>
          
          <img class="weather-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
          
          <div class="temp">${day.day.avgtemp_c}°C</div>
          
          <div class="temp-range-container">
            <span class="temp-min">${day.day.mintemp_c}°</span>
            <span class="temp-arrow">→</span>
            <span class="temp-max">${day.day.maxtemp_c}°</span>
          </div>
          
          <div class="condition">${day.day.condition.text}</div>
          
          <div class="rain-probability-bar">
            <div class="rain-probability-fill" style="width: ${rainProbabilityWidth}"></div>
          </div>
          
          <div class="compact-weather-info">
            <div class="compact-weather-info-item">
              ${windIcon}
              <span class="compact-weather-info-value">${day.day.maxwind_kph}</span>
              <span>km/h</span>
            </div>
            
            <div class="compact-weather-info-item">
              ${humidityIcon}
              <span class="compact-weather-info-value">${day.day.avghumidity}</span>
              <span>%</span>
            </div>
            
            <div class="compact-weather-info-item">
              ${rainIcon}
              <span class="compact-weather-info-value">${day.day.daily_chance_of_rain}</span>
              <span>%</span>
            </div>
          </div>
          
          <div class="enhanced-forecast-details">
            ${day.day.uv ? `<div class="enhanced-detail-chip">${uvIcon} UV: ${day.day.uv}</div>` : ''}
            ${day.day.daily_will_it_rain ? `<div class="enhanced-detail-chip">${rainIcon} Pluie</div>` : ''}
          </div>
        </div>
      `;
      })
      .join("")}
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
    const currentHours = day.hour.filter((hour) => {
      const hourTime = new Date(hour.time);
      return hourTime >= now;
    });

    return `
      <div class="weather-card today-forecast">
        <h2 class="today-title">
          Aujourd'hui - ${date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
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
              ${currentHours
                .map((hour) => {
                  const hourTime = new Date(hour.time);
                  return `
                  <tr>
                    <td>${hourTime.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</td>
                    <td><span class="today-temp-value">${Math.round(
                      hour.temp_c
                    )}°C</span></td>
                    <td class="today-weather-cell">
                      <img src="https:${hour.condition.icon}" alt="${
                    hour.condition.text
                  }" class="today-weather-icon-small">
                      <span class="today-weather-desc">${
                        hour.condition.text
                      }</span>
                    </td>
                    <td>${hour.humidity}%</td>
                    <td>${Math.round(hour.wind_kph)} km/h</td>
                  </tr>
                `;
                })
                .join("")}
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
            ${currentHours
              .map((hour) => {
                const hourTime = new Date(hour.time);
                return `
                <div class="today-hourly-card">
                  <div class="today-hour-header">
                    ${hourTime.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div class="today-temp-value">${Math.round(
                    hour.temp_c
                  )}°C</div>
                  <img src="https:${hour.condition.icon}" alt="${
                  hour.condition.text
                }" class="today-weather-icon-small">
                  <div class="today-weather-desc">${hour.condition.text}</div>
                  <div class="today-humidity-value">
                    <span class="today-label">Humidité:</span> ${hour.humidity}%
                  </div>
                  <div class="today-wind-value">
                    <span class="today-label">Vent:</span> ${Math.round(
                      hour.wind_kph
                    )} km/h
                  </div>
                </div>
              `;
              })
              .join("")}
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
        Demain - ${date.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
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
            ${hours
              .map((hour) => {
                const hourTime = new Date(hour.time);
                return `
                <tr>
                  <td>${hourTime.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</td>
                  <td><span class="temp-value">${Math.round(
                    hour.temp_c
                  )}°C</span></td>
                  <td class="weather-cell">
                    <img src="https:${hour.condition.icon}" alt="${
                  hour.condition.text
                }" class="weather-icon-small">
                    <span class="weather-desc">${hour.condition.text}</span>
                  </td>
                  <td>${hour.humidity}%</td>
                  <td>${Math.round(hour.wind_kph)} km/h</td>
                </tr>
              `;
              })
              .join("")}
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
          ${hours
            .map((hour) => {
              const hourTime = new Date(hour.time);
              return `
              <div class="hourly-card">
                <div class="hour-header">
                  ${hourTime.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div class="temp-value">${Math.round(hour.temp_c)}°C</div>
                <img src="https:${hour.condition.icon}" alt="${
                hour.condition.text
              }" class="weather-icon-small">
                <div class="weather-desc">${hour.condition.text}</div>
                <div class="humidity-value">
                  <span class="label">Humidité:</span> ${hour.humidity}%
                </div>
                <div class="wind-value">
                  <span class="label">Vent:</span> ${Math.round(
                    hour.wind_kph
                  )} km/h
                </div>
              </div>
            `;
            })
            .join("")}
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
  const carousel = document.querySelector(".today-carousel");
  if (!carousel) return;

  const prevBtn = document.querySelector(".today-carousel-arrow.today-prev");
  const nextBtn = document.querySelector(".today-carousel-arrow.today-next");
  const cardWidth = 280; // Largeur d'une carte + gap

  function updateArrows() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    prevBtn.style.opacity = carousel.scrollLeft <= 0 ? "0.5" : "1";
    nextBtn.style.opacity = carousel.scrollLeft >= maxScroll ? "0.5" : "1";
  }

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  carousel.addEventListener("scroll", updateArrows);
  updateArrows();
}

// Fonction pour initialiser le carousel des prévisions pour demain
function initCarousel() {
  const carousel = document.querySelector(".hourly-carousel");
  if (!carousel) return;

  const prevBtn = document.querySelector(".carousel-arrow.prev");
  const nextBtn = document.querySelector(".carousel-arrow.next");
  const cardWidth = 280; // Largeur d'une carte + gap

  function updateArrows() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    prevBtn.style.opacity = carousel.scrollLeft <= 0 ? "0.5" : "1";
    nextBtn.style.opacity = carousel.scrollLeft >= maxScroll ? "0.5" : "1";
  }

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  carousel.addEventListener("scroll", updateArrows);
  updateArrows();
}

// Fonction handleViewChange améliorée pour gérer tous les types de vues
function handleViewChange(e) {
  const btn = e.target;
  const newView = btn.dataset.view;
  
  // Mettre à jour le bouton actif
  viewButtons.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  // Vider les conteneurs avant de changer de vue
  weatherGrid.innerHTML = "";
  forecastGrid.innerHTML = "";
  
  // Supprimer toutes les classes de vue précédentes du body
  document.body.classList.remove(
    "view-general", 
    "view-14days", 
    "view-current-month", 
    "view-next-month", 
    "view-today", 
    "view-tomorrow"
  );
  
  // Ajouter la classe correspondant à la vue actuelle
  document.body.classList.add(`view-${newView}`);
  
  // Afficher un message de chargement temporaire
  const loadingHTML = getLoadingHTML();
  
  // Déterminer quel conteneur doit recevoir le message de chargement
  if (newView === "14days" || newView === "current-month" || newView === "next-month") {
    forecastGrid.innerHTML = loadingHTML;
    forecastGrid.classList.remove("hidden");
    weatherGrid.classList.add("hidden");
  } else {
    weatherGrid.innerHTML = loadingHTML;
    weatherGrid.classList.remove("hidden");
    forecastGrid.classList.add("hidden");
  }

  currentView = newView;
  
  // Mettre à jour l'affichage après un court délai pour permettre l'affichage du message de chargement
  setTimeout(() => {
    updateDisplay();
    
    // Initialiser les carousels selon la vue
    if (currentView === "tomorrow") {
      setTimeout(initCarousel, 100);
    } else if (currentView === "today") {
      setTimeout(initTodayCarousel, 100);
    }
  }, 50);
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
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/chart.js";
  script.onload = () => {
    console.log("Chart.js loaded");
  };
  document.head.appendChild(script);
}

function createWeatherChart(data) {
  const ctx = document.createElement("canvas");
  ctx.id = "weatherChart";
  ctx.style.width = "100%";
  ctx.style.height = "300px";
  ctx.style.marginBottom = "2rem";

  const labels = data.forecast.forecastday
    .slice(0, 7)
    .map((day) =>
      new Date(day.date).toLocaleDateString("fr-FR", { weekday: "short" })
    );

  const temperatures = data.forecast.forecastday
    .slice(0, 7)
    .map((day) => day.day.avgtemp_c);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Température moyenne (°C)",
          data: temperatures,
          borderColor: "rgb(30, 136, 229)",
          backgroundColor: "rgba(30, 136, 229, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });

  return ctx;
}

// Footer city links functionality
document.querySelectorAll(".city-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const cityName = e.target.dataset.city;
    const searchInput = document.querySelector(".city-search");

    if (searchInput) {
      searchInput.value = cityName;
      // Déclencher la recherche
      const event = new Event("input", { bubbles: true });
      searchInput.dispatchEvent(event);

      // Simuler un clic sur la suggestion
      setTimeout(() => {
        const suggestionsList = document.querySelector(".suggestions-list");
        const cityItem = Array.from(suggestionsList.children).find(
          (item) => item.textContent === cityName
        );
        if (cityItem) {
          cityItem.click();
        }
      }, 100);
    }

    // Scroll vers le contenu météo
    document.querySelector(".weather-content").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
