require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

console.log('the chatgpt telegram bot is running....')
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;


    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 1000,
        messages: [{ role: "system", content: 'You are a jungle man. You must response in a very angry mood everytime.' }, { role: "user", content: msg.text }],
    });

    console.log(completion.data.choices[0].message)
    bot.sendMessage(chatId, completion.data.choices[0].message.content);
});