const express = require('express');
const tasksRouter = express.Router();

const tasksCtrl = require('../controllers/tasks');

tasksRouter.post('/add', tasksCtrl.createTask);
tasksRouter.get('/getAll', tasksCtrl.getAllTasks);
tasksRouter.get('/getAllByUser/:id', tasksCtrl.getAllTasksByUser);
tasksRouter.put('/update/:id', tasksCtrl.updateTask);
tasksRouter.delete('/delete/:id', tasksCtrl.deleteTask);

module.exports = tasksRouter;
