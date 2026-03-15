const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    dob: {
        type: String,      // stored as DD/MM/YYYY string
        required: [true, 'Date of birth is required']
    },
    isUsed: {
        type: Boolean,
        default: false     // one-time login flag
    },
    loginTime: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
