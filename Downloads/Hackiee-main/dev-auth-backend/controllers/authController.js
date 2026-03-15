const Developer = require('../models/Developer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Helper to generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
        expiresIn: '30d'
    });
};

// @desc    Register new developer
// @route   POST /api/developer/register
// @access  Public
const registerDeveloper = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Check if developer exists
        const developerExists = await Developer.findOne({ email });

        if (developerExists) {
            return res.status(400).json({ success: false, message: 'Developer already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create developer
        const developer = await Developer.create({
            email,
            password: hashedPassword,
            role: role || 'student'
        });

        if (developer) {
            const token = generateToken(developer._id);

            // Save token to document (optional based on requirements, but often asked for 'accessToken' field)
            developer.accessToken = token;
            await developer.save();

            res.status(201).json({
                success: true,
                data: {
                    _id: developer._id,
                    email: developer.email,
                    role: developer.role,
                    token: token
                }
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid developer data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Authenticate a developer
// @route   POST /api/developer/login
// @access  Public
const loginDeveloper = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        // Check for developer
        const developer = await Developer.findOne({ email }).select('+password');

        if (!developer) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, developer.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate Token
        const token = generateToken(developer._id);

        // Update accessToken in DB
        developer.accessToken = token;
        await developer.save();

        res.status(200).json({
            success: true,
            data: {
                _id: developer._id,
                email: developer.email,
                role: developer.role,
                token: token
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    registerDeveloper,
    loginDeveloper
};
