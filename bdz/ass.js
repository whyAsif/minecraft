const mineflayer = require('mineflayer');

function createBot() {
  bot = mineflayer.createBot({
    host: 'play.bdzonemc.com',
    port: 25565,
    username: 'ASSif',
    version: '1.20.4', // Explicitly set the version
  });

  bot.on('message', (message) => {
    handleServerMessage(message);
  });

  function handleServerMessage(message) {
    const messageText = message.toString();

    if (messageText.includes('➔')) {
      console.log('Server message:', message.toString());
    }

    if (messageText.includes('Please login using:')) {
      console.log('Sending server password...');
      bot.chat('/login #Dhaka$.0'); // Respond with the server password
    }

    if (messageText.includes('whyREX request to teleport')) {
      console.log('Server message:', message.toString());
      bot.chat('/tpaccept');
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
    setTimeout(createBot, 5000);
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