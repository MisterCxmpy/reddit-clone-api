const router = require('express').Router();
const authRouter = require('./auth.route.js')
const userRouter = require("./user.route.js");
const postRouter = require("./post.route.js");
const communityRouter = require("./community.route.js");

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/community', communityRouter);

module.exports = router;
