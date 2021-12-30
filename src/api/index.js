const express = require('express');
const webshop = require('./webshop');
const admin = require('./admin');

const router = express.Router();

router.use('/webshop', webshop);
router.use('/admin', admin);
module.exports = router;
