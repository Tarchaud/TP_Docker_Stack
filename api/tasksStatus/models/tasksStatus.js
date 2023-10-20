const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TasksStatusSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    //color: { type: String, required: true },
});

TasksStatusSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TasksStatus', TasksStatusSchema);