<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<footer class="main-footer">
      <div class="footer-container">
        <!-- Section 1: À propos -->
        <div class="footer-section">
          <h3>Météo Maroc</h3>
          <p class="footer-description">
            Découvrez les prévisions météorologiques précises et en temps réel 
            pour toutes les villes du Maroc. Un service fiable pour vous aider 
            à mieux planifier vos journées.
          </p>
        </div>

        <!-- Section 2: Villes principales -->
        <div class="footer-section">
          <h3>À lire sur notre blog</h3>
          <ul class="footer-cities">
            <li>
              <a href="articles/changements-climatiques-maroc.php" class="city-link">
                Changements climatiques au Maroc : enjeux et perspectives
              </a>
            </li>
            <li>
              <a href="articles/astuces-meteo-voyage.php" class="city-link">
                7 astuces météo pour bien préparer votre voyage
              </a>
            </li>
            <li>
              <a href="articles/phenomenes-extremes.php" class="city-link">
                Phénomènes météorologiques extrêmes : comment s’en protéger ?
              </a>
            </li>
          </ul>
        </div>

        <!-- Section 3: Liens utiles -->
        <div class="footer-section">
          <h3>Liens Utiles</h3>
          <ul class="footer-links">
            <li><a href="/contact">Contact</a></li>
            <li><a href="/terms">Conditions d'utilisation</a></li>
            <li><a href="/privacy">Politique de confidentialité</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p> <span id="year"></span> Météo Maroc | Tous droits réservés</p>
      </div>
    </footer>

    <script src="script.js"></script>

    <script>
        // Fonctionnalité complète des liens de villes pour toutes les pages
        document.addEventListener('DOMContentLoaded', function() {
            // Mise à jour de l'année automatiquement
            const yearElement = document.getElementById('year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
            
            // Fonction pour déclencher la recherche d'une ville
            function triggerCitySearch(cityName) {
                console.log('Tentative de recherche pour:', cityName);
                
                // Attendre que les éléments de recherche soient disponibles
                const waitForElements = () => {
                    const searchInput = document.querySelector('.city-search');
                    const citySelect = document.getElementById('citySelect');
                    
                    if (searchInput) {
                        console.log('Champ de recherche trouvé, remplissage avec:', cityName);
                        searchInput.value = cityName;
                        searchInput.focus();
                        
                        // Déclencher plusieurs événements pour s'assurer que ça marche
                        ['input', 'keyup', 'change'].forEach(eventType => {
                            const event = new Event(eventType, { bubbles: true });
                            searchInput.dispatchEvent(event);
                        });
                        
                        // Simuler un clic sur la suggestion après un délai
                        setTimeout(() => {
                            const suggestionsList = document.querySelector('.suggestions-list');
                            if (suggestionsList && suggestionsList.children.length > 0) {
                                const cityItem = Array.from(suggestionsList.children)
                                    .find(item => item.textContent.trim() === cityName);
                                if (cityItem) {
                                    console.log('Suggestion trouvée, clic automatique');
                                    cityItem.click();
                                } else {
                                    console.log('Suggestion non trouvée, essai avec le premier élément');
                                    if (suggestionsList.children[0]) {
                                        suggestionsList.children[0].click();
                                    }
                                }
                            }
                        }, 300);
                        
                        // Scroll vers le contenu météo
                        setTimeout(() => {
                            const weatherContent = document.querySelector('.weather-content');
                            if (weatherContent) {
                                weatherContent.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }, 800);
                        
                        return true;
                    }
                    
                    // Alternative : utiliser le select si disponible
                    if (citySelect) {
                        console.log('Select trouvé, tentative de sélection:', cityName);
                        // Chercher l'option correspondante
                        const options = Array.from(citySelect.options);
                        const matchingOption = options.find(option => 
                            option.value === cityName || option.textContent === cityName
                        );
                        
                        if (matchingOption) {
                            citySelect.value = matchingOption.value;
                            const changeEvent = new Event('change', { bubbles: true });
                            citySelect.dispatchEvent(changeEvent);
                            return true;
                        }
                    }
                    
                    return false;
                };
                
                // Essayer immédiatement, puis avec des délais croissants
                if (!waitForElements()) {
                    setTimeout(() => {
                        if (!waitForElements()) {
                            setTimeout(() => {
                                waitForElements();
                            }, 1000);
                        }
                    }, 500);
                }
            }
            
            // Vérifier si on arrive sur index.html avec un paramètre city
            const urlParams = new URLSearchParams(window.location.search);
            const cityFromUrl = urlParams.get('city');
            const currentPage = window.location.pathname;
            const isIndexPage = currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('/');
            
            if (cityFromUrl && isIndexPage) {
                console.log('Paramètre city détecté:', cityFromUrl);
                // Attendre que tous les éléments soient chargés
                setTimeout(() => {
                    triggerCitySearch(cityFromUrl);
                    // Nettoyer l'URL après avoir déclenché la recherche
                    setTimeout(() => {
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }, 2000);
                }, 1500);
            }
            
            // Gestion des clics sur les liens de villes
            document.querySelectorAll('.city-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cityName = e.target.dataset.city;
                    console.log('Clic sur ville:', cityName);
                    
                    if (isIndexPage) {
                        // Si on est déjà sur index.html, déclencher directement la recherche
                        triggerCitySearch(cityName);
                    } else {
                        // Si on est sur une autre page, rediriger vers index.html avec paramètre
                        console.log('Redirection vers index.html avec paramètre');
                        window.location.href = `index.html?city=${encodeURIComponent(cityName)}`;
                    }
                });
            });
        });
    </script>

</body>
</html>