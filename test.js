const mineflayer = require('mineflayer');
const keep_alive = require('./keep_alive.js');

const botConfigs = [
    { host: 'play.bdzonemc.com', port: 25565, username: 'ASSif', version: '1.20.1' },
    { host: 'play.bdzonemc.com', port: 25565, username: 'RedRoom', version: '1.20.1' },
    // Add more bot configurations here as needed
];

function handleServerMessage(bot, message) {
    const messageText = message.toString();

    if (messageText.includes('Please login using:')) {
        console.log(`${bot.username} sending server password...`);
        bot.chat('/login #Dhaka$.0');
    }
    if (messageText.includes('Connected')) {
        console.log(`${bot.username} sending to survival server...`);
        bot.chat('/joinq survival');
    }
    // Add more conditions as needed
}

function createBot(config, retryAttempt = 0) {
    const bot = mineflayer.createBot(config);

    bot.on('message', (message) => {
        console.log(`${bot.username} received message:`, message.toString());
        handleServerMessage(bot, message);
    });

    bot.on('login', () => {
        console.log(`${bot.username} has logged in`);
    });

    bot.on('spawn', () => {
        console.log(`${bot.username} has spawned in the world`);
    });

    bot.on('end', () => {
        console.log(`${bot.username} has been disconnected`);
        const nextRetryAttempt = retryAttempt + 1;
        const baseDelay = 5000 * Math.pow(2, retryAttempt);
        const delay = Math.min(baseDelay + Math.random() * 5000, 300000); // Exponential backoff with randomness, max delay 5 minutes
        console.log(`${bot.username} will attempt to reconnect in ${(delay / 1000).toFixed(2)} seconds`);
        setTimeout(() => createBot(config, nextRetryAttempt), delay);
    });

    bot.on('error', (err) => {
        console.error(`${bot.username} Error: ${err.message}`);
    });

    bot.on('kicked', (reason, loggedIn) => {
        console.log(`${bot.username} Kicked: ${reason} ${loggedIn ? '(logged in)' : '(not logged in)'}`);
    });

    bot.on('death', () => {
        console.log(`${bot.username} has died`);
    });

    bot.on('disconnect', (packet) => {
        console.log(`${bot.username} Disconnected: ${packet.reason}`);
        const nextRetryAttempt = retryAttempt + 1;
        const baseDelay = 5000 * Math.pow(2, retryAttempt);
        const delay = Math.min(baseDelay + Math.random() * 5000, 300000); // Exponential backoff with randomness, max delay 5 minutes
        console.log(`${bot.username} will attempt to reconnect in ${(delay / 1000).toFixed(2)} seconds`);
        setTimeout(() => createBot(config, nextRetryAttempt), delay);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`${bot.username} ${username}: ${message}`);
    });

    bot.on('command_error', (command, err) => {
        console.log(`${bot.username} Command error: ${command}, Error: ${err}`);
    });

    bot.on('connection', () => {
        console.log(`${bot.username} is trying to connect to ${config.host}:${config.port}`);
    });
}

// Create bots based on configurations
botConfigs.forEach(config => createBot(config));

