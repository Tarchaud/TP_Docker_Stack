const mongoose = require('mongoose');
const config = require('config');

const tasksStatus = require('../tasksStatus/models/tasksStatus');  

async function initializeStatuses() {
    await mongoose.connect(config.get("db.url"));

    // Statuts que vous souhaitez ajouter
    const statusesToAdd = [
        { name: 'À faire' },
        { name: 'En attente'},
        { name: 'En cours' },
        { name: 'Terminé' },
    ];

    // Recherchez si les statuts existent déjà
    const existingStatuses = await tasksStatus.find({ name: { 
        $in: statusesToAdd.map(status => status.name) 
    }});

    // Filtrez les statuts déjà existants
    const newStatuses = statusesToAdd.filter(statusToAdd => !existingStatuses.some(existingStatus => existingStatus.name === statusToAdd.name));

    // Insérez les nouveaux statuts
    if (newStatuses.length > 0) {
        await tasksStatus.insertMany(newStatuses);
    }

    mongoose.disconnect();
}

initializeStatuses();