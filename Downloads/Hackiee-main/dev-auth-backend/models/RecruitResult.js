const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    problemId: { type: String, required: true },
    score: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const recruitResultSchema = new mongoose.Schema({
    studentName: {
        type: String,
        default: ''
    },
    studentEmail: {
        type: String,
        required: [true, 'Student email is required']
    },
    examId: {
        type: String
    },
    companyName: {
        type: String
    },
    totalScore: {
        type: Number,
        required: [true, 'Total score is required']
    },
    problems: [problemSchema],
    isFlagged: {
        type: Boolean,
        default: false
    },
    flagReason: {
        type: String,
        default: null
    },
    masterSnapshot: {
        type: String,
        default: null
    },
    identity_logs: [
        {
            timestamp: { type: Date, default: Date.now },
            match: { type: Boolean },
            confidence: { type: Number },
            snapshot: { type: String },
            detectedIssue: { type: String, default: 'none' },
            reason: { type: String, default: '' }
        }
    ],
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'recruitresults' });

module.exports = mongoose.model('RecruitResult', recruitResultSchema);
