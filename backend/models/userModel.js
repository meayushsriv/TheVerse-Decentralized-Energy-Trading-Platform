const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    DNO: {
        type: Number,
        required: true
    },
    electricitymeterid: {
        type: String,
        required: true
    },
    gasmeterid: {
        type: String,
        required: true
    },
    electricitymeterreading: {
        type: Number,
        required: true
    },
    gasmeterreading: {
        type: Number,
        required: true
    },
    smartmeter: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);