/**
 * Company Student Seeder
 * Run this script to add a new company student to the database:
 *   node add_student.js <email> <dob> <companyName>
 * 
 * Example:
 *   node add_student.js nandananair0305@gmail.com 03/05/2000 "Acme Corp"
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CompanyStudent = require('./models/CompanyStudent');
require('dotenv').config();

const [, , email, dob, companyName] = process.argv;

if (!email || !dob) {
    console.error('Usage: node add_student.js <email> <dob> <companyName>');
    console.error('Example: node add_student.js student@example.com 03/05/2000 "Acme Corp"');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/veriskill').then(async () => {
    // Remove existing record if any
    await CompanyStudent.deleteMany({ email });

    // Hash the DOB as password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dob, salt);

    await CompanyStudent.create({
        email,
        password: hashedPassword,
        companyName: companyName || 'General',
        isUsed: false
    });

    console.log(`✅ Student created successfully!`);
    console.log(`   Email: ${email}`);
    console.log(`   Password (DOB): ${dob}`);
    console.log(`   Company: ${companyName || 'General'}`);
    process.exit(0);
}).catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
