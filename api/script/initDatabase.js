const mongoose = require('mongoose');
const config = require('config');
const bcrypt = require('bcryptjs');

const TasksStatus = require('../tasksStatus/models/tasksStatus');
const Project = require('../projects/models/projects');
const Task = require('../tasks/models/tasks');

async function initializeDataBase() {

    // Tasks status dans la database
    const statusesToAdd = [
        { name: 'À faire' },
        { name: 'En attente'},
        { name: 'En cours' },
        { name: 'Terminé' },
    ];

    const existingStatuses = await TasksStatus.find({ name: { 
        $in: statusesToAdd.map(status => status.name) 
    }});

    const newStatuses = statusesToAdd.filter(statusToAdd => !existingStatuses.some(existingStatus => existingStatus.name === statusToAdd.name));

    if (newStatuses.length > 0) {
        await TasksStatus.insertMany(newStatuses);
    }

    // Project test dans la database
    const testProject =  await Project.findOne({ title: 'Projet de test' });
    
    if (!testProject) {
        const ProjectToAdd = new Project({
            title: 'Projet de test',
        });
        await ProjectToAdd.save();
        testProject = ProjectToAdd;
    }

    // Tasks dans la database
    //recupe le status "À faire"
    const todo = existingStatuses.filter(status => status.name == "À faire")[0];

    const tasksToAdd = [
        { title: 'Tâche 1', description: 'Description de la tâche 1', status: todo._id, project: testProject._id },
        { title: 'Tâche 2', description: 'Description de la tâche 2', status: todo._id, project: testProject._id },
        { title: 'Tâche 3', description: 'Description de la tâche 3', status: todo._id, project: testProject._id },
        { title: 'Tâche 4', description: 'Description de la tâche 4', status: todo._id, project: testProject._id }
    ];

    const existingTasks = await Task.find({ title: { 
        $in: tasksToAdd.map(task => task.title) 
    }});

    const newTasks = tasksToAdd.filter(taskToAdd => !existingTasks.some(existingTask => existingTask.title === taskToAdd.title));

    if (newTasks.length > 0) {
        await Task.insertMany(newTasks);
    }


}

initializeDataBase();