const express = require('express');
const passport = require('passport');
const messageService = require("../service/message-service");
const orderService = require("../service/order-service");
const router = express.Router();

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};


router.get('/', function (req, res, next) {
    res.render('page/index', {
        title: 'Express',
    });
});

router.get('/order', function(req, res, next) {
    res.render('page/order', {
        title: 'Order',
    });
});

router.post('/order', function(req, res, next) {
    orderService.create(req.body['order']);
    res.send({
        message: "success",
    });
});


router.get('/contact', function(req, res, next) {
    res.render('page/contact', { title: 'Contact', env: env });
});


router.post('/contact', function(req, res, next) {
    messageService.create(req.body['message']);
    res.send({
        message: "success",
    });
});

router.get('/about', function(req, res, next) {
    res.render('page/sidebar', { title: 'Sidebar', env: env });
});


router.get('/news', function(req, res, next) {
    res.render('page/blog-news', { title: 'Blog-news', env: env });
});


router.get('/rule', function(req, res, next) {
    res.render('page/sidebar', { title: 'Sidebar', env: env });
});


router.get('/privat-office', function(req, res, next) {
    res.render('page/sidebar-1', { title: 'Sidebar-1', env: env });
});


router.get('/signIn', function(req, res, next) {
    res.render('page/sign-in', { title: 'Sign in', env: env });
});


router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logout', function(req, res){
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


module.exports = router;
