const User = require('../model/user.model');
const AiMode = require('../model/ai-mode.model')
const openAiHelper = require('../helper/openai.helper')
const handleMessage = (async (bot, msg) => {
    const chatId = msg.chat.id;

    let user = await User.findOne({ chatId });
    if (!user) {
        user = new User({
            chatId,
            mode: 'normal'
        });
        console.log(user)
        await user.save();
    }

    const aiModes = await AiMode.find({});
    const mode = aiModes.find(i => i.mode === msg.text);


    if (msg.text === "/mode") {
        bot.sendMessage(chatId, "Who you want me to act like?", {
            "reply_markup": {
                "keyboard": [...aiModes.map(i => [i.mode])]
            }
        });
    }
    else if (mode) {
        bot.sendMessage(chatId, msg.text + ' mode activated.')
        user.mode = aimode.mode;
        await User.updateOne({ _id: user._id }, { $set: { mode: msg.text } });
    }
    else {
        const answer = await openAiHelper.createChatCompletion(mode?.prompt || 'you are a wise person, answer user question', msg.text)
        bot.sendMessage(chatId, answer);
    }
})

module.exports = { handleMessage }