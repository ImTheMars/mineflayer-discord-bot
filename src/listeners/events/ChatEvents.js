const { Webhook } = require("discord-webhook-node");
const { bot } = require("../../index");

// Chat Messages Channel
const chatLog = new Webhook(
  "https://discord.com/api/webhooks/916694913524068392/A2ZoOxAsNkySEhfy9BHv0y99rfmuv4pby6rUJAHlkiJrTkKpBp6e1gzSdl5rv6oueFwi"
);

// Join & Leave Log Channel
const eventLog = new Webhook(
  "https://discord.com/api/webhooks/916694913524068392/A2ZoOxAsNkySEhfy9BHv0y99rfmuv4pby6rUJAHlkiJrTkKpBp6e1gzSdl5rv6oueFwi"
);

bot.on("chat", (username, message) => {
  if (username === bot.username) return;
  chatLog.send(`__**[${username}]**__ **${message}**`);
});

// Spam Messages
// bot.once("spawn", () => {
//   for (let i = 0; i < 50000; i++) {
//     setTimeout(() => {
//       var umad = insulter.Insult();
//       console.log(10 * i + " seconds have passed!");
//       bot.chat("https://dsc.gg/wolkig");
//     }, 5000 * i);
//   }
// });

bot.on("playerLeft", (player) => {
  eventLog.send(`__**${player.username}**__ **Left The Server**`);
});

bot.on("playerJoined", (player) => {
  eventLog.send(`__**${player.username}**__ **Joined The Server**`);
});

bot.on("kicked", (reason, loggedIn) => {
  eventLog.send(
    `__**KICKED**__ **With Reason:** **${reason}**\n**logged In:** **${loggedIn}**`
  );
});
