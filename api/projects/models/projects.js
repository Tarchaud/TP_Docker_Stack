const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseTimestamps = require('mongoose-timestamp');


const ProjectSchema = mongoose.Schema({
    title: {type: String, required: true },
});

ProjectSchema.plugin(uniqueValidator);
ProjectSchema.plugin(mongooseTimestamps,{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


module.exports = mongoose.model('Project', ProjectSchema);