const router = require('express').Router();
const controller = require('../controllers/user.contoller.js')

router.get("/:id", controller.getById)

module.exports = router;