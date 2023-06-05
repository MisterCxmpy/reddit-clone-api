const router = require('express').Router();
const controller = require('../controllers/community.controller.js')

router.get("/:community", controller.getCommunityByCommunity)
router.get("/", controller.getAll)
router.get("/c/default", controller.getDefault)
router.post("/create", controller.createPost)

module.exports = router;