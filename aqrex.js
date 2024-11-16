

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
  // console.log('Server message:', message.toString());
  handleServerMessage(message);
});

function handleServerMessage(message) {
  const messageText = message.toString();

  if (messageText.includes('/login <password>')) {
    setTimeout(() => {
        console.log('Sending server password...');
        bot.chat('/login #Dhaka$.0');
    }, 2000);
  }
  if (messageText.includes('Welcome to ArcticRealms')) {
    setTimeout(() => {
        console.log('Sending to survival server...');
        bot.chat('/server Survival');
    }, 5000);

  }
  if (messageText.includes('Player whyREX wants teleport ')) {
    bot.chat('/tpyes'); //tp
  }
 if (messageText.includes('whyREX')) {
    console.log('Server message:', message.toString()); // show in console
  }
}

bot.on('login', () => {
  console.log('Bot spawned! Waiting to join the lobby...');

  // Wait for 5 seconds after spawning
  setTimeout(() => {
    selectHotbarItem(0); // Select the first hotbar slot (adjust slot as needed)
    rightClick();        // Right-click the item to open the GUI
  }, 5000); // Delay to ensure the bot is ready
});

  bot.on('windowOpen', (window) => {
  console.log('GUI opened! Searching for the target item...');

  // Replace 'target_item_name' with the specific item name in the GUI
  const targetItem = window.slots.find(
    (item) => item && item.name === 'target_item_name'
  );

  if (targetItem) {
    console.log(`Found target item: ${targetItem.name}. Clicking it...`);
    bot.clickWindow(targetItem.slot, 0, 0); // Left-click the target item
    console.log('Clicked on the target item to join the server!');
  } else {
    console.log('Target item not found in the GUI!');
  }

  bot.closeWindow(window); // Close the GUI
});

  
// Function to select a hotbar slot
function selectHotbarItem(slot) {
  bot.setQuickBarSlot(slot);
  console.log(`Selected hotbar slot ${slot}`);
}

// Function to right-click with the selected item
function rightClick() {
  bot.activateItem();
  console.log('Right-clicked the hotbar item!');
}
  
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

// bot.on('chat', (username, message) => {
//   if (username === bot.username) return;
//   console.log(`${username}: ${message}`);
// });

bot.on('command_error', (command, err) => {
  console.log(`Command error: ${command}, Error: ${err}`);
});
}

createBot();







