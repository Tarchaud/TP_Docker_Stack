# Utilisation de l'image Node.js
FROM node:18.10.0-alpine

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers du projet
COPY ./ ./

# Installation des dépendances de l'application
RUN npm install

# Exposer le port 3000
EXPOSE 3000

# Commande pour exécuter l'application
CMD [ "npm", "run", "start" ]
