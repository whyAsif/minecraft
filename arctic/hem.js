const mineflayer = require('mineflayer');

// Create the bot

function createBot() {

 bot = mineflayer.createBot({

  host: 'mc.arcticbd.net',

  port: 25565,

  username: 'Romeo',

  version: '1.20.1',

});

bot.on('message', (message) => {

  // console.log('Server message:', message.toString());

  handleServerMessage(message);

});

function handleServerMessage(message) {

  const messageText = message.toString();

  if (messageText.includes('/login <password>')) {

    setTimeout(() => {

        console.log('Sending server password...');

        bot.chat('/login 123123123#');

    }, 500);

  }

  if (messageText.includes('Welcome to ArcticRealms')) {

    setTimeout(() => {

        console.log('Sending to survival server...');

        bot.chat('/server Survival');

    }, 5000);

  }

  if (messageText.includes('Player whyREX wants teleport ')) {

    bot.chat('/tpaccept'); //tp

  }

  if (messageText.includes('(HemalGaming ➜ You) home')) {
	console.log('homee');
    bot.chat('/home'); //tp

  }

  if (messageText.includes('(HemalGaming ➜ You) bed')) {
	console.log('beddd');
    bot.chat('/home bed'); //tp

  }

  if (messageText.includes("(HemalGaming ➜ You) bye") || messageText.includes("(whyREX ➜ You) bye")) {

    console.log('Trigger text detected! Disconnecting...');

    bot.end('Disconnected due to trigger text'); // Disconnect the bot

  }

}

bot.on('login', () => {

  console.log('Bot has logged in');

});

bot.on('spawn', () => {

  console.log('Bot has spawned in the world');

});

bot.on('end', () => {

  console.log('Bot has been disconnected');

  setTimeout(createBot, 2 * 60 * 1000);

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


bot.on('command_error', (command, err) => {

  console.log(`Command error: ${command}, Error: ${err}`);

});

}

createBot();
