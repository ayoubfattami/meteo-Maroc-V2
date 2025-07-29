<!DOCTYPE html>
<html lang="fr">
<?php include 'header.php'; ?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>À propos - Météo Maroc</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .meteo-about-body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: linear-gradient(135deg, #e3f2fd 0%, #b3e5fc 100%);
            min-height: 100vh;
        }

        .meteo-about-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .meteo-about-header {
            text-align: center;
            margin-bottom: 40px;
            background: rgba(255, 255, 255, 0.95);
            padding: 40px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        .meteo-about-title {
            font-size: 3rem;
            color: #2d3436;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .meteo-about-hero-img {
            width: 200px;
            height: 200px;
            margin: 20px auto;
            background: linear-gradient(45deg, #00b894, #00cec9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: white;
            box-shadow: 0 8px 25px rgba(0, 184, 148, 0.3);
        }

        .meteo-about-intro {
            font-size: 1.2rem;
            color: #636e72;
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }

        .meteo-about-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .meteo-about-section {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .meteo-about-section:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .meteo-about-section-title {
            font-size: 1.8rem;
            color: #2d3436;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .meteo-about-section-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(45deg, #74b9ff, #0984e3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
        }

        .meteo-about-section-text {
            color: #636e72;
            font-size: 1rem;
            line-height: 1.7;
        }

        .meteo-about-highlight {
            color: #0984e3;
            font-weight: 600;
        }

        .meteo-about-footer {
            text-align: center;
            margin-top: 50px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .meteo-about-footer-text {
            color: #636e72;
            font-size: 1.1rem;
        }

        /* Styles FAQ */
        .meteo-about-faq-section {
            margin-top: 50px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        .meteo-about-faq-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .meteo-about-faq-title {
            font-size: 2.5rem;
            color: #2d3436;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .meteo-about-faq-icon {
            font-size: 2.5rem;
            background: linear-gradient(45deg, #e17055, #d63031);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .meteo-about-faq-subtitle {
            font-size: 1.1rem;
            color: #636e72;
            max-width: 600px;
            margin: 0 auto;
        }

        .meteo-about-faq-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .meteo-about-faq-item {
            margin-bottom: 15px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
        }

        .meteo-about-faq-item:hover {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
            transform: translateY(-2px);
        }

        .meteo-about-faq-question {
            width: 100%;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border: none;
            padding: 20px 25px;
            text-align: left;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .meteo-about-faq-question:hover {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .meteo-about-faq-question.meteo-about-faq-active {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
        }

        .meteo-about-faq-question-text {
            font-size: 1.1rem;
            font-weight: 600;
            color: inherit;
            flex: 1;
            margin-right: 15px;
        }

        .meteo-about-faq-toggle {
            font-size: 1.5rem;
            font-weight: bold;
            color: #74b9ff;
            transition: all 0.3s ease;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(116, 185, 255, 0.1);
        }

        .meteo-about-faq-active .meteo-about-faq-toggle {
            color: white;
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(180deg);
        }

        .meteo-about-faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.4s ease;
            background: white;
        }

        .meteo-about-faq-answer.meteo-about-faq-open {
            max-height: 300px;
            padding: 25px;
        }

        .meteo-about-faq-answer-content {
            color: #636e72;
            font-size: 1rem;
            line-height: 1.7;
        }

        .meteo-about-faq-answer-content p {
            margin: 0;
        }

        @media (max-width: 768px) {
            .meteo-about-container {
                padding: 15px;
            }

            .meteo-about-title {
                font-size: 2.2rem;
            }

            .meteo-about-hero-img {
                width: 150px;
                height: 150px;
                font-size: 3rem;
            }

            .meteo-about-intro {
                font-size: 1.1rem;
            }

            .meteo-about-content {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .meteo-about-section {
                padding: 20px;
            }

            .meteo-about-section-title {
                font-size: 1.5rem;
            }

            .meteo-about-faq-section {
                margin-top: 30px;
                padding: 30px 20px;
            }

            .meteo-about-faq-title {
                font-size: 2rem;
                flex-direction: column;
                gap: 10px;
            }

            .meteo-about-faq-question {
                padding: 15px 20px;
            }

            .meteo-about-faq-question-text {
                font-size: 1rem;
            }
        }

        @media (max-width: 480px) {
            .meteo-about-header {
                padding: 25px 20px;
            }

            .meteo-about-title {
                font-size: 1.8rem;
            }

            .meteo-about-hero-img {
                width: 120px;
                height: 120px;
                font-size: 2.5rem;
            }

            .meteo-about-faq-section {
                padding: 25px 15px;
            }

            .meteo-about-faq-title {
                font-size: 1.8rem;
            }

            .meteo-about-faq-question {
                padding: 12px 15px;
            }

            .meteo-about-faq-question-text {
                font-size: 0.95rem;
                margin-right: 10px;
            }

            .meteo-about-faq-toggle {
                font-size: 1.3rem;
                width: 25px;
                height: 25px;
            }
        }
    </style>
</head>
<body class="meteo-about-body">
    <div class="meteo-about-container">
        <header class="meteo-about-header">
            <h1 class="meteo-about-title">À propos de Météo Maroc</h1>
            <div class="meteo-about-hero-img">🌤️</div>
            <p class="meteo-about-intro">
                Météo Maroc est votre source de confiance pour des prévisions météorologiques précises et en temps réel 
                à travers tout le royaume du Maroc. Notre mission est de vous fournir les informations météo les plus 
                fiables pour vous aider à planifier vos journées en toute sérénité.
            </p>
        </header>

        <main class="meteo-about-content">
            <section class="meteo-about-section">
                <h2 class="meteo-about-section-title">
                    <span class="meteo-about-section-icon">🎯</span>
                    Notre Mission
                </h2>
                <p class="meteo-about-section-text">
                    Notre mission est de démocratiser l'accès aux informations météorologiques au Maroc. 
                    Nous nous engageons à fournir des <span class="meteo-about-highlight">prévisions précises</span> 
                    et actualisées pour toutes les villes marocaines, des grandes métropoles comme Casablanca 
                    et Rabat aux petites communes rurales. Nous croyons que chaque citoyen mérite d'avoir accès 
                    à des données météo fiables pour prendre des décisions éclairées au quotidien.
                </p>
            </section>

            <section class="meteo-about-section">
                <h2 class="meteo-about-section-title">
                    <span class="meteo-about-section-icon">🚀</span>
                    Notre Objectif
                </h2>
                <p class="meteo-about-section-text">
                    L'objectif principal de Météo Maroc est d'offrir une <span class="meteo-about-highlight">météo fiable</span> 
                    adaptée aux spécificités climatiques du royaume. Nous analysons les conditions météorologiques 
                    uniques du Maroc, des côtes atlantiques aux sommets de l'Atlas, en passant par les régions 
                    sahariennes. Notre plateforme vise à être l'outil de référence pour tous les Marocains 
                    et visiteurs qui souhaitent connaître les conditions météo avec précision.
                </p>
            </section>

            <section class="meteo-about-section">
                <h2 class="meteo-about-section-title">
                    <span class="meteo-about-section-icon">⚡</span>
                    Technologies Utilisées
                </h2>
                <p class="meteo-about-section-text">
                    Météo Maroc utilise des <span class="meteo-about-highlight">technologies modernes</span> 
                    pour garantir des performances optimales. Notre plateforme est développée avec des 
                    technologies web avancées, intégrant des APIs météorologiques internationales reconnues. 
                    Nous utilisons des systèmes de mise à jour en temps réel pour assurer la fraîcheur 
                    des données, et notre interface responsive garantit une expérience utilisateur fluide 
                    sur tous les appareils.
                </p>
            </section>

            <section class="meteo-about-section">
                <h2 class="meteo-about-section-title">
                    <span class="meteo-about-section-icon">👥</span>
                    Notre Équipe
                </h2>
                <p class="meteo-about-section-text">
                    Météo Maroc est le fruit du travail d'une équipe passionnée de <span class="meteo-about-highlight">développeurs</span> 
                    et de météorologues marocains. Nous combinons expertise technique et connaissance approfondie 
                    du climat marocain pour créer une solution adaptée aux besoins locaux. Notre équipe 
                    s'engage à maintenir la qualité du service et à innover constamment pour améliorer 
                    l'expérience utilisateur.
                </p>
            </section>

            <section class="meteo-about-section">
                <h2 class="meteo-about-section-title">
                    <span class="meteo-about-section-icon">🔍</span>
                    Transparence et Fiabilité
                </h2>
                <p class="meteo-about-section-text">
                    La <span class="meteo-about-highlight">transparence</span> est au cœur de nos valeurs. 
                    Nous nous appuyons sur des sources de données météorologiques vérifiées et reconnues 
                    internationalement. Nos algorithmes de traitement sont régulièrement mis à jour pour 
                    améliorer la précision des prévisions. Nous nous engageons à communiquer clairement 
                    sur nos méthodes et à maintenir la plus haute qualité de service possible.
                </p>
            </section>

            <section class="meteo-about-section">
                <h2 class="meteo-about-section-title">
                    <span class="meteo-about-section-icon">🌍</span>
                    Engagement Local
                </h2>
                <p class="meteo-about-section-text">
                    En tant que service <span class="meteo-about-highlight">100% marocain</span>, nous comprenons 
                    les particularités climatiques de notre pays. Des variations saisonnières du littoral 
                    aux conditions extrêmes du désert, nous adaptons nos prévisions aux réalités locales. 
                    Notre engagement est de servir la communauté marocaine avec des informations météo 
                    pertinentes et utiles pour la vie quotidienne, l'agriculture, le tourisme et tous 
                    les secteurs d'activité.
                </p>
            </section>
        </main>

        <!-- Section FAQ -->
        <section class="meteo-about-faq-section">
            <div class="meteo-about-faq-header">
                <h2 class="meteo-about-faq-title">
                    <span class="meteo-about-faq-icon">❓</span>
                    Questions Fréquemment Posées
                </h2>
                <p class="meteo-about-faq-subtitle">Découvrez les réponses aux questions les plus courantes sur la météo au Maroc</p>
            </div>
            
            <div class="meteo-about-faq-container">
                <div class="meteo-about-faq-item">
                    <button class="meteo-about-faq-question" data-faq="faq1">
                        <span class="meteo-about-faq-question-text">Quelles sont les périodes les plus chaudes au Maroc ?</span>
                        <span class="meteo-about-faq-toggle">+</span>
                    </button>
                    <div class="meteo-about-faq-answer" id="faq1">
                        <div class="meteo-about-faq-answer-content">
                            <p>Les mois les plus chauds au Maroc sont généralement juillet et août, avec des températures pouvant dépasser 40°C dans les régions intérieures comme Marrakech et Fès. Les zones côtières bénéficient de températures plus modérées grâce à l'influence de l'océan Atlantique et de la mer Méditerranée.</p>
                        </div>
                    </div>
                </div>

                <div class="meteo-about-faq-item">
                    <button class="meteo-about-faq-question" data-faq="faq2">
                        <span class="meteo-about-faq-question-text">Comment varie le climat entre les différentes régions du Maroc ?</span>
                        <span class="meteo-about-faq-toggle">+</span>
                    </button>
                    <div class="meteo-about-faq-answer" id="faq2">
                        <div class="meteo-about-faq-answer-content">
                            <p>Le Maroc présente une grande diversité climatique : climat méditerranéen au nord, océanique sur la côte atlantique, continental à l'intérieur, et désertique au sud. Les montagnes de l'Atlas créent des microclimats avec des températures plus fraîches et des précipitations plus importantes.</p>
                        </div>
                    </div>
                </div>

                <div class="meteo-about-faq-item">
                    <button class="meteo-about-faq-question" data-faq="faq3">
                        <span class="meteo-about-faq-question-text">Quelle est la meilleure période pour visiter le Maroc ?</span>
                        <span class="meteo-about-faq-toggle">+</span>
                    </button>
                    <div class="meteo-about-faq-answer" id="faq3">
                        <div class="meteo-about-faq-answer-content">
                            <p>Les meilleures périodes sont le printemps (mars-mai) et l'automne (septembre-novembre), avec des températures agréables et peu de précipitations. L'hiver est idéal pour le sud du pays, tandis que l'été convient mieux aux régions côtières et montagneuses.</p>
                        </div>
                    </div>
                </div>

                <div class="meteo-about-faq-item">
                    <button class="meteo-about-faq-question" data-faq="faq4">
                        <span class="meteo-about-faq-question-text">À quelle fréquence les prévisions météo sont-elles mises à jour ?</span>
                        <span class="meteo-about-faq-toggle">+</span>
                    </button>
                    <div class="meteo-about-faq-answer" id="faq4">
                        <div class="meteo-about-faq-answer-content">
                            <p>Nos prévisions météorologiques sont mises à jour toutes les 3 heures pour garantir la précision maximale. Nous utilisons des données provenant de stations météorologiques locales et de modèles de prévision internationaux pour vous offrir les informations les plus fiables.</p>
                        </div>
                    </div>
                </div>

                <div class="meteo-about-faq-item">
                    <button class="meteo-about-faq-question" data-faq="faq5">
                        <span class="meteo-about-faq-question-text">Comment interpréter les indices UV et de qualité de l'air ?</span>
                        <span class="meteo-about-faq-toggle">+</span>
                    </button>
                    <div class="meteo-about-faq-answer" id="faq5">
                        <div class="meteo-about-faq-answer-content">
                            <p>L'indice UV varie de 1 (faible) à 11+ (extrême). Au Maroc, il peut atteindre des niveaux très élevés en été. L'indice de qualité de l'air va de 0 (excellent) à 500 (dangereux). Nous recommandons de limiter les activités extérieures quand l'indice UV dépasse 8 ou que la qualité de l'air est mauvaise.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <script>
        // Script pour l'accordéon FAQ
        document.addEventListener('DOMContentLoaded', function() {
            const faqQuestions = document.querySelectorAll('.meteo-about-faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const faqId = this.getAttribute('data-faq');
                    const answer = document.getElementById(faqId);
                    const toggle = this.querySelector('.meteo-about-faq-toggle');
                    const isOpen = answer.classList.contains('meteo-about-faq-open');
                    
                    // Fermer toutes les autres FAQ
                    faqQuestions.forEach(otherQuestion => {
                        const otherFaqId = otherQuestion.getAttribute('data-faq');
                        const otherAnswer = document.getElementById(otherFaqId);
                        const otherToggle = otherQuestion.querySelector('.meteo-about-faq-toggle');
                        
                        if (otherFaqId !== faqId) {
                            otherAnswer.classList.remove('meteo-about-faq-open');
                            otherToggle.textContent = '+';
                            otherQuestion.classList.remove('meteo-about-faq-active');
                        }
                    });
                    
                    // Basculer la FAQ actuelle
                    if (isOpen) {
                        answer.classList.remove('meteo-about-faq-open');
                        toggle.textContent = '+';
                        this.classList.remove('meteo-about-faq-active');
                    } else {
                        answer.classList.add('meteo-about-faq-open');
                        toggle.textContent = '−';
                        this.classList.add('meteo-about-faq-active');
                    }
                });
            });
        });
    </script>
    <?php include 'footer.php'; ?>

</body>
</html>