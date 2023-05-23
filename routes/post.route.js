const router = require('express').Router();
const controller = require("../controllers/post.controller")

router.post("/create", controller.createPost)
router.patch("/:id/create", controller.editPost)
router.delete("/:id", controller.deletePost)
router.get("/:id", controller.getPostById)

module.exports = router;