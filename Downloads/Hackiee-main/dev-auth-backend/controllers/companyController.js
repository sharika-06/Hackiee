const Company = require('../models/Company');
const jwt = require('jsonwebtoken');

// Helper — generate JWT
const generateToken = (id) =>
    jwt.sign({ id, role: 'company' }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d'
    });

// @desc    Company one-time login — auto-saves to DB on first login
// @route   POST /api/company/login
// @access  Public
exports.companyLogin = async (req, res) => {
    try {
        const { fullname, email, dob } = req.body;

        // ── 1. Field validation ───────────────────────────────────────
        if (!email || !dob) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email and date of birth'
            });
        }

        // ── 2. Email format check ─────────────────────────────────────
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please enter a valid email address'
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        // ── 3. Check if this email has already logged in before ───────
        const existing = await Company.findOne({ email: cleanEmail });

        if (existing && existing.isUsed) {
            return res.status(403).json({
                success: false,
                error: 'This email has already been used for login. Each account can only log in once.'
            });
        }

        // ── 4. First-time login — save details to DB & mark as used ──
        let company;

        if (existing) {
            // Record exists but not yet used — update and mark used
            existing.isUsed = true;
            existing.loginTime = new Date();
            if (fullname) existing.fullname = fullname.trim();
            await existing.save();
            company = existing;
        } else {
            // Brand new user — create record in DB right now
            company = await Company.create({
                fullname: fullname ? fullname.trim() : cleanEmail.split('@')[0],
                email: cleanEmail,
                dob: dob.trim(),
                isUsed: true,
                loginTime: new Date()
            });
        }

        // ── 5. Generate token & respond ───────────────────────────────
        const token = generateToken(company._id);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                _id: company._id,
                fullname: company.fullname,
                email: company.email,
                loginTime: company.loginTime,
                role: 'company',
                token
            }
        });

    } catch (error) {
        console.error('Company login error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Server error'
        });
    }
};
