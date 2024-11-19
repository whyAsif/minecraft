const mineflayer = require('mineflayer');
const keep_alive = require('../keep_alive.js');

const botConfigs = [
    { host: 'play.minecraftbangladesh.com', port: 25565, username: 'Redroom' },
    { host: 'play.minecraftbangladesh.com', port: 25565, username: 'whyREX' },

    // Add more bot configurations here as needed
];

function createBot(config) {
    const bot = mineflayer.createBot(config);

    bot.on('message', (message) => {
        console.log(`${bot.username} received message:`, message.toString());
        handleServerMessage(bot, message);
    });

    function handleServerMessage(bot, message) {
        const messageText = message.toString();

        if (messageText.includes('BMS ᴘʟᴇᴀsᴇ,')) {
            console.log(`${bot.username} sending server password...`);
            bot.chat('/login #Dhaka$.0'); // Respond with the server password
        }
        if (messageText.includes('Facebook:')) {
            console.log(`${bot.username} sending to survival server...`);
            bot.chat('/server survival'); // Respond with the server password
        }
        if (messageText.includes('ASSif has requested')) {
            bot.chat('/tpaccept');
        }
    }

    bot.on('login', () => {
        console.log(`${bot.username} has logged in`);
    });

    bot.on('spawn', () => {
        console.log(`${bot.username} has spawned in the world`);
    });

    bot.on('end', () => {
        console.log(`${bot.username} has been disconnected`);
        setTimeout(() => createBot(config), 7000); // Reconnect the bot after a delay
    });

    bot.on('error', (err) => {
        console.error(`${bot.username} Error: ${err.message}`);
    });

    bot.on('kicked', (reason, loggedIn) => {
        console.log(`${bot.username} Kicked: ${reason} ${loggedIn ? '(logged in)' : '(not logged in)'}`);
    });

    bot.on('death', () => {
        console.log(`${bot.username} has died`);
        bot.chat('/dback');
    });

    bot.on('disconnect', (packet) => {
        console.log(`${bot.username} Disconnected: ${packet.reason}`);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`${bot.username} ${username}: ${message}`);
    });

    bot.on('command_error', (command, err) => {
        console.log(`${bot.username} Command error: ${command}, Error: ${err}`);
    });
}

botConfigs.forEach(config => createBot(config));
