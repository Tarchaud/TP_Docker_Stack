const mongoose = require('mongoose');
const config = require('config');
const bcrypt = require('bcryptjs');

const tasksStatus = require('../tasksStatus/models/tasksStatus');
const User = require('../users/models/users');

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

    // Vérifiez si l'utilisateur de test existe déjà
    const testUser = await User.findOne({ email: 'test@test.com' });

    // Si l'utilisateur de test n'existe pas, ajoutez-le avec un mot de passe haché
    if (!testUser) {
        const password = 'test'; 

        // Hachez le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            last_name: 'UserTest',
            first_name: 'Tester',
            email: 'test@test.com',
            password: hashedPassword,
        });

        await newUser.save();
    }

    mongoose.disconnect();
}

initializeStatuses();