<?php
/**
 * Configuration SMTP pour l'envoi d'emails
 * 
 * Ce fichier contient les paramètres de configuration pour l'envoi d'emails via SMTP
 * Modifiez ces paramètres selon votre service d'email (Gmail, Outlook, etc.)
 */

return [
    // Serveur SMTP (ex: smtp.gmail.com pour Gmail, smtp.office365.com pour Outlook)
    'host' => 'smtp.gmail.com',
    
    // Adresse email utilisée pour l'authentification SMTP
    // Pour Gmail, utilisez votre adresse Gmail complète
    'username' => 'fattamiayoub@gmail.com',
    
    // Mot de passe pour l'authentification SMTP
    // Pour Gmail, utilisez un mot de passe d'application: https://myaccount.google.com/apppasswords
    'password' => 'immr hiyq toyy kmmi',
    
    // Port SMTP (généralement 587 pour TLS, 465 pour SSL)
    'port' => 587,
    
    // Méthode de chiffrement ('tls' ou 'ssl')
    // Utilisez 'tls' pour le port 587, 'ssl' pour le port 465
    'encryption' => 'tls',
    
    // Email d'expédition (peut être différent de l'email d'authentification)
    'from_email' => 'votre.email@gmail.com',
    
    // Nom d'expédition qui apparaîtra dans les emails
    'from_name' => 'Météo Maroc',
    
    // Email de destination par défaut (où les messages du formulaire seront envoyés)
    'to_email' => 'fattamiayoub@gmail.com',
    
    // Activer le mode debug (0 = désactivé, 1 = messages client, 2 = messages client/serveur)
    'debug' => 0,
];