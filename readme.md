# ChatGPT Telegram Bot

This project is a Telegram bot that uses OpenAI's GPT-3 to interact with users. The bot can operate in different modes, which can be switched by sending a "/mode" command.

## Setup and Installation

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Create a `.env` file based on the `.env.template` file and fill in the necessary environment variables, including the Telegram bot token, the MongoDB connection string, and the OpenAI API key.
4. Run the bot with `npm start`.

## Usage

Send messages to the bot on Telegram, and it will reply using GPT-3. To switch the mode of the bot, send a "/mode" command, and choose one of the available modes.

## Development

The project follows the MVC (Model-View-Controller) design pattern. The `src` directory contains the following subdirectories:

- `controller`: Contains the `telegram.controller.js` file which handles Telegram messages.
- `service`: Contains the `telegram.service.js` file which contains the business logic of the bot.
- `model`: Contains the `user.model.js` and `ai-mode.model.js` files which define the User and AiMode models.
- `helper`: Contains the `openai.helper.js` file which interacts with the OpenAI API.

Contributions are welcome. Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)