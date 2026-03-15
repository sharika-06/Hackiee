const mongoose = require('mongoose');

const companyStudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        select: false // Do not return password by default
    },
    companyName: {
        type: String,
        default: ''
    },
    studentName: {
        type: String,
        default: null   // Populated when the student logs in
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    loginTime: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CompanyStudent', companyStudentSchema);
