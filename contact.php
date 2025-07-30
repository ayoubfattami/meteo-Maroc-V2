<?php
// Configuration
$to_email = "fattamiayoub@gmail.com"; // Remplacez par votre adresse email
$success_message = "";
$error_message = "";

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Nettoyage et validation des données
    $nom = filter_var(trim($_POST["nom"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $objet = filter_var(trim($_POST["objet"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);
    
    // Validation
    $errors = [];
    
    if (empty($nom)) {
        $errors[] = "Le nom complet est requis.";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Une adresse email valide est requise.";
    }
    
    // Supprimer la validation pour objet et message
    
    // Si pas d'erreurs, envoyer l'email
    if (empty($errors)) {
        $subject = "Contact Météo Maroc: " . $objet;
        $body = "Nom: " . $nom . "\n";
        $body .= "Email: " . $email . "\n";
        $body .= "Objet: " . $objet . "\n\n";
        $body .= "Message:\n" . $message;
        
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        if (mail($to_email, $subject, $body, $headers)) {
            $success_message = "Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.";
            // Réinitialiser les variables pour vider le formulaire
            $nom = $email = $objet = $message = "";
        } else {
            $error_message = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.";
        }
    } else {
        $error_message = implode("<br>", $errors);
    }
}
?> 
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - Météo Maroc</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .meteo-contact-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .meteo-contact-header {
            background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }

        .meteo-contact-header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 300;
        }

        .meteo-contact-header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .meteo-contact-form-container {
            padding: 40px 30px;
        }

        .meteo-contact-alert {
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 25px;
            font-weight: 500;
        }

        .meteo-contact-alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .meteo-contact-alert-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .meteo-contact-form-group {
            margin-bottom: 25px;
        }

        .meteo-contact-form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2d3436;
            font-size: 1rem;
        }

        .meteo-contact-required {
            position: relative;
        }

        .meteo-contact-required::after {
            content: '*';
            color: #e74c3c;
            font-weight: bold;
            margin-left: 5px;
            font-size: 1.2rem;
        }

        .meteo-contact-form-control {
            width: 100%;
            padding: 15px;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background-color: #f8f9fa;
        }

        .meteo-contact-form-control:focus {
            outline: none;
            border-color: #74b9ff;
            background-color: white;
            box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
        }

        .meteo-contact-form-control:valid {
            border-color: #00b894;
        }

        textarea.meteo-contact-form-control {
            resize: vertical;
            min-height: 120px;
        }

        .meteo-contact-btn {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 10px;
        }

        .meteo-contact-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(116, 185, 255, 0.3);
        }

        .meteo-contact-btn:active {
            transform: translateY(0);
        }

        .meteo-contact-weather-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }

        .meteo-contact-form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        @media (max-width: 768px) {
            body {
                padding: 10px;
            }

            .meteo-contact-container {
                border-radius: 15px;
            }

            .meteo-contact-header {
                padding: 30px 20px;
            }

            .meteo-contact-header h1 {
                font-size: 2rem;
            }

            .meteo-contact-form-container {
                padding: 30px 20px;
            }

            .meteo-contact-form-row {
                grid-template-columns: 1fr;
                gap: 0;
            }

            .meteo-contact-btn {
                padding: 12px 30px;
            }
        }

        @media (max-width: 480px) {
            .meteo-contact-header h1 {
                font-size: 1.8rem;
            }

            .meteo-contact-form-container {
                padding: 25px 15px;
            }
        }

        /* Animation pour les champs requis */
        .meteo-contact-form-control:required:invalid {
            animation: meteo-contact-shake 0.5s ease-in-out;
        }

        @keyframes meteo-contact-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        /* Indicateur visuel moderne pour les champs requis */
        .meteo-contact-required-field {
            position: relative;
        }

        .meteo-contact-required-field::before {
            content: '';
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 20px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            border-radius: 2px;
        }

        .meteo-contact-form-group label:not(.meteo-contact-required)::after {
            content: '(optionnel)';
            font-size: 0.8rem;
            color: #718093;
            margin-left: 5px;
            font-weight: normal;
        }

        /* Supprimer les styles spécifiques aux champs non-requis */
        .meteo-contact-form-control:not([required]) {
            border-color: #e9ecef;  /* Même couleur que les champs requis */
            background-color: #f8f9fa; /* Même couleur que les champs requis */
        }

        .meteo-contact-form-control:not([required]):focus {
            border-color: #74b9ff; /* Même couleur que les champs requis au focus */
            background-color: white;
            box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
        }

        /* Ajouter validation visuelle pour tous les champs */
        .meteo-contact-form-control:focus {
            outline: none;
            border-color: #74b9ff;
            background-color: white;
            box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
        }

        .meteo-contact-form-control:not(:placeholder-shown) {
            border-color: #00b894; /* Même couleur que les champs valides */
        }
    </style>
</head>

<body>
    <?php include 'header.php'; ?>
    <div class="meteo-contact-container">
        <div class="meteo-contact-header">
            <div class="meteo-contact-weather-icon">🌤️</div>
            <h1 style="color: #FFF;">Contactez-nous</h1>
            <p>Météo Maroc - Votre service météorologique de confiance</p>
        </div>
        
        <div class="meteo-contact-form-container">
            <?php if (!empty($success_message)): ?>
                <div class="meteo-contact-alert meteo-contact-alert-success">
                    <?php echo htmlspecialchars($success_message); ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($error_message)): ?>
                <div class="meteo-contact-alert meteo-contact-alert-error">
                    <?php echo $error_message; ?>
                </div>
            <?php endif; ?>
            
            <form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
                <div class="meteo-contact-form-row">
                    <div class="meteo-contact-form-group meteo-contact-required-field">
                        <label for="meteo-contact-nom" class="meteo-contact-required">Nom complet</label>
                        <input type="text" id="meteo-contact-nom" name="nom" class="meteo-contact-form-control" 
                               value="<?php echo isset($nom) ? htmlspecialchars($nom) : ''; ?>" 
                               required placeholder="Votre nom complet">
                    </div>
                    
                    <div class="meteo-contact-form-group meteo-contact-required-field">
                        <label for="meteo-contact-email" class="meteo-contact-required">Adresse e-mail</label>
                        <input type="email" id="meteo-contact-email" name="email" class="meteo-contact-form-control" 
                               value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>" 
                               required placeholder="votre@email.com">
                    </div>
                </div>
                
                <div class="meteo-contact-form-group">
                    <label for="meteo-contact-objet">Objet du message</label>
                    <input type="text" id="meteo-contact-objet" name="objet" class="meteo-contact-form-control" 
                           value="<?php echo isset($objet) ? htmlspecialchars($objet) : ''; ?>" 
                           placeholder="Sujet de votre message">
                </div>
                
                <div class="meteo-contact-form-group">
                    <label for="meteo-contact-message">Message</label>
                    <textarea id="meteo-contact-message" name="message" class="meteo-contact-form-control" 
                              placeholder="Écrivez votre message ici..."><?php echo isset($message) ? htmlspecialchars($message) : ''; ?></textarea>
                </div>
                
                <button type="submit" class="meteo-contact-btn">
                    📧 Envoyer le message
                </button>
            </form>
        </div>
    </div>

    <script>
        // Animation d'amélioration de l'expérience utilisateur
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            const inputs = document.querySelectorAll('.meteo-contact-form-control');
            
            // Animation des champs au focus
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'scale(1.02)';
                    this.parentElement.style.transition = 'transform 0.2s ease';
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'scale(1)';
                });
            });
            
            // Validation en temps réel
            const allInputs = document.querySelectorAll('.meteo-contact-form-control');
            allInputs.forEach(input => {
                input.addEventListener('input', function() {
                    if (this.value.trim() !== '') {
                        this.style.borderColor = '#00b894';
                    } else {
                        this.style.borderColor = '#e9ecef';
                    }
                });
            });
        });
    </script>

<?php include 'footer.php'; ?>

</body>
</html>