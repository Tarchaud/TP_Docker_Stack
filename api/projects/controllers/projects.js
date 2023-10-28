const Projects = require('../models/projects');
const createHttpError = require('http-errors');

exports.createProject = (req, res, next) => {
    const project = new Projects({
        title: req.body.title,
    });
    project.save()
        .then(() => res.status(201).json(project))
        .catch(error => next(createHttpError(400, error)));
}

exports.getAllProjects = (req, res, next) => {
    Projects.find()
        .then(projects => res.status(200).json(projects))
        .catch(error => next(createHttpError(400, error)));
}

exports.deleteProject = (req, res, next) => {
    Projects.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Project deleted !'}))
        .catch(error => next(createHttpError(400, error)));
}

