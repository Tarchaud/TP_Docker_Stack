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
    let testProject =  await Project.findOne({ title: 'TP_Docker_Stack' });
    
    if (!testProject) {
        const ProjectToAdd = new Project({
            title: 'TP_Docker_Stack',
        });
        await ProjectToAdd.save();
        testProject = ProjectToAdd;
    }

    // Tasks dans la database
    //recupe le status "À faire"
    const todo = existingStatuses.filter(status => status.name == "À faire")[0];
    const pending = existingStatuses.filter(status => status.name == "En attente")[0];
    const inProgress = existingStatuses.filter(status => status.name == "En cours")[0];
    const done = existingStatuses.filter(status => status.name == "Terminé")[0];

    const tasksToAdd = [
        { title: 'Front - update Task', description: 'Create part to update Task', status: todo._id, project: testProject._id },
        { title: 'Front - UI', description: '', status: todo._id, project: testProject._id },
        { title: 'Front (MVP)', description: 'Front minimum viable product', status: done._id, project: testProject._id },
        { title: 'API (MVP)', description: 'API minimum viable product', status: done._id, project: testProject._id },
        { title: 'Init DB', description: 'Script to init DB', status: done._id, project: testProject._id },
        
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