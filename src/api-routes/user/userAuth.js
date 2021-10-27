const router = require('express').Router();

router.get('/login', (req, res, next) => {
    console.log('process.env is: ', process.env)
    res.json({ success: true });
})

module.exports = router;