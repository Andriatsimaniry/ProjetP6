# ProjetP6 Openclassrooms SO Pekocko (version avant 29/072021)
Création de Sauces épicées dont les recettes sont gardées secrètes,
c'est une application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférérées et
liker ou disliker les sauces ajoutées par les autres.

Installation
 Front-end : 
 - Clonez l'application front-end https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git
 - npm install (version npm:6.14.13)
 - npm start pour lancer 
 -http://localhost:8081
 
Backend:
 Etape 1 : -Installation du serveur NodeJs: téléchargez sur NodeJs.org
    Node.Js version: 14.17.3
  -Installez express version: 4.17.1
  -Installer Mongoose version: 5.13.3
  -Installer nodemon version: 2.0.12
  --Initialiser le projet: nmp init
  -Demarrer le serveur NodeJS: nodemon server.js
 
 Etape 2: Creez l'utilisateur
  -Modèle dutilisateur;
  -Parcours utilisateur;
  -Contrôleur d'utilisateur.
  L'utilisateur est en mesure d'effectuer les opérations suivantes:
  -Crée un compte;
  -Se connecter et disposer d'un token valide.
  
 Etape 3: Démarrer le middleware
  -Ajout de multer pour les images;
  -Ajout d'authorize pour la validation des tokens
      Authorise doit être ajoutée avant de commencer à construire
      le parcours pours les sauces car l'authetification est nécessaire pour qu'un utilisateur puisse effectuer
      une action sur le parcours des sauces
      
 Etape 4: Construire la route sauce de l'API
  -Créez les éléments suivant:
    -Le modèle Sauce;
    -La route Sauce
    -Le controleur Sauce.
  Autorisez toutes les fonctions en utilisant middleware Authorize
  L'utilisateur est en mesure d'effectuer les opérations suivantes:
    -Ajouter une nouvelle sauce
    -modifier une sauce
    -Supprimer une sauce
    -voir toutes les sauces
    
 Etape 5: Terminer la route sauce de l'API
   Executez l'application en tant qu'utilisateur pour vérifier que toutes les fonctions ont été correctement mises en ouvre,testez :
      -Les deux types de demandes:
        -avec un fichier présent;
        -sans fichier.
      -Les trois scénarios de la fonction <like> (1,0,-1);
          -l'utilisateur peut liker ou ne pas aimer une sauce(ou aucun des deux)
          -Seul le propriétaire de la sauce peut modifier ou supprimer un sauce existante.
  
