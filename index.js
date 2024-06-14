const mineflayer = require('mineflayer');

function createBot() {
  bot = mineflayer.createBot({
    host: 'play.bdzonemc.com',
    port: 25565,
    username: 'wkwkwk',
    version: '1.20.1',
  });

  bot.on('message', (message) => {
    console.log('Server message:', message.toString());
    handleServerMessage(message);
  });

  function handleServerMessage(message) {
    const messageText = message.toString();

    if (messageText.includes('Please login using:')) {
      console.log('Sending server password...');
      bot.chat('/login notabott'); // Respond with the server password
    }
    if (messageText.includes('Connected')) {
      console.log('Sending to survival server...');
      bot.chat('/joinq survival'); // Respond with the server password
    }
    if (messageText.includes('ASSif has requested')) {
      bot.chat('/tpaccept');
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
    setTimeout(createBot, 60000);
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
    console.log(`${username}: ${message}`);
  });

  bot.on('command_error', (command, err) => {
    console.log(`Command error: ${command}, Error: ${err}`);
  });
}

createBot();