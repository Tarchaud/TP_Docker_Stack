const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const createHttpError = require('http-errors');
const config = require('config');

//Routes
const userRoutes = require('./users/routes/users');

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


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});


app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, 'Endpoint not found'));
});

app.use(errorMiddleware.HandlerError);


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port} : http://localhost:${port}`);
});