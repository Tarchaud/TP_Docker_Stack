# API - TP docker Stack 

Cette api est fait en NodeJs, express et MongoDB pour la base de données.

Lorsque l'api est lancée un script est lancée pour initialiser la base de données pour avoir un exemple 

## Les Models
### Project :
```js
const ProjectSchema = mongoose.Schema({
    title: {type: String, required: true },
});
```

### Les Statuts
```js
const TasksStatusSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
});
```

### Les Tâches
```js
const TaskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TasksStatus', 
        required: true 
    },
    project : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Projects', 
        required: true 
    },
});
```

## Les Routes
### Les Projets : `/api/projects`
- post : `/add` => pour créer un projet 
- get : `/getAll` => pour récupérer tous les projets 
- delete : `/delete/:id` => pour supprimer un projet via son id 

### Les Statuts des tâches : `/api/tasksStatus` 
- post : `/add` => pour créer un statuts
- get : `/getAll` => pour récupérer tous les statuts 
- get : `/getOne/:id` => pour récupérer un statut via son id
- get : `/getOneByName/:name` => pour récupérer un statut via son name

### Les Tâches : `/api/tasks`
- post : `/add` => pour créer une tâche
- post : `/getAll` => pour récupérer toutes tâches
- post : `/getAllByProject/:idProject` => pour récupérer toutes les tâches d'un projet
- post : `/update/:id` => pour mettre à jour une tâche
- post : `/delete/:id` => pour supprimer une tâche