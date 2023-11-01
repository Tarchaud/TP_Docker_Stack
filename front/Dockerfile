# Utilisation de l'image Node.js 14 comme base
FROM node:18.10.0-alpine

# Répertoire de travail dans le conteneur
WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@15.0.5

# Installation des dépendances de l'application
RUN npm install

# Exposer le port 4200 (port par défaut du serveur de développement d'Angular)
EXPOSE 4200

# Commande pour exécuter l'application
CMD [ "npm", "start" ]

## Utilisez l'image officielle Angular CLI
# FROM node:18.10.0-alpine AS build
# # Définissez le répertoire de travail dans le conteneur
# WORKDIR /app
# # Copiez le fichier package.json et le fichier package-lock.json dans le conteneur
# COPY package*.json ./
# # Installez les dépendances
# RUN npm install
# # Installez Angular CLI globalement
# RUN npm install -g @angular/cli
# # Copiez l'ensemble du projet dans le conteneur
# COPY . .
# # Construisez l'application Angular
# RUN ng build
# # Utilisez une image légère Nginx pour servir l'application
# FROM nginx:alpine
# # Copiez les fichiers de production depuis le conteneur de build vers Nginx
# COPY --from=build /app/dist/* /usr/share/nginx/html/
# # Exposez le port 80 pour que l'application soit accessible depuis l'extérieur
# EXPOSE 80
# # Commande pour démarrer le serveur Nginx
# CMD ["nginx", "-g", "daemon off;"]
