const { Router } = require('express');
const { check } = require('../util/bcrypt');
const { fetchUser } = require('../util/token');
const router = Router();
router.get('/', async (req, res, next) => {
    const username = await fetchUser(req.cookies.token);
    res.render('index', {
        title: 'Home',
        username
    });
});
router.get('/login', async (req, res, next) => {
    const username = await fetchUser(req.cookies.token);
    res.render('login', {
        title: 'Login',
        username
    });
});
router.get('/register', async (req, res, next) => {
    const username = await fetchUser(req.cookies.token);
    res.render('register', {
        title: 'Register',
        username
    });
});
module.exports = router;