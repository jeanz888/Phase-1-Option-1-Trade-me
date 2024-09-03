const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @route POST /auth/register
 * @description Register a new user
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /auth/login
 * @description Login a user and return a JWT token
 * @access Public
 */
router.post('/login', authController.login);

module.exports = router;