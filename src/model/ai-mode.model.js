const mongoose = require("mongoose");
const { Schema } = mongoose;

const aiModeSchema = new Schema({
    mode: { type: String, default: 'normal' },
    prmopt: { type: String, default: 'you are a wise person, answer user question' }
});


const AiMode = mongoose.model('AiMode', aiModeSchema);

module.exports = AiMode