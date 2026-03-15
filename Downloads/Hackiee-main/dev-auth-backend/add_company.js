/**
 * Seed script — add a test company user to MongoDB
 * Usage:  node add_company.js
 */

const mongoose = require('mongoose');
const Company = require('./models/Company');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/veriskill';

const companies = [
    {
        fullname: 'Nandana Nair',
        email: 'nandananair0305@gmail.com',
        dob: '10/03/2005'     // DD/MM/YYYY  — must match what user types on login
    },
    {
        fullname: 'Sharika Satheesh',
        email: 'sharikasatheesh06@gmail.com',
        dob: '06/06/2005'
    },
    {
        fullname: 'Demo User',
        email: 'demo@company.com',
        dob: '01/01/2000'
    }
];

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        for (const c of companies) {
            const existing = await Company.findOne({ email: c.email });
            if (existing) {
                console.log(`⚠️  Already exists: ${c.email}`);
                continue;
            }
            await Company.create(c);
            console.log(`✅ Added: ${c.fullname} (${c.email})`);
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
})();
