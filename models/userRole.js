const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

module.exports = UserRole = mongoose.model('userRole', UserRoleSchema);