const User = require('../models/User');
const Token = require('../models/Token');
const randomString = length => {
    let result = '';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
const validate = async token => {
    const doc = await Token.findOne({ token });
    return doc || null;
}
const login = async username => {
    const token = randomString(32);
    await new Token({
        token,
        username,
        duration: 3
    }).save();
    return token;
}
const fetchUser = async token => {
    const valid = await validate(token);
    return valid ? valid.username : 'Guest';
}
const cycle = timeout => {
    return setInterval(async () => {
        await Token.find({ duration: 0 }).remove();
        const docs = await Token.find();
        for(const doc of docs) {
            Token.findOneAndUpdate(doc, {
                $inc: {
                    duration: -1
                }
            })
        }
    }, timeout);
}
module.exports = { validate, login, randomString, cycle, fetchUser };