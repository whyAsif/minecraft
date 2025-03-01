const mineflayer = require('mineflayer');
const express = require('express');
   const app = express();
   const port = 3000;

   app.get('/', (req, res) => {
     res.send('Hello, your app is running 24/7!');
   });

   app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
   });

function createBot() {
  bot = mineflayer.createBot({
    host: 'play.bdzonemc.com',
    port: 25565,
    username: 'whyREX',
    version: '1.20.1',
  });

  bot.on('message', (message) => {
   // console.log('Server message:', message.toString());
    handleServerMessage(message);
  });

  function handleServerMessage(message) {
    const messageText = message.toString();


    function delayedChat(command) {
      setTimeout(() => {
        bot.chat(command);
      }, 2000);
    }

    if (messageText.includes('XYZ')) {
    }
    else {
        console.log( message.toString());
    }

      
    if (messageText.includes('Please login using:')) {
      console.log('Sending server password...');
      bot.chat('/login #Dhaka$.0'); // Respond with the server password
    }
    if ((messageText.includes('whyREX Connected')) || messageText.includes('←')|| messageText.includes('BDZONE')) {
      console.log('joining survival');
      delayedChat('/joinq survival'); 
    }
    // if (messageText.includes('Connected')) {
    //   console.log('Sending to survival server...');
    //   bot.chat('/joinq survival'); // Respond with the server password
    // }
    if (messageText.includes('whyREX request to teleport')) {
        console.log('Server message:', message.toString());
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

  bot.on('command_error', (command, err) => {
    console.log(`Command error: ${command}, Error: ${err}`);
  });
}

createBot();