const express = require('express');
const tasksStatusRouter = express.Router();

const tasksStatusCtrl = require('../controllers/tasksStatus');

tasksStatusRouter.post('/add', tasksStatusCtrl.createTasksStatus);
tasksStatusRouter.get('/getAll', tasksStatusCtrl.getAllTasksStatus);
tasksStatusRouter.get('/getOne/:id', tasksStatusCtrl.getOneTasksStatus);
tasksStatusRouter.get('/getOneByName/:name', tasksStatusCtrl.getOneTasksStatusByName);

module.exports = tasksStatusRouter;