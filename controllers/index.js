
   
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const BlogRoutes = require('./BlogRoutes')

router.use('/', homeRoutes);
router.use('/blog', BlogRoutes)
router.use('/api', apiRoutes);

module.exports = router;