const CompanyStudent = require('../models/CompanyStudent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d'
    });
};

// @desc    Company Student Login (Single-Use)
// @route   POST /api/student/login
// @access  Public
exports.studentLogin = async (req, res) => {
    try {
        const { email, password, studentName } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email and password'
            });
        }

        if (!studentName || !studentName.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Please provide your name'
            });
        }

        // Check if student exists
        const student = await CompanyStudent.findOne({ email }).select('+password');

        if (!student) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Check if already used
        if (student.isUsed) {
            return res.status(403).json({
                success: false,
                error: 'This login has already been used'
            });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Mark as used, save student name and login time
        student.isUsed = true;
        student.loginTime = new Date();
        student.studentName = studentName.trim();
        await student.save();

        // Create token
        const token = generateToken(student._id);

        res.status(200).json({
            success: true,
            data: {
                _id: student._id,
                studentName: student.studentName,
                email: student.email,
                companyName: student.companyName,
                loginTime: student.loginTime,
                role: 'student',
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
