const express = require('express');
const { companyLogin } = require('../controllers/companyController');

const router = express.Router();

// POST /api/company/login
router.post('/login', companyLogin);

module.exports = router;
