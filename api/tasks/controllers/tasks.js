const Task = require('../models/tasks');
const taskStatus = require('../../tasksStatus/models/tasksStatus');
const createHttpError = require('http-errors');


exports.createTask = async (req, res, next) => {
    if (!req.body.status){
        let defaultStatus = await taskStatus.findOne({name: "À faire"});
        req.body.status = defaultStatus._id;
    }

    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        project: req.body.project,
    });

    task.save()
        .then(() => res.status(201).json(task))
        .catch(error => next(createHttpError(400, error)));
}

exports.getAllTasks = (req, res, next) => {
    Task.find()
        .then(tasks => res.status(200).json(tasks))
        .catch(error => next(createHttpError(400, error)));
}

exports.getAllTasksByProject = (req, res, next) => {
    Task.find({project: req.params.id})
        .then(tasks => res.status(200).json(tasks))
        .catch(error => next(createHttpError(400, error)));
}

exports.updateTask = (req, res, next) => {
    Task.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Task updated !'}))
        .catch(error => next(createHttpError(400, error)));
}

exports.deleteTask = (req, res, next) => {
    Task.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Task deleted !'}))
        .catch(error => next(createHttpError(400, error)));
}