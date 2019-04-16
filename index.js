const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const { join } = require('path');
const logger = require('morgan');
const { json, urlencoded } = require('body-parser');
const cookie = require('cookie-parser');
const favicon = require('serve-favicon');
const passport = require('passport');
const local = require('passport-local');
const hbs = require('express-handlebars');
const { cycle } = require('./util/token');
const flash = require('connect-flash');

require('dotenv').config();

const app = express();
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookie());
app.use(flash());
app.use(express.static(join(__dirname, 'public')));
app.use(session({
    secret: 'akatsuki',
    saveUninitialized: false,
    resave: false
}));

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout'
}));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/index'));

const start = async () => {
    await mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useFindAndModify: false
    });
    app.listen(process.env.PORT, _ => console.log(`App listening on port ${process.env.PORT}...`));
    cycle(86400000);
}
start();

module.exports = app;