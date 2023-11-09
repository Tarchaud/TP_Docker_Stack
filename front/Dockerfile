# Utilisation de l'image Node.js
FROM node:18.10.0-alpine

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers du projet
COPY ./ ./


# RUN npm install -g @angular/cli@15.0.5

# Installation des dépendances de l'application
RUN npm install

# Exposer le port 4200
EXPOSE 4200

# Commande pour exécuter l'application
CMD [ "npm", "start" ]
