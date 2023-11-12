const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const createHttpError = require('http-errors');
const config = require('config');
const cors = require('cors');

//Routes
const projectsRoutes = require('./projects/routes/projects');
const tasksStatusRoutes = require('./tasksStatus/routes/tasksStatus');
const tasksRoutes = require('./tasks/routes/tasks');

//Middleware
const errorMiddleware = require('./middleware/error/error');

const app = express();
const port = config.get('app.port') || 3000;


mongoose.connect(config.get("db.url"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error', err); 
});

// Appel du script d'initialisation
require('./script/initDatabase.js');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('Requête reçue !');
    console.log('Requête à la route : ',req.url);
    next();
});


app.use('/api/projects', projectsRoutes);
app.use('/api/tasksStatus', tasksStatusRoutes);
app.use('/api/tasks', tasksRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, 'Endpoint not found'));
});

app.use(errorMiddleware.HandlerError);


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port} : http://localhost:${port}`);
});