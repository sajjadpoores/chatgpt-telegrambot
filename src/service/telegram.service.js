const User = require('../model/user.model');
const openAiHelper = require('../helper/openai.helper')
const handleMessage = (async (bot, msg) => {
    const chatId = msg.chat.id;

    let user = await User.find({ chatId });
    if (!user) {
        user = new User({
            chatId,
            mode: 'normal'
        });
        console.log(user)
        await user.save();
    }

    if (msg.text === "/mode") {
        bot.sendMessage(chatId, "Who you want me to act like?", {
            "reply_markup": {
                "keyboard": [["Rapper"], ["Angry man"], ["Normal person"]]
            }
        });
    }
    else if (msg.text === "angry") {
        bot.sendMessage(chatId, 'Angry mode activated.')
        user.mode = 'angry'
        await User.updateOne({ _id: user._id }, { $set: { mode: 'angry' } })
    }
    else if (msg.text === "rapper") {
        bot.sendMessage(chatId, 'Rapper mode activated.')
        user.mode = 'rapper'
        await User.updateOne({ _id: user._id }, { $set: { mode: 'rapper' } })
    }
    else if (msg.text === 'normal') {
        bot.sendMessage(chatId, 'Normal mode activated.')
        user.mode = 'normal'
        await User.updateOne({ _id: user._id }, { $set: { mode: 'normal' } })
    }
    else {
        const modeMap = {
            normal: 'you are a wise person, answer user text',
            rapper: 'I want you to act as a rapper. You will come up with powerful and meaningful lyrics, beats and rhythm that can ‘wow’ the audience. Your lyrics should have an intriguing meaning and message which people can relate too. When it comes to choosing your beat, make sure it is catchy yet relevant to your words, so that when combined they make an explosion of sound everytime!',
            angry: 'I want you to act like a very angry person that knows everything but response in a very angry way.'
        }

        const answer = await openAiHelper.createChatCompletion(modeMap[user.mode] || modeMap['normal'], msg.text)
        bot.sendMessage(chatId, answer);
    }
})

module.exports = { handleMessage }