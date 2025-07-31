# Météo Maroc - Configuration du système d'emails

## Introduction

Ce document explique comment configurer le système d'envoi d'emails pour le formulaire de contact du site Météo Maroc. Le système utilise PHPMailer avec SMTP pour envoyer des emails en local et en production.

## Prérequis

- PHP 7.2 ou supérieur
- Composer (pour installer les dépendances)
- Un compte email avec accès SMTP (Gmail, Outlook, etc.)

## Installation

1. Assurez-vous que Composer est installé sur votre système
2. Exécutez la commande suivante à la racine du projet pour installer PHPMailer :
   ```
   composer require phpmailer/phpmailer
   ```

## Configuration

### Configuration SMTP

Le fichier de configuration SMTP se trouve dans `config/mail_config.php`. Vous devez modifier ce fichier avec vos propres informations SMTP :

```php
return [
    'host' => 'smtp.gmail.com',         // Serveur SMTP
    'username' => 'votre.email@gmail.com', // Votre adresse email
    'password' => 'votre_mot_de_passe_app', // Mot de passe ou mot de passe d'application
    'port' => 587,                      // Port SMTP
    'encryption' => 'tls',              // Méthode de chiffrement
    'from_email' => 'votre.email@gmail.com', // Email d'expédition
    'from_name' => 'Météo Maroc',       // Nom d'expédition
    'to_email' => 'destination@example.com', // Email de destination
    'debug' => 0,                       // Mode debug (0 = désactivé)
];
```

### Configuration pour Gmail

Si vous utilisez Gmail, vous devez :

1. Activer l'authentification à deux facteurs sur votre compte Google
2. Créer un mot de passe d'application spécifique pour cette application :
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Application" et "Autre (nom personnalisé)"
   - Entrez un nom comme "Météo Maroc"
   - Cliquez sur "Générer"
   - Utilisez le mot de passe généré dans votre configuration

## Dépannage

### Activer le mode debug

En cas de problème d'envoi d'emails, vous pouvez activer le mode debug dans `config/mail_config.php` :

```php
'debug' => 2, // 1 = messages client, 2 = messages client/serveur
```

Les messages d'erreur seront affichés dans la page et également enregistrés dans les logs PHP.

### Problèmes courants

1. **Erreur d'authentification** : Vérifiez vos identifiants SMTP et assurez-vous d'utiliser un mot de passe d'application si nécessaire.

2. **Problèmes de connexion** : Si vous rencontrez des problèmes de connexion SSL/TLS, les paramètres `SMTPOptions` dans le code permettent de contourner certaines vérifications strictes en environnement de développement.

3. **Emails bloqués** : Certains fournisseurs de messagerie peuvent bloquer les emails envoyés depuis des serveurs locaux. Testez avec différentes adresses email de destination.

## Migration vers la production

Lorsque vous migrez vers un serveur de production :

1. Mettez à jour le fichier `config/mail_config.php` avec les paramètres de production
2. Désactivez le mode debug en définissant `'debug' => 0`
3. Considérez l'utilisation de variables d'environnement pour les informations sensibles comme les mots de passe

## Sécurité

- Ne stockez jamais de mots de passe en clair dans le code source
- Utilisez des mots de passe d'application plutôt que vos mots de passe principaux
- Limitez les permissions du fichier `config/mail_config.php` pour qu'il ne soit pas accessible publiquement