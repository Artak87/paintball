const express = require('express');
const passport = require('passport');
const messageService = require("../service/message-service");
const orderService = require("../service/order-service");
const userService = require("../service/user-service");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('page/index', {
        title: 'Paintball',
    });
});

router.get('/order', function (req, res, next) {
    res.render('page/order', {
        title: 'Order',
    });
});

router.post('/order', function (req, res, next) {
    orderService.create(req.body['order']);
    res.send({
        message: "success",
    });
});


router.get('/contact', function (req, res, next) {
    res.render('page/contact', {title: 'Contact'});
});


router.post('/contact', function (req, res, next) {
    messageService.create(req.body['message']);
    res.send({
        message: "success",
    });
});

router.get('/about', function (req, res, next) {
    res.render('page/about', {title: 'About'});
});

router.get('/news', function (req, res, next) {
    res.render('page/news', {title: 'News'});
});

router.get('/rule', function (req, res, next) {
    res.render('page/rule', {title: 'Rule'});
});

router.get('/private-office', function (req, res, next) {
    const user = userService.mainInfo(req.user);
    const orders = orderService.getUserOrders(user.id, req.query['page']);

    res.render('page/private-office', {
        title: 'Private-Office',
        orders: orders,
    });
});

router.get('/login', function (req, res) {
    res.render('login', {env: env});
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/callback',
    passport.authenticate('auth0', {
        failureRedirect: '/url-if-something-fails',
    }),
    function (req, res) {
        res.redirect(req.session.returnTo || '/user');
    });


router.get('/test', function (req, res) {
    res.render('page/sidebar-1');
});

module.exports = router;
