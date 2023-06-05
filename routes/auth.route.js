const router = require('express').Router();
const controller = require('../controllers/auth.controller.js');

// /api/auth/register
router.post('/register', controller.register);
// /api/auth/login
router.post('/login', controller.login);
router.patch('/:id/update', controller.update);

module.exports = router;