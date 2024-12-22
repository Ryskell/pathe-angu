# Pathé-Angu

## Description

**Pathé-Angu** est un projet Angular conçu pour gérer et afficher des informations sur les films. Il propose une interface utilisateur réactive permettant de consulter des films, réserver ses places, consulter ses réservations, et rédiger un avis

## Membres du projet

- **Anton Hillary Nathaniel**
- **Ho Ryan**



## Fonctionnalités

- **Affichage de la liste des films** : Visualisation des films avec leurs affiches et descriptions.

- **Détails des films** : Affichage d'informations détaillées sur un film sélectionné.

- Réserver un ou plusieurs siège pour son film

- Consulter ses réservations

- Voir et écrire des commentaires divers

## Respect des consignes du projet Angular

### Authentification

- **Inscription et Connexion** : Deux formulaires distincts pour l'inscription et la connexion.

### Routing

- **Routes définies** :
  - Page d'accueil
  - page des différents films
  - Page des détails d'un film avec transmission d'identifiant
  - page pour réserver un siège
  - page des reservation



### Composants

- **Composants multiples** :
  - Au moins un composant par page.
  - Composant réutilisé pour l'affichage des films.



### Services

-
  - Gestion des films .
  - Service d'authentification pour l'inscription et la connexion.

### HTTP

- **Backend simulé** : Utilisation de `json-server` avec trois tables :
  - `users` : Données des utilisateurs.
  - `movies` : Liste des films.
  - `favorites` : Liste des favoris d'un utilisateur.

### Reactive Forms et custom pipes

utilisés pour rédiger divers avis a propos du cinema et de ses films

###

## Prérequis

Avant d'exécuter le projet, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [Angular CLI](https://angular.io/cli) (version 16 ou supérieure)

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/Ryskell/pathe-angu.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd pathe-angu
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```

## Lancement

Pour exécuter l'application en mode développement :

```bash
ng serve
```

Accédez ensuite à l'application via : [http://localhost:4200](http://localhost:4200).

Pour lancer la base de données, ouvrez un autre terminal, accédez au répertoire du projet si ce n'est pas déjà fait :

```bash
cd pathe-angu
```

Puis exécutez :

```bash
node server.js
```

## Structure du projet

```plaintext
src/
├── app/
│   ├── components/        # Composants Angular
│   ├── services/          # Services Angular pour la gestion des données
│   ├── models/            # Modèles de données (typages)
│   ├── pages/             # Pages principales de l'application
│   ├── app.module.ts      # Module principal
├── assets/                # Images et ressources statiques
├── environments/          # Configurations d'environnement
├── styles/                # Fichiers de style globaux (SCSS)
```

## Scripts disponibles

- **Démarrer le serveur local** :
  ```bash
  ng serve
  ```
- **Générer un build de production** :
  ```bash
  ng build --prod
  ```
- **Exécuter les tests unitaires** :
  ```bash
  ng test
  ```

##

##

---
