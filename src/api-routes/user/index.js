const router = require('express').Router();
const userAuthRoutes = require('./userAuth');

router.use('/user', userAuthRoutes);

module.exports = router;
