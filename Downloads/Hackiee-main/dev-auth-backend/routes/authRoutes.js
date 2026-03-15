const express = require('express');
const { registerDeveloper, loginDeveloper } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerDeveloper);
router.post('/login', loginDeveloper);

module.exports = router;
