const TasksStatus = require('../models/tasksStatus');

exports.createTasksStatus = (req, res, next) => {
    const tasksStatus = new TasksStatus({
        name: req.body.name,
        color: req.body.color,
    });
    tasksStatus.save()
        .then(() => res.status(201).json(tasksStatus))
        .catch(error => next(createHttpError(400, error)));
}

exports.getAllTasksStatus = (req, res, next) => {
    TasksStatus.find()
        .then(tasksStatus => res.status(200).json(tasksStatus))
        .catch(error => next(createHttpError(400, error)));
}