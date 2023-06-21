const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

const createChatCompletion = async (prmopt, msg) => {
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 1,
            max_tokens: 1000,
            messages: [{ role: "system", content: prmopt }, { role: "user", content: msg }],
        });

        return completion.data.choices[0].message.content
    }
    catch (error) {
        console.log(error);
        throw new Error('INTERNAL SERVER ERROR')
    }
}

module.exports = { createChatCompletion }