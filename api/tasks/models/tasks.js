const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseTimestamps = require('mongoose-timestamp');

const TaskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TasksStatus', 
        required: true 
    },
    created_by: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', required: true 
    },
});

TaskSchema.plugin(uniqueValidator);
TaskSchema.plugin(mongooseTimestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('Tasks', TaskSchema);