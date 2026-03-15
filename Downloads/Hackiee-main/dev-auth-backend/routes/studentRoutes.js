const express = require('express');
const { studentLogin } = require('../controllers/studentAuthController');
const { submitExam, getLeaderboard } = require('../controllers/examController');

const router = express.Router();

router.post('/login', studentLogin);
router.post('/submit-exam', submitExam);
router.get('/leaderboard', getLeaderboard);

module.exports = router;

