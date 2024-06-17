const { Router } = require('express');

const getCreateCollectibleRoutes = require('./create/collectible');

const rateLimit = require('express-rate-limit');

const createLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 6, // limit each IP to 6 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = () => {
    const router = Router();

    router.use('/create/collectible', createLimiter, getCreateCollectibleRoutes());
    router.get('/', getHc);

    return router;
}