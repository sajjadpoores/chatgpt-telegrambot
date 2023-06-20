const telegramService = require('../service/telegram.service')
const handleMessage = (async (bot, msg) => {

    await telegramService.handleMessage(bot, msg);

})


module.exports = { handleMessage }