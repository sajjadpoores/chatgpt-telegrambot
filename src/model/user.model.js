const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    chatId: String,
    mode: { type: String, default: 'normal' }
});


const User = mongoose.model('User', userSchema);

module.exports = User