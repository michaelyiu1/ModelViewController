const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const deleteRoutes = require('./profileRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/profile', deleteRoutes);

module.exports = router;
