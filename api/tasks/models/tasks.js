const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseTimestamps = require('mongoose-timestamp');

const TaskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TasksStatus', 
        required: true 
    },
    project : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Projects', 
        required: true 
    },
});

TaskSchema.plugin(uniqueValidator);
TaskSchema.plugin(mongooseTimestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('Tasks', TaskSchema);