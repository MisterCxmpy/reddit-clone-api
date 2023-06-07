const router = require('express').Router();
const controller = require('../controllers/community.controller.js')

router.get("/:community", controller.getCommunityByCommunity)
router.get("/", controller.getAll)
router.get("/c/default", controller.getDefault)
router.get("/user/:id", controller.getCommunitiesFromUser)
router.post("/create", controller.createPost)
router.patch("/join/:id", controller.joinCommunity)

module.exports = router;