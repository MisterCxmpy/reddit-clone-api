const router = require('express').Router();
const controller = require('../controllers/user.contoller.js')

router.get("/:id", controller.getById)
router.patch("/:id/vote", controller.setVote)

module.exports = router;