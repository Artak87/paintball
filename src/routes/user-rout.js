const userService = require("../service/user-service");
const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function (req, res, next) {
    userService.save(req.user);

    res.render('user', {
        user: req.user,
        userProfile: JSON.stringify(req.user, null, '  ')
    });
});

module.exports = router;
