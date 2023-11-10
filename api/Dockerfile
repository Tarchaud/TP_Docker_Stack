# Utilisation de l'image Node.js
FROM node:20.9.0-alpine

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Exposer le port 3000
EXPOSE 3000

# Commande pour installer les node_modules puis exécuter l'application
CMD npm install && npm start
