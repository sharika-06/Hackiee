const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CompanyStudent = require('./models/CompanyStudent');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/veriskill').then(async () => {
    await CompanyStudent.deleteMany({ email: 'test_student@company.com' });
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('secret123', salt);
    await CompanyStudent.create({
        email: 'test_student@company.com',
        password,
        companyName: 'Acme Corp'
    });
    console.log('Test student created');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
