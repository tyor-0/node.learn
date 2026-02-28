const express = require('express');
const { verifyToken, verifyIsAdmin } = require('../middleware/verify-token');
const router =  express.Router();



router.use(verifyToken);
router.use(verifyIsAdmin);

router.get('/', (req, res) => {
    res.send("Welcome to the admin dashboard");
})

router.delete('/user/:id', (req, res) => {

})


module.exports = router;