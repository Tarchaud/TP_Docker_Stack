const express = require('express');
const ProjectsRouter = express.Router();

const ProjectsCtrl = require('../controllers/projects');

ProjectsRouter.post('/add', ProjectsCtrl.createProject);
ProjectsRouter.get('/getAll', ProjectsCtrl.getAllProjects);
ProjectsRouter.delete('/delete/:id', ProjectsCtrl.deleteProject);

module.exports = ProjectsRouter;
