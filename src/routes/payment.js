const express = require('express');
const router = express.Router();

router.get('/execute/:paymentMethod', (req, res, next) => {
    const paymentMethod = req.param('paymentMethod');
    const payment = require('../payment/' + paymentMethod);
    payment.execute(req, res, next);
});

router.get('/cancel/:paymentMethod', (req, res, next) => {
    const paymentMethod = req.param('paymentMethod');
    const payment = require('../payment/' + paymentMethod);
    payment.cancel(req, res, next);
});


module.exports = router;
