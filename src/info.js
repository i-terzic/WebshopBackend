const express = require('express');
const path = require('path');
const { getSrcPath } = require('./utils/index');

const router = express.Router();

router.use(express.static(path.join(getSrcPath(__dirname), 'static')));
// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, 'static', 'info.html'));
// });

// router.get('/categories', (req, res, next) => {
//   // TODO
// });

// router.get('/category', (req, res, next) => {
//   // TODO
// });

// router.get('/image', (req, res, next) => {
//   // TODO
// });

module.exports = router;
