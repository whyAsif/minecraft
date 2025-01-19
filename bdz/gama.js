const mineflayer = require('mineflayer');

function createBot() {
    bot = mineflayer.createBot({
        host: 'play.bdzonemc.com',
        port: 25565,
        username: 'GaMa2629',
        version: '1.20.1', // Explicitly set the version
    });

    bot.on('message', (message) => {

        handleServerMessage(message);
    });

    function handleServerMessage(message) {
        const messageText = message.toString();
        //Logger
        if (messageText.includes('Welcome')) {
            console.log(message.toString());
          }
        //Login
        if (messageText.includes('Please login using:')) {
            console.log('Sending server password...');
            bot.chat('/login GamerMax2424'); // Respond with the server password
        }
        //GAMA tp
        if ((messageText.includes('GaMa request to teleport')) || (messageText.includes('GaMa has requested'))) {
            console.log('Server message:', message.toString());
            bot.chat('/tpaccept');
        }
        //whyREX tp
        if ((messageText.includes('whyREX request to teleport')) || (messageText.includes('whyREX has requested'))) {
            console.log('Server message:', message.toString());
            bot.chat('/tpaccept');
        }
        //Disconnect
        if (messageText.includes("GaMa [survival] -> You : bye") || messageText.includes("whyREX [survival] -> You : bye")) {
            console.log('Trigger text detected! Disconnecting...');
            bot.end('Disconnected due to trigger text'); // Disconnect the bot
        }
    }

    bot.on('login', () => {
        console.log('Bot logged in');
    });

    bot.on('spawn', () => {
        console.log('Bot has spawned in the world');
    });

    bot.on('end', () => {
        console.log('Bot has been disconnected');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });

    bot.on('kicked', (reason, loggedIn) => {
        console.log(`Kicked: ${reason} ${loggedIn ? '(logged in)' : '(not logged in)'}`);
    });

    bot.on('death', () => {
        console.log('Bot has died');
    });

    bot.on('disconnect', (packet) => {
        console.log(`Disconnected: ${packet.reason}`);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
    });

    bot.on('command_error', (command, err) => {
        console.log(`Command error: ${command}, Error: ${err}`);
    });
}

createBot();