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
La stack est composé de 3 service :
- frontend : 
    - Service dans lequel le front-end de l'app va tourner
    - Port 4200:4200
    - depends_on : backend => Permets de dire que le service frontend doit attendre que le service `backend` sois démarrer pour démarrer 
- backend : 
    - Service dans lequel le back-end de l'app va tourner
    - Port 3000:3000
    - depends_on : database => Permets de dire que le service backend doit attendre que le service `database` sois démarrer pour démarrer
- database :
    - Service pour la base de données en mongodb 
    - Port 27017:27017

il y a aussi un network pour que faire communiquer les dockers ensemble : `tpNetwork` <br/>Et il y a un volume `mongodb_data` pour permettre la persistance de la base de données.