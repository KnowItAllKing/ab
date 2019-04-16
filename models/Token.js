const { Schema, model  } = require('mongoose');

const Token = new Schema({
    token: String,
    username: String,
    duration: Number
});
module.exports = model('Token', Token);