const express = require('express');
const { examLogin, submitExam, logIdentity, getAllResults } = require('../controllers/examPortalController');

const router = express.Router();

router.post('/login', examLogin);
router.post('/submit', submitExam);
router.post('/log-identity', logIdentity);
router.get('/results', getAllResults);

module.exports = router;
