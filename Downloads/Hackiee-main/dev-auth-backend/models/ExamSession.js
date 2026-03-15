const mongoose = require('mongoose');

const examSessionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    companyName: {
        type: String,
        default: ''
    },
    studentName: {
        type: String,
        default: null   // Populated when the student logs in
    },
    examId: {
        type: String,
        default: 'HACKATHON_2026'
    },
    loginTime: {
        type: Date,
        default: null
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ExamSession', examSessionSchema);
