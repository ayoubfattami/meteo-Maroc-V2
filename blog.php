<?php
// Configuration de la pagination
$articlesPerPage = 12;
$currentPage = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;

// Lecture du fichier JSON
$jsonFile = 'data/articles.json';
$articles = [];

if (file_exists($jsonFile)) {
    $jsonContent = file_get_contents($jsonFile);
    $articles = json_decode($jsonContent, true);
    
    if (!$articles) {
        $articles = [];
    }
}

// Calcul de la pagination
$totalArticles = count($articles);
$totalPages = ceil($totalArticles / $articlesPerPage);
$offset = ($currentPage - 1) * $articlesPerPage;
$currentArticles = array_slice($articles, $offset, $articlesPerPage);

// Fonction pour formater la date
function formatDate($date) {
    $months = [
        '01' => 'janvier', '02' => 'février', '03' => 'mars', '04' => 'avril',
        '05' => 'mai', '06' => 'juin', '07' => 'juillet', '08' => 'août',
        '09' => 'septembre', '10' => 'octobre', '11' => 'novembre', '12' => 'décembre'
    ];
    
    $dateObj = DateTime::createFromFormat('Y-m-d', $date);
    if ($dateObj) {
        $day = $dateObj->format('d');
        $month = $months[$dateObj->format('m')];
        $year = $dateObj->format('Y');
        return "$day $month $year";
    }
    return $date;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Météo - Météo Maroc</title>
    <style>
        /* Reset et base */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }

        /* Container principal */
        .meteo-blog-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header du blog */
        .meteo-blog-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .meteo-blog-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .meteo-blog-subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            font-weight: 300;
        }

        /* Grille des articles */
        .meteo-blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }

        /* Carte d'article */
        .meteo-blog-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
        }

        .meteo-blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .meteo-blog-card-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .meteo-blog-card:hover .meteo-blog-card-image {
            transform: scale(1.05);
        }

        .meteo-blog-card-content {
            padding: 25px;
        }

        .meteo-blog-card-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 10px;
            line-height: 1.4;
        }

        .meteo-blog-card-date {
            color: #7f8c8d;
            font-size: 0.9rem;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .meteo-blog-card-date::before {
            content: "📅";
            margin-right: 8px;
        }

        .meteo-blog-card-summary {
            color: #555;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .meteo-blog-card-link {
            display: inline-block;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 500;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }

        .meteo-blog-card-link:hover {
            background: linear-gradient(135deg, #2980b9, #1f5f99);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }

        /* Pagination */
        .meteo-blog-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 40px;
            flex-wrap: wrap;
        }

        .meteo-blog-pagination-link {
            display: inline-block;
            padding: 12px 18px;
            background: white;
            color: #3498db;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
            border: 2px solid #e3e8ed;
            min-width: 45px;
            text-align: center;
        }

        .meteo-blog-pagination-link:hover {
            background: #3498db;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        .meteo-blog-pagination-link.meteo-blog-pagination-active {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            border-color: #2980b9;
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        .meteo-blog-pagination-ellipsis {
            padding: 12px 8px;
            color: #7f8c8d;
            font-weight: 500;
        }

        /* Message si pas d'articles */
        .meteo-blog-no-articles {
            text-align: center;
            padding: 60px 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .meteo-blog-no-articles h3 {
            color: #7f8c8d;
            font-size: 1.5rem;
            margin-bottom: 10px;
        }

        .meteo-blog-no-articles p {
            color: #95a5a6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .meteo-blog-container {
                padding: 15px;
            }

            .meteo-blog-title {
                font-size: 2rem;
            }

            .meteo-blog-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .meteo-blog-card-content {
                padding: 20px;
            }

            .meteo-blog-pagination {
                gap: 5px;
            }

            .meteo-blog-pagination-link {
                padding: 10px 14px;
                font-size: 0.9rem;
                min-width: 40px;
            }
        }

        @media (max-width: 480px) {
            .meteo-blog-header {
                padding: 30px 15px;
            }

            .meteo-blog-title {
                font-size: 1.8rem;
            }

            .meteo-blog-subtitle {
                font-size: 1rem;
            }

            .meteo-blog-card-title {
                font-size: 1.2rem;
            }

            .meteo-blog-pagination-link {
                padding: 8px 12px;
                min-width: 35px;
            }
        }

        /* Responsive pour tablettes */
        @media (min-width: 769px) and (max-width: 1024px) {
            .meteo-blog-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        /* Responsive pour desktop */
        @media (min-width: 1025px) {
            .meteo-blog-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    </style>
</head>
<body>
    <?php include 'header.php'; ?>
    <div class="meteo-blog-container">
        <!-- Header du blog -->
        <header class="meteo-blog-header">
            <h1 class="meteo-blog-title" style="color: #FFF;">Blog Météo Maroc</h1>
            <p class="meteo-blog-subtitle">Toute l'actualité météorologique des villes marocaines</p>
        </header>

        <?php if (empty($currentArticles)): ?>
            <!-- Message si pas d'articles -->
            <div class="meteo-blog-no-articles">
                <h3>Aucun article disponible</h3>
                <p>Revenez bientôt pour découvrir nos dernières actualités météo !</p>
            </div>
        <?php else: ?>
            <!-- Grille des articles -->
            <div class="meteo-blog-grid">
                <?php foreach ($currentArticles as $article): ?>
                    <article class="meteo-blog-card">
                        <img src="<?php echo htmlspecialchars($article['image']); ?>" 
                             alt="<?php echo htmlspecialchars($article['title']); ?>" 
                             class="meteo-blog-card-image"
                             onerror="this.src='assets/images/default-weather.jpg'">
                        
                        <div class="meteo-blog-card-content">
                            <h2 class="meteo-blog-card-title">
                                <?php echo htmlspecialchars($article['title']); ?>
                            </h2>
                            
                            <div class="meteo-blog-card-date">
                                <?php echo formatDate($article['date']); ?>
                            </div>
                            
                            <p class="meteo-blog-card-summary">
                                <?php echo htmlspecialchars($article['summary']); ?>
                            </p>
                            
                            <a href="articles/<?php echo urlencode($article['slug']); ?>.php" 
                               class="meteo-blog-card-link">
                                Lire la suite
                            </a>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>

            <!-- Pagination -->
            <?php if ($totalPages > 1): ?>
                <nav class="meteo-blog-pagination">
                    <?php
                    // Pagination intelligente
                    $range = 2; // Nombre de pages à afficher de chaque côté de la page courante
                    $start = max(1, $currentPage - $range);
                    $end = min($totalPages, $currentPage + $range);
                    
                    // Lien "Précédent"
                    if ($currentPage > 1): ?>
                        <a href="?page=<?php echo $currentPage - 1; ?>" class="meteo-blog-pagination-link">
                            ← Précédent
                        </a>
                    <?php endif;
                    
                    // Première page si nécessaire
                    if ($start > 1): ?>
                        <a href="?page=1" class="meteo-blog-pagination-link">1</a>
                        <?php if ($start > 2): ?>
                            <span class="meteo-blog-pagination-ellipsis">...</span>
                        <?php endif;
                    endif;
                    
                    // Pages du milieu
                    for ($i = $start; $i <= $end; $i++): ?>
                        <a href="?page=<?php echo $i; ?>" 
                           class="meteo-blog-pagination-link <?php echo $i == $currentPage ? 'meteo-blog-pagination-active' : ''; ?>">
                            <?php echo $i; ?>
                        </a>
                    <?php endfor;
                    
                    // Dernière page si nécessaire
                    if ($end < $totalPages): ?>
                        <?php if ($end < $totalPages - 1): ?>
                            <span class="meteo-blog-pagination-ellipsis">...</span>
                        <?php endif; ?>
                        <a href="?page=<?php echo $totalPages; ?>" class="meteo-blog-pagination-link">
                            <?php echo $totalPages; ?>
                        </a>
                    <?php endif;
                    
                    // Lien "Suivant"
                    if ($currentPage < $totalPages): ?>
                        <a href="?page=<?php echo $currentPage + 1; ?>" class="meteo-blog-pagination-link">
                            Suivant →
                        </a>
                    <?php endif; ?>
                </nav>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</body>
<?php include 'footer.php'; ?>
</html>