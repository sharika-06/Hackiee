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
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const examResultSchema = new mongoose.Schema({
    studentName: {
        type: String,
        default: ''
    },
    studentEmail: {
        type: String,
        required: [true, 'Student email is required']
    },
    examId: {
        type: String,
        required: [true, 'Exam ID is required']
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
    isFlagged: {
        type: Boolean,
        default: false    // true if student failed integrity/logic verification
    },
    flagReason: {
        type: String,
        default: null    // reason for flagging (e.g., "Failed AI code verification")
    },
    masterSnapshot: {
        type: String, // Base64 image of the student for reference
        default: null
    },
    identity_logs: [
        {
            timestamp: { type: Date, default: Date.now },
            match: { type: Boolean },
            confidence: { type: Number },
            snapshot: { type: String }, // Base64 image
            detectedIssue: { type: String, default: 'none' },
            reason: { type: String, default: '' }
        }
    ],
    submittedAt: {
        type: Date,
        default: Date.now  // Exam completion time
    }
});

module.exports = mongoose.model('ExamResult', examResultSchema);
