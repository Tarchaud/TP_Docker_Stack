FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


EXPOSE 3000

# Commande pour exécuter l'application
CMD [ "npm", "run", "start" ]
