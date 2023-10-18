FROM node:18.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Commande pour exécuter l'application
CMD [ "npm", "run", "start" ]
