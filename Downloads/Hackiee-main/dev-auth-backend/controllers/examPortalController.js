const ExamSession = require('../models/ExamSession');
const ExamResult = require('../models/ExamResult');
const RecruitResult = require('../models/RecruitResult');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d'
    });
};

// @desc    Exam Portal Login
// @route   POST /api/exam/login
// @access  Public
exports.examLogin = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Validation
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide your full name, email, and password'
            });
        }

        // Check fixed password (same for everyone)
        const fixedPassword = process.env.EXAM_PASSWORD || 'VeriSkill2026';
        if (password !== fixedPassword) {
            return res.status(401).json({
                success: false,
                error: 'Invalid password. Please use the company-provided password.'
            });
        }

        // Check if a session exists for this email; if not, create one
        let session = await ExamSession.findOne({ email });

        if (session && session.isUsed) {
            return res.status(403).json({
                success: false,
                error: 'Exam session already used for this email'
            });
        }

        if (!session) {
            // Create a new session for this email dynamically
            session = await ExamSession.create({
                email,
                studentName: fullname.trim(),
                companyName: 'General',
                examId: 'HACKATHON_2026'
            });
        }

        // Mark session as used and record login time + student name
        session.isUsed = true;
        session.loginTime = new Date();
        session.studentName = fullname.trim();
        await session.save();

        // Create token
        const token = generateToken(session._id);

        res.status(200).json({
            success: true,
            message: 'Login successful. Session established.',
            data: {
                _id: session._id,
                fullname: fullname.trim(),
                email: session.email,
                companyName: session.companyName,
                examId: session.examId,
                loginTime: session.loginTime,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
};

// @desc    Submit exam results
// @route   POST /api/exam/submit
// @access  Private
exports.submitExam = async (req, res) => {
    try {
        const { studentName, studentEmail, examId, companyName, totalScore, problems, isFlagged, flagReason, masterSnapshot } = req.body;

        // Validation
        if (!studentEmail || !examId || !companyName || totalScore === undefined || !problems) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields: studentEmail, examId, companyName, totalScore, problems'
            });
        }

        // Store result with completion time and integrity flag
        const existingResult = await ExamResult.findOne({ studentEmail, examId });
        const identityLogs = existingResult ? existingResult.identity_logs : [];

        const result = await ExamResult.findOneAndUpdate(
            { studentEmail, examId },
            {
                $set: {
                    studentName: studentName || '',
                    studentEmail,
                    examId,
                    companyName,
                    totalScore,
                    problems, // each includes problemId, score, timeTaken, submittedAt
                    isFlagged: isFlagged || false,
                    flagReason: flagReason || null,
                    masterSnapshot: masterSnapshot || null,
                    submittedAt: new Date() // Exact exam completion timestamp
                }
            },
            { new: true, upsert: true }
        );

        // Also save to recruitresults collection as requested
        await RecruitResult.findOneAndUpdate(
            { studentEmail, examId },
            {
                $set: {
                    studentName: studentName || '',
                    studentEmail,
                    examId,
                    companyName,
                    totalScore,
                    problems, // Now saving problems to RecruitResult too!
                    isFlagged: isFlagged || false,
                    flagReason: flagReason || null,
                    masterSnapshot: masterSnapshot || null,
                    identity_logs: identityLogs,
                    submittedAt: new Date()
                }
            },
            { new: true, upsert: true }
        );

        res.status(201).json({
            success: true,
            message: 'Exam results submitted successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
};

// @desc    Log Identity Mismatch
// @route   POST /api/exam/log-identity
// @access  Public (should be protected in prod)
exports.logIdentity = async (req, res) => {
    try {
        const { studentEmail, examId, match, confidence, snapshot, masterSnapshot, detectedIssue, reason } = req.body;

        const result = await ExamResult.findOneAndUpdate(
            { studentEmail, examId },
            {
                $set: { masterSnapshot }, // Ensure masterSnapshot is set/updated
                $push: {
                    identity_logs: {
                        timestamp: new Date(),
                        match,
                        confidence,
                        snapshot,
                        detectedIssue: detectedIssue || 'none',
                        reason: reason || ''
                    }
                }
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
};
// @desc    Get All Exam Results (for Recruiter Dashboard)
// @route   GET /api/exam/results
// @access  Public (should be protected)
exports.getAllResults = async (req, res) => {
    try {
        const results = await RecruitResult.find().sort({ submittedAt: -1 });
        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
};
