# TP Docker Stack

Le projet est une application de gestion de projet. 

L'application est faite en Angular pour le front-end, NodeJs pour le back-end et utilise Mongodb pour la base de donnée.


## Lancer le project 
```bash
# Pour lancer le projet en mode détaché
sudo ddocker-compose up -d
```
```bash
# Pour lancer le projet en mode attaché
sudo docker-compose up
```

Une fois le projet lancée, direction http://localhost:4200/ pour accéder au projet

## Arreter le projet
```bash
# Pour arreter et supprimer les dockers
sudo docker-compose down
```
```bash
# Pour supprimer les images en même temps 
sudo docker-compose down --rmi all
```
```bash
# Pour supprimer les volumes en même temps
sudo docker-compose down -v
```

## Structure Docker-compose

La stack est composée de 4 services :

### frontend :

- **Build:** Le service est construit à partir des fichiers situés dans le répertoire `front/`.
- **Ports:** Le service expose le port 4200 sur l'hôte, qui est mappé sur le port 4200 du conteneur.
- **Volumes:** Le répertoire `./front` sur l'hôte est monté dans le répertoire `/app` du conteneur.
- **Dépendances:** Ce service dépend du démarrage du service `backend` et `database`, indiqué par le bloc `depends_on:`.
- **Networks:** Le service est connecté au réseau `tpNetwork`.

### backend :

- **Build:** Le service est construit à partir des fichiers situés dans le répertoire `api/`.
- **Ports:** Le service expose le port 3000 sur l'hôte, qui est mappé sur le port 3000 du conteneur.
- **Volumes:** Le répertoire `./api` sur l'hôte est monté dans le répertoire `/app` du conteneur.
- **Dépendances:** Ce service dépend du démarrage du service `database`, indiqué par le bloc `depends_on:`.
- **Networks:** Le service est connecté au réseau `tpNetwork`.

### database :

- **Image:** Le service utilise l'image MongoDB disponible publiquement sur Docker Hub.
- **Ports:** Le service expose le port 27017 sur l'hôte, qui est mappé sur le port 27017 du conteneur.
- **Volumes:** Un volume nommé `mongodb_data` est utilisé pour stocker les données persistantes de la base de données.
- **Networks:** Le service est connecté au réseau `tpNetwork`.

### nginx :

- **Image:** Le service utilise l'image Nginx disponible publiquement sur Docker Hub.
- **Ports:** Le service expose le port 80 sur l'hôte, qui est mappé sur le port 80 du conteneur.
- **Volumes:** Le fichier de configuration `./nginx/nginx.conf` sur l'hôte est monté dans le répertoire `/etc/nginx/nginx.conf` du conteneur.
- **Dépendances:** Ce service dépend du démarrage des services `frontend`, `backend`, et `database`.
- **Networks:** Le service est connecté au réseau `tpNetwork`.

### Networks :

- Un réseau appelé `tpNetwork` est défini pour permettre la communication entre les conteneurs des différents services.

### Volumes :

- Un volume nommé `mongodb_data` est utilisé pour assurer la persistance des données de la base de données MongoDB.
