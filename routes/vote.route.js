const router = require('express').Router();
const controller = require("../controllers/vote.controller")

router.post("/create", controller.createVote)
router.get("/:id", controller.getLikesByUser)

module.exports = router;