require('dotenv').config();
const mongoose = require("mongoose");
const TelegramBot = require('node-telegram-bot-api');

mongoose.connect('mongodb://127.0.0.1:27017/telegrambot');
const db = mongoose.connection.useDb(`telegrambot`, {
    useCache: true
});
// Need to register models every time a new connection is created
if (!db.models['User']) {
    db.model('User', mongoose.Schema({ chatId: String, mode: { type: String, default: 'Normal person' } }));
}


db.model('User').find().
    then(users => console.log(users)).
    catch(err => res.status(500).json({ message: err.message }));


// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

console.log('the chatgpt telegram bot is running....')

bot.on('message', async (msg) => {
    let mode = 'Normal person';
    const chatId = msg.chat.id;
    let dbUser = await db.model('User').findOne({ chatId })
    if (dbUser) {
        mode = dbUser.mode
    }
    else {
        let dbUser = await db.model('User').create({ chatId, mode })
    }

    if (msg.text === "/mode") {
        bot.sendMessage(msg.chat.id, "Who you want me to act like?", {
            "reply_markup": {
                "keyboard": [["Rapper"], ["Angry man"], ["Normal person"]]
            }
        });
    }
    else if (msg.text === "Angry man") {
        mode = "Angry man";
        bot.sendMessage(chatId, 'Robot is in angry mode now');
        dbUser.mode = mode
        await dbUser.save()
    }
    else if (msg.text === "Rapper") {
        mode = "Rapper";
        bot.sendMessage(chatId, 'Robot is in rapper mode now');
        await dbUser.save()
    }
    else if (msg.text === "Normal person") {
        mode = "Normal person";
        bot.sendMessage(chatId, 'Robot is in normal mode now');
        await dbUser.save()
    }
    else {
        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
        });
        const openai = new OpenAIApi(configuration);
        bot.sendChatAction(chatId, 'typing')


        const modeMap = {
            "Normal person": 'you are a wise person, answer user text',
            "Rapper": 'I want you to act as a rapper. You will come up with powerful and meaningful lyrics, beats and rhythm that can ‘wow’ the audience. Your lyrics should have an intriguing meaning and message which people can relate too. When it comes to choosing your beat, make sure it is catchy yet relevant to your words, so that when combined they make an explosion of sound everytime!',
            "Angry man": 'I want you to act like a very angry person that knows everything but response in a very angry way.'
        }
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 1,
            max_tokens: 1000,
            messages: [{ role: "system", content: modeMap[mode] }, { role: "user", content: msg.text }],
        });

        console.log(completion.data.choices[0].message)
        bot.sendMessage(chatId, completion.data.choices[0].message.content);
    }

});