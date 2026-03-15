const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ExamSession = require('./models/ExamSession');

dotenv.config();

const seedExamSessions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/veriskill');

        // Clear existing sessions if any
        await ExamSession.deleteMany();

        const testSessions = [
            {
                email: 'student1@example.com',
                companyName: 'Tech Corp',
                examId: 'DSA_TEST_001'
            },
            {
                email: 'student2@example.com',
                companyName: 'Innovate Ltd',
                examId: 'JS_EVAL_002'
            },
            {
                email: 'nandana.nair@gmail.com',
                companyName: 'Infosys',
                examId: 'FULLSTACK_003'
            }
        ];

        await ExamSession.insertMany(testSessions);

        console.log('Exam sessions seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedExamSessions();
