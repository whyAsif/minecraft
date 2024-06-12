const mineflayer = require('mineflayer');

// Create the bot
function createBot() {
 bot = mineflayer.createBot({
  host: 'play.minecraftbangladesh.com',
  port: 25565,
  username: 'whyREX'
});

// Handle server messages
bot.on('message', (message) => {
    console.log('Server message:', message.toString());
    handleServerMessage(message);
  });
  
  // Handle additional server prompts (like password entry)
  function handleServerMessage(message) {
    const messageText = message.toString();
  
    if (messageText.includes('BMS ᴘʟᴇᴀsᴇ,')) {
      console.log('Sending server password...');
      bot.chat('/login #Dhaka$.0'); // Respond with the server password
    }
    if (messageText.includes('Facebook:')) {
        console.log('Sending to survival server...');
        bot.chat('/server survival'); // Respond with the server password
      }
      if (messageText.includes('ASSif has requested')) {
        bot.chat('/tpaccept');
      }
  }
  
  // Log bot events
  bot.on('login', () => {
    console.log('Bot has logged in');
  });


bot.on('spawn', () => {
  console.log('Bot has spawned in the world');
});



bot.on('end', () => {
    console.log('Bot has been disconnected');
    // Automatically reconnect
    setTimeout(createBot, 5000); // Reconnect after 5 seconds
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

// Adding more event handlers for better debugging
bot.on('login', () => {
  console.log('Successfully logged in!');
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