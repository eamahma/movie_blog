const router = require('express').Router();
//const userRoutes = require('.userRoutes');


const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
//router.use('/users',userRoutes);

module.exports = router;
