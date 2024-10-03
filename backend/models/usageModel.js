const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    data: {
        type: Array,
        required: true,
    },
    });

    module.exports = mongoose.model('usages', usageSchema);
    
