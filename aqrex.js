





bot.on('spawn', () => {
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
