const express = require('express');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const telegramController = require('./controller/telegram.controller');

const app = express();

const bot = new TelegramBot(process.env.TELEGRAM_KEY, {polling: true});

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...')
        bot.on('message', (msg) => telegramController.handleMessage(bot, msg));
        
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
    })
    .catch(err => console.error('Could not connect to MongoDB...'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
