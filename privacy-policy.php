<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Politique de confidentialité - Météo Maroc</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .meteo-privacy-body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: linear-gradient(135deg, #e3f2fd 0%, #b3e5fc 100%);
            min-height: 100vh;
        }

        .meteo-privacy-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .meteo-privacy-header {
            text-align: center;
            margin-bottom: 40px;
            background: rgba(255, 255, 255, 0.95);
            padding: 40px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        .meteo-privacy-title {
            font-size: 3rem;
            color: #2d3436;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .meteo-privacy-hero-img {
            width: 200px;
            height: 200px;
            margin: 20px auto;
            background: linear-gradient(45deg, #fd79a8, #e84393);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: white;
            box-shadow: 0 8px 25px rgba(232, 67, 147, 0.3);
        }

        .meteo-privacy-intro {
            font-size: 1.2rem;
            color: #636e72;
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }

        .meteo-privacy-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .meteo-privacy-section {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .meteo-privacy-section:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .meteo-privacy-section-title {
            font-size: 1.8rem;
            color: #2d3436;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .meteo-privacy-section-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(45deg, #6c5ce7, #a29bfe);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
        }

        .meteo-privacy-section-text {
            color: #636e72;
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 15px;
        }

        .meteo-privacy-highlight {
            color: #6c5ce7;
            font-weight: 600;
        }

        .meteo-privacy-list {
            color: #636e72;
            margin-left: 20px;
            margin-bottom: 15px;
        }

        .meteo-privacy-list li {
            margin-bottom: 8px;
        }

        .meteo-privacy-footer {
            text-align: center;
            margin-top: 50px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .meteo-privacy-footer-text {
            color: #636e72;
            font-size: 1.1rem;
        }

        .meteo-privacy-contact-info {
            background: rgba(108, 92, 231, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin-top: 15px;
            border-left: 4px solid #6c5ce7;
        }

        @media (max-width: 768px) {
            .meteo-privacy-container {
                padding: 15px;
            }

            .meteo-privacy-title {
                font-size: 2.2rem;
            }

            .meteo-privacy-hero-img {
                width: 150px;
                height: 150px;
                font-size: 3rem;
            }

            .meteo-privacy-intro {
                font-size: 1.1rem;
            }

            .meteo-privacy-content {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .meteo-privacy-section {
                padding: 20px;
            }

            .meteo-privacy-section-title {
                font-size: 1.5rem;
            }
        }

        @media (max-width: 480px) {
            .meteo-privacy-header {
                padding: 25px 20px;
            }

            .meteo-privacy-title {
                font-size: 1.8rem;
            }

            .meteo-privacy-hero-img {
                width: 120px;
                height: 120px;
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body class="meteo-privacy-body">
    <?php include 'header.php'; ?>
    <div class="meteo-privacy-container">
        <header class="meteo-privacy-header">
            <h1 class="meteo-privacy-title">Politique de Confidentialité</h1>
            <div class="meteo-privacy-hero-img">🔒</div>
            <p class="meteo-privacy-intro">
                Chez Météo Maroc, nous nous engageons à protéger votre vie privée et à garantir la sécurité 
                de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, 
                utilisons et protégeons vos informations lors de votre utilisation de notre service météorologique.
            </p>
        </header>

        <main class="meteo-privacy-content">
            <section class="meteo-privacy-section">
                <h2 class="meteo-privacy-section-title">
                    <span class="meteo-privacy-section-icon">📈</span>
                    Collecte de Données
                </h2>
                <p class="meteo-privacy-section-text">
                    Chez Météo Maroc, nous ne collectons <span class="meteo-privacy-highlight">aucune donnée personnelle</span>. Notre service respecte votre vie privée :
                    <!-- <span class="meteo-privacy-highlight">de qualité</span> -->
                </p>
                <ul class="meteo-privacy-list">
                    <li><strong> Aucune localisation :</strong> Les prévisions par ville sont basées sur votre recherche manuelle, sans géolocalisation automatique.</li>
                    <li><strong>Aucun suivi de navigation :</strong> Nous n'utilisons pas de cookies analytiques.</li>
                    <li><strong>Transparence technique :</strong> Les données météo affichées proviennent exclusivement de sources publiques et d'API autorisées.</li>
                </ul>
                <p class="meteo-privacy-section-text">
                    Un service météo utile, sans compromis sur votre confidentialité.
                </p>
            </section>

            <section class="meteo-privacy-section">
                <h2 class="meteo-privacy-section-title">
                    <span class="meteo-privacy-section-icon">🍪</span>
                    Utilisation des Cookies
                </h2>
                <p class="meteo-privacy-section-text">
                    <!-- Notre site utilise des <span class="meteo-privacy-highlight">cookies essentiels</span>  -->
                    Chez Météo Maroc, nous avons fait le choix technologique de ne pas utiliser de cookies , ni techniques, ni analytiques, ni de suivi.
                </p>
                <ul class="meteo-privacy-list">
                    <!-- <li><strong>Cookies fonctionnels :</strong> Mémorisation de vos préférences (ville, unités)</li> -->
                    <li>Navigation 100% privée : Aucun fichier n'est stocké sur votre appareil</li>
                    <li> <strong>Aucun suivi</strong> de votre navigation</li>
                    <li> <strong>Aucune analyse</strong> de données utilisateurs</li>
                    <li>Une expérience légère et respectueuse de votre vie privée</li>
                </ul>
                <p class="meteo-privacy-section-text">
                    Aucun cookie de suivi ou analytique n'est utilisé.
                </p>
            </section>

            <section class="meteo-privacy-section">
                <h2 class="meteo-privacy-section-title">
                    <span class="meteo-privacy-section-icon">⚖️</span>
                    Droits des Utilisateurs
                </h2>
                <p class="meteo-privacy-section-text">
                    Bien que Météo Maroc ne collecte aucune donnée personnelle, nous tenons à vous informer de vos droits généraux selon le RGPD :
                </p>
                <p class="meteo-privacy-section-text"><strong>Vos droits fondamentaux</strong></p>
                <ul class="meteo-privacy-list">
                    <li><strong> Droit d'information :</strong> Savoir quelles données sont collectées (chez nous : aucune)</li>
                    <li><strong> Droit d'accès :</strong> Demander confirmation qu'aucune donnée n'est stockée</li>
                    <li><strong> Droit à l'oubli :</strong> Demander la suppression de potentielles traces techniques (cache navigateur)</li>
                </ul>
                <p class="meteo-privacy-section-text">
                    Votre tranquillité d'esprit est notre priorité.
                </p>
            </section>

            <section class="meteo-privacy-section">
                <h2 class="meteo-privacy-section-title">
                    <span class="meteo-privacy-section-icon">🔐</span>
                    Sécurité des Données
                </h2>
                <p class="meteo-privacy-section-text">
                    La <span class="meteo-privacy-highlight">sécurité</span> de vos données est notre priorité absolue. 
                    Nous mettons en œuvre des mesures techniques et organisationnelles robustes :
                </p>
                <ul class="meteo-privacy-list">
                    <li>Chiffrement SSL/TLS pour toutes les communications</li>
                    <li>Serveurs sécurisés avec accès restreint et surveillé</li>
                    <li>Sauvegardes régulières et plans de continuité</li>
                    <li>Audits de sécurité périodiques</li>
                </ul>
              
            </section>

            <section class="meteo-privacy-section">
                <h2 class="meteo-privacy-section-title">
                    <span class="meteo-privacy-section-icon">📞</span>
                    Contact et Questions
                </h2>
                <p class="meteo-privacy-section-text">
                    Pour toute question concernant cette politique de confidentialité  notre <span class="meteo-privacy-highlight">équipe</span> est à votre disposition :
                </p>
                <div class="meteo-privacy-contact-info">
                    <p><strong>Email :</strong> privacy@meteomaroc.fr</p>
                    <p><strong>Téléphone :</strong> +212 5XX-XXX-XXX</p>
                    <p><strong>Adresse :</strong> Marrakech, Maroc</p>
                    <p><strong>Horaires :</strong> Lundi - Vendredi, 9h00 - 18h00</p>
                </div>
                <p class="meteo-privacy-section-text">
                    Nous nous engageons à répondre à toutes vos demandes dans les plus brefs délais 
                    et à vous accompagner dans l'exercice de vos droits relatifs à la protection des données.
                </p>
            </section>
        </main>

    </div>
        <?php include 'footer.php'; ?>

</body>
</html>