const mineflayer = require('mineflayer');

// Create the bot
function createBot() {
  bot = mineflayer.createBot({
    host: 'mc.arcticbd.net',
    port: 25565,
    username: 'whyREX',
    version: '1.20.1',
  });


  bot.on('message', (message) => {
    console.log(message.toString());
    handleServerMessage(message);
  });

  function handleServerMessage(message) {
    const messageText = message.toString();

    if (messageText.includes('/login <password>')) {
      setTimeout(() => {
        console.log('Sending server password...');
        bot.chat('/login #Dhaka$.0');
      }, 100);
    }
    if (messageText.includes('Welcome to ArcticRealms')) {
      setTimeout(() => {
        console.log('Sending to survival server...');
        bot.chat('/server Survival');
      }, 3000);
    }


    if (messageText.includes('You have left the')) {
      bot.chat('/home'); //tp
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
    bot.chat('/home');
  });

  bot.on('disconnect', (packet) => {
    console.log(`Disconnected: ${packet.reason}`);
  });

  // bot.on('chat', (username, message) => {
  //   if (username === bot.username) return;
  //   console.log(`${username}: ${message}`);
  // });

  bot.on('command_error', (command, err) => {
    console.log(`Command error: ${command}, Error: ${err}`);
  });
}

createBot();
