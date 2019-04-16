const { Router } = require('express');
const { hash, check } = require('../util/bcrypt');
const User = require('../models/User');
const { fetchUser, login } = require('../util/token');
const router = Router();
router.post('/register', async (req, res, next) => {
    const { username, password, email, name } = JSON.parse(req.body.info);
    const hashed = await hash(password);
    if((await User.find({ username })).length) {
        req.flash('A user with that username already exists. Try logging in instead.');
        res.render('login', {
            title: 'Login',
            username: 'Guest'
        });
    }
    await new User({
        username,
        password: hashed,
        email,
        name
    }).save();
    req.flash('You have successfully registered.');
    res.render('index', {
        title: 'Home'
    });
});
router.post('/login', async (req, res, next) => {
    const validated = await fetchUser(req.cookies.token);
    if(validated) {
        req.flash('You are already logged in. Log out before trying to log in again.');
        return res.render('index', { title: 'Home', username: validated });
    }
    const { username, password } = JSON.parse(req.body.info);
    const hashed = await hash(password);
    const checked = await check(username, hashed);
    if(!checked) {
        req.flash('Incorrect username & password combination. Please try again.');
        return res.render('login');
    }
    const token = await login(username);
    req.flash('You have logged in successfully.');
    res.cookie('token', token, {
        maxAge: 86400000
    });
    return res.render('index', {
        title: 'Home',
        username
    });
});

module.exports = router;