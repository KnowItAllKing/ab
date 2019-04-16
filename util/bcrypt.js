const bcrypt = require('bcrypt');
const User = require('../models/User');

const hash = password => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashed) => {
            if(err) reject(err);
            resolve(hashed);
        });
    });
}
const check = async (username, password) => {
    const user = await User.findOne({ username }) || await User.findOne({ email: username });
    if(!user || !user.password) return;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
module.exports = { hash, check };