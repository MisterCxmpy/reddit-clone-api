const router = require('express').Router();
const controller = require('../controllers/community.controller.js')

router.get("/:id", controller.getCommunityById)
router.get("/", controller.getAll)
router.post("/create", controller.createPost)

module.exports = router;