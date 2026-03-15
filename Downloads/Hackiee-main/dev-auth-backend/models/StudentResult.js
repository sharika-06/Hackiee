const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    timeTaken: {
        type: Number, // in seconds
        required: true
    }
});

const studentResultSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        required: [true, 'Student email is required']
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required']
    },
    totalScore: {
        type: Number,
        required: [true, 'Total score is required']
    },
    problems: [problemSchema],
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('StudentResult', studentResultSchema);
