const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseTimestamps = require('mongoose-timestamp');

const UserSchema = mongoose.Schema({
    last_name : { type: String, required: true },
    first_name : { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(mongooseTimestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('Users', UserSchema);