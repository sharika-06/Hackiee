const StudentResult = require('../models/StudentResult');

// @desc    Submit exam results
// @route   POST /api/student/submit-exam
// @access  Private (JWT protected, but open for now)
exports.submitExam = async (req, res) => {
    try {
        const { studentEmail, companyName, totalScore, problems } = req.body;

        // Validation
        if (!studentEmail || !companyName || totalScore === undefined || !problems) {
            return res.status(400).json({
                success: false,
                error: 'Please provide studentEmail, companyName, totalScore, and problems'
            });
        }

        if (!Array.isArray(problems) || problems.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Problems must be a non-empty array'
            });
        }

        // Validate each problem has the required fields
        for (const p of problems) {
            if (!p.problemId || p.score === undefined || p.timeTaken === undefined) {
                return res.status(400).json({
                    success: false,
                    error: 'Each problem must have problemId, score, and timeTaken'
                });
            }
        }

        // Save result
        const result = await StudentResult.create({
            studentEmail,
            companyName,
            totalScore,
            problems
        });

        res.status(201).json({
            success: true,
            message: 'Exam results saved successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
};

// @desc    Get leaderboard (all students ranked by total score)
// @route   GET /api/student/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res) => {
    try {
        const results = await StudentResult.find({})
            .sort({ totalScore: -1 })
            .lean();

        const leaderboard = results.map((entry, index) => ({
            rank: index + 1,
            studentEmail: entry.studentEmail,
            companyName: entry.companyName,
            totalScore: entry.totalScore,
            problemsSolved: entry.problems ? entry.problems.length : 0,
            submittedAt: entry.submittedAt
        }));

        res.status(200).json({
            success: true,
            data: leaderboard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
};

